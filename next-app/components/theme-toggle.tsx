"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [isDark, setIsDark] = useState(true);

  function setTheme(dark: boolean) {
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }

  return (
    compact ? (
      <button
        type="button"
        aria-label={isDark ? "Use light theme" : "Use dark theme"}
        onClick={() => setTheme(!isDark)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    ) : (
    <div className="inline-flex items-center rounded-full border border-border bg-card p-1 text-xs">
      <button
        type="button"
        aria-label="Use light theme"
        aria-pressed={!isDark}
        onClick={() => setTheme(false)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
          !isDark ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
        Light
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        aria-pressed={isDark}
        onClick={() => setTheme(true)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
          isDark ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
        Dark
      </button>
    </div>
    )
  );
}
