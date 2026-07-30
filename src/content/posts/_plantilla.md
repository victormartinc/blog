---
title: "Títol del post"
subtitle: "Opcional — surt en cursiva sota el títol"
description: "Una frase. Va al feed, a la portada i a les metaetiquetes, o sigui que és el primer que llegeix algú que encara no ha entrat."
date: 2026-01-01
tags: ["etiqueta-1", "etiqueta-2"]
draft: true
---

<!--
  PLANTILLA — aquest fitxer no es publica mai.

  El carregador de contingut ignora tot el que comenci per guió baix
  (`src/content.config.ts`), així que aquest fitxer no genera cap pàgina ni
  entra al feed. Per començar un post nou:

      cp src/content/posts/_plantilla.md src/content/posts/ca/el-meu-slug.md

  El nom del fitxer és el slug de la URL i la clau que lliga les traduccions:
  `ca/el-meu-slug.md` i `en/el-meu-slug.md` són el mateix post en dues
  llengües. El número de post es calcula sol per data.

  Esborra aquest comentari i el `draft: true` quan el post sigui de veritat.
-->

El primer paràgraf porta capitular. Convé que comenci amb una lletra normal i
que la primera frase aguanti sola, perquè és la que es llegeix sencera abans
de decidir si es continua.

## Un apartat

Text normal, amb **negreta**, *cursiva*, `codi en línia` i
[enllaços](https://victormartinc.com). El sumari plegable només apareix si el
post té tres apartats de nivell 2 o més; per sota d'això només fa nosa.

### Un subapartat

Les llistes van bé per enumerar decisions:

- Primer punt.
- Segon punt, que pot ocupar més d'una línia sense que passi res.
- Tercer.

I les taules, per comparar:

| Opció | A favor | En contra |
|---|---|---|
| La primera | Ràpida | Cara |
| La segona | Barata | Lenta |

## Els quatre blocs propis

:::marge
Nota al marge. En pantalles amples surt a la dreta, alineada amb el paràgraf
on l'has escrita, i es numera sola. En mòbil cau dins del text, sagnada.
Va bé per a l'aclariment que interrompria si anés al cos.
:::

Aquest paràgraf és el que la nota del costat acompanya. Les notes al marge
són l'element que distingeix la maqueta: si en tot un post no n'hi ha cap,
potser el text està massa net.

:::destacat
La cita destacada es fa servir un cop per post, com a molt. Dues ja no
destaquen res.
:::

:::nota[Títol opcional]
Caixa d'aclariment. Per al context que cal però que no pertany al fil
principal: una versió mínima, una limitació coneguda, una nota de compatibilitat.
:::

:::avis[Compte]
La mateixa caixa amb l'accent d'advertència. Per al que pot trencar alguna
cosa si es passa per alt.
:::

## Codi

Els blocs porten el llenguatge a la barra de dalt i un botó de copiar:

```ts
// El llenguatge de la tanca decideix el ressaltat i l'etiqueta de la barra.
export function exemple(entrada: string): string {
  return entrada.trim().toLowerCase();
}
```

Sense llenguatge, la barra diu `text` i no hi ha ressaltat:

```
$ docker compose -f compose.prod.yml up -d --build
```

## Notes al peu i imatges

També hi ha notes al peu de GFM[^1], que s'acumulen al final del post.

![Peu de la imatge](/img/exemple.jpg)

[^1]: Van bé per a la referència bibliogràfica; per a l'aclariment que vols
que es llegeixi, és millor `:::marge`.
