import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { brand, realContact, placeholderContact } from './src/config/site.js'

/** يحقن بيانات SEO المنظمة (JSON-LD) من ملف الإعدادات داخل index.html */
function seoPlugin(mode) {
  const c = mode === 'demo' ? placeholderContact : realContact
  return {
    name: 'seo-jsonld',
    transformIndexHtml(html) {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: brand.name,
        description: brand.description,
        areaServed: 'SA',
        address: {
          '@type': 'PostalAddress',
          streetAddress: c.addressLines[0],
          addressCountry: 'SA',
        },
        ...(c.isPlaceholder
          ? {}
          : {
              telephone: c.phoneDisplay.replace(/\s/g, ''),
              geo: { '@type': 'GeoCoordinates', latitude: c.map.lat, longitude: c.map.lng },
              hasMap: c.map.directionsUrl,
            }),
      }
      return html
        .replaceAll('%BRAND_NAME%', brand.name)
        .replaceAll('%BRAND_DESC%', brand.description)
        .replace('</head>', `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`)
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss(), seoPlugin(mode)],
  build: { assetsInlineLimit: 2048, cssCodeSplit: false },
}))
