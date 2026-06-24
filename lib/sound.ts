/**
 * Synthesized newspaper page-flip sound — no external assets needed.
 *
 * The sound is composed of two short high-pass-filtered noise bursts about
 * 130ms apart, each with a fast attack and exponential decay. Together they
 * approximate the "tssh-shhh" of a broadsheet being turned.
 *
 * Web Audio API requires a user gesture before AudioContext can play, so this
 * must be called from a click / keydown / pointerup handler. We lazily create
 * (and resume) the shared AudioContext on first use.
 */

let audioCtx: AudioContext | null = null;

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

function burst(ctx: AudioContext, startAt: number, duration: number, gainVal: number, hpFreq: number) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  // White noise with a quick attack and exponential-feel decay envelope baked in.
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const env = Math.pow(1 - t, 2.2) * Math.min(1, t * 18);
    data[i] = (Math.random() * 2 - 1) * env;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = hpFreq;
  const gain = ctx.createGain();
  gain.gain.value = gainVal;
  src.connect(hp);
  hp.connect(gain);
  gain.connect(ctx.destination);
  src.start(startAt);
}

export function playPaperFlip() {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  // First burst: the "lift" — softer, slightly lower-pitched
  burst(ctx, now, 0.14, 0.22, 2800);
  // Second burst: the "land" — louder, brighter
  burst(ctx, now + 0.13, 0.18, 0.3, 3600);
}
