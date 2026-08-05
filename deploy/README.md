# Desplegament

El blog es serveix com un **contenidor sense ports al host**, unit a una
xarxa Docker compartida (`web`) on hi ha un reverse-proxy al davant que
acaba el TLS i hi arriba pel nom del contenidor (`blog`).

Aquest fitxer descriu com s'executa el blog. Els detalls del servidor
concret —rutes, ordres d'alta del domini, estat dels certificats— viuen al
propi servidor, no aquí: `/srv/CLAUDE.md` del servidor (prod-01).

## Peces

| Fitxer | On acaba | Què fa |
|---|---|---|
| `Dockerfile` | imatge `blog:latest` | build d'Astro + nginx |
| `compose.prod.yml` | `docker compose` | servei `blog` a la xarxa `web` |
| `deploy/nginx/container.conf` | `/etc/nginx/conf.d/default.conf` dins del contenidor | rutes i cache |
| `deploy/caddy/blog.victormartinc.com.caddy` | *(còpia de referència)* | el bloc que el proxy necessita per a aquest domini |

El nginx del `container.conf` és l'**intern del contenidor**, el que serveix
els fitxers. No té res a veure amb el TLS ni amb el domini.

## Alta inicial

1. **DNS** — el domini ha d'apuntar al servidor **abans** de publicar-lo, o
   Let's Encrypt no el pot validar. Sense proxy pel mig (a Cloudflare, «DNS
   only»): amb el proxy activat el repte HTTP-01 no arriba.

2. **Clonar i aixecar el contenidor**:

   ```bash
   git clone git@github.com:victormartinc/blog.git
   cd blog
   docker compose -f compose.prod.yml up -d --build
   docker compose -f compose.prod.yml ps        # ha de sortir healthy
   ```

3. **Publicar el domini** al reverse-proxy, amb el bloc de
   `deploy/caddy/`. Al servidor hi ha un script que ho fa tot (afegir el
   bloc, validar, recarregar i demanar el certificat).

## Actualitzar

```bash
git pull && docker compose -f compose.prod.yml up -d --build
docker image prune -f
```

El `--build` no és opcional: el contingut viu dins de la imatge, així que
sense reconstruir-la el `git pull` no canvia res del que es serveix.

## Rollback

El `dist/` viu dins de la imatge, o sigui que tornar enrere és tornar el codi
enrere i reconstruir:

```bash
git log --oneline -5
git checkout <sha-bo>
docker compose -f compose.prod.yml up -d --build
```

Per tornar al capdavall: `git checkout main` i reconstruir.

## Diagnòstic

```bash
docker compose -f compose.prod.yml logs --tail 50    # nginx del contenidor
docker inspect --format '{{.State.Health.Status}}' blog
docker inspect blog --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```

L'última ordre ha de dir `web`. Un 502 vol dir que el proxy no arriba al
contenidor: o no està viu, o no és a la xarxa compartida.
