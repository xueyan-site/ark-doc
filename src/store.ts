import { Store, createProvider, useData, useStore } from 'xueyan-react-store'
import { parseContentsOptions } from 'xueyan-react-contents'
import type { SelectOption } from 'xueyan-react-select'
import type { ContentsProOption } from 'xueyan-react-contents'
import type { DocumentInfoStruct, ImageLinkProps, DocConfig } from './types'

export interface DocData<T,D> {
  /** 已选值 */
  value: T;
  /** 当前内容 */
  option: ContentsProOption<T>
  /** 当前文档 */
  document: DocumentInfoStruct<T,D>
  /** 文档合集 */
  documents: DocumentInfoStruct<T,D>[]
  /** 目录名 */
  name: string;
  /** 文档描述 */
  description: React.ReactNode
  /** 文档主图标 */
  icon: ImageLinkProps
  /** 其余图标列表 */
  icons: ImageLinkProps[]
  /** 当前版本 */
  version: string
  /** 版本列表 */
  versions: SelectOption<string>[]
  /** 当前语言 */
  language: string
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

export function parseDocuments<T,D>(
  documents: DocConfig<T,D>['documents']
): DocumentInfoStruct<T,D>[] {
  return (documents || []).map(item => ({
    ...item, 
    contents: parseContentsOptions<T>(item.contents)
  }))
}

export function parseValue<T,D>(
  documents: DocumentInfoStruct<T,D>[],
  value: DocConfig<T,D>['value']
): {
  value: T
  option: ContentsProOption<T>
  document: DocumentInfoStruct<T,D>
} {
  let option: ContentsProOption<T> | undefined
  let document: DocumentInfoStruct<T,D> | undefined
  if (value !== undefined) {
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      const opt = doc.contents.map.get(value)
      if (opt) {
        option = opt
        document = doc
        break
      }
    }
  }
  if (!option || !document) {
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      const opt = doc.contents.leafs[0]
      if (opt) {
        option = opt
        document = doc
        break
      }
    }
  }
  if (!option || !document) {
    throw Error('Please ensure that content exists')
  }
  return {
    value: option.value,
    option,
    document
  }
}

function parseProps<T,D>(props: DocConfig<T,D>): DocData<T,D> {
  const documents = parseDocuments<T,D>(props.documents)
  const { value, option, document } = parseValue<T,D>(documents, props.value)
  return {
    value,
    option,
    document,
    documents,
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
