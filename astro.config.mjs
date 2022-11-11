import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import rehypeStarryNightCopyCollapse from './rehypeStarryNightCopyCollapse'

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [rehypeStarryNightCopyCollapse],
    syntaxHighlight: false
  },
  integrations: [preact(), react()],
  site: `https://docs.simloud.com`
})
