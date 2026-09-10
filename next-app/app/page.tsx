import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ComparisonTable } from "@/components/comparison-table";
import { FeatureGrid } from "@/components/feature-grid";
import { FounderCta } from "@/components/founder-cta";

export default function Home() {
  return (
    <main className="grid-surface min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <SiteHeader />
        <Hero />
      </div>

      <section id="compare" className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Why switch from your current bot
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything the popular bots split across three invites, in one.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      <section id="features" className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              A control panel for your server
            </h2>
            <p className="mt-3 text-muted-foreground">
              Turn on what you need, ignore what you don&apos;t.
            </p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      <FounderCta />

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-[11px] font-extrabold text-background">NX</span>
              Nexus
            </Link>
          </div>
          <FooterColumn title="Product" links={["Home", "Pricing", "Features", "Commands"]} />
          <FooterColumn title="Company" links={["Team", "Privacy Policy", "Terms of Service", "Developer Terms of Service", "Cookie Policy"]} />
          <FooterColumn title="Resources" links={["Contact", "Support"]} />
          <FooterColumn title="Social" links={["Discord"]} />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-border px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Copyright. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="text-emerald-500 hover:text-emerald-400">Consent Preferences</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-foreground">{title}</h3>
      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <a
            key={link}
            href={link === "Discord" ? "https://discord.gg/kXv25y3GcQ" : "#"}
            target={link === "Discord" ? "_blank" : undefined}
            rel={link === "Discord" ? "noreferrer" : undefined}
            className="hover:text-foreground"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}