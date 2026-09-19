import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/*
  Metadados que dependem do domínio de produção.

  O domínio vem de VITE_SITE_URL (ex.: em .env.production ou nas variáveis do
  provedor de hospedagem). Ele precisa ser https e não pode ser localhost.

  Sem um domínio válido, as tags que exigem URL absoluta (canonical, og:url,
  og:image, twitter:image e os campos url/image do JSON-LD) são removidas do
  HTML em vez de publicadas erradas, e o build avisa. O restante dos metadados
  continua sendo entregue normalmente.
*/
function siteMetadata(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const raw = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '')
  const valid =
    /^https:\/\/[^/\s]+\.[^/\s]+/.test(raw) &&
    !/localhost|127\.0\.0\.1|0\.0\.0\.0/.test(raw)
  const siteUrl = valid ? raw : null

  return {
    name: 'gireh-site-metadata',

    configResolved(config) {
      if (config.command === 'build' && !siteUrl) {
        config.logger.warn(
          '\n[gireh] VITE_SITE_URL ausente ou inválido: canonical, og:url, og:image e twitter:image foram omitidos.\n' +
            '        Defina o domínio de produção (https://...) para publicar os metadados completos.\n',
        )
      }
    },

    transformIndexHtml(html) {
      if (siteUrl) {
        return html
          .replaceAll('%SITE_URL%', siteUrl)
          .replaceAll(' data-requires-site-url', '')
      }
      return html
        .replace(/^.*data-requires-site-url.*\n/gm, '')
        .replace(/^.*"(url|image)": "%SITE_URL%[^"]*",\n/gm, '')
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      })
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url><loc>${siteUrl}/</loc></url>\n` +
            '</urlset>\n',
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), siteMetadata(mode)],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
}))
