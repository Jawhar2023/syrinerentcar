interface JsonLdProps {
  schema: object;
}

/** Injects structured data for search engines (JSON-LD). */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
