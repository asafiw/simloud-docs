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

    // saveOutput("tree-before.json", tree);

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
      const expandableBtns = expandable
        ? [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['source-show-more'] },
              children: [{ type: 'text', value: 'Show more' }]
            },
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['source-show-less'] },
              children: [{ type: 'text', value: 'Show less' }]
            }
          ]
        : []

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
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['source-raw'], style: 'display: none' },
            children: [{ type: 'text', value: stringContent }]
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['source-copy'] },
            children: [{ type: 'text', value: '📋 Copy' }]
          },
          ...expandableBtns,
          { type: 'element', tagName: 'pre', properties: {}, children }
        ]
      })

      // saveOutput("tree-after.json", tree);
    })
  }
}

function saveOutput(fileName, tree) {
  fs.writeFile(fileName, JSON.stringify(tree, null, 2), err => {
    if (err) {
      console.error(err)
    }
    // file written successfully
  })
}
