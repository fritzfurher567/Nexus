"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days >= 30) return `${Math.floor(days / 30)} months ago`;
  if (days >= 1) return `${days} days ago`;
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return `${hours} hours ago`;
  return "just now";
}

export function ErrorLogsPanel() {
  const logs = useQuery(api.errorLogs.list) ?? [];

  return (
    <section id="error-logs" className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f03f35] text-2xl">
            ⚠️
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Error Logs</h2>
            <p className="text-sm text-white/60">Your bot's API error logs</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Errors</div>
        <h3 className="mt-1 text-lg font-semibold text-white">Error Logs</h3>

        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50">
              <th className="pb-2 pr-4 font-medium">Timestamp</th>
              <th className="pb-2 pr-4 font-medium">Action</th>
              <th className="pb-2 pr-4 font-medium">Error Message</th>
              <th className="pb-2 pr-4 font-medium">Module</th>
              <th className="pb-2 text-right font-medium">Guild Id</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-white/40">
                  No errors logged.
                </td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log._id} className="border-b border-white/5">
                <td className="py-3 pr-4 text-white/80">{timeAgo(log.timestamp)}</td>
                <td className="py-3 pr-4 text-white">{log.action}</td>
                <td className="py-3 pr-4 text-white/70">{log.errorMessage}</td>
                <td className="py-3 pr-4 text-white/70">{log.module}</td>
                <td className="py-3 text-right text-white/50">{log.guildId ?? "No Guild"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}