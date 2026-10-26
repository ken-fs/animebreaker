import type { Metadata } from "next";
import Link from "next/link";
import { bosses, newBosses } from "@/data/game";
import { EntityListJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Anime Breaker secret bosses: all locations and drops (Worlds 1–9 + Halloween)",
  description:
    "Every Anime Breaker secret boss, world by world: exact routes, the 100% accessory each one drops and the 0.01% avatar multipliers, read off the in-game drop panel.",
  alternates: { canonical: "/bosses/" },
};

const ordered = [...bosses].sort((a, b) => a.worldOrder - b.worldOrder);

const faq = [
  {
    q: "How many secret bosses are in Anime Breaker?",
    a: `Every world has one. Worlds 1–8 are covered in full here (${ordered.length} bosses with routes and drops); the Cursed High and Halloween bosses have confirmed routes but drops still unconfirmed.`,
  },
  {
    q: "Do secret boss accessories always drop?",
    a: "Yes. The accessory is a 100% drop on every kill — only its rarity changes, from Common up to Secret. There is a Secret pity of 10,000 kills.",
  },
  {
    q: "Where do I find the secret boss in Anime Breaker?",
    a: "Each world has its own, usually behind a fake wall or up a hard climb. Find your world in the table above and open its page for the exact route.",
  },
  {
    q: "What is the best secret boss avatar?",
    a: "The CCG Reaper avatar from Ghoul City, at 136x Energy. The avatars get stronger world by world, and all of them are 0.01% and drop only once.",
  },
];

export default function BossesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <EntityListJsonLd
        name="Anime Breaker secret bosses"
        path="bosses"
        items={ordered.map((b) => ({ name: b.name, slug: b.slug }))}
      />
      <FaqJsonLd items={faq} />

      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Breaker secret bosses: every location
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Every world has a secret boss, and this page lists all of them with routes and
          drops. Each one hides behind a fake wall, up a climb or inside a cave, and each one drops its accessory on every kill — only the rarity changes —
          plus a 0.01% avatar that drops once. Below is each boss in world order with the
          route and the drops, read off the in-game View Drops panel.
        </p>
      </header>

      <div className="overflow-x-auto pb-12">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b rule">
              <th className="py-2 pr-4 font-normal">World</th>
              <th className="py-2 pr-4 font-normal">Secret boss</th>
              <th className="py-2 pr-4 font-normal">Accessory (100%)</th>
              <th className="py-2 font-normal">Avatar (0.01%)</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((b) => (
              <tr key={b.slug} className="border-b rule">
                <td className="py-2.5 pr-4 text-muted-foreground">
                  W{b.worldOrder} · {b.worldName}
                </td>
                <td className="py-2.5 pr-4">
                  <Link href={`/bosses/${b.slug}/`} className="font-medium hover:text-primary">
                    {b.name}
                  </Link>
                  {b.gameName !== b.name && (
                    <span className="ml-1.5 text-xs text-muted-foreground">({b.gameName})</span>
                  )}
                </td>
                <td className="py-2.5 pr-4">
                  {b.accessory} <span className="text-xs text-muted-foreground">· {b.accessoryStat}</span>
                </td>
                <td className="py-2.5 font-mono tabular">{b.avatarMultiplier ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-4 pb-16 sm:grid-cols-2">
        {ordered.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/bosses/${b.slug}/`}
              className="group block h-full rounded-[var(--radius-container)] border rule bg-card p-5 transition-colors hover:bg-muted"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-medium group-hover:text-primary">
                  {b.worldName}: {b.name}
                </h2>
                <span className="shrink-0 text-xs text-muted-foreground">World {b.worldOrder}</span>
              </div>
              <p className="mt-2.5 text-sm text-muted-foreground">{b.location}.</p>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Accessory</dt>
                  <dd className="text-right font-medium">
                    {b.accessory} ({b.accessoryStat})
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Avatar</dt>
                  <dd className="text-right font-medium">
                    {b.avatarMultiplier ?? "multiplier not confirmed"}
                  </dd>
                </div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">The two newest secret bosses</h2>
        <p className="mt-2 max-w-[62ch] text-sm text-muted-foreground">
          These shipped with the Cursed High world and the Halloween event. The route is
          confirmed from gameplay footage; the drops aren&apos;t yet, so they don&apos;t get
          their own pages until they are.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {newBosses.map((n) => (
            <li key={n.name} className="rounded-[var(--radius-container)] border rule bg-card p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-medium">{n.name}</h3>
                <span className="text-xs text-muted-foreground">{n.where}</span>
              </div>
              <p className="mt-2.5 text-sm text-muted-foreground">{n.route}</p>
              <p className="mt-3 text-xs text-muted-foreground">Source: {n.source}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Rules that apply to every secret boss</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="max-w-[62ch]">
            The accessory always drops. Every kill is a new rarity roll, so keep farming
            until a high-rarity version lands. A Secret pity of 10,000 kills shows in the
            drop tooltip.
          </li>
          <li className="max-w-[62ch]">
            Avatars are 0.01% and drop only once, and they climb world by world: 8x,
            12x, (Copy Ninja not confirmed), 27x, 40.5x, 60.75x, 91.12x, 136x Energy.
          </li>
          <li className="max-w-[62ch]">
            Every boss also drops Gold and a 5% raid ticket for its world&apos;s raid.
          </li>
          <li className="max-w-[62ch]">
            Stack Drop effects before a long avatar hunt — a Drop potion plus the 1.5x Drop
            mount from Trials or the Release Pass.
          </li>
          <li className="max-w-[62ch]">
            Accessories split three ways: Energy (Scouter, Sin Village back piece), Damage
            (Captain Cape, Antares Armor, Ghoul Mask) and Gold (Ninja Vest, Fire Fist Hat,
            Anti Magic Wing). Full list on the{" "}
            <Link href="/accessories/" className="text-primary underline-offset-4 hover:underline">
              accessories page
            </Link>
            .
          </li>
        </ul>
        <p className="mt-6 max-w-[62ch] text-xs text-muted-foreground">
          Correction (21 Oct 2026): the Sin Village boss is Escanor (Lion Sin in game), not
          Meliodas as this page said before.
        </p>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Questions</h2>
        <dl className="mt-4 space-y-5">
          {faq.map((f) => (
            <div key={f.q} className="max-w-[62ch]">
              <dt className="text-sm font-medium">{f.q}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
