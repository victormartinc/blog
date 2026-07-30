import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { LLENGUA_INFO, traductor } from "../i18n/ui";
import { numerosDe } from "../lib/posts";

const LLENGUA = "ca" as const;

export async function GET(context: APIContext) {
  const t = traductor(LLENGUA);
  const numeros = await numerosDe(LLENGUA);

  return rss({
    title: `${t("lloc.nom")} — ${t("lloc.lema")}`,
    description: t("lloc.descripcio"),
    site: context.site ?? "https://blog.victormartinc.com",
    trailingSlash: true,
    // Perquè un navegador que obri el feed vegi una pàgina i no XML en cru.
    // Els lectors de feeds ignoren el full d'estil. Vegeu public/rss.xsl.
    stylesheet: "/rss.xsl",
    items: numeros.map((n) => ({
      title: `${t("post.abrev")} ${String(n.exemplar).padStart(2, "0")} · ${n.entrada.data.title}`,
      description: n.entrada.data.description,
      pubDate: n.data,
      link: n.url,
      categories: [...n.entrada.data.tags],
    })),
    customData: `<language>${LLENGUA_INFO[LLENGUA].bcp47}</language>`,
  });
}
