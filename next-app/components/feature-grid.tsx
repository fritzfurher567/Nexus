import { Ticket, TrendingUp, Settings } from "lucide-react";

const BAR_HEIGHTS = [30, 45, 38, 60, 50, 70, 55, 80, 95, 100];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 md:col-span-1">
        <p className="mb-1 text-xs text-muted-foreground">Server activity</p>
        <p className="mb-5 text-lg font-bold">Live, right as it happens.</p>
        <div className="mb-4 flex h-9 items-end gap-1.5">
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-sm ${i >= 8 ? "bg-primary" : "bg-primary/30"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          1,204 messages moderated today
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:col-span-1">
        <p className="mb-1 text-xs text-muted-foreground">Auto-moderation</p>
        <p className="mb-5 text-lg font-bold">On by default</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Spam & raid protection</span>
          <div className="relative h-6 w-[42px] rounded-full bg-foreground">
            <span className="absolute right-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-background" />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Every server gets this the moment you invite the bot — no config
          required.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 text-foreground">
          <Ticket className="h-4 w-4" />
        </div>
        <p className="mb-2 text-base font-bold">Ticket system</p>
        <p className="text-sm text-muted-foreground">
          Categories, priority levels, and transcripts saved automatically.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 text-foreground">
          <TrendingUp className="h-4 w-4" />
        </div>
        <p className="mb-2 text-base font-bold">Leveling & XP</p>
        <p className="text-sm text-muted-foreground">
          Custom rank cards and role rewards your members actually chase.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 text-foreground">
          <Settings className="h-4 w-4" />
        </div>
        <p className="mb-2 text-base font-bold">One dashboard</p>
        <p className="text-sm text-muted-foreground">
          Every setting lives on the web — no slash-command hunting.
        </p>
      </div>
    </div>
  );
}