import type { Metadata } from "next";
import { gaps, game } from "@/data/game";

export const metadata: Metadata = {
  title: "About: sources, rules and known gaps",
  description:
    "How Anime Breaker Reference collects and verifies data, what creator-reported means, and the full list of known gaps we refuse to fill with guesses.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <header className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          An independent player reference for {game.name}. Not affiliated with the
          developers or Roblox Corporation.
        </p>
      </header>

      <section className="pb-12">
        <h2 className="text-sm font-medium">The two labels on this site</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h3 className="text-sm font-medium">Verified</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Confirmed by at least two independent sources — typically a wiki that
              checks gameplay footage plus creator video evidence — or measured directly
              from the game&apos;s own interfaces. Codes carry the date they were last
              confirmed working.
            </p>
          </div>
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h3 className="text-sm font-medium">Creator-reported</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Seen in exactly one creator&apos;s footage. Real, but not cross-checked.
              These entries carry a dashed badge wherever they appear, and they get
              promoted or corrected as more evidence lands.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Why the gaps are printed</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Five other Anime Breaker wikis launched in the game&apos;s first six weeks.
          Four of them fill their pages with generated names and numbers that do not
          exist in the game — a companion called &quot;Crimson Fist&quot; with a
          &quot;300% ATK&quot; ability is not a thing you can roll. This site takes the
          opposite bet: a smaller, true dataset beats a large, invented one. Where our
          data ends, you see the edge.
        </p>
      </section>

      <section className="pb-12">
        <h2 className="text-sm font-medium">Known gaps</h2>
        <ul className="mt-4 space-y-2.5">
          {gaps.map((g, i) => (
            <li key={i} className="max-w-[62ch] text-sm text-muted-foreground">
              {g}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <h2 className="text-sm font-medium">Sources</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="max-w-[62ch]">
            Creator gameplay footage with on-screen interfaces (update guides and
            noob-to-pro series, September 2026 builds).
          </li>
          <li className="max-w-[62ch]">
            The one community wiki that publishes verified, screenshot-backed data —
            used for the Alien Planet card pool, secret boss drops and the code list,
            cross-checked against creator footage.
          </li>
          <li className="max-w-[62ch]">
            The official Roblox game page and its media library for world structure and
            update cadence.
          </li>
        </ul>
        <p className="mt-6 max-w-[62ch] text-sm text-muted-foreground">
          Spot an error or hold a missing number? The fastest fix is a message in the
          game&apos;s official Discord — we watch the same channels.
        </p>
      </section>
    </div>
  );
}
