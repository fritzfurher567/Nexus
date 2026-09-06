"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const BOT_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID;
const inviteUrl = BOT_CLIENT_ID
  ? `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&scope=bot+applications.commands&permissions=8`
  : "#";

export function ServerSelector({ compact = false }: { compact?: boolean }) {
  const user = useQuery(api.users.getCurrentUser);
  const guilds = useQuery(api.guilds.list) ?? [];
  const selectServer = useMutation(api.users.selectServer);
  const [error, setError] = useState("");

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (!value) return;
    setError("");
    try {
      await selectServer({ serverId: value });
    } catch (selectionError) {
      setError(selectionError instanceof Error ? selectionError.message : "Unable to select server");
    }
  }

  if (compact) {
    return (
      <div className="mb-6">
        <label htmlFor="server-selector" className="sr-only">Select a server</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-black text-black">
            {user?.selectedServerName?.slice(0, 2).toUpperCase() ?? "NX"}
          </span>
          <select
            id="server-selector"
            value={user?.selectedServerId ?? ""}
            onChange={handleChange}
            className="w-full appearance-none rounded-lg border border-white/5 bg-[#222428] py-3 pl-12 pr-9 text-sm font-semibold text-white outline-none transition hover:bg-[#292b2f]"
          >
            <option value="">Select a server</option>
            {guilds.map((guild) => <option key={guild.guildId} value={guild.guildId}>{guild.name}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">⌄</span>
        </div>
        {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      </div>
    );
  }

  return (
    <section id="servers" className="mt-8 rounded-2xl border border-white/10 bg-[#17191c] p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Workspace</div>
          <h2 className="mt-2 text-xl font-semibold text-white">Select a server</h2>
          <p className="mt-1 text-sm text-white/55">Connect Nexus to a Discord server to manage it here.</p>
        </div>
        <a href={inviteUrl} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">
          Connect bot
        </a>
      </div>
      <select
        value={user?.selectedServerId ?? ""}
        onChange={handleChange}
        className="mt-4 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm text-white outline-none"
      >
        <option value="">Choose a connected server</option>
        {guilds.map((guild) => <option key={guild.guildId} value={guild.guildId}>{guild.name}</option>)}
      </select>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </section>
  );
}
