---
title: "Per què un quadern"
subtitle: "Notes al marge d'una feina que passa massa de pressa"
description: "Obro un quadern per escriure les decisions que normalment es queden al cap. Què hi haurà, per què no hi ha calendari, i per què en tres llengües."
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
afegeixo és treure-li el calendari de sobre, que per a mi és el que fa que
sobrevisqui.
:::

## Sense calendari

Escriure per calendari em sortiria malament. Ho he provat, i el resultat
previsible són apunts a mitges publicats per no trencar la ratxa. Així que
aquí no hi ha periodicitat: la unitat no és la setmana ni el mes, és el
**número**. Numerat i datat, com una revista petita que surt quan té alguna
cosa a dir.

Pot ser que un mes n'hi hagi tres i que el següent no n'hi hagi cap. Això no
és deixadesa: és la condició. El que decideix que un número surti no és la
data, és que la idea hagi aguantat. El que sembla brillant un dijous a les
onze de la nit sovint no sobreviu tres setmanes després, i és millor
descobrir-ho abans de publicar-ho que després.

:::destacat
Publicar per calendari acaba sent omplir pàgines. Un número surt quan la
idea ha aguantat el refredament, i no abans.
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
decideix on existeix**. Traduir-ho tot seria triplicar la feina que menys
m'aporta, i el resultat previsible és deixar d'escriure.

Així que la regla és aquesta: escric en la llengua que em surti per al tema,
i tradueixo el que crec que val la pena traduir. Si arribes a un número que
no és a la teva llengua, el selector de dalt et portarà a la portada en
comptes de deixar-te en un carreró sense sortida.

---

Aquest és el número 01. Si vols els següents, hi ha [un feed](/rss.xml); si
vols discutir-ne algun, [escriu-me](mailto:victor@victormartinc.com). Les
dues coses funcionen millor que un formulari de comentaris.
