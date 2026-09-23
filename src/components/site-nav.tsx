"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const LINKS = [
  { href: "/codes/", label: "Codes" },
  { href: "/bosses/", label: "Bosses" },
  { href: "/companions/", label: "Companions" },
  { href: "/pets/", label: "Pets" },
  { href: "/races/", label: "Races" },
  { href: "/shadows/", label: "Shadows" },
  { href: "/classes/", label: "Class Tree" },
  { href: "/guide/", label: "Guide" },
];

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b rule bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BreakMark />
          <span className="text-sm font-semibold tracking-tight">Anime Breaker</span>
        </Link>

        {/* Desktop: single line, no wrap. Collapses to a sheet below lg. */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                "rounded-[var(--radius-control)] px-3 py-1.5 text-sm transition-colors " +
                (isActive(l.href)
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-[var(--radius-control)] sm:inline-flex"
          >
            <a href="https://www.roblox.com/games/109928390521457/Anime-Breaker" target="_blank" rel="noopener">
              Play on Roblox
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-[var(--radius-control)] lg:hidden"
                aria-label="Open menu"
              >
                <List size={18} weight="bold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="px-4 pt-4 text-sm font-semibold">Menu</SheetTitle>
              <nav className="mt-4 flex flex-col px-2" aria-label="Mobile">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={
                      "rounded-[var(--radius-container)] px-3 py-2.5 text-sm " +
                      (isActive(l.href)
                        ? "bg-muted font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground")
                    }
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/**
 * A panel with a crack running through it — the "breaker" mark. Drawn once,
 * reads as impact rather than a generic geometric logo blob.
 */
function BreakMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path
        d="M12 2.6 21 7.4v9.2L12 21.4 3 16.6V7.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 4.5 10.2 9.2l3 2.6-2.4 3.4 2 3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
