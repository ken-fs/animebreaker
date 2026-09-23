import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { classTree, commandmentTotem } from "@/data/game";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Anime Breaker Class Tree (Update 1.5): coins, nodes and costs",
  description:
    "The Anime Breaker Class Tree explained — six branches of multiplier nodes, Hunter class coins from Hunter City and the Hunter raid, awaken cost, and the Commandment Totem fragment timer.",
  alternates: { canonical: "/classes/" },
};

export default function ClassesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <FaqJsonLd
        items={[
          {
            q: "Where do Hunter class coins drop in Anime Breaker?",
            a: "Hunter class coins drop in Hunter City (World 5) and in the Hunter raid portals. Equip a Drop potion to raise the yield per run.",
          },
          {
            q: "How often do Commandment Fragments spawn?",
            a: "A fragment appears around Sin Village every 30 minutes, stays for 15 minutes, then vanishes. Each player gets their own fragment at a random spot, one per appearance, and they stop appearing once your totem is maxed.",
          },
        ]}
      />

      <header className="pt-10 pb-8">
        <p className="text-xs text-muted-foreground">{classTree.update}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Class Tree
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          The Class Tree is the headline system of Update 1.5: six branches of
          multiplier nodes growing from a center, paid for with a new currency. It
          launched days ago — this page covers the verified mechanics and says plainly
          what is not yet known.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">How the tree works</h2>
        <ul className="mt-4 space-y-2.5">
          {classTree.mechanics.map((m, i) => (
            <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <figure>
            <Image
              src="/game/teleport-worlds.webp"
              alt="The in-game Teleport menu listing Titan District, Hidden Leaf, Sin Village and Hunter City, with Class Tree access inside Hunter City"
              width={576}
              height={360}
              className="w-full rounded-[var(--radius-container)] border rule"
            />
            <figcaption className="mt-2.5 text-xs text-muted-foreground">
              The Teleport menu: five worlds, and the Class Tree is accessed from Hunter
              City. Captured from public creator gameplay.
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/game/classtree-unlock.webp"
              alt="The in-game unlock dialog for the Class Tree asking for 1.08 Qi Gold, with a Commandment Fragment despawn timer visible behind it"
              width={576}
              height={360}
              className="w-full rounded-[var(--radius-container)] border rule"
            />
            <figcaption className="mt-2.5 text-xs text-muted-foreground">
              The 1.08 Qi Gold unlock dialog — and a Commandment Fragment despawning in
              the background. Captured from public creator gameplay.
            </figcaption>
          </figure>
        </div>
        <p className="mt-4 max-w-[62ch] rounded-[var(--radius-container)] border border-dashed border-border p-4 text-sm text-muted-foreground">
          {classTree.note}
        </p>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">
          Commandment Totem{" "}
          <span className="font-normal text-muted-foreground">
            · {commandmentTotem.location} · same update
          </span>
        </h2>
        <ul className="mt-4 space-y-2.5">
          {commandmentTotem.mechanics.map((m, i) => (
            <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Where to spend first</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Class coins compete with the{" "}
          <Link href="/shadows/" className="text-primary underline-offset-4 hover:underline">
            shadow
          </Link>{" "}
          grind for your Hunter City time. The tree&apos;s multipliers are permanent and
          account-wide, so early nodes tend to outvalue another portal run — but the
          +1 hero equip stage on the Commandment Totem is the single strongest node
          either system offers, and fragments are time-gated, so collect every spawn.
        </p>
      </section>
    </div>
  );
}
