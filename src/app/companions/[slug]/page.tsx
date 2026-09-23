import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companions, worldBySlug, bosses } from "@/data/game";
import { RarityBadge } from "@/components/rarity-badge";
import { CopyCode } from "@/components/copy-code";

export function generateStaticParams() {
  return companions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/companions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = companions.find((x) => x.slug === slug);
  if (!c) return {};
  const w = worldBySlug(c.world);
  return {
    title: `${c.name} in Anime Breaker: how to get it (${w?.name ?? c.world})`,
    description: `${c.name} is a ${c.rarity ?? "card"} companion from the ${w?.card ?? "card"} in Anime Breaker's ${w?.name ?? c.world}. Source: ${c.source}. ${c.boostText}.`,
    alternates: { canonical: `/companions/${c.slug}/` },
  };
}

export default async function CompanionPage({
  params,
}: PageProps<"/companions/[slug]">) {
  const { slug } = await params;
  const companion = companions.find((c) => c.slug === slug);
  if (!companion) notFound();

  const world = worldBySlug(companion.world);
  const sameWorld = companions.filter(
    (c) => c.world === companion.world && c.slug !== companion.slug
  );
  const worldBoss = bosses.find((b) => b.world === companion.world);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/companions/" className="hover:text-foreground">
          Companions
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">{companion.name}</span>
      </nav>

      <header className="pt-6 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <RarityBadge rarity={companion.rarity} />
          {!companion.verified && (
            <span className="rounded-[4px] border border-dashed border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              creator-reported
            </span>
          )}
          {world && (
            <span className="text-xs text-muted-foreground">
              World {world.order} — {world.name}
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {companion.name}
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          {companion.name} is a companion from the {world?.card ?? "card station"} in{" "}
          {world?.name ?? companion.world}. {companion.boostText}.
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <h2 className="text-sm font-medium">How to get it</h2>
          <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2">
            <Stat label="Source" value={world?.card ?? "Card"} sub={companion.source} />
            <Stat
              label="Spin cost"
              value={world?.cardCost ?? "Not published"}
              sub={world?.cardPity ?? "pity rule unverified for this card"}
            />
          </dl>

          <h2 className="mt-12 text-sm font-medium">What we know</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p className="max-w-[62ch]">
              {companion.verified
                ? `${companion.name} is confirmed in the ${world?.name ?? "game"} companion pool by sources that cross-check gameplay footage. ${companion.boostText}.`
                : `${companion.name} appears in creator gameplay footage of the ${world?.name ?? "game"} card pool. We have not yet cross-checked its rarity and odds against a second source, so this page carries the creator-reported label.`}
            </p>
            {companion.note && <p className="max-w-[62ch]">{companion.note}</p>}
            <p className="max-w-[62ch]">
              Exact per-unit roll odds are not published by the developer for any
              companion. Where a site prints a precise percentage for {companion.name},
              that number is invented — the game itself only shows rarity and the pity
              counter.
            </p>
          </div>
        </div>

        <aside className="space-y-8">
          {sameWorld.length > 0 && (
            <div>
              <h2 className="text-sm font-medium">Also in {world?.name}</h2>
              <ul className="mt-3 space-y-1.5">
                {sameWorld.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/companions/${c.slug}/`}
                      className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                    >
                      <span>{c.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {c.rarity ?? "?"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {worldBoss && (
            <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
              <h2 className="text-sm font-medium">While you are in {world?.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {worldBoss.name}, this world&apos;s secret boss, drops a{" "}
                {worldBoss.accessoryStat} accessory on every kill.
              </p>
              <Link
                href={`/bosses/${worldBoss.slug}/`}
                className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {worldBoss.name} location and drops
              </Link>
            </div>
          )}

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              Codes hand out free Emeralds and Luck potions — the cheapest way to chase a
              card pull like this.
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
