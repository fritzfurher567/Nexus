"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function DataStoragePanel() {
  const variables = useQuery(api.customVariables.listForSelectedServer) ?? [];
  const addVariable = useMutation(api.customVariables.add);
  const removeVariable = useMutation(api.customVariables.remove);

  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [variableType, setVariableType] = useState("Text");
  const [defaultValue, setDefaultValue] = useState("");
  const [scope, setScope] = useState("Server Specific");
  const [error, setError] = useState("");

  async function handleAdd() {
    setError("");
    if (!name.trim() || !reference.trim()) {
      setError("Name and reference are required.");
      return;
    }
    try {
      await addVariable({ name, reference, variableType, defaultValue: defaultValue || undefined, scope });
      setName("");
      setReference("");
      setDefaultValue("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add variable");
    }
  }

  return (
    <section id="data-storage" className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f03f35] text-2xl">
            💾
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Data Storage</h2>
            <p className="text-sm text-white/60">
              Create custom variables to store data for your bot
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Data Storage</div>
        <h3 className="mt-1 text-lg font-semibold text-white">Stored Variables</h3>

        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50">
              <th className="pb-2 font-medium">Variable</th>
              <th className="pb-2 text-right font-medium">Scope</th>
            </tr>
          </thead>
          <tbody>
            {variables.length === 0 && (
              <tr>
                <td colSpan={2} className="py-4 text-white/40">
                  No custom variables yet.
                </td>
              </tr>
            )}
            {variables.map((v) => (
              <tr key={v._id} className="border-b border-white/5">
                <td className="py-3 text-white">
                  {v.name}{" "}
                  <span className="text-white/40">({`{${v.reference}}`})</span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-white/60">{v.scope}</span>
                  <button
                    onClick={() => removeVariable({ id: v._id })}
                    className="ml-4 text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1f2125] p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Data Storage</div>
        <h3 className="mt-1 text-lg font-semibold text-white">New Variable</h3>
        <p className="mt-1 text-sm text-white/60">
          Create a new custom variable. These can be used in your custom commands and events.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-white/80">Name</label>
            <p className="text-xs text-white/50">A descriptive name for this variable.</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">Reference</label>
            <p className="text-xs text-white/50">
              The variable tag used to reference this variable in your bot.
            </p>
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="{example}"
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">Variable Type</label>
            <select
              value={variableType}
              onChange={(e) => setVariableType(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
            >
              <option>Text</option>
              <option>Number</option>
              <option>True/False</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">Default Value</label>
            <input
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">Scope</label>
            <p className="text-xs text-white/50">
              Whether this variable should have different values based on the server/user/channel it's used in.
            </p>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2 text-sm text-white outline-none"
            >
              <option>Server Specific</option>
              <option>User Specific</option>
              <option>Channel Specific</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            onClick={handleAdd}
            className="rounded-lg bg-[#f03f35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d8362d]"
          >
            Add Custom Variable
          </button>
        </div>
      </div>
    </section>
  );
}