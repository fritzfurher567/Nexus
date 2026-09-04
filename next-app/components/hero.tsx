"use client";

import { useEffect, useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const WORDS = ["management.", "security.", "moderation.", "fun.", "engagement.", "growth.", "community.", "control.", "customization.", "automation.", "convenience.", "simplicity.", "efficiency.", "organization.", "productivity.", "collaboration.", "communication.", "support.", "analytics.", "insights."];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const done = text === current;
    const empty = text === "";

    if (!deleting && done) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }

    if (deleting && empty) {
      const reset = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 0);
      return () => clearTimeout(reset);
    }

    const speed = deleting ? 35 : 55;
    const step = setTimeout(() => {
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, speed);
    return () => clearTimeout(step);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(WORDS);

  return (
    <section className="relative py-28 text-center sm:py-36">
      <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm font-semibold text-foreground shadow-lg backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        0 of 500 founder spots claimed
      </div>

      <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
        The only{" "}
        <span className="block min-h-[1.1em] text-primary">
          {typed}
          <span className="ml-1 inline-block h-[0.85em] w-[3px] animate-pulse bg-primary align-[-0.1em]" />
        </span>
        bot you&apos;ll need for your server
      </h1>

      <p className="mx-auto mt-6 max-w-md text-muted-foreground">
        One bot, set up in minutes. Moderation, tickets, leveling, and 200+
        commands — no juggling five different apps.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        <SignInButton
          mode="modal"
          forceRedirectUrl="/dashboard"
          signUpForceRedirectUrl="/dashboard"
        >
          <Button size="lg" className="h-12 rounded-full bg-white px-8 text-base font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:bg-white/85">
            Get started free
          </Button>
        </SignInButton>
        <span className="text-sm text-muted-foreground">
          Free to start. No credit card required.
        </span>
      </div>
    </section>
  );
}