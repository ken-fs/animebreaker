import type { Metadata } from "next";
import Link from "next/link";
import { worlds } from "@/data/game";

export const metadata: Metadata = {
  title: "Anime Breaker beginner guide: fastest start to your first raid",
  description:
    "The Anime Breaker early game in order — Energy loop, first card rolls, team building, ranks, the first secret boss, and what to do in your first hour.",
  alternates: { canonical: "/guide/" },
};

export default function GuidePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Beginner guide
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Anime Breaker is a clicker-collector: tap to build Energy, spend Gold on
          companion cards, break the portal at the end of each world. This is the
          route that wastes the least time.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">The first hour</h2>
        <ol className="mt-4 space-y-3">
          {[
            "Redeem every code first — the verified set is worth ~3,050 Emeralds and 60+ potions, which is the cheapest power spike in the game. The redeem box hides behind the ticket icon at the bottom-left of the Shop.",
            "Spend the Emeralds on Alien Card rolls (50 Gold per spin, Legendary pity at 500). Fill every team slot before upgrading anything — three mid-tier companions out-damage one lonely rare.",
            "Pop a Luck potion before a rolling session, and pause potion timers while you travel or reorganize.",
            "Kill the World 1 secret boss, Vegeta, as soon as you can — his accessory drops at 100% and every kill re-rolls its rarity.",
            "Rank up when the bar fills. Ranking resets your Energy but raises your multiplier, so it is always worth it.",
          ].map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="font-mono text-xs text-foreground tabular">{i + 1}.</span>
              <span className="max-w-[62ch]">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">The world ladder</h2>
        <p className="mt-1 max-w-[62ch] text-sm text-muted-foreground">
          Push to the next world when your team clears the current world&apos;s toughest
          regular enemy without potion support. A new world&apos;s common units often
          outclass your old world&apos;s rares.
        </p>
        <ol className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border">
          {worlds.map((w) => (
            <li key={w.slug} className="bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">
                  <span className="mr-2 font-mono text-xs text-muted-foreground tabular">
                    W{w.order}
                  </span>
                  {w.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {w.theme}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">Boss: {w.boss}</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {w.systems.join(" · ")}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Habits that compound</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="max-w-[62ch]">
            Check each enemy&apos;s View Drops panel before farming it — avatars, Race
            Coins and raid tickets all come from specific NPCs.
          </li>
          <li className="max-w-[62ch]">
            Level the avatar you have equipped by defeating its matching NPC. The Index
            pays permanent +5% Energy and +5% Damage per world for completing its
            entries.
          </li>
          <li className="max-w-[62ch]">
            Farm the World 2 secret boss Levi until his 12x Energy avatar drops — it is
            one of the biggest single upgrades in the game.
          </li>
          <li className="max-w-[62ch]">
            Save raid tickets until your damage can turn a run into meaningful wave
            rewards; tickets are the scarcest currency.
          </li>
        </ul>
      </section>

      <section className="border-t rule py-10">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/codes/"
            className="inline-flex h-9 items-center rounded-[var(--radius-control)] border rule bg-card px-4 text-sm transition-colors hover:bg-muted"
          >
            All codes
          </Link>
          <Link
            href="/bosses/"
            className="inline-flex h-9 items-center rounded-[var(--radius-control)] border rule bg-card px-4 text-sm transition-colors hover:bg-muted"
          >
            Secret boss locations
          </Link>
          <Link
            href="/companions/"
            className="inline-flex h-9 items-center rounded-[var(--radius-control)] border rule bg-card px-4 text-sm transition-colors hover:bg-muted"
          >
            Companion pools
          </Link>
        </div>
      </section>
    </div>
  );
}
