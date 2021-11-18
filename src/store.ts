import React from 'react'
import Store, { createProvider, useData, useStore } from 'xueyan-react-store'
import { SIDE_TAB_TYPE, DOC_STORE_KEY } from './constants'
import { parseArticles } from './com/contents'
import type { LinkText } from './com/link-text-render'
import type { LinkImage } from './com/link-image-render'
import type { Article, ArticleMeta } from './com/contents'

/**
 * 模块
 */
export interface ESModule {
  default: any
}

export interface AnyObject<T = any> {
  [id: string]: T | undefined
}

interface DecCommonData {
  /**
   * project id
   */
  id: string
  /**
   * project name
   */
  name: React.ReactNode
  /**
   * current version
   */
  version: string
  /**
   * project description
   */
  description: React.ReactNode
  /**
   * avatar description object
   */
  avatar: LinkImage
  /**
   * side contents label
   */
  contentsLabel?: React.ReactNode
  /**
   * side information label
   */
  messagesLabel?: React.ReactNode
}

/**
 * doc config
 */
export interface DocConfig extends DecCommonData {
  /**
   * current language
   */
  language?: string
  /**
   * logo description objects
   */
  logos?: LinkImage[]
  /**
   * version options
   */
  versions?: LinkText[]
  /**
   * language options
   */
  languages?: LinkText[]
  /**
   * contents
   */
  contents?: ArticleMeta[]
  /**
   * messages
   */
  messages?: ArticleMeta[]
  /**
   * article id
   */
  article?: string
}

export interface DocData extends DecCommonData {
  /**
   * current language
   */
  language: string
  /**
   * logo description objects
   */
  logos: LinkImage[]
  /**
   * version options
   */
  versions: LinkText[]
  /**
   * language options
   */
  languages: LinkText[]
  /**
   * contents
   */
  contents: Article[]
  /**
   * messages
   */
  messages: Article[]
  /**
   * current article information
   */
  article?: Article
  /**
   * side switch active key
   */
  sideTab?: SIDE_TAB_TYPE
}

/**
 * page data hook
 */
export function useDocData() {
  return useData<DocData>(DOC_STORE_KEY)
}

/**
 * page data hook
 */
export function useDocStore() {
  return useStore<DocStore>(DOC_STORE_KEY)
}

function configToData(config: DocConfig): DocData {
  const cts = parseArticles(config.article, config.contents || [])
  const msg = parseArticles(config.article, config.messages || [])
  const article = cts.article || msg.article
  return {
    id: config.id,
    name: config.name,
    version: config.version,
    description: config.description,
    avatar: config.avatar,
    language: config.language || 'English',
    logos: config.logos || [],
    versions: config.versions || [],
    languages: config.languages || [],
    contents: cts.articles,
    contentsLabel: config.contentsLabel,
    messages: msg.articles,
    messagesLabel: config.messagesLabel,
    article,
    sideTab: cts.article
      ? SIDE_TAB_TYPE.CONTENTS
      : msg.article
      ? SIDE_TAB_TYPE.MESSAGES
      : undefined,
  }
}

export const DocProvider = createProvider((props: { data: DocConfig }) => {
  return new DocStore(configToData(props.data), props.data)
})

/**
 * doc store
 */
export class DocStore extends Store<DocData> {
  private config: DocConfig

  constructor(defaultData: DocData, config: DocConfig) {
    super(DOC_STORE_KEY, defaultData)
    this.config = config
  }

  mergeConfig(config: Partial<DocConfig>) {
    return configToData(
      Object.assign({}, this.config, config)
    )
  }
}
