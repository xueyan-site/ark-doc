import type { ContentsOption, ContentsOptionStruct, ContentsProOption } from 'ark-contents'
import type { LabelLinkProps } from 'ark-link'
import type { SelectOption } from 'ark-select'
import type { DocData } from './store'

export type ImageLinkProps = Omit<LabelLinkProps, 'children'>

export interface Collection<T,D> extends SelectOption<D> {
  contents: ContentsOption<T>[]
}

export interface CollectionStruct<T,D> extends SelectOption<D> {
  contents: ContentsOptionStruct<T>
}

export type DocOnChange<T,D> = (
  value: T,
  option: ContentsProOption<T>,
  docData: DocData<T,D>,
) => void

export type DocOnChangeVersion<T,D> = (
  value: string,
  option: SelectOption<string>,
  docData: DocData<T,D>
) => void

export type DocOnChangeLanguage<T,D> = (
  value: string,
  option: SelectOption<string>,
  docData: DocData<T,D>
) => void

export interface DocConfig<T,D> {
  /** 已选值（当前文章ID） */
  value?: T;
  /** 目录 */
  contents?: ContentsOption<T>[]
  /** 多个目录（优先级高于 contents） */
  collections?: Collection<T,D>[]
  /** 文档名称 */
  name?: string;
  /** 文档描述 */
  description?: React.ReactNode
  /** 文档主图标 */
  icon?: ImageLinkProps
  /** 其余图标列表 */
  icons?: ImageLinkProps[]
  /** 当前版本 */
  version?: string
  /** 版本列表 */
  versions?: SelectOption<string>[]
  /** 当前语言 */
  language?: string
  /** 语言列表 */
  languages?: SelectOption<string>[]
}
