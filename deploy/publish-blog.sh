#!/usr/bin/env bash
# Publica Marginalia a blog.victormartinc.com sobre el nginx de Mailcow.
# Idempotent. Requereix sudo (escriu a /opt/mailcow).
#
#   sudo bash /home/victor/personal/blog/deploy/publish-blog.sh
#
# Prerequisits: registre A de blog.victormartinc.com → VPS, i el contenidor
# `blog` corrent a la xarxa de Mailcow (docker compose -f compose.prod.yml up -d).
set -euo pipefail

DOMAIN="blog.victormartinc.com"
VHOST_SRC="/home/victor/personal/blog/deploy/blog_victormartinc_com.conf"
VHOST_DST="/opt/mailcow/data/conf/nginx/blog_victormartinc_com.conf"
MAILCOW_CONF="/opt/mailcow/mailcow.conf"

if [[ $EUID -ne 0 ]]; then echo "Executa amb sudo: sudo bash $0" >&2; exit 1; fi

echo "→ [1/4] Instal·lo el vhost"
cp "$VHOST_SRC" "$VHOST_DST"
chown root:root "$VHOST_DST"; chmod 644 "$VHOST_DST"

echo "→ [2/4] Afegeixo el SAN (si falta)"
changed=0
if grep -q "^ADDITIONAL_SAN=.*\b${DOMAIN}\b" "$MAILCOW_CONF"; then
  echo "   ja hi era: $DOMAIN"
else
  sed -i "s|^ADDITIONAL_SAN=\(.*\)$|ADDITIONAL_SAN=\1,${DOMAIN}|; s|^ADDITIONAL_SAN=,|ADDITIONAL_SAN=|" "$MAILCOW_CONF"
  echo "   afegit: $DOMAIN"; changed=1
fi

if [[ "$changed" == "1" ]]; then
  echo "→ [3/4] Recreo acme per reemetre el cert amb el domini nou"
  docker compose --project-directory /opt/mailcow up -d --force-recreate acme-mailcow >/dev/null
  echo "   esperant l'emissió del cert (~75s)..."
  sleep 75
else
  echo "→ [3/4] SAN sense canvis, no reemeto"
fi

echo "→ [4/4] Valido i recarrego nginx"
docker exec mailcowdockerized-nginx-mailcow-1 nginx -t
docker exec mailcowdockerized-nginx-mailcow-1 nginx -s reload

echo ""
echo "Verificació:"
code=$(curl -sk -o /dev/null -w '%{http_code}' "https://${DOMAIN}/" --max-time 12 || true)
echo "  https://${DOMAIN}/ → $code"
echo ""
echo "El cert cobreix ${DOMAIN} si apareix a sota:"
echo | openssl s_client -servername "${DOMAIN}" -connect localhost:443 2>/dev/null \
  | openssl x509 -noout -ext subjectAltName 2>/dev/null \
  | grep -o "${DOMAIN}" | head -1 || echo "  (encara no — revisa els logs d'acme)"
echo ""
echo "✓ Fet."
