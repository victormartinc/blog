import { getCollection, type CollectionEntry } from "astro:content";
import { LLENGUA_DEFECTE, LLENGUES, type Llengua, esLlengua } from "../i18n/ui";

/**
 * Tota la lògica de la revista: numeració dels exemplars, agrupació per any,
 * enllaç entre traduccions i construcció d'URL. Les pàgines no haurien de
 * calcular res d'això pel seu compte.
 */

export type Entrada = CollectionEntry<"posts">;

export interface Numero {
  entrada: Entrada;
  /** Llengua deduïda de la carpeta: `posts/ca/…` → `ca`. */
  llengua: Llengua;
  /** Nom del fitxer sense extensió. És alhora slug d'URL i clau de traducció. */
  slug: string;
  /** Número d'exemplar, calculat per data. El més antic és l'1. */
  exemplar: number;
  /** Minuts de lectura, arrodonits cap amunt i mai per sota d'1. */
  minuts: number;
  /** Llengües en què existeix aquest mateix número. */
  traduccions: Llengua[];
  url: string;
  data: Date;
}

/** Paraules per minut. Prosa tècnica amb codi enmig: es llegeix a poc a poc. */
const PPM = 190;

/** En desenvolupament els esborranys es veuen; a producció, no existeixen. */
const MOSTRA_ESBORRANYS = !import.meta.env.PROD;

function separa(id: string): { llengua: Llengua; slug: string } | null {
  const tall = id.indexOf("/");
  if (tall === -1) return null;
  const llengua = id.slice(0, tall);
  const slug = id.slice(tall + 1);
  if (!esLlengua(llengua) || !slug) return null;
  return { llengua, slug };
}

function minutsDe(cos: string | undefined): number {
  if (!cos) return 1;
  const paraules = cos.trim().split(/\s+/).length;
  return Math.max(1, Math.round(paraules / PPM));
}

export function urlPortada(llengua: Llengua): string {
  return llengua === LLENGUA_DEFECTE ? "/" : `/${llengua}/`;
}

export function urlNumero(llengua: Llengua, slug: string): string {
  return llengua === LLENGUA_DEFECTE ? `/p/${slug}/` : `/${llengua}/p/${slug}/`;
}

export function urlEtiqueta(llengua: Llengua, etiqueta: string): string {
  const e = encodeURIComponent(etiqueta);
  return llengua === LLENGUA_DEFECTE ? `/t/${e}/` : `/${llengua}/t/${e}/`;
}

export function urlFeed(llengua: Llengua): string {
  return llengua === LLENGUA_DEFECTE ? "/rss.xml" : `/${llengua}/rss.xml`;
}

/**
 * Tots els números de totes les llengües, ja numerats i amb les traduccions
 * resoltes. Ordenats del més nou al més antic.
 *
 * La numeració és global i **compartida entre traduccions**: el mateix
 * article en català i en anglès és el mateix exemplar. Per això s'agrupa
 * primer per slug, s'ordena cada grup per la seva data més antiga, i el
 * número resultant es reparteix a totes les versions.
 */
export async function carregaNumeros(): Promise<Numero[]> {
  const brutes = await getCollection("posts", ({ data }) => MOSTRA_ESBORRANYS || !data.draft);

  const parells = brutes
    .map((entrada) => ({ entrada, parts: separa(entrada.id) }))
    .filter((x): x is { entrada: Entrada; parts: { llengua: Llengua; slug: string } } =>
      x.parts !== null,
    );

  /* slug → totes les seves versions, sigui quina sigui la llengua */
  const perSlug = new Map<string, typeof parells>();
  for (const p of parells) {
    const grup = perSlug.get(p.parts.slug);
    if (grup) grup.push(p);
    else perSlug.set(p.parts.slug, [p]);
  }

  /* La data d'un exemplar és la de la seva versió més antiga: traduir un
     article mesos després no l'ha de moure al final de la col·lecció. */
  const ordreSlugs = [...perSlug.entries()]
    .map(([slug, grup]) => ({
      slug,
      primera: Math.min(...grup.map((g) => g.entrada.data.date.getTime())),
    }))
    .sort((a, b) => a.primera - b.primera || a.slug.localeCompare(b.slug));

  const exemplarPerSlug = new Map<string, number>();
  ordreSlugs.forEach((x, i) => exemplarPerSlug.set(x.slug, i + 1));

  const numeros: Numero[] = parells.map(({ entrada, parts }) => {
    const germans = perSlug.get(parts.slug) ?? [];
    const traduccions = LLENGUES.filter((l) => germans.some((g) => g.parts.llengua === l));

    return {
      entrada,
      llengua: parts.llengua,
      slug: parts.slug,
      exemplar: exemplarPerSlug.get(parts.slug) ?? 0,
      minuts: minutsDe(entrada.body),
      traduccions,
      url: urlNumero(parts.llengua, parts.slug),
      data: entrada.data.date,
    };
  });

  return numeros.sort((a, b) => b.data.getTime() - a.data.getTime() || b.exemplar - a.exemplar);
}

