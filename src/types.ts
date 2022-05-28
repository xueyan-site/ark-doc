import type { ContentsOption, ContentsOptionStruct, ContentsProOption } from 'xueyan-react-contents'
import type { LabelLinkProps } from 'xueyan-react-link'
import type { SelectOption } from 'xueyan-react-select'
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
  /** 已选值 */
  value?: T;
  /** 文档列表 */
  collections?: Collection<T,D>[]
  /** 目录名 */
  name: string;
  /** 文档描述 */
  description: React.ReactNode
  /** 文档主图标 */
  icon: ImageLinkProps
  /** 其余图标列表 */
  icons?: ImageLinkProps[]
  /** 当前版本 */
  version: string
  /** 版本列表 */
  versions?: SelectOption<string>[]
  /** 当前语言 */
  language: string
  /** 语言列表 */
  languages?: SelectOption<string>[]
}
