import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { LLENGUA_DEFECTE, LLENGUA_INFO, LLENGUES, traductor, type Llengua } from "../../i18n/ui";
import { numerosDe } from "../../lib/posts";

export function getStaticPaths() {
  return LLENGUES.filter((l) => l !== LLENGUA_DEFECTE).map((lang) => ({
    params: { lang },
    props: { lang },
  }));
}

export async function GET(context: APIContext) {
  const lang = (context.props as { lang: Llengua }).lang;
  const t = traductor(lang);
  const numeros = await numerosDe(lang);

  return rss({
    title: `${t("lloc.nom")} — ${t("lloc.lema")}`,
    description: t("lloc.descripcio"),
    site: context.site ?? "https://blog.victormartinc.com",
    trailingSlash: true,
    items: numeros.map((n) => ({
      title: `${t("num.abrev")} ${String(n.exemplar).padStart(2, "0")} · ${n.entrada.data.title}`,
      description: n.entrada.data.description,
      pubDate: n.data,
      link: n.url,
      categories: [...n.entrada.data.tags],
    })),
    customData: `<language>${LLENGUA_INFO[lang].bcp47}</language>`,
  });
}
