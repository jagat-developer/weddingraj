/**
 * Newspaper page-flip sound.
 *
 * Behaviour:
 *  1. If `public/sounds/page-flip.{mp3,m4a,wav,ogg}` exists, the first one
 *     found is preloaded and used. (Recommended for the most authentic feel —
 *     grab a CC0 paper-flip clip from Pixabay / Freesound and drop it in.)
 *  2. Otherwise we synthesize a layered broadsheet-paper turn using Web Audio.
 *
 * Web Audio API requires a user gesture before AudioContext can play, so this
 * must be called from a click / keydown / pointerup handler. We lazily create
 * (and resume) the shared AudioContext on first use.
 */

let audioCtx: AudioContext | null = null;
let cachedFileBuffer: AudioBuffer | null | undefined; // undefined = not tried, null = tried & not found

const FILE_CANDIDATES = [
  "/sounds/page-flip.mp3",
  "/sounds/page-flip.m4a",
  "/sounds/page-flip.wav",
  "/sounds/page-flip.ogg",
];

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

async function tryLoadFile(ctx: AudioContext): Promise<AudioBuffer | null> {
  for (const url of FILE_CANDIDATES) {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) continue;
      const bytes = await res.arrayBuffer();
      const buf = await ctx.decodeAudioData(bytes);
      return buf;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

function playFile(ctx: AudioContext, buffer: AudioBuffer) {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = 0.55;
  src.connect(gain);
  gain.connect(ctx.destination);
  src.start(ctx.currentTime);
}

/**
 * Synth fallback — three layered components:
 *  1. A low-shelf paper "body" thump (~120Hz) for the weight of the broadsheet.
 *  2. A mid-band filtered-noise rustle that ramps and decays — the swish.
 *  3. A bright crackle burst at the end — the edge slap as the page lands.
 * The result reads as a single believable page turn rather than two "tssh"es.
 */
function playSynth(ctx: AudioContext) {
  const t0 = ctx.currentTime;

  // 1) Low body — short sine thump
  const body = ctx.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(140, t0);
  body.frequency.exponentialRampToValueAtTime(70, t0 + 0.18);
  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.0001, t0);
  bodyGain.gain.exponentialRampToValueAtTime(0.16, t0 + 0.01);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
  body.connect(bodyGain).connect(ctx.destination);
  body.start(t0);
  body.stop(t0 + 0.24);

  // 2) Mid rustle — band-passed noise, longer attack, soft decay
  const rustleLen = Math.floor(ctx.sampleRate * 0.32);
  const rustleBuf = ctx.createBuffer(1, rustleLen, ctx.sampleRate);
  const rustleData = rustleBuf.getChannelData(0);
  for (let i = 0; i < rustleLen; i++) {
    const t = i / rustleLen;
    // Ramp in, hold, decay
    const env = Math.min(1, t * 6) * Math.pow(1 - t, 1.6);
    // Slightly correlated noise (pink-ish) for warmth
    rustleData[i] = (Math.random() * 2 - 1) * env * 0.85;
  }
  const rustle = ctx.createBufferSource();
  rustle.buffer = rustleBuf;
  const rustleBP = ctx.createBiquadFilter();
  rustleBP.type = "bandpass";
  rustleBP.frequency.value = 2200;
  rustleBP.Q.value = 0.6;
  const rustleGain = ctx.createGain();
  rustleGain.gain.value = 0.32;
  rustle.connect(rustleBP).connect(rustleGain).connect(ctx.destination);
  rustle.start(t0 + 0.01);

  // 3) Edge crackle — short bright noise burst at landing
  const crackLen = Math.floor(ctx.sampleRate * 0.09);
  const crackBuf = ctx.createBuffer(1, crackLen, ctx.sampleRate);
  const crackData = crackBuf.getChannelData(0);
  for (let i = 0; i < crackLen; i++) {
    const t = i / crackLen;
    const env = Math.pow(1 - t, 3) * Math.min(1, t * 25);
    crackData[i] = (Math.random() * 2 - 1) * env;
  }
  const crack = ctx.createBufferSource();
  crack.buffer = crackBuf;
  const crackHP = ctx.createBiquadFilter();
  crackHP.type = "highpass";
  crackHP.frequency.value = 4200;
  const crackGain = ctx.createGain();
  crackGain.gain.value = 0.24;
  crack.connect(crackHP).connect(crackGain).connect(ctx.destination);
  crack.start(t0 + 0.21);
}

export function playPaperFlip() {
  const ctx = getCtx();
  if (!ctx) return;

  // First call: kick off the file probe. Subsequent calls reuse the result.
  if (cachedFileBuffer === undefined) {
    cachedFileBuffer = null; // mark as in-flight to avoid re-probing
    tryLoadFile(ctx).then((buf) => {
      cachedFileBuffer = buf;
      // If the very first click happened before the probe finished, the synth
      // has already played — that's fine. Next click uses the real file.
    });
    playSynth(ctx);
    return;
  }

  if (cachedFileBuffer) {
    playFile(ctx, cachedFileBuffer);
  } else {
    playSynth(ctx);
  }
}
