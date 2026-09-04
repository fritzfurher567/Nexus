"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const commandBlocks = {
  Options: ["Text input", "Number input", "User input", "Role input", "Channel input", "Boolean option", "Choice option", "Attachment input", "Date input"],
  Actions: ["Send message", "Send embed", "Edit message", "Delete message", "Add reaction", "Create thread", "Create channel", "Add role", "Remove role", "Timeout member", "Ban member", "Kick member", "Log to channel", "Wait", "Run command"],
  Conditions: ["If / else", "Member has role", "User is server owner", "Channel is", "Value equals", "Value contains", "Bot has permission", "Cooldown check", "Random chance"],
  Variables: ["Set variable", "Get variable", "Increment number", "Store user data", "Store server data", "Format date", "Parse text"],
};

const eventGroups = {
  "Member events": ["Member joins", "Member leaves", "Member is updated", "Member is banned", "Member is unbanned", "Member is timed out"],
  "Message events": ["Message sent", "Message edited", "Message deleted", "Message reaction added", "Message reaction removed"],
  "Channel events": ["Channel created", "Channel updated", "Channel deleted", "Thread created", "Thread archived"],
  "Role events": ["Role created", "Role updated", "Role deleted", "Member role added", "Member role removed"],
  "Voice events": ["Member joins voice", "Member leaves voice", "Member changes voice state"],
  "Server events": ["Server updated", "Server boost added", "Server boost removed", "Invite created", "Invite deleted"],
  "Scheduled events": ["Scheduled event created", "Scheduled event started", "Scheduled event ended", "Scheduled event cancelled"],
  "Moderation events": ["Auto moderation action", "Audit log entry created", "Application command permissions updated"],
};

type BuilderType = "command" | "event" | "message";

export function BuilderScreen({ type }: { type: BuilderType }) {
  if (type === "command") return <CommandBuilder />;
  if (type === "event") return <EventBuilder />;
  return <MessageBuilder />;
}

function BuilderShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#111216] text-white">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#17191c] px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Nexus builder</p>
          <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm text-white/50">{subtitle}</p>
        </div>
        <a href="/dashboard" className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">Back to dashboard</a>
      </header>
      {children}
    </main>
  );
}

