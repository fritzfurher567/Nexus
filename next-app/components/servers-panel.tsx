"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ServersPanel() {
  const guilds = useQuery(api.guilds.list) ?? [];
  const requestLeave = useMutation(api.guilds.requestLeave);
  const [search, setSearch] = useState("");
  const [leaveById, setLeaveById] = useState("");
  const [showLeaveById, setShowLeaveById] = useState(false);
  const [error, setError] = useState("");

  const filtered = guilds.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleLeave(guildId: string) {
    setError("");
    try {
      await requestLeave({ guildId });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to leave server");
    }
  }

  return (
    <section id="servers" className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5865F2] text-2xl">
            🎮
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Servers</h2>
            <p className="text-sm text-white/60">
              The servers your bot is currently active in
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Servers</div>
        <h3 className="mt-1 text-xl font-semibold text-white">
          Active Servers ({guilds.length})
        </h3>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search servers..."
        className="mt-4 w-full rounded-xl border border-white/10 bg-[#0d0e10] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#f03f35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d8362d]"
        >
          Refresh
        </button>
        <button
          onClick={() => setShowLeaveById((v) => !v)}
          className="rounded-lg border border-white/10 bg-[#222428] px-4 py-2.5 text-sm font-semibold text-white/90 hover:bg-[#292b2f]"
        >
          Leave by ID
        </button>
      </div>

      {showLeaveById && (
        <div className="mt-3 flex gap-2">
          <input
            value={leaveById}
            onChange={(e) => setLeaveById(e.target.value)}
            placeholder="Server ID"
            className="flex-1 rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
          />
          <button
            onClick={() => leaveById && handleLeave(leaveById)}
            className="rounded-lg bg-[#f03f35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d8362d]"
          >
            Leave
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-4 space-y-3">
        {filtered.map((guild) => (
          <div
            key={guild.guildId}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d0e10] p-4"
          >
            <div>
              <p className="font-semibold text-white">{guild.name}</p>
              <p className="text-sm text-white/50">{guild.guildId}</p>
            </div>
            <button
              onClick={() => handleLeave(guild.guildId)}
              className="rounded-lg bg-[#f03f35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d8362d]"
            >
              Leave
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}