import type { APIContext } from "astro";
import { LLENGUA_INFO, LLENGUES, traductor } from "../i18n/ui";
import { carregaNumeros, formataData, urlFeed, urlPortada } from "../lib/posts";

/**
 * llms.txt — el mateix que fa el portfolio: donar a un model una versió
 * curta i estructurada del lloc en comptes d'obligar-lo a rascar HTML.
 * Es genera al build, així que sempre té tots els números publicats.
 */
export async function GET(context: APIContext) {
  const base = context.site ?? new URL("https://blog.victormartinc.com");
  const abs = (ruta: string) => new URL(ruta, base).href;
  const t = traductor("ca");
  const numeros = await carregaNumeros();

  const linies: string[] = [
    `# ${t("lloc.nom")} — ${t("lloc.lema")}`,
    "",
    /* La descripció ja diu que no hi ha periodicitat: aquí només s'hi afegeix
       el que no diu — que la unitat de publicació és el número. */
    `> ${t("lloc.descripcio")} Cada article és un número numerat. Web estàtica`,
    "> trilingüe (català, castellà, anglès), servida des d'infraestructura",
    "> pròpia.",
    "",
    "## Portades",
    "",
    ...LLENGUES.map((l) => {
      const tl = traductor(l);
      return `- [${tl("lloc.nom")} (${l})](${abs(urlPortada(l))}): ${tl("lloc.lema")}`;
    }),
    "",
    "## Feeds",
    "",
    ...LLENGUES.map((l) => `- [RSS ${l}](${abs(urlFeed(l))})`),
    "",
  ];

  for (const llengua of LLENGUES) {
    const dellengua = numeros.filter((n) => n.llengua === llengua);
    if (dellengua.length === 0) continue;

    linies.push(`## Números en ${LLENGUA_INFO[llengua].nom} (/${llengua})`, "");
    for (const n of dellengua) {
      const num = String(n.exemplar).padStart(2, "0");
      linies.push(
        `- [Núm. ${num} — ${n.entrada.data.title}](${abs(n.url)}): ` +
          `${n.entrada.data.description} (${formataData(n.data, llengua)})`,
      );
    }
    linies.push("");
  }

  linies.push(
    "## Autor",
    "",
    "- [Portfolio i CV](https://victormartinc.com)",
    "- [GitHub](https://github.com/victormartinc)",
    "- [LinkedIn](https://linkedin.com/in/victormartinca)",
    "- Correu: victor@victormartinc.com",
    "",
  );

  return new Response(linies.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
