import raw from "./game.json";

/**
 * Single source of truth for every fact on this site.
 *
 * Provenance rules, enforced by the shape of this file:
 *  - `verified: false` means the only source is creator footage. Pages render
 *    that label instead of presenting the fact as settled.
 *  - Anything with no public source at all is not in this file — it is listed
 *    in `gaps` and surfaced on /about rather than filled with a guess.
 *  - Codes carry `status`: "verified" (cross-checked against multiple trackers
 *    on a dated build) or "reported" (seen redeemed in creator footage only).
 */

export type World = {
  slug: string;
  name: string;
  order: number;
  theme: string;
  card: string;
  cardCost: string | null;
  cardPity: string | null;
  boss: string;
  systems: string[];
};

export type Companion = {
  name: string;
  slug: string;
  world: string;
  rarity: string | null;
  source: string;
  boostText: string;
  verified: boolean;
  note: string | null;
};

export type Boss = {
  name: string;
  slug: string;
  /** The label the game shows over the boss and in View Drops ("Saiyan Prince"). */
  gameName: string;
  anime: string;
  world: string;
  worldName: string;
  worldOrder: number;
  location: string;
  intro: string;
  steps: string[];
  accessory: string;
  accessorySlot: string | null;
  accessoryStat: string;
  accessoryMax: string | null;
  avatar: string;
  /** null = the multiplier never showed on screen in footage we checked. */
  avatarMultiplier: string | null;
  avatarDrop: string | null;
  otherDrops: string[];
  verified: boolean;
  tips: string[];
  faq: { q: string; a: string }[];
  /** Creator videos the location and drops were read from. */
  sources: string[];
  image: string | null;
  imageAlt: string | null;
};

/** Secret bosses with a confirmed route but no confirmed drops yet — listed, not given pages. */
export type NewBoss = { name: string; where: string; route: string; source: string };

export type Pet = {
  name: string;
  world: string;
  boostText: string;
  verified: boolean;
  note: string | null;
};

export type Code = {
  code: string;
  reward: string;
  tier: "feature" | "milestone" | "emeralds" | "launch";
  status: "verified" | "reported";
  lastChecked: string;
};

export const game = raw.game;
export const worlds = raw.worlds as World[];
export const companions = raw.companions as Companion[];
export const bosses = raw.bosses as Boss[];
export const newBosses = raw.newBosses as NewBoss[];
export const pets = raw.pets as Pet[];
export const petRules = raw.petRules as string[];
export const races = raw.races;
export const shadows = raw.shadows;
export const classTree = raw.classTree;
export const commandmentTotem = raw.commandmentTotem;
export const codes = raw.codes as Code[];
export const redeemSteps = raw.redeemSteps as string[];
export const systems = raw.systems;

/** Known gaps in the public data. Surfaced on /about rather than hidden. */
export const gaps = raw.gaps as string[];

export const worldBySlug = (slug: string) => worlds.find((w) => w.slug === slug);
export const worldName = (slug: string) => worldBySlug(slug)?.name ?? slug;

export const companionsByWorld = (worldSlug: string) =>
  companions.filter((c) => c.world === worldSlug);

export const verifiedCodes = codes.filter((c) => c.status === "verified");
export const reportedCodes = codes.filter((c) => c.status === "reported");

/** Emerald total claimed by the codes list — derived so it cannot drift when codes are added. */
export const codesEmeraldTotal = codes.reduce(
  (sum, c) => sum + Number(/^\d+/.exec(c.reward)?.[0] ?? 0),
  0,
);

/** Rarity ladder, weakest to strongest. Drives badge tint and sort order. */
export const RARITY_ORDER = ["Rare", "Epic", "Legendary", "Mythical", "Secret", "Broken"];

export const rarityRank = (r: string | null) =>
  r ? RARITY_ORDER.indexOf(r) : -1;
