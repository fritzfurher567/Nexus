import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <nav className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-4 py-2.5 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-5">
      <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white text-sm font-extrabold text-black shadow-[0_0_20px_rgba(255,255,255,0.12)]">
          NX
        </span>
        Nexus
      </Link>

      <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
        <a href="#compare" className="hover:text-foreground">Compare</a>
        <a href="#features" className="hover:text-foreground">Features</a>
        <Link href="/docs" className="hover:text-foreground">Docs</Link>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Show when="signed-out">
          <ThemeToggle compact />
          <SignInButton mode="modal" forceRedirectUrl="/dashboard" signUpForceRedirectUrl="/dashboard">
            <Button className="h-9 rounded-full border border-border bg-card px-5 text-foreground hover:bg-muted">
              Sign In
            </Button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}