/** Els números publicats en una llengua, del més nou al més antic. */
export async function numerosDe(llengua: Llengua): Promise<Numero[]> {
  const tots = await carregaNumeros();
  return tots.filter((n) => n.llengua === llengua);
}

/** Agrupa per any de publicació, de l'any més recent al més antic. */
export function perAny(numeros: Numero[]): { any: number; numeros: Numero[] }[] {
  const mapa = new Map<number, Numero[]>();
  for (const n of numeros) {
    const any = n.data.getFullYear();
    const grup = mapa.get(any);
    if (grup) grup.push(n);
    else mapa.set(any, [n]);
  }
  return [...mapa.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([any, numeros]) => ({ any, numeros }));
}

/** Etiquetes d'una llengua amb quants números en tenen, de més a menys. */
export function etiquetesDe(numeros: Numero[]): { etiqueta: string; compte: number }[] {
  const compte = new Map<string, number>();
  for (const n of numeros) {
    for (const e of n.entrada.data.tags) {
      compte.set(e, (compte.get(e) ?? 0) + 1);
    }
  }
  return [...compte.entries()]
    .map(([etiqueta, compte]) => ({ etiqueta, compte }))
    .sort((a, b) => b.compte - a.compte || a.etiqueta.localeCompare(b.etiqueta));
}

/**
 * Una entrada per cada parella (llengua, etiqueta) que tingui algun número.
 * És el que alimenta el `getStaticPaths` de les pàgines d'etiqueta; `tambeA`
 * diu a quines altres llengües existeix la mateixa etiqueta, per no oferir
 * una traducció que acabaria en un llistat buit.
 */
export async function paginesEtiqueta(): Promise<
  { llengua: Llengua; etiqueta: string; numeros: Numero[]; tambeA: Llengua[] }[]
> {
  const tots = await carregaNumeros();

  const perLlengua = new Map<Llengua, Map<string, Numero[]>>();
  for (const n of tots) {
    const mapa = perLlengua.get(n.llengua) ?? new Map<string, Numero[]>();
    for (const e of n.entrada.data.tags) {
      const llista = mapa.get(e) ?? [];
      llista.push(n);
      mapa.set(e, llista);
    }
    perLlengua.set(n.llengua, mapa);
  }

  const pagines: { llengua: Llengua; etiqueta: string; numeros: Numero[]; tambeA: Llengua[] }[] = [];
  for (const [llengua, mapa] of perLlengua) {
    for (const [etiqueta, numeros] of mapa) {
      const tambeA = LLENGUES.filter((l) => perLlengua.get(l)?.has(etiqueta));
      pagines.push({ llengua, etiqueta, numeros, tambeA });
    }
  }
  return pagines;
}

/**
 * Els números immediatament anterior i posterior dins de la mateixa llengua.
 * `anterior` és el més antic — l'ordre de lectura d'una col·lecció.
 */
export function veins(
  numeros: Numero[],
  actual: Numero,
): { anterior?: Numero; seguent?: Numero } {
  const i = numeros.findIndex((n) => n.slug === actual.slug);
  if (i === -1) return {};
  return { seguent: numeros[i - 1], anterior: numeros[i + 1] };
}

const BCP47: Record<Llengua, string> = { ca: "ca-ES", es: "es-ES", en: "en-GB" };

/** «14 d'agost del 2026» / «14 de agosto de 2026» / «14 August 2026». */
export function formataData(data: Date, llengua: Llengua): string {
  return new Intl.DateTimeFormat(BCP47[llengua], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(data);
}

/**
 * «ag 2026» — el que va al segell i a la línia de bandera.
 *
 * Es munta per parts en comptes de formatar la data sencera perquè el
 * català insereix un «del» («ag. del 2026») que en un segell de tres línies
 * no hi cap i no aporta res.
 */
export function formataMesAny(data: Date, llengua: Llengua): string {
  const parts = new Intl.DateTimeFormat(BCP47[llengua], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(data);

  const mes = parts.find((p) => p.type === "month")?.value.replace(/\.$/, "") ?? "";
  const any = parts.find((p) => p.type === "year")?.value ?? "";
  return `${mes} ${any}`.trim();
}

/** Data en ISO curt (`2026-08-14`) per als atributs `datetime`. */
export function dataISO(data: Date): string {
  return data.toISOString().slice(0, 10);
}
