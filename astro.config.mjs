import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import rehypeCodeBlock from './plugins/rehypeCodeBlock'

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [rehypeCodeBlock],
    syntaxHighlight: false
  },
  integrations: [preact(), react()],
  site: `https://docs.simloud.com`
})
