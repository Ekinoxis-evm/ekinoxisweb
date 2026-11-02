/**
 * Emits one or more JSON-LD blocks. Server-rendered so crawlers see it in the
 * HTML. The data is ours (never user input), and "<" is escaped anyway so a
 * stray "</script>" in a description can never break out of the tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
