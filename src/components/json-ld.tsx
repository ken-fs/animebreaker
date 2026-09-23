import { SITE_URL } from "@/lib/site";
/**
 * Structured data.
 *
 * Only two shapes are emitted: a WebSite node for the site itself, and FAQPage
 * where a page genuinely answers questions. No aggregateRating or
 * reviewCount, because there are no reviews to aggregate.
 */
export function WebsiteJsonLd({ site, name }: { site: string; name: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: SITE_URL,
    description:
      "An independent Anime Breaker reference: working codes, secret boss locations and drops, companions, pets, races, shadows and the Class Tree.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Ordered list, so search engines see the same ordering the page shows. */
export function EntityListJsonLd({
  name,
  path,
  items,
}: {
  name: string;
  path: string;
  items: { name: string; slug: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.name,
      url: `${SITE_URL}/${path}/${u.slug}/`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
