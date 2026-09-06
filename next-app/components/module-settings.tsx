"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const MODULES = [
  { id: "moderation_plus", name: "Moderation Plus", description: "Extra moderation, anti-raid, role, appeal, and filter commands." },
  { id: "community", name: "Community", description: "Reaction roles, suggestions, giveaways, starboard, birthdays, tags, and more." },
  { id: "economy_games", name: "Economy & Games", description: "Economy, polls, social, reputation, mini-games, and fun commands." },
  { id: "roblox_staff", name: "Roblox & Staff", description: "Roblox verification, rank management, group operations, and duty tools." },
  { id: "server_tools", name: "Server Tools", description: "Scheduling, social alerts, server utilities, activity, and quotes." },
];

export function ModuleSettings() {
  const settings = useQuery(api.guildSettings.getForSelectedServer);
  const save = useMutation(api.guildSettings.saveForSelectedServer);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const enabled = new Set(settings?.enabledModules ?? []);

  async function toggle(moduleId: string) {
    if (!settings || saving) return;
    const next = new Set(enabled);
    if (next.has(moduleId)) next.delete(moduleId);
    else next.add(moduleId);
    setSaving(true);
    setMessage("Saving and notifying the bot…");
    try {
      await save({ enabledModules: [...next] });
      setMessage("Saved. Nexus will update this server's optional commands in a few seconds.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save module settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section id="modules" className="mt-8 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Command modules</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Customize this server</h2>
      <p className="mt-2 text-sm text-white/60">Core commands stay available. Turn on optional modules only when this server needs them.</p>
      {!settings ? <p className="mt-5 text-sm text-white/50">Select a connected server to manage its optional commands.</p> : (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {MODULES.map((module) => <button key={module.id} disabled={saving} onClick={() => toggle(module.id)} className={`rounded-xl border p-4 text-left transition ${enabled.has(module.id) ? "border-white bg-white/10" : "border-white/10 bg-black/10 hover:bg-white/[0.04]"}`}>
            <div className="flex items-center justify-between gap-3"><span className="font-semibold text-white">{module.name}</span><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${enabled.has(module.id) ? "bg-white text-black" : "bg-white/10 text-white/60"}`}>{enabled.has(module.id) ? "ON" : "OFF"}</span></div>
            <p className="mt-2 text-sm leading-5 text-white/55">{module.description}</p>
          </button>)}
        </div>
      )}
      {message && <p className="mt-4 text-sm text-white/60">{message}</p>}
    </section>
  );
}
