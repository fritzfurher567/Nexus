import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { AllCommandsTrigger, ToolsTrigger } from "@/components/dashboard-widgets";
import { OnboardingGuard } from "@/components/onboarding-guard";
import { ServerSelector } from "@/components/server-selector";

const BOT_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID;

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Modules", href: "/dashboard/modules" },
  { label: "Premium", href: "/dashboard/premium" },
  { label: "BotPanel", href: "/dashboard/bot-panel" },
  { label: "Free Premium", href: "/dashboard/premium" },
];

const settingsItems = [
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Invite", href: "/dashboard/invite" },
  { label: "Data Storage", href: "/dashboard/data-storage" },
  { label: "Servers", href: "/dashboard/servers" },
  { label: "Status", href: "/dashboard/status" },
  { label: "Error Logs", href: "/dashboard/error-logs" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
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
              <Link href="/dashboard/tutorials" className="hover:text-white">
                Tutorials
              </Link>
              <ToolsTrigger />
              <AllCommandsTrigger />
              <Link href="/dashboard/updates" className="hover:text-white">
                Updates
              </Link>
              <Link href="/dashboard/docs" className="hover:text-white">
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

          <div className="flex-1 bg-[#181a1e] p-6">{children}</div>
        </div>
      </div>
    </main>
  );
}