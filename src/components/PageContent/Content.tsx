/** @jsxImportSource react */
import { useState, useEffect } from 'react'

type Props = {
  content: any
}

const Content = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [previewSrc, setPreviewSrc] = useState(null)

  const createMarkup = () => ({ __html: `<div>${content}</div>` })

  const handleContentClick = e => {
    if (e.target.tagName === 'IMG') {
      const src = e.target.src

      setPreviewSrc(src)
    }

    if (e.target.className === 'source-copy') {
      const source = e.target.parentElement.querySelector('.source-raw').innerHTML
      navigator.clipboard.writeText(source).then(() => {
        e.target.innerHTML = '✅ Copied!'
        setTimeout(() => {
          e.target.innerHTML = '📋 Copy'
        }, 2000)
      })
    }

    if (e.target.className === 'source-show-more') {
      const parent = e.target.parentElement
      parent.classList.remove('source-show-compacted')
      parent.classList.add('source-show-expanded')
    }

    if (e.target.className === 'source-show-less') {
      const parent = e.target.parentElement
      parent.classList.remove('source-show-expanded')
      parent.classList.add('source-show-compacted')
    }
  }

  useEffect(() => {
    if (content.length) {
      setIsLoading(false)
    }
  }, [content])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div
        id="real-content"
        dangerouslySetInnerHTML={createMarkup()}
        onClick={handleContentClick}
      />
      <div
        id="img-zoom-preview"
        onClick={() => setPreviewSrc(null)}
        style={{
          display: previewSrc ? 'block' : 'none',
          backgroundImage: previewSrc ? `url(${previewSrc})` : 'none'
        }}
      />
    </>
  )
}

export default Content
