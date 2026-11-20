# Quita los comentarios HTML de una página, al construir la imagen (Dockerfile).
#
#   LC_ALL=C awk -f sin-comentarios.awk pagina.html > pagina.limpia
#
# Desde el 2026-11-20 (auditoría de seguridad H13): en mas-comabella y gimnasceec el
# código fuente publicado llevaba 30 y 27 comentarios que contaban cómo se hizo la web
# y nombraban a otro cliente. En el repo siguen, porque algunos son marcas que usan las
# herramientas (primer-pintat, idiomas: «<!-- idiomas:alternates -->»); en lo que se
# publica no hace falta ninguno.
#
# NO toca lo que hay dentro de <script> y <style>: la CSP de la plantilla valida el CSS
# y el JS en línea por su huella (sha256), y cambiar un solo byte lo bloquearía. Deja
# también los comentarios condicionales (<!--[if …]>) y las MARCAS de programa: un
# comentario sin espacios, como <!--CARTA:inici--> o <!--ESDEVENIMENTS:fi-->, que el editor
# de la carta de Cal Ros usa en vivo para reescribir la página. Una nota de verdad siempre
# lleva espacios, y esas sí se van. LC_ALL=C: trabaja con bytes, para
# que las posiciones de la copia en minúsculas cuadren siempre con las del original.
# Es awk de busybox, el que trae nginx:alpine: sin extensiones de gawk.
{ s = s $0 "\n" }
END {
  low = tolower(s); out = ""
  while (1) {
    c = index(low, "<!--")
    if (c == 0) { out = out s; break }
    # El primer <script o <style que empiece antes del comentario se copia entero.
    sc = index(low, "<script"); st = index(low, "<style")
    b = 0; cierre = ""
    if (sc && (!st || sc < st)) { b = sc; cierre = "</script" } else if (st) { b = st; cierre = "</style" }
    if (b && b < c) {
      e = index(substr(low, b), cierre)
      if (e == 0) { out = out s; break }
      e = b + e - 1 + length(cierre)          # justo después de «</script»
      out = out substr(s, 1, e - 1); s = substr(s, e); low = substr(low, e)
      continue
    }
    f = index(substr(low, c + 4), "-->")
    if (f == 0) { out = out s; break }       # comentario sin cerrar: se deja tal cual
    fin = c + 4 + f - 1 + 3                   # justo después de «-->»
    cuerpo = substr(s, c + 4, fin - c - 7)    # lo de dentro, sin <!-- ni -->
    if (substr(low, c, 7) == "<!--[if" || cuerpo ~ /^[A-Za-z][A-Za-z0-9_:.-]*$/) out = out substr(s, 1, fin - 1)
    else out = out substr(s, 1, c - 1)
    s = substr(s, fin); low = substr(low, fin)
  }
  printf "%s", out
}
