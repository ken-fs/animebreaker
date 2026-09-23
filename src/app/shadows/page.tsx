import type { Metadata } from "next";
import Link from "next/link";
import { shadows } from "@/data/game";

export const metadata: Metadata = {
  title: "Anime Breaker shadows: portals, merging, pity and passives",
  description:
    "How Anime Breaker Shadows work — portals (C/B/A/S ranks) from the Hunter raid, shadow types, merging to Secret, the pity, shadow passives and the 6x enchant gacha.",
  alternates: { canonical: "/shadows/" },
};

export default function ShadowsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shadows</h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Shadows arrived with Update 1 alongside Hunter City: summonable allies that add
          damage and — more importantly — a big Energy boost, like the amulet. They are
          the system every other wiki currently covers with invented numbers. Here is
          what creator footage actually confirms.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Confirmed shadow names</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {shadows.knownNames.map((s) => (
            <li
              key={s}
              className="rounded-[var(--radius-control)] border rule bg-card px-4 py-2 text-sm font-medium"
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          {shadows.note}
        </p>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Portal ranks</h2>
        <ol className="mt-4 flex flex-wrap gap-2">
          {shadows.portalRanks.map((r, i) => (
            <li
              key={r}
              className="flex items-center gap-2 rounded-[var(--radius-control)] border rule bg-card px-4 py-2 text-sm"
            >
              <span className="font-mono font-semibold tabular">{r}</span>
              <span className="text-xs text-muted-foreground">
                {i === 0 ? "easiest" : i === shadows.portalRanks.length - 1 ? "best odds" : ""}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">How the system works</h2>
        <ul className="mt-4 space-y-2.5">
          {shadows.mechanics.map((m, i) => (
            <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">The farming loop</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Raid tickets come from the last three enemies of the Hunter City map. Spend
          them in the Hunter raid, where portals drop; open portals from your inventory
          and clear the waves. Merge duplicates upward — Mythical into Secret — and let
          the pity carry the rest. Then roll a passive on your best shadow: the enchant
          gacha reaches 6x Energy at Secret rarity. Shadows multiply with your{" "}
          <Link href="/companions/" className="text-primary underline-offset-4 hover:underline">
            companions
          </Link>{" "}
          and{" "}
          <Link href="/pets/" className="text-primary underline-offset-4 hover:underline">
            pets
          </Link>
          , so even a mid-rarity shadow is worth a slot.
        </p>
      </section>
    </div>
  );
}
