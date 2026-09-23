import type { Metadata } from "next";
import Link from "next/link";
import { companions, worlds, worldName } from "@/data/game";
import { RarityBadge, RarityLegend } from "@/components/rarity-badge";
import { EntityListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Anime Breaker companions: every verified card unit by world",
  description:
    "All verified Anime Breaker companions by world — Alien Card, Titan Card, Leaf Card, Sin Card and Hunter Card pools, with rarities, sources and what is still unverified.",
  alternates: { canonical: "/companions/" },
};

export default function CompanionsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <EntityListJsonLd
        name="Anime Breaker companions"
        path="companions"
        items={companions.map((c) => ({ name: c.name, slug: c.slug }))}
      />

      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Companions</h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Companions are your damage multiplier: card-gacha units that fight alongside
          you and scale into the late game. Each world has its own card station with its
          own pool. This list only prints names verified against gameplay —{" "}
          {companions.filter((c) => c.verified).length} of {companions.length} entries
          are multi-source verified, the rest are marked creator-reported.
        </p>
        <div className="mt-5">
          <RarityLegend />
        </div>
      </header>

      {worlds.map((w) => {
        const pool = companions.filter((c) => c.world === w.slug);
        return (
          <section key={w.slug} className="pb-12">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-sm font-medium">
                World {w.order} — {w.name}{" "}
                <span className="font-normal text-muted-foreground">· {w.card}</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                {w.cardCost ?? "spin cost unverified"}
                {w.cardPity ? ` · ${w.cardPity}` : ""}
              </p>
            </div>
            {pool.length > 0 ? (
              <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border">
                {pool.map((c) => (
                  <li key={c.slug} className="bg-card">
                    <Link
                      href={`/companions/${c.slug}/`}
                      className="flex flex-wrap items-center gap-3 p-4 transition-colors hover:bg-muted"
                    >
                      <RarityBadge rarity={c.rarity} />
                      <span className="font-medium">{c.name}</span>
                      {!c.verified && (
                        <span className="rounded-[4px] border border-dashed border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          creator-reported
                        </span>
                      )}
                      <span className="ml-auto text-right text-xs text-muted-foreground">
                        {c.source}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-[var(--radius-container)] border border-dashed border-border p-4 text-sm text-muted-foreground">
                The {w.card} pool is not published in any source we could verify. It
                stays empty here until gameplay footage or in-game checks fill it —
                rather than borrowing names from a generator.
              </p>
            )}
          </section>
        );
      })}

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">How companion rolls work</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="max-w-[62ch]">
            Cards are bought with Gold at each world&apos;s card station. The Alien Card
            costs 50 Gold per spin with a Legendary pity at 500 spins — the pity counter
            shows under the card.
          </li>
          <li className="max-w-[62ch]">
            Defeated enemies can also drop their avatar directly. The View Drops panel on
            each enemy shows the odds, and avatar drops are flagged &quot;Drops Only
            Once&quot;.
          </li>
          <li className="max-w-[62ch]">
            Fill every team slot before upgrading — three mid-tier bodies out-damage one
            lonely top-tier pull.
          </li>
          <li className="max-w-[62ch]">
            A new world&apos;s common units often outclass your old world&apos;s rares.
            Push the portal when your team clears the toughest regular enemy without
            potion support.
          </li>
        </ul>
      </section>
    </div>
  );
}
