# Marginalia — imatge de producció.
#
# Dues etapes: Node compila l'Astro a HTML estàtic, nginx el serveix. La
# imatge final NO porta Node ni node_modules; és el mateix patró d'nginx
# alpine que la resta de webs del VPS (vegeu ~/webs/_template al servidor).
# nginx alpine porta wget, necessari per al healthcheck.

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
FROM nginx:1.27-alpine
COPY deploy/nginx/container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

EXPOSE 80
