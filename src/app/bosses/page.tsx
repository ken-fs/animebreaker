import type { Metadata } from "next";
import Link from "next/link";
import { bosses } from "@/data/game";
import { EntityListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "All Anime Breaker secret boss locations and drops",
  description:
    "Every Anime Breaker secret boss — Vegeta, Levi, Kakashi and Meliodas — with exact locations, guaranteed accessory drops, rarity rolls and avatar odds.",
  alternates: { canonical: "/bosses/" },
};

export default function BossesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <EntityListJsonLd
        name="Anime Breaker secret bosses"
        path="bosses"
        items={bosses.map((b) => ({ name: b.name, slug: b.slug }))}
      />

      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Secret bosses
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Every world hides one secret boss behind a fake wall or concealed area. Each
          guarantees an accessory drop on defeat — the drop is always 100%, only the
          rarity (Common → Secret) varies. That makes secret bosses the most reliable
          gear farm in the game.
        </p>
      </header>

      <ul className="grid gap-4 pb-16 sm:grid-cols-2">
        {bosses.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/bosses/${b.slug}/`}
              className="group block h-full rounded-[var(--radius-container)] border rule bg-card p-5 transition-colors hover:bg-muted"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-medium group-hover:text-primary">{b.name}</h2>
                <span className="text-xs text-muted-foreground">{b.worldName}</span>
              </div>
              <p className="mt-2.5 text-sm text-muted-foreground">{b.location}</p>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Accessory</dt>
                  <dd className="text-right font-medium">{b.accessoryStat}</dd>
                </div>
                {b.avatarDrop && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Bonus drop</dt>
                    <dd className="text-right font-medium">{b.avatarDrop}</dd>
                  </div>
                )}
              </dl>
            </Link>
          </li>
        ))}
      </ul>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Farming rules that apply to all four</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="max-w-[62ch]">
            Accessories always drop. Every kill is a rarity roll — keep farming until the
            high-rarity version lands.
          </li>
          <li className="max-w-[62ch]">
            Avatar drops are flagged as one-time: the grind is for the accessory rarity
            roll and the ultra-rare avatar, not duplicates.
          </li>
          <li className="max-w-[62ch]">
            Stack Drop effects — a Drop potion plus the 1.5x Drop mount from Trials or the
            Release Pass is the intended way to hunt rare boss drops.
          </li>
          <li className="max-w-[62ch]">
            Secret bosses sit above regular enemy HP. Build around your highest-rarity
            companions before camping them.
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Hunter City (World 5, added in Update 1) has its own secret boss whose identity
          and drops are not yet verified — it is listed as a gap on the{" "}
          <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
            about page
          </Link>{" "}
          rather than guessed at.
        </p>
      </section>
    </div>
  );
}
