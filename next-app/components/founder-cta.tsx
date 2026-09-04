import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function FounderCta() {
  return (
    <section className="border-t border-border py-28 text-center">
      <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
        </span>
        312 of 500 founder spots claimed
      </div>

      <h2 className="mx-auto max-w-lg text-4xl font-bold tracking-tight sm:text-5xl">
        Become a Founder.
      </h2>

      <p className="mx-auto mt-5 max-w-md text-muted-foreground">
        The first 500 servers to add Nexus get a permanent founder badge, free Nexus Pro for life, and exclusive access to beta commands and features.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        <SignInButton
          mode="modal"
          forceRedirectUrl="/dashboard"
          signUpForceRedirectUrl="/dashboard"
        >
          <Button size="lg" className="h-12 rounded-full bg-white px-8 text-base font-bold text-black hover:bg-white/85">
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