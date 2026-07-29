# Desplegament — Marginalia (blog.victormartinc.com)

Patró estàndard del VPS `tfg-victor-2026`: contenidor nginx a la xarxa de
Mailcow, sense ports al host. El nginx de Mailcow acaba el TLS i fa de proxy
cap al contenidor pel seu nom de servei (`blog`).

La diferència amb el portfolio és que aquí hi ha **build**: la imatge es
construeix en dues etapes (Node compila l'Astro, nginx serveix el `dist/`).
La imatge final no porta ni Node ni `node_modules`.

## Peces

| Fitxer | On acaba | Què fa |
|---|---|---|
| `Dockerfile` | imatge `blog:latest` | build d'Astro + nginx |
| `compose.prod.yml` | `docker compose` | servei `blog`, xarxa de Mailcow |
| `deploy/nginx/container.conf` | `/etc/nginx/conf.d/default.conf` dins del contenidor | rutes i cache |
| `deploy/blog_victormartinc_com.conf` | `/opt/mailcow/data/conf/nginx/` | vhost públic + TLS |
| `deploy/publish-blog.sh` | s'executa al VPS | instal·la el vhost, afegeix el SAN, recarrega nginx |

## Alta inicial (una sola vegada)

1. **DNS** — registre `A` de `blog.victormartinc.com` → IP del VPS
   (`46.224.196.18`). Comprova-ho abans de continuar: sense DNS, Let's
   Encrypt no pot validar el domini i el pas 3 falla.

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

3. **Publicar el domini** (instal·la el vhost i reemet el certificat):

   ```bash
   sudo bash ~/personal/blog/deploy/publish-blog.sh
   ```

   L'script és idempotent: es pot tornar a executar sense por.

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

Si el que falla és el vhost i no el contingut, el nginx de Mailcow avisa abans
de recarregar-se (`nginx -t` dins de `publish-blog.sh`); si tot i així queda
trencat, esborra `/opt/mailcow/data/conf/nginx/blog_victormartinc_com.conf` i
recarrega. La resta de dominis del VPS no en depenen.

## Diagnòstic ràpid

```bash
docker compose -f compose.prod.yml logs --tail 50    # errors d'nginx del contenidor
docker inspect --format '{{.State.Health.Status}}' blog
docker exec mailcowdockerized-nginx-mailcow-1 nginx -t
curl -sI https://blog.victormartinc.com/ | head -1
```

Si el vhost respon 502, el contenidor no és a la xarxa de Mailcow o no està
viu: comprova `docker network inspect mailcowdockerized_mailcow-network`.
