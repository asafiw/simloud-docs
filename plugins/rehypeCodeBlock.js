/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('@wooorm/starry-night').Grammar} Grammar
 *
 * @typedef Options
 *   Configuration (optional)
 * @property {Array<Grammar>} [grammars]
 *   Grammars to support (defaults: `common`).
 */

import { createStarryNight, common } from '@wooorm/starry-night'
import sourcePS from '@wooorm/starry-night/lang/source.powershell.js'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'

/**
 * Plugin to highlight code with `starry-night`.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
export default function rehypeCodeBlock() {
  const grammars = [...common, sourcePS]

  const starryNightPromise = createStarryNight(grammars)
  const prefix = 'language-'

  return async function (tree) {
    const starryNight = await starryNightPromise

    visit(tree, 'element', function (node, index, parent) {
      if (!parent || index === null || node.tagName !== 'pre') {
        return
      }

      const head = node.children[0]

      if (
        !head ||
        head.type !== 'element' ||
        head.tagName !== 'code' ||
        !head.properties
      ) {
        return
      }

      const classes = head.properties.className

      if (!Array.isArray(classes)) return

      const language = classes.find(d => typeof d === 'string' && d.startsWith(prefix))

      if (typeof language !== 'string') return

      const scope = starryNight.flagToScope(language.slice(prefix.length))

      // Maybe warn?
      if (!scope) return

      const stringContent = toString(head)
      const fragment = starryNight.highlight(stringContent, scope)
      const children = /** @type {Array<ElementContent>} */ (fragment.children)
      const stringCount = (stringContent.match(/\n/g) || '').length + 1
      const expandable = stringCount > 5

      parent.children.splice(index, 1, {
        type: 'element',
        tagName: 'div',
        properties: {
          className: [
            'highlight',
            'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-'),
            ...[expandable ? 'source-expandable source-show-compacted' : '']
          ]
        },
        children: [
          getSourceRaw(stringContent),
          getCopyBtn(),
          ...getExpandBtn(stringContent),
          { type: 'element', tagName: 'pre', properties: {}, children }
        ]
      })
    })
  }
}

function getSourceRaw(stringContent) {
  const sourceRaw = {
    type: 'element',
    tagName: 'div',
    properties: { className: ['source-raw'], style: 'display: none' },
    children: [{ type: 'text', value: stringContent }]
  }
  return sourceRaw
}

function getExpandBtn(expandable) {
  if (!expandable) return []

  function handleShowMore(e) {
    const parent = e.target.parentElement
    parent.classList.remove('source-show-compacted')
    parent.classList.add('source-show-expanded')

    return false
  }

  function handleShowLess(e) {
    const parent = e.target.parentElement
    parent.classList.remove('source-show-expanded')
    parent.classList.add('source-show-compacted')

    return false
  }

  return [
    {
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['source-show-more'],
        onClick: `${handleShowMore.toString()}; handleShowMore(arguments[0]); return false;`
      },
      children: [{ type: 'text', value: 'Show more' }]
    },
    {
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['source-show-less'],
        onClick: `${handleShowLess.toString()}; handleShowLess(arguments[0]); return false;`
      },
      children: [{ type: 'text', value: 'Show less' }]
    }
  ]
}

function getCopyBtn() {
  function handleCopy(e) {
    const source = e.target.parentElement.querySelector('.source-raw').innerHTML
    navigator.clipboard.writeText(source).then(() => {
      e.target.innerHTML = '✅ Copied!'
      setTimeout(() => {
        e.target.innerHTML = '📋 Copy'
      }, 2000)
    })

    return false
  }

  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['source-copy'],
      onClick: `${handleCopy.toString()}; handleCopy(arguments[0]); return false;`
    },
    children: [{ type: 'text', value: '📋 Copy' }]
  }
}
