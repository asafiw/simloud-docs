import { AstroGlobal } from 'astro'

/** Gets the URL to edit the page on GitHub */

export function getGithubEditUrl(Astro: Readonly<AstroGlobal>) {
  const { content = {} } = Astro.props
  const isFallback = !!Astro.params.fallback
  const currentPage = Astro.url.pathname
  const lang = 'en'
  const filePath = `src/pages${currentPage.replace(/\/$/, '')}.md`
  const currentFile = isFallback ? filePath.replace(`/${lang}/`, '/en/') : filePath
  const githubEditUrl =
    content.githubURL && (lang === 'en' || isFallback)
      ? `${content.githubURL}${content.hasREADME ? 'README.md' : ''}`
      : `https://github.com/dospolov/simloud-docs/blob/main/${currentFile}`

  return githubEditUrl
}
