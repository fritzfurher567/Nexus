"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function StatusPanel() {
  const status = useQuery(api.botStatus.get);
  const save = useMutation(api.botStatus.save);

  const [mode, setMode] = useState("fixed");
  const [activityType, setActivityType] = useState("watching");
  const [texts, setTexts] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status) {
      setMode(status.mode);
      setActivityType(status.activityType);
      setTexts(status.texts.length ? status.texts : [""]);
    }
  }, [status]);

  async function handleSave() {
    setSaving(true);
    await save({ mode, activityType, texts: texts.filter((t) => t.trim() !== "") });
    setSaving(false);
  }

  return (
    <section id="status" className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f03f35] text-2xl">
            📶
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Status</h2>
            <p className="text-sm text-white/60">Change the status of your bot</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Status</div>
        <h3 className="mt-1 text-lg font-semibold text-white">Status Mode</h3>
        <p className="mt-1 text-sm text-white/60">Select either a fixed or rotating status message.</p>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="mt-4 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm text-white outline-none"
        >
          <option value="fixed">Fixed</option>
          <option value="rotating">Rotating</option>
        </select>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Status</div>
        <h3 className="mt-1 text-lg font-semibold text-white">Status Settings</h3>

        <div className="mt-4">
          <label className="text-sm font-medium text-white/80">Status Type</label>
          <p className="text-xs text-white/50">Select the activity type for your status.</p>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm text-white outline-none"
          >
            <option value="playing">Playing</option>
            <option value="watching">Watching</option>
            <option value="listening">Listening</option>
            <option value="competing">Competing</option>
          </select>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-white/80">
            {mode === "rotating" ? "Status Texts" : "Status Text"}
          </label>
          <p className="text-xs text-white/50">
            Customize your status text. Use {"{servers}"} to show your live server count.
          </p>

          <div className="mt-2 space-y-2">
            {texts.map((text, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => {
                    const next = [...texts];
                    next[i] = e.target.value;
                    setTexts(next);
                  }}
                  placeholder="{servers} servers"
                  className="flex-1 rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
                />
                {mode === "rotating" && texts.length > 1 && (
                  <button
                    onClick={() => setTexts(texts.filter((_, idx) => idx !== i))}
                    className="rounded-lg border border-white/10 px-3 text-sm text-white/60 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {mode === "rotating" && (
              <button
                onClick={() => setTexts([...texts, ""])}
                className="text-sm text-white/60 hover:text-white"
              >
                + Add another status
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 rounded-lg bg-[#f03f35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d8362d] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
}