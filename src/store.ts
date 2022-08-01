import { Store, createProvider, useData, useStore } from 'stine'
import { parseContentsOptions } from 'ark-contents'
import type { SelectOption } from 'ark-select'
import type { ContentsProOption } from 'ark-contents'
import type { CollectionStruct, ImageLinkProps, DocConfig } from './types'

export interface DocData<T,D> {
  /** 已选值 */
  value: T;
  /** 当前内容 */
  option: ContentsProOption<T>
  /** 当前合集 */
  collection: CollectionStruct<T,D>
  /** 合集列表 */
  collections: CollectionStruct<T,D>[]
  /** 目录名 */
  name?: string
  /** 文档描述 */
  description?: React.ReactNode
  /** 文档主图标 */
  icon?: ImageLinkProps
  /** 其余图标列表 */
  icons: ImageLinkProps[]
  /** 当前版本 */
  version?: string
  /** 版本列表 */
  versions: SelectOption<string>[]
  /** 当前语言 */
  language?: string
  /** 语言列表 */
  languages: SelectOption<string>[]
}

const STORE_KEY = 'xrdocdata'

export function useDocData<T,D>() {
  return useData<DocData<T,D>>(STORE_KEY)
}

export function useDocStore<T,D>() {
  return useStore<DocStore<T,D>>(STORE_KEY)
}

export function parseCollections<T,D>(
  collections: DocConfig<T,D>['collections']
): CollectionStruct<T,D>[] {
  const origin = collections || []
  const list: CollectionStruct<T,D>[] = []
  let prev: CollectionStruct<T,D>
  origin.forEach(item => {
    const contents = parseContentsOptions<T>(item.contents)
    const currLeafs = contents.leafs
    if (currLeafs.length > 0) {
      if (prev) {
        const prevLeafs = prev.contents.leafs
        prevLeafs[prevLeafs.length - 1].next = currLeafs[0]
        currLeafs[0].prev = prevLeafs[prevLeafs.length - 1]
      }
      const curr = { ...item, contents }
      contents.map.forEach(i => {
        i.collection = curr
      })
      list.push(curr)
      prev = curr
    }
  })
  return list
}

export function parseValue<T,D>(
  collections: CollectionStruct<T,D>[],
  value: DocConfig<T,D>['value']
): {
  value: T
  option: ContentsProOption<T>
  collection: CollectionStruct<T,D>
} {
  let option: ContentsProOption<T> | undefined
  let collection: CollectionStruct<T,D> | undefined
  if (value !== undefined) {
    for (let i = 0; i < collections.length; i++) {
      const doc = collections[i]
      const opt = doc.contents.map.get(value)
      if (opt) {
        option = opt
        collection = doc
        break
      }
    }
  }
  if (!option || !collection) {
    for (let i = 0; i < collections.length; i++) {
      const doc = collections[i]
      const opt = doc.contents.leafs[0]
      if (opt) {
        option = opt
        collection = doc
        break
      }
    }
  }
  if (!option || !collection) {
    throw Error('Please ensure that content exists')
  }
  return {
    value: option.value,
    option,
    collection
  }
}

function parseProps<T,D>(props: DocConfig<T,D>): DocData<T,D> {
  const collections = parseCollections<T,D>(props.collections)
  const { value, option, collection } = parseValue<T,D>(collections, props.value)
  return {
    value,
    option,
    collection,
    collections,
    name: props.name,
    description: props.description,
    icon: props.icon,
    icons: props.icons || [],
    version: props.version,
    versions: props.versions || [],
    language: props.language,
    languages: props.languages || [],
  }
}

export const DocProvider = createProvider((props: DocConfig<any, any>) => {
  return new DocStore(parseProps(props))
})

export class DocStore<T,D> extends Store<DocData<T,D>> {
  constructor(defaultData: DocData<T,D>) {
    super(STORE_KEY, defaultData)
  }
}
