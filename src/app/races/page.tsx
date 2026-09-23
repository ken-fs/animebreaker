import type { Metadata } from "next";
import Link from "next/link";
import { races } from "@/data/game";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Anime Breaker races: Race Coins, spins and the permanent multiplier",
  description:
    "How the Anime Breaker Races system works — where Race Coins drop (~20% from Alien Planet enemies), how the spin works, and why your race is a permanent multiplier worth re-rolling.",
  alternates: { canonical: "/races/" },
};

export default function RacesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <FaqJsonLd
        items={[
          {
            q: "Where do Race Coins come from in Anime Breaker?",
            a: "Race Coins drop from regular enemies — check any enemy's View Drops panel. On Alien Planet NPCs the rate is roughly 20%, alongside Gold and Alien Raid Tickets.",
          },
          {
            q: "When should I re-roll my race in Anime Breaker?",
            a: "Re-roll whenever your coin balance comfortably exceeds what you would lose. Coins are farmable forever, so treat races as a slow-burn upgrade that pays off every time you log in.",
          },
        ]}
      />

      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Races</h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Races are Anime Breaker&apos;s quietest multiplier: a separate gacha that
          assigns your character a race — a permanent boost slot that stacks with
          companions, pets, accessories and everything else. It runs on its own currency
          (Race Coins) and its own spin interface, and it is easy to miss entirely while
          you are staring at the card roll.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Confirmed races</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {races.known.map((r) => (
            <li
              key={r}
              className="rounded-[var(--radius-control)] border rule bg-card px-4 py-2 text-sm font-medium"
            >
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          {races.note}
        </p>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">How the system works</h2>
        <ul className="mt-4 space-y-2.5">
          {races.mechanics.map((m, i) => (
            <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Where races sit in the stack</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Race is one layer of the multiplier stack — it sits alongside your{" "}
          <Link href="/companions/" className="text-primary underline-offset-4 hover:underline">
            companions
          </Link>
          ,{" "}
          <Link href="/pets/" className="text-primary underline-offset-4 hover:underline">
            pets
          </Link>
          , accessories from{" "}
          <Link href="/bosses/" className="text-primary underline-offset-4 hover:underline">
            secret bosses
          </Link>{" "}
          and the{" "}
          <Link href="/classes/" className="text-primary underline-offset-4 hover:underline">
            Class Tree
          </Link>
          . A Drop potion accelerates the coin trickle, since Race Coins ride the same
          enemy drops as everything else.
        </p>
      </section>
    </div>
  );
}
