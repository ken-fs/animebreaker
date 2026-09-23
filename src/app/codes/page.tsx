import type { Metadata } from "next";
import { codes, verifiedCodes, reportedCodes, redeemSteps } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Anime Breaker codes (${codes.length} working, September 2026)`,
  description:
    "All working Anime Breaker codes with verification dates: free Emeralds, potion sets and Currency Boxes. Verified codes cross-checked against multiple trackers, plus the newest creator-reported ones.",
  alternates: { canonical: "/codes/" },
};

const TIER_LABEL: Record<string, string> = {
  feature: "Feature & compensation",
  milestone: "Milestone",
  emeralds: "Pure emeralds",
  launch: "Launch",
};

export default function CodesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <FaqJsonLd
        items={[
          {
            q: "How do I redeem codes in Anime Breaker?",
            a: "Finish the tutorial, open the Shop, then click the small ticket icon at the bottom-left next to the F2P Info button. Enter the code exactly as written.",
          },
          {
            q: "Why is my Anime Breaker code not working?",
            a: "Codes are case-sensitive and rotate out without warning. If a verified code is rejected, it has likely just expired — the last-checked date on each row tells you when it was last confirmed working.",
          },
          {
            q: "Where do new Anime Breaker codes come from?",
            a: "The developer posts them in the official Discord's game-codes channel first, usually to mark milestones (visits, favorites, player counts) and updates.",
          },
        ]}
      />

      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Breaker codes
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          {verifiedCodes.length} codes verified against multiple trackers on the current
          build, plus {reportedCodes.length} newer ones seen redeemed in creator footage.
          Together the verified set is worth roughly 3,050 Emeralds, four Currency Boxes
          and 60+ potions.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">
          Verified <span className="text-muted-foreground">· last checked 2026-09-19</span>
        </h2>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border">
          {verifiedCodes.map((c) => (
            <li key={c.code} className="flex flex-wrap items-center gap-3 bg-card p-4">
              <code className="font-mono text-sm font-semibold">{c.code}</code>
              <CopyCode code={c.code} />
              <span className="text-xs text-muted-foreground">{TIER_LABEL[c.tier]}</span>
              <span className="ml-auto text-sm text-muted-foreground">{c.reward}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">
          Creator-reported{" "}
          <span className="text-muted-foreground">
            · seen redeemed on video, not yet cross-checked
          </span>
        </h2>
        <p className="mt-1 max-w-[62ch] text-sm text-muted-foreground">
          These come from Update 1 / 1.5 footage. They were working when recorded; try
          them, and treat a rejection as expiry rather than a typo.
        </p>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border">
          {reportedCodes.map((c) => (
            <li key={c.code} className="flex flex-wrap items-center gap-3 bg-card p-4">
              <code className="font-mono text-sm font-semibold">{c.code}</code>
              <CopyCode code={c.code} />
              <span className="rounded-[4px] border border-dashed border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                reported
              </span>
              <span className="ml-auto text-sm text-muted-foreground">{c.reward}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">How to redeem</h2>
        <ol className="mt-4 space-y-2.5">
          {redeemSteps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="font-mono text-xs text-foreground tabular">{i + 1}.</span>
              <span className="max-w-[62ch]">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">What the rewards are worth</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Emeralds are the premium currency — they buy companion rolls and speed up
          progression, and codes are the main free source. Spend them on card rolls once
          you know which companions matter, and pop a Luck potion before a rolling
          session. A strong companion is worth more than a week of consumables.
        </p>
      </section>
    </div>
  );
}
