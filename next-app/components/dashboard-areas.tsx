import Link from "next/link";

export function DashboardAreas() {
  return (
    <>
      <section id="settings" className="mt-10 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Settings</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Server settings</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">Choose a server from the selector, then manage its enabled modules, stored variables, and bot actions from their dedicated areas below.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="#modules" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Command modules</a>
          <a href="#data-storage" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Data storage</a>
          <Link href="/setup" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90">Run setup bot</Link>
        </div>
      </section>

      <section id="botpanel" className="mt-10 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">BotPanel</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Build and send</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">Use the builders to prepare bot actions. The message builder queues a Discord embed for the selected server; the bot must be deployed and connected to process it.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/dashboard/builders/command" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Command builder</Link>
          <Link href="/dashboard/builders/event" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Event builder</Link>
          <Link href="/dashboard/builders/message" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90">Message builder</Link>
        </div>
      </section>

      <section id="premium" className="mt-10 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Premium</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Premium is not configured yet</h2>
        <p className="mt-2 text-sm text-white/60">Payments and premium entitlement checks have not been built. This area is intentionally informational until Stripe and the premium feature model are ready.</p>
      </section>

      <section id="free-premium" className="mt-10 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Free Premium</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Founder access</h2>
        <p className="mt-2 text-sm text-white/60">Founder rewards need a verified eligibility rule before this can grant anything. It is separated here so it does not appear to provide an entitlement it cannot yet verify.</p>
      </section>
    </>
  );
}
