# Blog de Víctor Martín — imatge de producció.
#
# Dues etapes: Node compila l'Astro a HTML estàtic, nginx el serveix. La
# imatge final NO porta Node ni node_modules. nginx alpine porta wget, que
# és el que fa servir el healthcheck.

# ---------- etapa 1: build ----------
FROM node:24-alpine AS build
WORKDIR /app

# Primer només els manifests: mentre no canviïn, Docker reaprofita la capa
# d'instal·lació encara que canviï qualsevol article.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- etapa 2: servidor ----------
FROM nginx:1.28-alpine
COPY deploy/nginx/container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Sin comentarios HTML en lo que se publica (2026-11-20, auditoría de seguridad H13): en
# el repo siguen, porque algunos son marcas de las herramientas; aquí no hacen falta y
# contaban cómo se hizo la web. No toca <script> ni <style> (la CSP los valida por huella).
COPY deploy/sin-comentarios.awk /tmp/sin-comentarios.awk
RUN find /usr/share/nginx/html -name '*.html' -exec sh -c 'LC_ALL=C awk -f /tmp/sin-comentarios.awk "$1" > "$1.t" && mv "$1.t" "$1"' _ {} \; \
 && rm /tmp/sin-comentarios.awk

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

EXPOSE 80
