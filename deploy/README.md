# Desplegament — Marginalia (blog.victormartinc.com)

Patró estàndard del VPS `tfg-victor-2026` des del reset del 23-07-2026:
**Caddy** fa de reverse-proxy i gestiona el TLS, i cada web és un contenidor
sense ports al host, unit a la xarxa Docker `web`. Caddy hi arriba pel nom
del contenidor.

> Si véns del patró antic (nginx de Mailcow, `ADDITIONAL_SAN`, vhosts a
> `/opt/mailcow/data/conf/nginx/`): ja no s'utilitza. Alguns repos d'aquesta
> carpeta encara el documenten i estan desactualitzats.

La diferència amb el portfolio és que aquí hi ha **build**: la imatge es
construeix en dues etapes (Node compila l'Astro, nginx serveix el `dist/`).
La imatge final no porta ni Node ni `node_modules`.

## Peces

| Fitxer | On acaba | Què fa |
|---|---|---|
| `Dockerfile` | imatge `blog:latest` | build d'Astro + nginx |
| `compose.prod.yml` | `docker compose` | servei `blog` a la xarxa `web` |
| `deploy/nginx/container.conf` | `/etc/nginx/conf.d/default.conf` dins del contenidor | rutes i cache |
| `deploy/caddy/blog.victormartinc.com.caddy` | *(còpia de referència)* | el bloc que `add-site.sh` afegeix al Caddyfile |

El nginx del `container.conf` és l'**intern del contenidor**, el que serveix
els fitxers. No té res a veure amb el TLS ni amb el domini: d'això se n'ocupa
Caddy.

## Alta inicial (una sola vegada)

1. **DNS** — cal un registre `A` de `blog.victormartinc.com` → `46.224.196.18`.
   **Encara no existeix** (comprovat el 29-07-2026). Sense DNS, Let's Encrypt
   no pot validar el domini i Caddy no aconsegueix el certificat.

   ```bash
   dig +short blog.victormartinc.com
   ```

2. **Clonar i aixecar el contenidor** al VPS:

   ```bash
   ssh hetzner_tfg_2026
   git clone git@github.com:victormartinc/blog.git ~/personal/blog
   cd ~/personal/blog
   docker compose -f compose.prod.yml up -d --build
   docker compose -f compose.prod.yml ps        # ha de sortir healthy
   ```

3. **Publicar el domini** — l'script del servidor ho fa tot (afegeix el bloc
   al Caddyfile, valida, recarrega i verifica). **No cal sudo**: Caddy corre
   dins de Docker.

   ```bash
   /home/victor/server/caddy/add-site.sh blog.victormartinc.com blog 80
   ```

   Si el bloc ja hi és, l'script s'atura i avisa en comptes de duplicar-lo.

## Actualitzar un número ja publicat

```bash
ssh hetzner_tfg_2026
cd ~/personal/blog && git pull && docker compose -f compose.prod.yml up -d --build
docker image prune -f
```

El `--build` no és opcional: el contingut viu dins de la imatge, així que
sense reconstruir-la el `git pull` no canvia res del que es serveix.

## Rollback

El `dist/` viu dins de la imatge, o sigui que tornar enrere és tornar el codi
enrere i reconstruir:

```bash
cd ~/personal/blog
git log --oneline -5
git checkout <sha-bo>
docker compose -f compose.prod.yml up -d --build
```

Per tornar al capdavall: `git checkout main && docker compose -f compose.prod.yml up -d --build`.

Si el que falla és el proxy i no el contingut, treu el bloc del Caddyfile i
recarrega. La resta de dominis del VPS no en depenen:

```bash
docker exec caddy caddy validate --config /etc/caddy/Caddyfile
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

## Diagnòstic ràpid

```bash
docker compose -f compose.prod.yml logs --tail 50    # nginx del contenidor
docker inspect --format '{{.State.Health.Status}}' blog
docker inspect blog --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'  # ha de dir: web
docker logs caddy --tail 30                          # certificats i proxy
curl -sI https://blog.victormartinc.com/ | head -1
```

Un 502 vol dir que Caddy no arriba al contenidor: o no està viu, o no és a la
xarxa `web`.

## Nota sobre la configuració de Caddy

El Caddyfile, el seu compose i `add-site.sh` viuen a
`/home/victor/server/caddy/` **i no estan en cap repo**. Aquest fitxer
`deploy/caddy/*.caddy` només guarda la part que correspon a aquest lloc; la
configuració global del proxy segueix existint només al servidor.
