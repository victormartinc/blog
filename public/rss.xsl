<?xml version="1.0" encoding="UTF-8"?>
<!--
  Full d'estil del feed.

  Un navegador que obre /rss.xml no sap dibuixar RSS i ensenya l'XML en cru
  amb l'avís de «this file does not appear to have any style information».
  Amb aquest XSLT, el navegador el transforma en una pàgina que explica què
  és allò; els lectors de feeds, en canvi, l'ignoren i llegeixen l'XML de
  sempre. No canvia ni una dada del feed.

  XSLT 1.0: és l'única versió que implementen els navegadors. Res de
  for-each-group ni de funcions de la 2.0.

  Serveix per als tres feeds: els textos es trien mirant el <language> del
  propi canal, així que no cal un fitxer per llengua.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:variable name="idioma" select="substring(/rss/channel/language, 1, 2)"/>

  <xsl:template match="/">
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <title>
          <xsl:value-of select="/rss/channel/title"/>
        </title>
        <style>
          @font-face { font-family: "Fraunces"; font-weight: 500 700; font-display: swap;
            src: url("/fonts/fraunces-var-latin.woff2") format("woff2"); }
          @font-face { font-family: "Source Serif 4"; font-weight: 400 600; font-display: swap;
            src: url("/fonts/source-serif-4-var-latin.woff2") format("woff2"); }
          @font-face { font-family: "IBM Plex Mono"; font-weight: 400; font-display: swap;
            src: url("/fonts/plex-mono-400-latin.woff2") format("woff2"); }

          :root {
            --bg: #f1f1ee; --surface: #fafaf9; --text: #24242a; --soft: #55555c;
            --faint: #64646b; --accent: #1f5290; --border: rgba(36,36,42,.16);
            --reticula: rgba(36,36,42,.07);
            color-scheme: light;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #17181a; --surface: #212328; --text: #e5e6eb; --soft: #aaabb2;
              --faint: #90919a; --accent: #8fb4e6; --border: rgba(229,230,235,.14);
              --reticula: rgba(229,230,235,.055);
              color-scheme: dark;
            }
          }

          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 0 24px 72px;
            font-family: "Source Serif 4", Georgia, serif;
            font-size: 17px; line-height: 1.72;
            color: var(--text);
            background-color: var(--bg);
            background-image:
              repeating-linear-gradient(to right, var(--reticula) 0 1px, transparent 1px 24px),
              repeating-linear-gradient(to bottom, var(--reticula) 0 1px, transparent 1px 24px);
            -webkit-font-smoothing: antialiased;
          }
          .full { max-width: 34rem; margin-inline: auto; }

          .filet { border: 0; height: 6px; margin: 0;
            border-top: 2px solid var(--text); border-bottom: 1px solid var(--text); opacity: .82; }
          .cap { padding-top: clamp(48px, 8vw, 84px); text-align: center; }
          .titol { margin: clamp(20px,3vw,30px) 0 0; font-family: "Fraunces", Georgia, serif;
            font-weight: 700; font-size: clamp(2rem, 7vw, 3rem); line-height: 1;
            letter-spacing: .04em; text-transform: uppercase; }
          .marca { margin: 10px 0 clamp(26px,3.5vw,38px); font-family: "IBM Plex Mono", monospace;
            font-size: .74rem; letter-spacing: .14em; text-transform: lowercase; color: var(--accent); }

          .avis { margin: clamp(34px,5vw,52px) 0 0; padding: 22px 24px;
            border: 1px solid var(--border); border-left: 3px solid var(--accent);
            border-radius: 10px; background: var(--surface); }
          .avis p { margin: 0 0 14px; }
          .avis p:last-child { margin-bottom: 0; }
          .adreca { display: block; margin: 4px 0 14px; padding: 12px 14px;
            border: 1px solid var(--border); border-radius: 6px; background: var(--bg);
            font-family: "IBM Plex Mono", monospace; font-size: .84rem;
            word-break: break-all; user-select: all; }
          .apunt { font-size: .92rem; color: var(--soft); }

          .seccio { display: flex; align-items: baseline; gap: 14px;
            margin: clamp(44px,6vw,64px) 0 4px; font-family: "IBM Plex Mono", monospace;
            font-style: italic; font-size: .82rem; letter-spacing: .14em;
            text-transform: lowercase; color: var(--accent); }
          .seccio span { flex: 1; height: 1px; background: var(--border); }

          .post { display: block; padding: 18px 10px 18px 6px; text-decoration: none;
            color: inherit; border-bottom: 1px dashed var(--border); border-radius: 6px; }
          .post:hover { background: var(--surface); }
          .post-titol { display: block; font-family: "Fraunces", Georgia, serif;
            font-weight: 600; font-size: 1.1rem; line-height: 1.35; }
          .post:hover .post-titol { color: var(--accent); }
          .post-data { display: block; margin-top: 4px; font-family: "IBM Plex Mono", monospace;
            font-size: .74rem; color: var(--faint); }
          .post-desc { display: block; margin-top: 6px; font-size: .94rem; color: var(--soft); }

          .tornar { display: inline-block; margin-top: 40px; font-family: "IBM Plex Mono", monospace;
            font-size: .84rem; color: var(--accent); text-decoration: none; }
          .tornar:hover { text-decoration: underline; text-underline-offset: 4px; }
        </style>
      </head>

      <body>
        <div class="full">
          <div class="cap">
            <hr class="filet"/>
            <h1 class="titol">
              <xsl:value-of select="/rss/channel/title"/>
            </h1>
            <p class="marca">
              <xsl:choose>
                <xsl:when test="$idioma = 'es'">feed rss</xsl:when>
                <xsl:when test="$idioma = 'en'">rss feed</xsl:when>
                <xsl:otherwise>feed rss</xsl:otherwise>
              </xsl:choose>
            </p>
            <hr class="filet"/>
          </div>

          <div class="avis">
            <p>
              <xsl:choose>
                <xsl:when test="$idioma = 'es'">Esto es un feed RSS, y no está pensado para leerlo aquí. Copia esta dirección en tu lector de feeds y los posts nuevos te llegarán solos, sin correo ni cuenta de nada.</xsl:when>
                <xsl:when test="$idioma = 'en'">This is an RSS feed, and it isn't meant to be read here. Copy this address into your feed reader and new posts will show up on their own — no email, no account.</xsl:when>
                <xsl:otherwise>Això és un feed RSS, i no està pensat per llegir-lo aquí. Copia aquesta adreça al teu lector de feeds i els posts nous t'arribaran sols, sense correu ni compte enlloc.</xsl:otherwise>
              </xsl:choose>
            </p>
            <code class="adreca">
              <xsl:value-of select="/rss/channel/link"/>
              <xsl:choose>
                <xsl:when test="$idioma = 'es'">es/rss.xml</xsl:when>
                <xsl:when test="$idioma = 'en'">en/rss.xml</xsl:when>
                <xsl:otherwise>rss.xml</xsl:otherwise>
              </xsl:choose>
            </code>
            <p class="apunt">
              <xsl:choose>
                <xsl:when test="$idioma = 'es'">¿No tienes lector? NetNewsWire, Feedly, Thunderbird o Reeder sirven.</xsl:when>
                <xsl:when test="$idioma = 'en'">No reader yet? NetNewsWire, Feedly, Thunderbird or Reeder will do.</xsl:when>
                <xsl:otherwise>No en tens cap? NetNewsWire, Feedly, Thunderbird o Reeder fan la feina.</xsl:otherwise>
              </xsl:choose>
            </p>
          </div>

          <h2 class="seccio">
            <xsl:choose>
              <xsl:when test="$idioma = 'es'">en el feed</xsl:when>
              <xsl:when test="$idioma = 'en'">in the feed</xsl:when>
              <xsl:otherwise>al feed</xsl:otherwise>
            </xsl:choose>
            <span></span>
          </h2>

          <xsl:for-each select="/rss/channel/item">
            <a class="post">
              <xsl:attribute name="href">
                <xsl:value-of select="link"/>
              </xsl:attribute>
              <span class="post-titol">
                <xsl:value-of select="title"/>
              </span>
              <span class="post-data">
                <!-- pubDate ve en RFC-822 («Wed, 29 Jul 2026 00:00:00 GMT»);
                     només interessa el tros de la data. -->
                <xsl:value-of select="substring(pubDate, 6, 11)"/>
              </span>
              <span class="post-desc">
                <xsl:value-of select="description"/>
              </span>
            </a>
          </xsl:for-each>

          <a class="tornar">
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/link"/>
            </xsl:attribute>
            <xsl:choose>
              <xsl:when test="$idioma = 'es'">← Volver al blog</xsl:when>
              <xsl:when test="$idioma = 'en'">← Back to the blog</xsl:when>
              <xsl:otherwise>← Tornar al blog</xsl:otherwise>
            </xsl:choose>
          </a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
