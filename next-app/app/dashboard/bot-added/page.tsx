"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function BotAddedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectServer = useMutation(api.users.selectServer);
  const [status, setStatus] = useState<"working" | "error">("working");

  useEffect(() => {
    const guildId = searchParams.get("guild_id");

    if (!guildId) {
      setStatus("error");
      return;
    }

    (async () => {
      try {
        // A brief delay gives the bot's on_guild_join report a moment
        // to reach Convex before we try to select the server — without
        // this, selectServer might run before the guild row exists.
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await selectServer({ serverId: guildId });
        router.replace("/dashboard");
      } catch (err) {
        console.error("Failed to auto-select the new server:", err);
        setStatus("error");
      }
    })();
  }, [searchParams, selectServer, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      {status === "working" ? (
        <p className="text-muted-foreground">Setting up your server...</p>
      ) : (
        <div>
          <p className="font-semibold">Couldn&apos;t automatically select your server</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Head to your dashboard and pick it from the list instead.
          </p>
        </div>
      )}
    </main>
  );
}