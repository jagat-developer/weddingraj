"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Hairline } from "./hairline";

type Guest = {
  guestType: GuestKind;
  firstName: string;
  lastName: string;
  age: string;
  countryCode: string;
  whatsapp: string;
};
type Status = "idle" | "submitting" | "success" | "error";
type GuestKind = "adult" | "child";

type Props = { intro: string; instruction: string; assistance: string };

const MAX_GUESTS = 10;
const DEFAULT_COUNTRY_CODE = "+1";
const COUNTRY_CODES = [
  { value: "+1", label: "US/Canada" },
  { value: "+91", label: "India" },
];

const emptyGuest = (): Guest => ({
  guestType: "adult",
  firstName: "",
  lastName: "",
  age: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  whatsapp: "",
});

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export function RsvpForm({ intro, instruction, assistance }: Props) {
  const [count, setCount] = useState(0);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const resizeGuestList = (prev: Guest[], size: number) => {
    const next = [...prev];
    while (next.length < size) next.push(emptyGuest());
    while (next.length > size) next.pop();
    return next;
  };

  const updateCount = (raw: string) => {
    const parsed = parseInt(raw, 10);
    const safe = isNaN(parsed) ? 0 : Math.max(0, Math.min(MAX_GUESTS, parsed));
    setCount(safe);
    setGuests((prev) => resizeGuestList(prev, safe));
  };

  const updateGuest = (i: number, field: keyof Guest, value: string) => {
    setGuests((prev) => {
      const next = [...prev];
      const updated = { ...next[i], [field]: value };

      if (field === "guestType") {
        if (value === "adult") updated.age = "";
        if (value === "child") {
          updated.whatsapp = "";
          updated.countryCode = DEFAULT_COUNTRY_CODE;
        }
      }

      next[i] = updated;
      return next;
    });
  };

  const valid =
    count > 0 &&
    guests.length === count &&
    guests.every(
      (g) =>
        g.firstName.trim() &&
        g.lastName.trim() &&
        (g.guestType === "adult"
          ? g.countryCode.trim() && digitsOnly(g.whatsapp)
          : digitsOnly(g.age)),
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === "submitting") return;
    setStatus("submitting");
    setError("");
    try {
      const formattedGuests = guests.map((g) => ({
        guestType: g.guestType === "adult" ? "Adult" : "Child",
        firstName: g.firstName,
        lastName: g.lastName,
        age: g.guestType === "child" ? digitsOnly(g.age) : "",
        whatsapp:
          g.guestType === "adult"
            ? `${g.countryCode}${digitsOnly(g.whatsapp)}`
            : "",
      }));
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guests: formattedGuests }),
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

      <p className="clone-rsvp-assistance">
        {assistance}
      </p>

      <CountField
        label="Number of Guests Joining"
        value={count}
        onChange={updateCount}
      />

      {guests.length > 0 && (
        <ul className="mt-5 space-y-5">
          {guests.map((g, i) => (
            <li key={i}>
              <p className="eyebrow text-burgundy text-[0.62rem]">
                Guest {i + 1}
              </p>
              <GuestTypeField
                value={g.guestType}
                onChange={(v) => updateGuest(i, "guestType", v)}
              />
              <div className="clone-guest-fields mt-2">
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
              {g.guestType === "adult" ? (
                <PhoneField
                  countryCode={g.countryCode}
                  number={g.whatsapp}
                  onCountryCodeChange={(v) => updateGuest(i, "countryCode", v)}
                  onNumberChange={(v) => updateGuest(i, "whatsapp", v)}
                />
              ) : (
                <Field
                  className="mt-3"
                  label="Age"
                  value={g.age}
                  onChange={(v) => updateGuest(i, "age", digitsOnly(v).slice(0, 3))}
                  type="number"
                  inputMode="numeric"
                  autoComplete="off"
                />
              )}
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

function CountField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-5 block">
      <span className="eyebrow text-ink text-[0.62rem]">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_GUESTS}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        aria-label={label}
        className="mt-2 block w-full bg-transparent border-b border-ink/30 focus:border-burgundy focus:outline-none font-display text-ink text-[1.6rem] py-1 transition-colors"
        style={{
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out-emil)",
        }}
      />
    </label>
  );
}

function GuestTypeField({
  value,
  onChange,
}: {
  value: GuestKind;
  onChange: (v: GuestKind) => void;
}) {
  const options: { value: GuestKind; label: string }[] = [
    { value: "adult", label: "Adult" },
    { value: "child", label: "Children" },
  ];

  return (
    <fieldset className="clone-guest-type-field">
      <legend>Guest Type</legend>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          data-selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
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

function PhoneField({
  countryCode,
  number,
  onCountryCodeChange,
  onNumberChange,
}: {
  countryCode: string;
  number: string;
  onCountryCodeChange: (v: string) => void;
  onNumberChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected =
    COUNTRY_CODES.find((option) => option.value === countryCode) ??
    COUNTRY_CODES[0];

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const countryCodeDialog =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="clone-country-popover" role="presentation">
            <button
              type="button"
              aria-label="Close country code selector"
              className="clone-country-backdrop"
              onClick={() => setOpen(false)}
            />
            <div
              className="clone-country-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Choose country code"
            >
              <p>Country Code</p>
              <div
                className="clone-country-options"
                role="listbox"
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={option.value === countryCode}
                    data-selected={option.value === countryCode}
                    className="clone-country-option"
                    onClick={() => {
                      onCountryCodeChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <strong>{option.value}</strong>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="clone-phone-row mt-3">
      <label className="block">
        <span className="sr-only">Country code</span>
        <button
          type="button"
          aria-label="Country code"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="clone-country-select clone-country-trigger"
          onClick={() => setOpen(true)}
        >
          <span>{selected.value} {selected.label}</span>
        </button>
      </label>
      <Field
        label="WhatsApp number"
        value={number}
        onChange={onNumberChange}
        type="tel"
        autoComplete="tel-national"
        inputMode="tel"
      />

      {countryCodeDialog}
    </div>
  );
}
