"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const OWNER_CLERK_ID = "user_3IkffAb07HuHo7yRu6mZvckvkCK";

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-white/10 px-1.5 py-0.5 text-fuchsia-200">{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

function Markdown({ content }: { content: string }) {
  return (
    <div className="space-y-2 text-sm leading-6 text-white/70">
      {content.split(/\r?\n/).map((line, index) => {
        if (!line.trim()) return <div key={index} className="h-1" />;
        if (line.startsWith("### ")) return <h4 key={index} className="font-semibold text-white">{renderInline(line.slice(4))}</h4>;
        if (line.startsWith("## ")) return <h3 key={index} className="text-lg font-semibold text-white">{renderInline(line.slice(3))}</h3>;
        if (line.startsWith("# ")) return <h2 key={index} className="text-xl font-semibold text-white">{renderInline(line.slice(2))}</h2>;
        if (line.startsWith("- ")) return <div key={index} className="pl-4 before:mr-2 before:text-fuchsia-300 before:content-['•']">{renderInline(line.slice(2))}</div>;
        return <p key={index}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

function CommandReferenceContent({ content }: { content: string }) {
  return (
    <div className="max-h-[65vh] space-y-5 overflow-auto pr-2">
      {content.split(/\r?\n/).map((line, index) => {
        if (line.startsWith("# ")) {
          return <h3 key={index} className="text-lg font-semibold text-white">{line.slice(2)}</h3>;
        }
        if (line.startsWith("## ")) {
          return <h4 key={index} className="border-b border-white/10 pb-2 text-sm font-semibold text-fuchsia-200">{line.slice(3)}</h4>;
        }
        if (line.startsWith("- ")) {
          const command = line.slice(2).replace(/\*\*/g, "");
          const separator = command.indexOf(" — ");
          const name = separator === -1 ? command : command.slice(0, separator);
          const description = separator === -1 ? "" : command.slice(separator + 3);
          return (
            <div key={index} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <code className="text-xs font-semibold text-white">{name}</code>
              {description && <p className="mt-1 text-xs leading-5 text-white/55">{description}</p>}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export function ToolsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111216] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-300">Nexus tools</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Quick tools</h2>
          </div>
          <button suppressHydrationWarning onClick={onClose} className="rounded-lg px-2 py-1 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Close tools">×</button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Command lookup", "Setup wizard", "Message builder", "Server diagnostics"].map((tool) => (
            <div key={tool} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80">{tool}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolsTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button suppressHydrationWarning onClick={() => setOpen(true)} className="text-white/70 hover:text-white">Tools</button>
      {open && <ToolsModal onClose={() => setOpen(false)} />}
    </>
  );
}

export function AllCommandsTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        suppressHydrationWarning
        onClick={() => setOpen(true)}
        className="text-white/70 hover:text-white"
      >
        All commands
      </button>
      {open && <CommandModal onClose={() => setOpen(false)} />}
    </>
  );
}

function CommandModal({ onClose }: { onClose: () => void }) {
  const [commands, setCommands] = useState("");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/commands.md")
      .then((response) => {
        if (!response.ok) throw new Error("Command reference unavailable");
        return response.text();
      })
      .then((content) => {
        if (active) setCommands(content);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="commands-title"
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111216] p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Reference</p>
            <h2 id="commands-title" className="mt-1 text-xl font-semibold text-white">All commands</h2>
          </div>
          <button
            suppressHydrationWarning
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl leading-none text-white/45 hover:bg-white/10 hover:text-white"
            aria-label="Close all commands"
          >
            ×
          </button>
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
          {loadError ? (
            <p className="text-sm text-red-300">Unable to load the command reference.</p>
          ) : commands ? (
            <CommandReferenceContent content={commands} />
          ) : (
            <p className="text-sm text-white/50">Loading command reference...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function UpdatesPanel({ clerkId }: { clerkId: string }) {
  const updates = useQuery(api.updates.list) ?? [];
  const createUpdate = useMutation(api.updates.create);
  const isOwner = clerkId === OWNER_CLERK_ID;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function publish() {
    setError("");
    try {
      await createUpdate({ title, content });
      setTitle("");
      setContent("");
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Unable to publish update");
    }
  }

  return (
    <section id="updates" className="mt-10 grid gap-5 xl:grid-cols-[1fr_360px]">
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">News</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Latest updates</h2>
        <div className="mt-5 space-y-4">
          {updates.length === 0 ? <div className="rounded-2xl border border-white/10 bg-[#1f2125] p-5 text-sm text-white/50">No updates posted yet.</div> : updates.map((update) => (
            <article key={update._id} className="rounded-2xl border border-white/10 bg-[#1f2125] p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{update.title}</h3>
                <time className="text-xs text-white/40">{new Date(update.createdAt).toLocaleDateString()}</time>
              </div>
              <div className="mt-3"><Markdown content={update.content} /></div>
            </article>
          ))}
        </div>
      </div>
      {isOwner && (
        <div className="h-fit rounded-2xl border border-fuchsia-300/20 bg-[#21182b] p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-300">Owner panel</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Post an update</h3>
          <input suppressHydrationWarning value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Update title" className="mt-5 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35" />
          <textarea suppressHydrationWarning value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write Markdown here..." rows={8} className="mt-3 w-full resize-y rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35" />
          {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
          <button suppressHydrationWarning onClick={publish} className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">Publish update</button>
        </div>
      )}
    </section>
  );
}
