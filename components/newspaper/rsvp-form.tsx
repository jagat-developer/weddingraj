"use client";

import { useState } from "react";
import { Hairline } from "./hairline";

type Guest = { firstName: string; lastName: string; whatsapp: string };
type Status = "idle" | "submitting" | "success" | "error";

type Props = { intro: string; instruction: string };

const MAX_GUESTS = 10;

export function RsvpForm({ intro, instruction }: Props) {
  const [count, setCount] = useState(0);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const updateCount = (raw: string) => {
    const parsed = parseInt(raw, 10);
    const safe = isNaN(parsed) ? 0 : Math.max(0, Math.min(MAX_GUESTS, parsed));
    setCount(safe);
    setGuests((prev) => {
      const next = [...prev];
      while (next.length < safe)
        next.push({ firstName: "", lastName: "", whatsapp: "" });
      while (next.length > safe) next.pop();
      return next;
    });
  };

  const updateGuest = (i: number, field: keyof Guest, value: string) => {
    setGuests((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  const valid =
    count > 0 &&
    guests.length === count &&
    guests.every(
      (g) => g.firstName.trim() && g.lastName.trim() && g.whatsapp.trim(),
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === "submitting") return;
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guests }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok)
        throw new Error(result.error || "Submission failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-6 text-center flex-1 flex flex-col justify-center">
        <p
          className="font-display italic text-copper"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)" }}
        >
          Thank you.
        </p>
        <Hairline className="my-5 mx-auto" />
        <p className="font-display text-ink prose-block mx-auto">
          Your RSVP has been received. We can&apos;t wait to celebrate the next
          chapter of our story with you.
        </p>
        <p className="mt-4 font-display italic text-ink-soft text-[0.92rem]">
          — Shefali &amp; Raj
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col flex-1">
      <p className="mt-5 text-center font-display italic text-ink text-[1.02rem]">
        {intro}
      </p>

      <Hairline className="my-4">
        <span className="text-copper text-[0.7rem]">❦</span>
      </Hairline>

      <p className="text-center eyebrow text-ink-soft text-[0.66rem]">
        {instruction}
      </p>

      <label className="mt-5 block">
        <span className="eyebrow text-ink text-[0.62rem]">
          Number of Guests Joining
        </span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={MAX_GUESTS}
          value={count || ""}
          onChange={(e) => updateCount(e.target.value)}
          placeholder="0"
          aria-label="Number of guests"
          className="mt-2 block w-full bg-transparent border-b border-ink/30 focus:border-burgundy focus:outline-none font-display text-ink text-[1.6rem] py-1 transition-colors"
          style={{
            transitionDuration: "var(--dur-base)",
            transitionTimingFunction: "var(--ease-out-emil)",
          }}
        />
      </label>

      {guests.length > 0 && (
        <ul className="mt-5 space-y-5">
          {guests.map((g, i) => (
            <li key={i}>
              <p className="eyebrow text-burgundy text-[0.62rem]">
                Guest {i + 1}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Field
                  label="First name"
                  value={g.firstName}
                  onChange={(v) => updateGuest(i, "firstName", v)}
                  autoComplete="given-name"
                />
                <Field
                  label="Last name"
                  value={g.lastName}
                  onChange={(v) => updateGuest(i, "lastName", v)}
                  autoComplete="family-name"
                />
              </div>
              <Field
                label="WhatsApp number"
                value={g.whatsapp}
                onChange={(v) => updateGuest(i, "whatsapp", v)}
                type="tel"
                autoComplete="tel"
                className="mt-3"
              />
            </li>
          ))}
        </ul>
      )}

      {status === "error" && (
        <p className="mt-4 font-display italic text-burgundy text-[0.88rem] text-center">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!valid || status === "submitting"}
        className="mt-auto block w-full bg-ink text-paper px-5 py-3.5 font-sans uppercase tracking-[0.28em] text-[0.72rem] font-medium disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-burgundy transition-colors"
        style={{
          marginTop: guests.length > 0 ? "1.75rem" : "auto",
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out-emil)",
        }}
      >
        {status === "submitting" ? "Sending…" : "Send My RSVP"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full bg-transparent border-b border-ink/25 focus:border-burgundy focus:outline-none font-sans text-ink text-[0.95rem] py-1.5 placeholder:text-ink/35 transition-colors"
        style={{
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out-emil)",
        }}
      />
    </label>
  );
}