function CommandBuilder() {
  const [tab, setTab] = useState<keyof typeof commandBlocks>("Actions");
  const [search, setSearch] = useState("");
  const [blocks, setBlocks] = useState<string[]>(["Command trigger"]);
  const visibleBlocks = commandBlocks[tab].filter((block) => block.toLowerCase().includes(search.toLowerCase()));

  return (
    <BuilderShell title="Command Builder" subtitle="Build a command by connecting simple blocks.">
      <div className="grid min-h-[calc(100vh-112px)] lg:grid-cols-[340px_1fr]">
        <aside className="border-r border-white/10 bg-[#17191c] p-5">
          <div className="flex gap-1 rounded-lg bg-black/20 p-1">
            {(Object.keys(commandBlocks) as Array<keyof typeof commandBlocks>).map((name) => (
              <button key={name} onClick={() => setTab(name)} className={`flex-1 rounded-md px-2 py-2 text-xs ${tab === name ? "bg-white text-black" : "text-white/55 hover:text-white"}`}>{name}</button>
            ))}
          </div>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search blocks" className="mt-4 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm outline-none placeholder:text-white/35" />
          <div className="mt-5 space-y-2">
            {visibleBlocks.map((block) => (
              <button key={block} onClick={() => setBlocks((current) => [...current, block])} className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-white/75 hover:border-white/30 hover:bg-white/[0.06]">{block}<span className="float-right text-white/35">+</span></button>
            ))}
          </div>
        </aside>
        <section className="p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div><p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Flow</p><h2 className="mt-1 text-xl font-semibold">New command</h2></div>
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">Save command</button>
          </div>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {blocks.map((block, index) => (
              <div key={`${block}-${index}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1d21] p-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">{index + 1}</span>
                <div className="flex-1"><p className="font-medium">{block}</p><p className="mt-1 text-xs text-white/45">{index === 0 ? "Starts when a user runs the command." : "Configure this block in the next step."}</p></div>
                {index > 0 && <button onClick={() => setBlocks((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="text-xs text-white/40 hover:text-red-300">Remove</button>}
              </div>
            ))}
            <div className="rounded-xl border border-dashed border-white/15 p-5 text-center text-sm text-white/40">Select a block from the library to extend this command.</div>
          </div>
        </section>
      </div>
    </BuilderShell>
  );
}

function EventBuilder() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const filteredGroups = useMemo(() => Object.entries(eventGroups).map(([group, events]) => [group, events.filter((event) => event.toLowerCase().includes(search.toLowerCase()))] as const).filter(([, events]) => events.length), [search]);

  return (
    <BuilderShell title="Event Builder" subtitle="Choose an event and define what Nexus should do next.">
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Trigger</p><h2 className="mt-1 text-xl font-semibold">Select an event</h2></div><button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">Save event</button></div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events" className="mt-6 w-full rounded-lg border border-white/10 bg-[#17191c] px-4 py-3 text-sm outline-none placeholder:text-white/35" />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filteredGroups.map(([group, events]) => <section key={group} className="rounded-xl border border-white/10 bg-[#17191c] p-4"><h3 className="text-sm font-semibold text-white/80">{group}</h3><div className="mt-3 space-y-2">{events.map((event) => <button key={event} onClick={() => setSelected(event)} className={`w-full rounded-lg border p-3 text-left text-sm ${selected === event ? "border-white bg-white/10 text-white" : "border-white/10 text-white/65 hover:bg-white/[0.04]"}`}>{event}</button>)}</div></section>)}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-[#17191c] p-5"><p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Selected trigger</p><p className="mt-2 text-white/80">{selected || "Choose an event above"}</p></div>
      </div>
    </BuilderShell>
  );
}

function MessageBuilder() {
  const user = useQuery(api.users.getCurrentUser);
  const createAction = useMutation(api.botActions.create);
  const [title, setTitle] = useState("New message");
  const [description, setDescription] = useState("Write a clear message for your community.");
  const [color, setColor] = useState("#5865f2");
  const [footer, setFooter] = useState("");
  const [channelId, setChannelId] = useState("");
  const [status, setStatus] = useState("");

  async function saveMessage() {
    if (!user?.selectedServerId) {
      setStatus("Select a server on the dashboard first.");
      return;
    }
    if (!channelId.trim()) {
      setStatus("Enter the Discord channel ID.");
      return;
    }
    setStatus("Queued for the bot...");
    try {
      await createAction({
        serverId: user.selectedServerId,
        type: "send_embed",
        payload: { channel_id: channelId.trim(), title, description, color: Number.parseInt(color.slice(1), 16), footer },
      });
      setStatus("Queued successfully. The bot will send it shortly.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to queue message");
    }
  }

  return (
    <BuilderShell title="Message Builder" subtitle="Create reusable Discord embeds with a live preview.">
      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-xl border border-white/10 bg-[#17191c] p-5">
          <div className="flex items-center justify-between"><div><p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Content</p><h2 className="mt-1 text-xl font-semibold">Embed editor</h2></div><button onClick={saveMessage} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">Save message</button></div>
          <label className="mt-6 block text-xs text-white/50">Title<input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm outline-none" /></label>
          <label className="mt-4 block text-xs text-white/50">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={6} className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm outline-none" /></label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-xs text-white/50">Accent color<input type="color" value={color} onChange={(event) => setColor(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#0d0e10] p-1" /></label><label className="block text-xs text-white/50">Footer<input value={footer} onChange={(event) => setFooter(event.target.value)} placeholder="Optional footer text" className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm outline-none placeholder:text-white/35" /></label></div>
          <label className="mt-4 block text-xs text-white/50">Discord channel ID<input value={channelId} onChange={(event) => setChannelId(event.target.value)} placeholder="Right-click a channel and choose Copy ID" className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e10] px-3 py-2.5 text-sm outline-none placeholder:text-white/35" /></label>
          {status && <p className="mt-3 text-xs text-white/55">{status}</p>}
        </section>
        <section className="h-fit rounded-xl border border-white/10 bg-[#17191c] p-5"><p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Live preview</p><div className="mt-4 rounded-lg border-l-4 bg-[#23252a] p-4" style={{ borderLeftColor: color }}><h3 className="font-semibold text-white">{title || "Untitled message"}</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/70">{description || "Your message preview will appear here."}</p>{footer && <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/40">{footer}</p>}</div></section>
      </div>
    </BuilderShell>
  );
}
