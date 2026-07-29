---
title: "Per què un quadern"
subtitle: "Notes al marge d'una feina que passa massa de pressa"
description: "Obro un quadern mensual per escriure les decisions que normalment es queden al cap. Què hi haurà, cada quant, i per què en tres llengües."
date: 2026-07-29
tags: ["meta", "escriptura", "enginyeria"]
---

Cada projecte que acabo deixa un pòsit que no queda enlloc. No parlo del codi
—això sí que queda, i amb historial— sinó de la capa de sota: per què vam
triar aquesta base de dades i no l'altra, què vam donar per bo sense mesurar,
quina decisió de fa sis mesos ens ha costat una setmana ara. Aquesta capa viu
al cap, i el cap és un suport terrible.

Aquest quadern és l'intent d'escriure-la.

:::marge
La idea no és nova: és el *engineering notebook* de tota la vida. El que hi
afegeixo és la cadència, que per a mi és el que fa que sobrevisqui.
:::

## Un número al mes, i prou

Escriure sovint em sortiria malament. Ho he provat, i el resultat previsible
és apunts a mitges publicats per no trencar la ratxa. Així que la unitat aquí
no és el post: és el **número**. Un al mes, numerat i datat, com una revista
petita.

La restricció fa dues coses. La primera, obvia: obliga a tenir alguna cosa a
dir. La segona és menys evident i m'importa més —un mes és prou temps perquè
una idea es refredi. El que sembla brillant un dijous a les onze de la nit
sovint no sobreviu al cap de tres setmanes, i millor descobrir-ho abans de
publicar-ho que després.

:::destacat
Un mes és prou temps perquè una idea es refredi. El que no sobrevisqui al
refredament, probablement no valia la pena.
:::

## De què tracta

De coses que he tocat amb les mans. La llista curta:

- **IA aplicada de veritat.** No el que fa un model en una demo, sinó què es
  trenca quan el corpus creix, quan l'usuari escriu malament o quan la
  factura arriba a final de mes.
- **Sistemes i infraestructura.** Servidors propis, contenidors, dominis,
  certificats. Coses avorrides fins que cauen.
- **Decisions i el seu cost.** Aquesta és la que més m'interessa. Tota
  decisió tècnica és una aposta amb data de venciment, i quasi mai
  n'escrivim el resultat.

El que no hi haurà: tutorials de coses que no he fet servir mai, i opinions
sobre tecnologies que només he llegit.

:::nota[Sobre els exemples]
Quan hi hagi codi serà codi que ha corregut de debò, amb els seus retocs i
tot. Un fragment que només funciona a l'article no ensenya res.
:::

## Com està fet això

La web és estàtica: Markdown que es compila a HTML i prou. Cap base de dades,
cap procés viu, cap servei de tercers. Un contenidor amb un nginx a dins,
igual que la resta de coses que serveixo.

```bash
# Un número nou és un fitxer. Publicar-lo és un commit.
vim src/content/posts/ca/el-meu-numero.md
npm run build
git commit -am "Núm. 02"
```

Ho explico perquè és coherent amb el que penso escriure: si defenso decidir a
consciència, val la pena ensenyar les decisions d'aquí. La més discutible és
la de les llengües.

## Tres llengües, sense promeses

El quadern està muntat en català, castellà i anglès, però **cada número
decideix on existeix**. Traduir-ho tot cada mes seria triplicar la feina que
menys m'aporta, i el resultat previsible és deixar d'escriure.

Així que la regla és aquesta: escric en la llengua que em surti per al tema,
i tradueixo el que crec que val la pena traduir. Si arribes a un número que
no és a la teva llengua, el selector de dalt et portarà a la portada en
comptes de deixar-te en un carreró sense sortida.

---

Aquest és el número 01. Si vols els següents, hi ha [un feed](/rss.xml); si
vols discutir-ne algun, [escriu-me](mailto:victor@victormartinc.com). Les
dues coses funcionen millor que un formulari de comentaris.
