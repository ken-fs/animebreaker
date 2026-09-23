import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bosses, companionsByWorld } from "@/data/game";
import { CopyCode } from "@/components/copy-code";

export function generateStaticParams() {
  return bosses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/bosses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = bosses.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: `${b.name} secret boss in Anime Breaker: location and drops`,
    description: `Where to find ${b.name}, the ${b.worldName} secret boss in Anime Breaker. ${b.accessoryStat} accessory drops at 100% — only the rarity varies.${b.avatarDrop ? ` Plus: ${b.avatarDrop}.` : ""}`,
    alternates: { canonical: `/bosses/${b.slug}/` },
  };
}

export default async function BossPage({ params }: PageProps<"/bosses/[slug]">) {
  const { slug } = await params;
  const boss = bosses.find((b) => b.slug === slug);
  if (!boss) notFound();

  const others = bosses.filter((b) => b.slug !== boss.slug);
  const worldCompanions = companionsByWorld(boss.world);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/bosses/" className="hover:text-foreground">
          Secret bosses
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">{boss.name}</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="text-xs text-muted-foreground">{boss.worldName} · secret boss</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {boss.name}
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">{boss.location}.</p>
      </header>

      {boss.image && (
        <figure className="pb-10">
          <Image
            src={boss.image}
            alt={boss.imageAlt ?? ""}
            width={576}
            height={360}
            className="w-full max-w-xl rounded-[var(--radius-container)] border rule"
          />
          <figcaption className="mt-2.5 text-xs text-muted-foreground">
            {boss.imageAlt}. Captured from public creator gameplay.
          </figcaption>
        </figure>
      )}

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <h2 className="text-sm font-medium">Drops</h2>
          <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2">
            <Stat
              label="Accessory (100% drop)"
              value={boss.accessoryStat}
              sub={`${boss.accessory} — rarity rolls Common → Secret`}
            />
            <Stat
              label="Avatar drop"
              value={boss.avatarDrop ? "Separate roll" : "None confirmed"}
              sub={boss.avatarDrop ?? "No avatar drop verified for this boss"}
            />
          </dl>
          {boss.accessoryMax && (
            <p className="mt-3 text-sm text-muted-foreground">{boss.accessoryMax}.</p>
          )}

          <h2 className="mt-12 text-sm font-medium">Farming notes</h2>
          <ul className="mt-4 space-y-3">
            {boss.tips.map((t, i) => (
              <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-8">
          {worldCompanions.length > 0 && (
            <div>
              <h2 className="text-sm font-medium">Companions in {boss.worldName}</h2>
              <ul className="mt-3 space-y-1.5">
                {worldCompanions.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/companions/${c.slug}/`}
                      className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                    >
                      <span>{c.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {c.rarity ?? "rarity unverified"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-sm font-medium">Other secret bosses</h2>
            <ul className="mt-3 space-y-1.5">
              {others.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/bosses/${b.slug}/`}
                    className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                  >
                    <span>{b.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {b.worldName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              Codes hand out free Emeralds and Drop potions — the cheapest way to speed
              up a boss farm.
            </p>
            <Link
              href="/codes/"
              className="mt-2 inline-block text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              All working codes
            </Link>
          </div>
        </aside>
      </div>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Quick reference</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted-foreground">Redeem in the Shop tab:</span>
          <code className="font-mono text-sm font-semibold">NEWTOTEM</code>
          <CopyCode code="NEWTOTEM" />
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            All codes
          </Link>
        </div>
      </section>
    </article>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-lg font-semibold tabular">{value}</dd>
      <dd className="mt-0.5 text-xs text-muted-foreground">{sub}</dd>
    </div>
  );
}
