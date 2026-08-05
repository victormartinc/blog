# Blog de Víctor Martín

> Quadern de tecnologia de Víctor Martín Castilla.
> **[blog.victormartinc.com](https://blog.victormartinc.com)**

Germà petit del [portfolio](https://victormartinc.com): mateix paper, mateixa
tinta, mateixes tres tipografies. On el portfolio és una targeta de visita,
això és un blog — posts numerats i datats, sense periodicitat fixa.

El disseny és de revista (capçalera de diari, segell, capitular, notes al
marge, colofó) però el vocabulari és de blog: se'n diuen **posts**, no
«números». Un post surt quan està llest; pot ser que un mes n'hi hagi tres i
el següent cap.

## Stack

- **[Astro](https://astro.build)** — els articles són fitxers Markdown i la
  sortida és HTML estàtic. Zero JavaScript de framework al navegador; l'únic
  que se n'executa són tres millores opcionals de l'article (filet de
  progrés, àncores als títols i botó de copiar el codi).
- **Sense CSS framework.** El sistema de disseny és CSS pla amb variables,
  hereu directe del `styles.css` del portfolio.
- **Fonts auto-hostatjades** (Fraunces, Source Serif 4, IBM Plex Mono): cap
  petició a tercers.
- **Trilingüe per post.** Cada post decideix a quines llengües existeix.

## Executar en local

```bash
npm install
npm run dev      # → http://localhost:4321
```

Altres ordres:

```bash
npm run build    # genera dist/ (HTML estàtic)
npm run preview  # serveix dist/ tal com quedarà en producció
npm run check    # typecheck d'Astro
```

## Escriure un post

Un article és un fitxer Markdown dins de `src/content/posts/<llengua>/`:

```
src/content/posts/
  ca/rag-en-produccio.md     → /p/rag-en-produccio
  es/rag-en-produccio.md     → /es/p/rag-en-produccio
  en/rag-en-produccio.md     → /en/p/rag-en-produccio
```

**El nom del fitxer lliga les traduccions.** Mateix nom = mateix post en
una altra llengua, i el selector d'idioma hi salta directament. Un post pot
existir en una sola llengua: no passa res.

Capçalera mínima:

```yaml
---
title: "RAG en producció"
description: "Què es trenca quan el corpus deixa de cabre a la finestra."
date: 2026-08-14
tags: ["rag", "llm", "producció"]
---
```

El **número de post** (Post 01, Post 02…) no s'escriu: es calcula sol
ordenant-los per data. Els detalls de la sintaxi ampliada (notes al
marge, destacats, avisos) són a [CLAUDE.md](CLAUDE.md).

## Estructura

```
src/
  content/posts/{ca,es,en}/   Els posts, en Markdown
  content.config.ts           Esquema de la capçalera YAML
  components/                 Peces d'interfície (.astro)
  layouts/                    Base.astro i Numero.astro (el post)
  pages/                      Rutes (vegeu més avall)
  i18n/ui.ts                  Textos de la interfície en ca / es / en
  lib/posts.ts                Numeració, agrupació i traduccions
  plugins/                    Plugins de Sätteri: blocs `:::` i embolcalls
  styles/global.css           Sistema de disseny
public/
  fonts/                      woff2 auto-hostatjats
deploy/                       Bloc de Caddy, nginx del contenidor i runbook
```

Rutes generades:

| URL | Què és |
|---|---|
| `/`, `/es/`, `/en/` | Portada: últim post + llista completa |
| `/p/<slug>` | Un post |
| `/t/<etiqueta>` | Posts amb aquesta etiqueta |
| `/rss.xml` | Feed (un per llengua) |
| `/sitemap-index.xml` | Sitemap amb `hreflang` |

## Desplegament

No es desplega des d'aquí. El runbook complet és a
[deploy/README.md](deploy/README.md); en curt, al VPS:

```bash
cd /srv/personal/blog && git pull && docker compose -f compose.prod.yml up -d --build
```
