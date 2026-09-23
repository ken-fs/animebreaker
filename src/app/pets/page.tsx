import type { Metadata } from "next";
import Link from "next/link";
import { pets, petRules, worldName } from "@/data/game";

export const metadata: Metadata = {
  title: "Anime Breaker pets: Power units, multipliers and what is verified",
  description:
    "Anime Breaker pets ('Power' units) explained: per-world gacha, Mythical 3x and Secret 6x Energy multipliers, the Broken rarity above Secret, and the three pets confirmed by name.",
  alternates: { canonical: "/pets/" },
};

export default function PetsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pets</h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Pets — the &quot;Power&quot; units in each world&apos;s second gacha — are pure
          multipliers that sit on top of your companion team. A Mythical Power unit is
          worth 3x Energy and a Secret up to 6x, which is why later-world pets can
          outvalue earlier companions outright.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Confirmed pets</h2>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border">
          {pets.map((p) => (
            <li key={p.name} className="flex flex-wrap items-center gap-3 bg-card p-4">
              <span className="font-medium">{p.name}</span>
              <span className="rounded-[4px] border border-dashed border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                creator-reported
              </span>
              <span className="text-xs text-muted-foreground">{worldName(p.world)}</span>
              <span className="ml-auto text-sm text-muted-foreground">{p.boostText}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          {pets[0].note} The full per-world pet roster is a known gap — listed on the{" "}
          <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
            about page
          </Link>
          , not guessed at.
        </p>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">The rules that matter</h2>
        <ul className="mt-4 space-y-2.5">
          {petRules.map((r, i) => (
            <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Where pets sit in the stack</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Pets multiply alongside{" "}
          <Link href="/companions/" className="text-primary underline-offset-4 hover:underline">
            companions
          </Link>
          ,{" "}
          <Link href="/races/" className="text-primary underline-offset-4 hover:underline">
            your race
          </Link>{" "}
          and{" "}
          <Link href="/shadows/" className="text-primary underline-offset-4 hover:underline">
            shadows
          </Link>
          . Because every layer multiplies every other layer, a Secret pet is often the
          single biggest jump available to a mid-game account.
        </p>
      </section>
    </div>
  );
}
