/**
 * blocs — els blocs `:::` propis del quadern (plugin mdast de Sätteri).
 *
 * Sätteri ja ha parsejat `:::nom` en nodes `containerDirective` (cal
 * `features.directive`); aquí només se'ls dona l'element i la classe que
 * l'estil espera. Tota l'aparença viu a `global.css`.
 *
 *   :::marge      → <aside class="nota-marge">     nota al marge dret
 *   :::destacat   → <blockquote class="destacat">  cita en gros
 *   :::nota[T]    → <aside class="caixa caixa-nota">
 *   :::avis[T]    → <aside class="caixa caixa-avis">
 *
 * El `[T]` opcional de `nota` i `avis` és el títol de la caixa.
 */
import { defineMdastPlugin } from "satteri";

const BLOCS = {
  marge: { tag: "aside", classe: "nota-marge" },
  destacat: { tag: "blockquote", classe: "destacat" },
  nota: { tag: "aside", classe: "caixa caixa-nota" },
  avis: { tag: "aside", classe: "caixa caixa-avis" },
};

const NOMS = Object.keys(BLOCS).join(", ");

export const plugiBlocs = defineMdastPlugin({
  name: "blocs",

  containerDirective(node, ctx) {
    const bloc = BLOCS[node.name];

    if (!bloc) {
      /* Una directiva desconeguda es renderitzaria com un div buit i el text
         desapareixeria de l'article sense que res avisés. Es marca perquè es
         vegi a la pàgina i es reporta perquè es vegi al build. */
      ctx.setProperty(node, "data", {
        hName: "div",
        hProperties: { className: "bloc-desconegut", "data-directiva": node.name },
      });
      ctx.report({
        message: `bloc ":::${node.name}" desconegut — els vàlids són: ${NOMS}`,
        node,
        severity: "warning",
      });
      return;
    }

    ctx.setProperty(node, "data", {
      hName: bloc.tag,
      hProperties: { className: bloc.classe },
    });

    /* El `[Títol]` arriba com a primer paràgraf marcat amb directiveLabel.
       Es reetiqueta en lloc d'extreure'l: així no cal reconstruir la llista
       de fills, i el títol conserva el seu format en línia. */
    const primer = node.children?.[0];
    if (primer && primer.type === "paragraph" && primer.data?.directiveLabel) {
      ctx.setProperty(primer, "data", {
        hName: "p",
        hProperties: { className: "caixa-titol" },
      });
    }
  },
});
