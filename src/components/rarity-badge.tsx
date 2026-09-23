import { RARITY_ORDER } from "@/data/game";

/**
 * Rarity badge.
 *
 * Rarity is ordinal and correlates with power, so it uses the sequential ink
 * ramp rather than the red/orange/yellow rainbow every other anime game site
 * ships. Darker ink means rarer. The word is the label, the ink is the data.
 */
export function RarityBadge({ rarity }: { rarity: string | null }) {
  if (!rarity) {
    return (
      <span
        className="inline-flex h-6 shrink-0 items-center rounded-[4px] px-2 font-mono text-[11px] font-semibold"
        style={{ border: "1px dashed var(--border)", color: "var(--muted-foreground)" }}
        title="Rarity not published"
      >
        ?
      </span>
    );
  }
  const idx = Math.max(0, RARITY_ORDER.indexOf(rarity));
  // Map 6 rarities onto the 6-step ink ramp.
  const vars = [
    "var(--tier-d)",
    "var(--tier-c)",
    "var(--tier-b)",
    "var(--tier-a)",
    "var(--tier-s)",
    "var(--tier-splus)",
  ];
  return (
    <span
      className="inline-flex h-6 shrink-0 items-center rounded-[4px] px-2 font-mono text-[11px] font-semibold"
      style={{ background: vars[idx], color: "var(--background)" }}
      title={`${rarity} rarity`}
    >
      {rarity}
    </span>
  );
}

/** Rarity legend, used once per page that shows badges. */
export function RarityLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span>Ink density tracks rarity:</span>
      <span className="flex items-center gap-1.5">
        <RarityBadge rarity="Broken" /> rarest
      </span>
      <span className="text-border" aria-hidden="true">
        /
      </span>
      <span className="flex items-center gap-1.5">
        <RarityBadge rarity="Rare" /> commonest
      </span>
    </div>
  );
}
