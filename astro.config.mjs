import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import rehypeStarryNightWithCopyAndCollapse from './plugins/rehypeStarryNightWithCopyAndCollapse'

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [rehypeStarryNightWithCopyAndCollapse],
    syntaxHighlight: false
  },
  integrations: [preact(), react()],
  site: `https://docs.simloud.com`
})
