import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  codes,
  verifiedCodes,
  worlds,
  companions,
  bosses,
  systems,
  game,
} from "@/data/game";
import { CopyCode } from "@/components/copy-code";

export const metadata: Metadata = {
  title: "Anime Breaker codes, secret bosses and companion odds",
  description:
    "Every working Anime Breaker code, all five worlds, secret boss locations with guaranteed accessory drops, companions, pets, races, shadows and the Update 1.5 Class Tree. Fan-made, with the source for every fact.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const topCodes = verifiedCodes.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      {/* Asymmetric split. The art is the game's own promo frame for the shadow
          update — the system every other wiki covers with invented numbers, so
          the image states the site's thesis before the text does. */}
      <section className="grid items-center gap-10 pt-14 pb-16 lg:grid-cols-[1fr_1.05fr] lg:pt-20">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Anime Breaker, mapped and measured
          </h1>
          <p className="mt-4 max-w-[46ch] text-lg text-muted-foreground">
            {codes.length} codes with verification dates, {worlds.length} worlds,{" "}
            {bosses.length} secret bosses with exact locations, and every system from
            Shadows to the new Class Tree — with the source attached.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/codes/"
              className="inline-flex h-11 items-center rounded-[var(--radius-control)] bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Working codes
            </Link>
            <Link
              href="/bosses/"
              className="inline-flex h-11 items-center rounded-[var(--radius-control)] border rule bg-card px-6 text-sm font-medium transition-colors hover:bg-muted active:scale-[0.98]"
            >
              Secret boss locations
            </Link>
          </div>
        </div>
        <figure className="relative">
          <Image
            src="/game/art-0.webp"
            alt="Official Anime Breaker promo art for the Shadows update — a hunter facing a shadow figure"
            width={768}
            height={432}
            priority
            className="w-full rounded-[var(--radius-container)] border rule"
          />
          <figcaption className="mt-2.5 text-xs text-muted-foreground">
            Official promo art for the Shadows update. Shadows are one of the systems
            other wikis guess at; this site only prints what creators have verified.
          </figcaption>
        </figure>
      </section>

      <section className="pb-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-sm font-medium">Codes worth redeeming first</h2>
          <Link href="/codes/" className="text-sm text-primary underline-offset-4 hover:underline">
            All {codes.length} codes
          </Link>
        </div>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-3">
          {topCodes.map((c) => (
            <li key={c.code} className="bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-sm font-semibold">{c.code}</code>
                <CopyCode code={c.code} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{c.reward}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-16">
        <h2 className="text-sm font-medium">The five worlds</h2>
        <p className="mt-1 max-w-[62ch] text-sm text-muted-foreground">
          Progress is measured in worlds: sequential anime maps, each with its own
          companion card, pet gacha, raid and hidden secret boss. World 5, Hunter City,
          arrived with Update 1.
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
                <p className="text-xs text-muted-foreground">
                  {w.card} · Boss: {w.boss}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-16">
        <h2 className="text-sm font-medium">Every multiplier layer, covered separately</h2>
        <p className="mt-1 max-w-[62ch] text-sm text-muted-foreground">
          Your power is a stack: companions, pets, race, shadows, class, accessories,
          avatar. Each layer has a different cost and a different grind, so each gets
          its own page.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((s) => (
            <SystemCard
              key={s.slug}
              href={`/${s.slug}/`}
              title={s.name}
              blurb={s.blurb}
            />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <h2 className="text-sm font-medium">What this site will not do</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Five other Anime Breaker wikis exist. Four of them publish companion names
              and stats that do not exist in the game — invented by generators, not
              measured. Where our data ends, the page says &quot;not verified&quot;
              instead of joining them.
            </p>
          </div>
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Companion pools for worlds 2-4 are not fully published anywhere we could
              verify. Those slots stay empty until gameplay footage or in-game checks
              fill them — the known gaps are listed on the about page.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t rule py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium">Start where you are</h2>
            <p className="mt-1 max-w-[52ch] text-sm text-muted-foreground">
              New players want codes and the first secret boss. Mid-game players want
              the Levi avatar farm. Endgame is Shadows and the Class Tree.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <QuickLink href="/guide/">Beginner guide</QuickLink>
            <QuickLink href="/codes/">Codes</QuickLink>
            <QuickLink href="/bosses/levi/">Levi farm</QuickLink>
            <QuickLink href="/classes/">Class Tree</QuickLink>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          {game.name} is a Roblox game. This is an independent fan reference and is not
          affiliated with its developers or with Roblox Corporation.
        </p>
      </section>
    </div>
  );
}

function SystemCard({
  href,
  title,
  blurb,
}: {
  href: string;
  title: string;
  blurb: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[var(--radius-container)] border rule bg-card p-4 transition-colors hover:bg-muted"
    >
      <h3 className="font-medium group-hover:text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
    </Link>
  );
}

function QuickLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center rounded-[var(--radius-control)] border rule bg-card px-4 text-sm transition-colors hover:bg-muted"
    >
      {children}
    </Link>
  );
}
