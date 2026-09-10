import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { AllCommandsTrigger, ToolsTrigger, UpdatesPanel } from "@/components/dashboard-widgets";
import { OnboardingGuard } from "@/components/onboarding-guard";
import { ServerSelector } from "@/components/server-selector";
import { ModuleSettings } from "@/components/module-settings";
import { ServersPanel } from "@/components/servers-panel";
import { DataStoragePanel } from "@/components/data-storage-panel";
import { StatusPanel } from "@/components/status-panel";
import { ErrorLogsPanel } from "@/components/error-logs-panel";

const BOT_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID;

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Modules", href: "/dashboard#modules" },
  { label: "Premium", href: "/dashboard#premium" },
  { label: "BotPanel", href: "/dashboard#botpanel" },
  { label: "Free Premium", href: "/dashboard#free-premium" },
];

const settingsItems = [
  { label: "Settings", href: "/dashboard#settings" },
  { label: "Invite", href: "/dashboard#invite" },
  { label: "Data Storage", href: "/dashboard#data-storage" },
  { label: "Servers", href: "/dashboard#servers" },
  { label: "Status", href: "/dashboard#status" },
  { label: "Error Logs", href: "/dashboard#error-logs" },
];

const builderCards = [
{ title: "Command Builder", text: "Build commands from options, actions, conditions, and variables.", href: "/dashboard/builders/command" },
{ title: "Event Builder", text: "Choose from member, message, channel, moderation, and server events.", href: "/dashboard/builders/event" },
{ title: "Message Builder", text: "Create reusable Discord embed messages with a live preview.", href: "/dashboard/builders/message" },
];

const featureCards = [
{ title: "Custom Commands", text: "Create powerful automations", href: "/dashboard#custom-commands" },
{ title: "Custom Events", text: "Trigger actions based on events", href: "/dashboard#custom-events" },
{ title: "Ticket System", text: "Help your community fast", href: "/dashboard#ticket-system" },
{ title: "Data Storage", text: "Safely store bot data", href: "/dashboard#data-storage" },
{ title: "Webhook Builder", text: "Connect services and alerts", href: "/dashboard#webhook-builder" },
{ title: "Message Builder", text: "Create reusable responses", href: "/dashboard#message-builder" },
];

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const inviteUrl = BOT_CLIENT_ID
    ? `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&scope=bot+applications.commands&permissions=8`
    : "#";
  const discordServerUrl = "https://discord.gg/qe9ygtjXqM";

  return (
    <main className="min-h-screen bg-[#0d0e10] text-white">
      <OnboardingGuard />
      <div className="flex min-h-screen">
        <aside className="w-[260px] border-r border-white/10 bg-[#141518] px-4 py-5">
          <div className="flex items-center justify-between px-2 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-xs font-black text-black">
                NX
              </div>
              <div className="text-sm font-semibold text-white/90">Nexus</div>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[10px] text-white/60">
              ▾
            </div>
          </div>
          <ServerSelector compact />

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                  index === 1
                    ? "bg-white/6 font-medium text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex h-4 w-4 items-center justify-center text-[10px] text-white/80">
                  {index === 0 ? "⌂" : index === 1 ? "▣" : index === 2 ? "✦" : index === 3 ? "◭" : "✦"}
                </span>
                <span>{item.label}</span>
                {item.label === "Free Premium" && (
                  <span className="ml-auto rounded-full border border-emerald-400/30 bg-emerald-500/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-emerald-300">
                    Free
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-2 border-t border-white/10 pt-6">
            {settingsItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                <span className="flex h-4 w-4 items-center justify-center text-[10px] text-white/80">
                  {item.label === "Settings" ? "⚙" : item.label === "Invite" ? "✦" : item.label === "Data Storage" ? "▣" : item.label === "Servers" ? "▤" : item.label === "Status" ? "◔" : "!"}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-[#0d0e10] p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/50">
              <span>Help</span>
            </div>
            <a href={discordServerUrl} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/80 hover:bg-white/5">
              <span className="text-base">✦</span>
              <span>Support Server</span>
            </a>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#121417] px-6 py-4">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Link href="/dashboard" className="text-white/90 hover:text-white">
                Dashboard
              </Link>
              <Link href="/dashboard#tutorials" className="hover:text-white">
                Tutorials
              </Link>
              <ToolsTrigger />
              <AllCommandsTrigger />
              <Link href="/dashboard#updates" className="hover:text-white">
                Updates
              </Link>
              <Link href="/dashboard#docs" className="hover:text-white">
                Docs
              </Link>
              <a href={discordServerUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                Support
              </a>
              <Link href="/setup" className="hover:text-white">
                Setup bot
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={inviteUrl}
                className="rounded-lg border border-white/10 bg-white px-3 py-2 text-sm font-medium text-black"
              >
                Invite
              </a>
              <UserButton />
            </div>
          </header>

          <div className="flex-1 bg-[#181a1e] p-6">
            <div className="rounded-2xl bg-gradient-to-r from-[#5d2d83] via-[#3b1d5d] to-[#3a2c78] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
                    ✦
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/60">Bot ready</div>
                    <div className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {user?.firstName ? `${user.firstName}'s server` : "Your server"}
                    </div>
                  </div>
                </div>
                <a
                  href={inviteUrl}
                  className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90"
                >
                  Invite bot
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Modules</div>
                <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white">Builders</h1>
              </div>

              <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-[#25272b] px-3 py-2 text-sm text-white/50">
                <span>⌕</span>
                <input
                 suppressHydrationWarning
                 value="Search modules..."
                  readOnly
                  className="w-full bg-transparent text-white/60 outline-none placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {builderCards.map((card, index) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`rounded-2xl border border-white/10 bg-[#222428] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-white/20 hover:bg-[#292b2f] ${
                    index === 0 ? "border-[#73b9ff]" : ""
                  }`}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2c14d] text-xl text-black">
                    {index === 0 ? "✎" : index === 1 ? "✦" : "✉"}
                  </div>

                  <div className="text-xl font-semibold text-white">{card.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/60">{card.text}</p>
                </Link>
              ))}
            </div>

            <section id="tutorials" className="mt-10 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Tutorials</div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Get started with Nexus</h2>
                  <p className="mt-2 text-sm text-white/60">Follow the setup wizard to configure your server.</p>
                </div>
                <Link href="/setup" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">Open setup wizard</Link>
              </div>
            </section>

            <ModuleSettings />
            <ServersPanel />
            <DataStoragePanel />
            <StatusPanel />
            <ErrorLogsPanel />

            <div className="mt-10">
              <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/50">Modules</div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white">Featured &amp; Favourited</h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature, index) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="rounded-2xl border border-white/10 bg-[#1f2125] p-5 transition hover:border-white/20 hover:bg-[#25272b]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f03f35] text-lg text-white">
                    {index % 2 === 0 ? "✦" : "◫"}
                  </div>
                  <div className="text-lg font-semibold text-white">{feature.title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/60">{feature.text}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-[#17191c] p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-white/90">Invite the bot to your server</div>
                <a
                  href={inviteUrl}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Invite bot
                </a>
              </div>

            </div>
            <UpdatesPanel clerkId={userId} />
          </div>
        </div>
      </div>
    </main>
  );
}