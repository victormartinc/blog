---
title: "Por qué un cuaderno"
subtitle: "Notas al margen de un trabajo que pasa demasiado deprisa"
description: "Abro un cuaderno mensual para escribir las decisiones que normalmente se quedan en la cabeza. Qué habrá, cada cuánto, y por qué en tres idiomas."
date: 2026-07-29
tags: ["meta", "escritura", "ingeniería"]
---

Cada proyecto que termino deja un poso que no queda en ninguna parte. No
hablo del código —eso sí queda, y con historial— sino de la capa de debajo:
por qué elegimos esta base de datos y no la otra, qué dimos por bueno sin
medir, qué decisión de hace seis meses nos ha costado una semana ahora. Esa
capa vive en la cabeza, y la cabeza es un soporte pésimo.

Este cuaderno es el intento de escribirla.

:::marge
La idea no es nueva: es el *engineering notebook* de toda la vida. Lo que le
añado es la cadencia, que para mí es lo que hace que sobreviva.
:::

## Un número al mes, y ya

Escribir a menudo me saldría mal. Lo he probado, y el resultado previsible
son apuntes a medias publicados por no romper la racha. Así que la unidad
aquí no es el post: es el **número**. Uno al mes, numerado y fechado, como
una revista pequeña.

La restricción hace dos cosas. La primera, obvia: obliga a tener algo que
decir. La segunda es menos evidente y me importa más —un mes es tiempo
suficiente para que una idea se enfríe. Lo que parece brillante un jueves a
las once de la noche a menudo no sobrevive tres semanas después, y mejor
descubrirlo antes de publicarlo que después.

:::destacat
Un mes es tiempo suficiente para que una idea se enfríe. Lo que no sobreviva
al enfriamiento, probablemente no valía la pena.
:::

## De qué trata

De cosas que he tocado con las manos. La lista corta:

- **IA aplicada de verdad.** No lo que hace un modelo en una demo, sino qué
  se rompe cuando el corpus crece, cuando el usuario escribe mal o cuando la
  factura llega a final de mes.
- **Sistemas e infraestructura.** Servidores propios, contenedores, dominios,
  certificados. Cosas aburridas hasta que se caen.
- **Decisiones y su coste.** Esta es la que más me interesa. Toda decisión
  técnica es una apuesta con fecha de vencimiento, y casi nunca escribimos su
  resultado.

Lo que no habrá: tutoriales de cosas que nunca he usado, y opiniones sobre
tecnologías que solo he leído.

:::nota[Sobre los ejemplos]
Cuando haya código será código que ha corrido de verdad, con sus retoques y
todo. Un fragmento que solo funciona en el artículo no enseña nada.
:::

## Cómo está hecho esto

La web es estática: Markdown que se compila a HTML y punto. Ninguna base de
datos, ningún proceso vivo, ningún servicio de terceros. Un contenedor con un
nginx dentro, igual que el resto de cosas que sirvo.

```bash
# Un número nuevo es un fichero. Publicarlo es un commit.
vim src/content/posts/es/mi-numero.md
npm run build
git commit -am "Núm. 02"
```

Lo cuento porque es coherente con lo que pienso escribir: si defiendo decidir
a conciencia, vale la pena enseñar las decisiones de aquí. La más discutible
es la de los idiomas.

## Tres idiomas, sin promesas

El cuaderno está montado en catalán, castellano e inglés, pero **cada número
decide dónde existe**. Traducirlo todo cada mes sería triplicar el trabajo
que menos me aporta, y el resultado previsible es dejar de escribir.

Así que la regla es esta: escribo en el idioma que me salga para el tema, y
traduzco lo que creo que vale la pena traducir. Si llegas a un número que no
está en tu idioma, el selector de arriba te llevará a la portada en lugar de
dejarte en un callejón sin salida.

---

Este es el número 01. Si quieres los siguientes, hay [un feed](/es/rss.xml);
si quieres discutir alguno, [escríbeme](mailto:victor@victormartinc.com). Las
dos cosas funcionan mejor que un formulario de comentarios.
