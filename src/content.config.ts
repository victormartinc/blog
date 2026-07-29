import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// Astro 7 marca com a obsolet el reexport de `z` des d'`astro:content`.
import { z } from "astro/zod";

/**
 * Un número és un fitxer Markdown a `src/content/posts/<llengua>/<slug>.md`.
 *
 * L'`id` que en surt és `ca/rag-en-produccio`: d'aquí es dedueixen tant la
 * llengua com el slug, i el slug fa alhora de clau de traducció (vegeu
 * `src/lib/posts.ts`). Per això la llengua NO és un camp de la capçalera:
 * tenir-la en dos llocs només serveix perquè algun dia no coincideixin.
 *
 * El número d'exemplar tampoc s'escriu — es calcula per data de publicació.
 */
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
