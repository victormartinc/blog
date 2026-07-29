# Marginalia — instruccions per a Claude

Blog personal de tecnologia. Astro + Markdown, sortida estàtica, un número al
mes. La visió general és al [README.md](README.md); aquí hi ha el que cal
saber per treballar-hi sense trencar res.

## Servidor de desenvolupament

```
npx astro dev --background
```

Es gestiona amb `npx astro dev stop`, `npx astro dev status` i
`npx astro dev logs`. **No l'arrenquis en primer pla**: bloqueja la sessió.

Abans de donar res per bo: `npm run build`. El typecheck (`npm run check`) no
detecta els errors de `getStaticPaths`, que només surten al build.

## La metàfora, i per què importa

El blog es presenta com una **revista mensual**. Cada article és un *número*.
Això no és només copy: condiciona components (`Masthead`, `Colofo`,
`SegellNumero`), el vocabulari de la interfície (*número*, *hemeroteca*) i les
decisions de disseny. Si afegeixes alguna cosa, que hi encaixi — un element
que sembli d'un SaaS desentona immediatament.

El sistema visual és germà del portfolio (`C:\Projects\personal\portfolio`):
paper càlid, un sol accent de tinta blava, gra de paper, garabat sota els
títols, Fraunces / Source Serif 4 / IBM Plex Mono. **Si canvies un color,
mira't abans el `styles.css` del portfolio**: els dos han de continuar
semblant de la mateixa família.

## Com s'escriu un número

Fitxer Markdown a `src/content/posts/<ca|es|en>/<slug>.md`. El nom del fitxer
és el slug de la URL **i** la clau que lliga les traduccions: mateix nom en
dues carpetes = mateix número en dues llengües.

Capçalera completa:

```yaml
---
title: "RAG en producció"
subtitle: "Opcional. Surt en cursiva sota el títol."
description: "Obligatòria. Va al feed, a les targetes i a les metaetiquetes."
date: 2026-08-14
tags: ["rag", "llm"]
draft: false            # opcional; un esborrany no es publica ni surt al feed
---
```

El **número d'exemplar es calcula sol**: s'ordenen tots els articles per data
i el més antic és el Núm. 01. No l'escriguis a la capçalera; si ho fas,
s'ignora. Corol·lari: canviar la data d'un article renumera els posteriors.

### Sintaxi ampliada

A més del Markdown de sempre (amb GFM: taules, notes al peu, ratllat) i de la
puntuació tipogràfica automàtica (`"` → `«»`, `---` → `—`), hi ha quatre
blocs, implementats a `src/plugins/marginalia.mjs`:

```markdown
:::marge
Nota al marge. En pantalles amples surt al marge dret, alineada amb el
paràgraf on l'has escrita. En mòbil cau dins del text, sagnada.
:::

:::destacat
Cita destacada, en gros i amb cometes tipogràfiques.
:::

:::nota[Títol opcional]
Aclariment dins d'una caixa.
:::

:::avis[Compte]
Igual que `nota`, però amb l'accent d'advertència.
:::
```

Les notes al marge són l'element que dona nom al blog. Fes-les servir.

## El pipeline de Markdown

Astro 7 fa servir **Sätteri** com a processador per defecte, no remark/rehype.
L'API s'hi assembla (mateixes formes d'AST: mdast i hast) però els plugins no
són intercanviables: un plugin és un objecte amb `name` i un visitant per
tipus de node, i les mutacions es fan pel context (`ctx.wrapNode`,
`ctx.setProperty`…) en comptes de tocar l'arbre directament.

Tres coses que costen una tarda si no es saben:

- **Sätteri exposa les propietats amb el nom de l'atribut HTML** (`class`,
  `tabindex`, `dataLanguage`), no amb el nom hast (`className`). Un plugin
  copiat de rehype que busqui `properties.className` no troba mai res i
  falla en silenci.

- **Cada plugin és una passada pròpia** sobre l'arbre. Això és el que fa
  possible `src/plugins/envolts.mjs`: el primer plugin embolcalla el `<pre>`
  i el segon ja veu l'embolcall i li pot afegir la barra al davant. En una
  sola passada no es pot, perquè `insertBefore` sobre un node acabat
  d'embolcallar insereix **fora** de l'embolcall.

- **El contingut renderitzat es cacheja a `.astro/`.** Si canvies un plugin i
  el build torna a produir l'HTML antic, no és que el plugin no funcioni:
  és la cache. `rm -rf .astro dist` i torna-hi.

## Coses que costen de descobrir sol

- **Les traduccions es lliguen pel nom del fitxer**, no per cap camp de la
  capçalera. Si reanomenes `ca/foo.md` i no reanomenes `es/foo.md`, el
  selector d'idioma deixa de trobar-les i cada una passa a ser un número
  independent (amb la seva pròpia numeració). No hi ha cap error al build.

- **`Astro.currentLocale` no és fiable a les rutes `[lang]`** quan el
  `getStaticPaths` genera diverses llengües: fes servir sempre el paràmetre
  `lang` de la ruta i passa'l avall explícitament.

- **El tema es fixa amb un script síncron al `<head>`** (`Base.astro`), abans
  de pintar res. Si el mous a un `<script>` diferit, torna el flaix blanc en
  carregar en fosc.

- **Shiki va configurat amb `defaultColor: false`**: els blocs de codi no
  tenen color propi, els posa el CSS a partir de `--shiki-light` /
  `--shiki-dark` segons `[data-theme]`. Si canvies de tema de Shiki, revisa
  també el bloc `.astro-code` de `global.css`.

- **Les fonts són còpies literals de les del portfolio** (`public/fonts/`).
  Si algun dia s'hi afegeix un pes, cal afegir-lo als dos llocs.

## Desplegament

**No despleguis mai sense que el Víctor ho demani explícitament.** El flux per
defecte és: editar, `npm run build`, commit local, i parar. El runbook és a
[deploy/README.md](deploy/README.md).

El VPS fa servir **Caddy** com a reverse-proxy (xarxa Docker `web`), no el
nginx de Mailcow. Diversos repos d'aquesta carpeta encara documenten el patró
antic i estan desactualitzats: no els copiïs.

## Documentació d'Astro

- [Rutes i rutes dinàmiques](https://docs.astro.build/en/guides/routing/)
- [Col·leccions de contingut](https://docs.astro.build/en/guides/content-collections/)
- [Internacionalització](https://docs.astro.build/en/guides/internationalization/)
