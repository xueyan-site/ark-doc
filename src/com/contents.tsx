import React, { Fragment } from 'react'
import cn from 'classnames'
import styles from './contents.scss'
import LinkTextRender from './link-text-render'
import useMemory from '../utl/use-memory'
import ADD_IMG from '../ast/add.svg'
import MINUS_IMG from '../ast/minus.svg'
import POINT_IMG from '../ast/point.svg'
import type { LinkText } from './link-text-render'

interface Shrinks {
  [nodeId: string]: boolean | undefined
}

interface ESModule {
  default: any
}

interface AnyObject<T = any> {
  [id: string]: T | undefined
}

/**
 * article meta
 */
export interface ArticleMeta extends LinkText {
  id: string
  src?: string
  banner?: string
  content?: () => Promise<ESModule>
  children?: ArticleMeta[]
}

/**
 * article node
 */
export interface Article extends ArticleMeta {
  parents: Article[]
  children: Article[]
}

/**
 * parse article meta to article nodes
 */
export function parseArticles(id: string | undefined, list: ArticleMeta[]) {
  const map: AnyObject<Article> = {}
  function parse(metaList: ArticleMeta[], parents: Article[] = []) {
    const nodes: Article[] = []
    for (const meta of metaList) {
      if (!map[meta.id]) {
        const node: Article = { ...meta, parents, children: [] }
        map[node.id] = node
        nodes.push(node)
        if (meta.children && meta.children.length > 0) {
          const cldParents = [...parents, node]
          node.children = parse(meta.children, cldParents)
        }
      }
    }
    return nodes
  }
  return {
    articleMap: map,
    articles: parse(list),
    article: map[id || '']
  }
}

export default function Contents({
  hidden,
  article,
  articles,
  shrinkKey,
  onChange,
  style,
  className
}: {
  hidden?: boolean
  article?: Article
  articles: Article[]
  shrinkKey: string
  onChange?: (node: Article) => void
  style?: React.CSSProperties
  className?: string
}) {
  const breadcrumb = article
    ? [...article.parents, article]
    : []
  const [shrinks, setShrinks] = useMemory<Shrinks>(
    shrinkKey,
    cache => (cache || {})
  )

  const handleShrink = (event: React.MouseEvent<HTMLElement, MouseEvent>, node: Article) => {
    event.stopPropagation()
    if (node.children.length > 0) {
      setShrinks({ ...shrinks, [node.id]: !shrinks[node.id] })
    }
  }

  const handleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, node: Article) => {
    if (onChange && node.content && node !== article && !node.href && !node.onClick) {
      event.stopPropagation()
      onChange(node)
    }
  }

  return (hidden || articles.length <= 0) ? null : (
    <div className={className} style={style}>
      {articles.map(item => (
        <Node
          key={item.id}
          node={item}
          article={article}
          breadcrumb={breadcrumb}
          shrinks={shrinks}
          onShrink={handleShrink}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}

function Node({
  node,
  article,
  breadcrumb,
  shrinks,
  onShrink,
  onChange
}: {
  node: Article
  article?: Article
  breadcrumb: Article[]
  shrinks: Shrinks
  onShrink: (event: React.MouseEvent<HTMLElement, MouseEvent>, node: Article) => void
  onChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, node: Article) => void
}) {
  const level = node.parents.length
  const isActive = breadcrumb[level] === node
  const hasChildren = node.children.length > 0
  const isShrinks = shrinks[node.id]
  return (
    <Fragment>
      <div
        className={cn(styles.node, {
          [styles.active]: isActive
        })}
        style={{ paddingLeft: level * 12 }}
        onClick={event => onShrink(event, node)}
      >
        <img 
          className={styles.nodeIcon}
          src={hasChildren ? isShrinks ? ADD_IMG : MINUS_IMG : (node.src || POINT_IMG)}
        />
        <LinkTextRender
          className={styles.nodeLabel}
          target="_blank"
          data={node}
          onClick={event => onChange(event, node)}
        />
      </div>
      {(hasChildren && !isShrinks) ? node.children.map(item => (
        <Node
          key={item.id}
          node={item}
          article={article}
          breadcrumb={breadcrumb}
          shrinks={shrinks}
          onShrink={onShrink}
          onChange={onChange}
        />
      )) : null}
    </Fragment>
  )
}
