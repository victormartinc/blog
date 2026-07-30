# Blog de Víctor Martín — instruccions per a Claude

Blog personal de tecnologia. Astro + Markdown, sortida estàtica, posts sense
periodicitat fixa. La visió general és al [README.md](README.md); aquí hi ha
el que cal saber per treballar-hi sense trencar res.

## Servidor de desenvolupament

```
npx astro dev --background
```

Es gestiona amb `npx astro dev stop`, `npx astro dev status` i
`npx astro dev logs`. **No l'arrenquis en primer pla**: bloqueja la sessió.

Abans de donar res per bo: `npm run build`. El typecheck (`npm run check`) no
detecta els errors de `getStaticPaths`, que només surten al build.

## La metàfora, i per què importa

El **disseny** és de revista: segell d'exemplar, capçalera de diari amb
filets, capitular, notes al marge, colofó. Els components hi van al darrere
(`Segell`, `Portada`, `Colofo`). Si afegeixes alguna cosa, que hi encaixi —
un element que sembli d'un SaaS desentona immediatament.

El **vocabulari**, en canvi, és de blog: se'n diuen **posts** a les tres
llengües, i el que numera el segell és el número de post. «Número» i
«hemeroteca» es van fer servir al principi i es van retirar el 30-07-2026
perquè quedaven forçats. Si en tornes a escriure cap dels dos en text
visible, és un error.

> Les claus i els noms interns encara diuen `numero`/`Numero` (el tipus de
> `lib/posts.ts`, les classes `.numero-*` del CSS, `FilaNumero.astro`). És
> deute conscient, no descuit: renombrar-ho no canvia res que es vegi. El
> que sí que ha d'estar net és tot el que llegeix l'usuari.

**No hi ha periodicitat, i és deliberat.** Poden sortir tres posts en un mes
i cap el següent. Res del codi ni dels textos ha de prometre una cadència: la
bandera de la portada ho diu explícitament (`bandera.periodicitat`), que és
on una revista posaria «Mensual». Si algun dia hi tornes a escriure «mensual»
en algun lloc, és un error.

El nom públic és simplement **Víctor Martín**, amb el lema fent de subtítol.
Viu a la clau `lloc.nom` de `src/i18n/ui.ts` i enlloc més: la capçalera, el
`<title>`, l'OG i els tres feeds el llegeixen d'allà.

El sistema visual és germà del portfolio (`C:\Projects\personal\portfolio`):
paper càlid, un sol accent de tinta blava, gra de paper, garabat sota els
títols, Fraunces / Source Serif 4 / IBM Plex Mono. **Si canvies un color,
mira't abans el `styles.css` del portfolio**: els dos han de continuar
semblant de la mateixa família.

## Com s'escriu un post

Fitxer Markdown a `src/content/posts/<ca|es|en>/<slug>.md`, que surt a
`/p/<slug>` (o `/es/p/<slug>`). El nom del fitxer és el slug de la URL **i**
la clau que lliga les traduccions: mateix nom en dues carpetes = mateix post
en dues llengües.

Capçalera completa:

```yaml
---
title: "RAG en producció"
subtitle: "Opcional. Surt en cursiva sota el títol."
description: "Obligatòria. Va al feed, a les targetes i a les metaetiquetes."
date: 2026-08-14
tags: ["rag", "llm"]
draft: false            # opcional; un esborrany no es publica ni surt al feed
cover: /img/rag.jpg     # opcional; també fa d'og:image
coverAlt: "Descripció de la imatge"
---
```

El `cover` és una **ruta dins de `public/`**, no un import: el build no
comprova que el fitxer existeixi, així que una ruta equivocada dona un 404
silenciós. Es mostra a 16:9 retallat (`object-fit: cover`) i és l'únic
element del post que ocupa tot el contenidor en lloc de la columna de text.

El **número de post es calcula sol**: s'ordenen tots per data i el més antic
és el Post 01. No l'escriguis a la capçalera; si ho fas, s'ignora.
Corol·lari: canviar la data d'un post renumera els posteriors.

### Sintaxi ampliada

A més del Markdown de sempre (amb GFM: taules, notes al peu, ratllat) i de la
puntuació tipogràfica automàtica (`"` → `«»`, `---` → `—`), hi ha quatre
blocs, implementats a `src/plugins/blocs.mjs`:

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

Les notes al marge són l'element que distingeix aquest disseny de qualsevol
plantilla. Fes-les servir.

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

  Compte: si esborres `.astro/` **amb el servidor de desenvolupament en
  marxa**, el servidor es queda amb el magatzem de contingut buit i serveix
  una portada sense cap post fins que el reiniciïs. No és cap error del
  codi. Atura'l abans, o reinicia'l després.

## Coses que costen de descobrir sol

- **Les traduccions es lliguen pel nom del fitxer**, no per cap camp de la
  capçalera. Si reanomenes `ca/foo.md` i no reanomenes `es/foo.md`, el
  selector d'idioma deixa de trobar-les i cada una passa a ser un post
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
