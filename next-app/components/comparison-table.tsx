import { Check, X } from "lucide-react";

type Row = {
  feature: string;
  us: boolean;
  mee6: boolean;
  dyno: boolean;
  carlbot: boolean;
  ghostbot: boolean;
  multex: boolean;
};

const ROWS: Row[] = [
  { feature: "Auto-moderation", us: true, mee6: true, dyno: true, carlbot: true, ghostbot: true, multex: true },
  { feature: "Ticket system with categories", us: true, mee6: true, dyno: true, carlbot: true, ghostbot: true, multex: false },
  { feature: "Leveling & XP", us: true, mee6: true, dyno: false, carlbot: true, ghostbot: true, multex: false },
  { feature: "Reaction roles", us: true, mee6: true, dyno: true, carlbot: true, ghostbot: true, multex: false },
  { feature: "Music & fun commands", us: true, mee6: true, dyno: false, carlbot: true, ghostbot: true, multex: false },
  { feature: "Web dashboard included free", us: true, mee6: true, dyno: true, carlbot: true, ghostbot: true, multex: true },
  { feature: "Roblox rank sync & restriction roles", us: true, mee6: false, dyno: false, carlbot: false, ghostbot: false, multex: true },
  { feature: "200+ commands out of the box", us: true, mee6: false, dyno: false, carlbot: false, ghostbot: false, multex: false },
];

function Mark({ value }: { value: boolean }) {
  return value ? (
    <Check className="h-4 w-4 text-foreground" strokeWidth={3} />
  ) : (
    <X className="h-4 w-4 text-muted-foreground/40" />
  );
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-card">
            <th className="px-5 py-4 text-left font-semibold text-muted-foreground">
              Feature
            </th>
            <th className="bg-foreground/5 px-5 py-4 text-left font-semibold text-foreground">
              Nexus
            </th>
            <th className="px-5 py-4 text-left font-semibold text-muted-foreground">
              MEE6
            </th>
            <th className="px-5 py-4 text-left font-semibold text-muted-foreground">
              Dyno
            </th>
            <th className="px-5 py-4 text-left font-semibold text-muted-foreground">
              Carl-bot
            </th>
            <th className="px-5 py-4 text-left font-semibold text-muted-foreground">
              Bot Ghost
            </th>
            <th className="px-5 py-4 text-left font-semibold text-muted-foreground">
              Multex
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.feature} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-5 py-4 text-foreground">{row.feature}</td>
              <td className="bg-foreground/5 px-5 py-4"><Mark value={row.us} /></td>
              <td className="px-5 py-4"><Mark value={row.mee6} /></td>
              <td className="px-5 py-4"><Mark value={row.dyno} /></td>
              <td className="px-5 py-4"><Mark value={row.carlbot} /></td>
              <td className="px-5 py-4"><Mark value={row.ghostbot} /></td>
              <td className="px-5 py-4"><Mark value={row.multex} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}