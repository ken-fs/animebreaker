import type { Metadata } from "next";
import Link from "next/link";
import { bosses } from "@/data/game";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to get accessories and secret avatars in Anime Breaker",
  description:
    "Every Anime Breaker accessory and secret avatar we could confirm, which secret boss drops it, its stat and odds — plus the best Energy, Damage and Gold setups.",
  alternates: { canonical: "/accessories/" },
};

const ordered = [...bosses].sort((a, b) => a.worldOrder - b.worldOrder);
const byStat = (stat: string) => ordered.filter((b) => b.accessoryStat === stat);

const faq = [
  {
    q: "How do you get accessories in Anime Breaker?",
    a: "Beat a world's secret boss. Its accessory drops every kill (100%) and each drop rolls a rarity from Common to Secret, so you keep farming the same boss for a better roll.",
  },
  {
    q: "Is there pity on accessories?",
    a: "Yes. The drop tooltip shows a Secret pity counter out of 10,000 kills.",
  },
  {
    q: "How do you get avatars in Anime Breaker?",
    a: "The secret boss avatars are separate 0.01% drops from the same bosses. Each one drops only once.",
  },
];

export default function AccessoriesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <FaqJsonLd items={faq} />

      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How to get accessories in Anime Breaker
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Short version: farm secret bosses. Every accessory we&apos;ve confirmed comes
          from one, and it drops on every single kill — what you&apos;re really farming
          is the rarity roll. The same bosses also drop a 0.01% avatar, which is where
          the big Energy multipliers are.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Every accessory and where it drops</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b rule">
                <th className="py-2 pr-4 font-normal">Accessory</th>
                <th className="py-2 pr-4 font-normal">Stat</th>
                <th className="py-2 pr-4 font-normal">Dropped by</th>
                <th className="py-2 font-normal">World</th>
              </tr>
            </thead>
            <tbody>
              {ordered.map((b) => (
                <tr key={b.slug} className="border-b rule">
                  <td className="py-2.5 pr-4 font-medium">
                    {b.accessory}
                    {b.accessorySlot && (
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                        {b.accessorySlot}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 pr-4">{b.accessoryStat}</td>
                  <td className="py-2.5 pr-4">
                    <Link href={`/bosses/${b.slug}/`} className="hover:text-primary">
                      {b.name}
                    </Link>
                  </td>
                  <td className="py-2.5 text-muted-foreground">
                    W{b.worldOrder} · {b.worldName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-[62ch] text-xs text-muted-foreground">
          The drop panel lists most of these as &quot;Random Accessory [world name]&quot;;
          the item names come from the accessories inventory in creator footage.
        </p>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">How the rarity roll works</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="max-w-[62ch]">
            The accessory is guaranteed. Every kill gives you another copy with a fresh
            rarity, from Common up to Secret.
          </li>
          <li className="max-w-[62ch]">
            The rarity scales the boost a lot. Creators measured the Scouter going from
            2.5x to 4.5x at Secret tier, so a Secret roll on an early boss can still beat
            a low roll from a later world.
          </li>
          <li className="max-w-[62ch]">
            There&apos;s a Secret pity: the tooltip counts your kills toward 10,000. If you
            hit it, the Secret version is yours.
          </li>
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Which ones to wear</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {(["Energy", "Damage", "Gold"] as const).map((stat) => (
            <div key={stat} className="rounded-[var(--radius-container)] border rule bg-card p-5">
              <h3 className="font-medium">{stat} setup</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {byStat(stat).map((b) => (
                  <li key={b.slug} className="flex justify-between gap-3">
                    <span>{b.accessory}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{b.worldName}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
          Gold is the only stat with a full three-piece set right now (Ninja Vest, Fire
          Fist Hat, Anti Magic Wing). SMG Infinity pointed out in mid-October that Energy
          is the one missing a body piece, so a later world will probably add it.
        </p>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Secret avatars</h2>
        <p className="mt-2 max-w-[62ch] text-sm text-muted-foreground">
          Each secret boss also has a 0.01% avatar drop. It drops only once, and the
          Energy multiplier gets bigger with every world.
        </p>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2">
          {ordered.map((b) => (
            <li key={b.slug} className="flex items-baseline justify-between gap-3 bg-card p-4 text-sm">
              <span>
                {b.avatar}
                <span className="ml-1.5 text-xs text-muted-foreground">{b.worldName}</span>
              </span>
              <span className="shrink-0 font-mono tabular">
                {b.avatarMultiplier ?? "not confirmed"}
              </span>
            </li>
          ))}
        </ul>
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
        <p className="mt-8 text-sm">
          Routes to every boss:{" "}
          <Link href="/bosses/" className="text-primary underline-offset-4 hover:underline">
            all secret boss locations
          </Link>
        </p>
      </section>
    </div>
  );
}
