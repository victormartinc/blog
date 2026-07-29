/**
 * envolts — embolcalls que el Markdown no sap generar sol (plugins hast).
 *
 *  1. Cada `<pre class="astro-code">` queda dins d'un `<div class="bloc-codi">`
 *     amb una barra a sobre que diu el llenguatge. La barra es genera al build
 *     (sempre útil, també sense JavaScript); el botó de copiar l'hi afegeix
 *     després el client, perquè un botó que no fa res seria pitjor que cap.
 *
 *  2. Cada `<table>` queda dins d'un `<div class="taula-envolt">`, que és qui
 *     porta l'`overflow-x`. Sense això, una taula ampla estira la pàgina
 *     sencera i el mòbil acaba amb scroll horitzontal a tot arreu.
 *
 * Per què dos plugins i no un: `wrapNode` posa el node embolcallat com a
 * primer fill, i `insertBefore` sobre aquest node insereix ABANS de
 * l'embolcall, no a dins. Com que cada plugin és una passada pròpia, el segon
 * ja veu el `<div class="bloc-codi">` creat pel primer i li pot afegir la
 * barra al davant. Així el DOM queda en l'ordre en què es llegeix.
 *
 * Nota: Sätteri exposa les propietats amb el nom de l'atribut HTML (`class`,
 * `tabindex`), no amb el nom hast (`className`). Es comproven els dos per si
 * algun dia canvia.
 */
import { defineHastPlugin } from "satteri";

function classes(node) {
  const c = node?.properties?.class ?? node?.properties?.className;
  if (Array.isArray(c)) return c;
  if (typeof c === "string") return c.split(/\s+/);
  return [];
}

function envolt(classe) {
  return { type: "element", tagName: "div", properties: { class: classe }, children: [] };
}

/** Passada 1: embolcalla els blocs de codi i les taules. */
export const plugiEnvolts = defineHastPlugin({
  name: "envolts",

  element: [
    {
      filter: ["pre"],
      visit(node, ctx) {
        /* El ressaltat d'Astro ja ha corregut: si el <pre> no porta
           `astro-code` és un bloc sense ressaltar i no li cal barra. */
        if (!classes(node).includes("astro-code")) return;
        ctx.wrapNode(node, envolt("bloc-codi"));
      },
    },
    {
      filter: ["table"],
      visit(node, ctx) {
        ctx.wrapNode(node, envolt("taula-envolt"));
      },
    },
  ],
});

/** Passada 2: la barra amb el llenguatge, dins de l'embolcall ja creat. */
export const plugiBarraCodi = defineHastPlugin({
  name: "barra-codi",

  element: [
    {
      filter: ["div"],
      visit(node, ctx) {
        if (!classes(node).includes("bloc-codi")) return;

        const pre = node.children?.[0];
        const llenguatge = pre?.properties?.dataLanguage ?? "text";

        ctx.prependChild(node, {
          type: "element",
          tagName: "div",
          properties: { class: "bloc-codi-barra" },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: {},
              children: [{ type: "text", value: String(llenguatge) }],
            },
          ],
        });
      },
    },
  ],
});
