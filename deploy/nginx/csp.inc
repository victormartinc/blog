# La CSP de esta web (2026-11-20, auditoría de seguridad H8): lo que la página puede cargar y
# ejecutar. Lo que va en línea, por su huella sha256: si cambia un solo byte de ese CSS o JS,
# se vuelven a sacar (node ~/.claude/skills/validate-demo/scripts/csp-propone.mjs https://<dominio>/)
# y se prueba con csp-prueba.mjs. Se incluye en el server y en CADA location con add_header.

  add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'sha256-ynZrtOcqSp2VtdsaS1i48J8LeqxruC3xOP98N9O5iA0=' 'sha256-XzzHSB+yusGPleynCPpLzY9ALeAKrikfku/mU4NTcM0=' 'sha256-Y8T3xTq5pmjyEgC2QCXuq/mG69b8Gbn01ti/TzJxphg='; style-src 'self' 'unsafe-hashes' 'sha256-7uP4UMn0lzlm+J1RYqmY7+9oGVF+O/z16924/Q7zptE=' 'sha256-+6kbKDh2YqhAQcQHd6jrKRBMR72M/fbCEyXxUVLCdIM='; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; form-action 'self' https://wa.me https://api.whatsapp.com; frame-ancestors 'self'; base-uri 'self'; object-src 'none'" always;
