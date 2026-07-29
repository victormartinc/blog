// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { plugiMarginalia } from "./src/plugins/marginalia.mjs";
import { plugiEnvolts, plugiBarraCodi } from "./src/plugins/envolts.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.victormartinc.com",

  // Català com a llengua per defecte (sense prefix, com al portfolio);
  // castellà i anglès pengen de /es/ i /en/. Cada número decideix a quines
  // llengües existeix: no hi ha cap obligació de traduir-ho tot.
  i18n: {
    defaultLocale: "ca",
    locales: ["ca", "es", "en"],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "ca",
        locales: { ca: "ca-ES", es: "es-ES", en: "en" },
      },
    }),
  ],

  markdown: {
    processor: satteri({
      features: {
        // Habilita la sintaxi `:::marge`, `:::nota`, `:::destacat` i `:::avis`.
        // Vegeu CLAUDE.md, "Com s'escriu un número".
        directive: true,
        // Cometes tipogràfiques, guions llargs i punts suspensius de veritat.
        // En una revista que presumeix de composició, «"» no és acceptable.
        smartPunctuation: true,
      },
      mdastPlugins: [plugiMarginalia],
      // L'ordre importa: plugiBarraCodi necessita l'embolcall que crea
      // plugiEnvolts, i cada plugin és una passada pròpia sobre l'arbre.
      hastPlugins: [plugiEnvolts, plugiBarraCodi],
    }),
    shikiConfig: {
      // Dos temes alhora: Shiki emet --shiki-light i --shiki-dark a cada span
      // i el CSS tria segons [data-theme]. Amb defaultColor: false no hi ha
      // color "guanyador" per defecte, així que el canvi de tema és instantani
      // i no depèn de prefers-color-scheme.
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
      defaultColor: false,
      wrap: false,
    },
  },
});
