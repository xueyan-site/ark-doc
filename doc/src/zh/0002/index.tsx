import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
文档组件

\`\`\`typescript
type Doc: React.ForwardRefExoticComponent<
  DocProps<any, any> & React.RefAttributes<DocRef>
>
\`\`\`

## DocRef

\`\`\`typescript
interface DocRef {
  /** 根节点 */
  rootNode: HTMLDivElement | null
}
\`\`\`

## DocProps

继承 \`DocConfig\` 所有属性

继承 \`ContentsProps\` 部分属性：\`getHref\` 

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| className | 类名 | \`? string\` |  |
| style | 样式 | \`? React.CSSProperties\` |  |
| children | 子节点 | \`? React.ReactNode\` | 渲染于侧边栏最下方 |
| onChange | 切换页面 | \`? DocOnChange<T,D>\` |  |
| onChangeVersion | 切换版本 | \`? DocOnChangeVersion<T,D>\` |  |
| onChangeLanguage | 切换语言 | \`? DocOnChangeLanguage<T,D>\` |  |

## DocConfig

\`\`\`typescript
interface DocConfig<T,D> {
  /** 已选值（当前文章ID） */
  value?: T;
  /** 文章集合列表 */
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
\`\`\`

## ImageLinkProps

图片链接参数

\`\`\`typescript
type ImageLinkProps = Omit<LabelLinkProps, 'children'>
\`\`\`

LabelLinkProps 见 [xueyan-react-link](/xueyan-react-link)

## Collection

\`\`\`typescript
interface Collection<T,D> extends SelectOption<D> {
  contents: ContentsOption<T>[]
}
\`\`\`

SelectOption 见 [xueyan-react-select](/xueyan-react-select)

## CollectionStruct

\`\`\`typescript
interface CollectionStruct<T,D> extends SelectOption<D> {
  contents: ContentsOptionStruct<T>
}
\`\`\`

## DocOnChange

\`\`\`typescript
type DocOnChange<T,D> = (
  value: T,
  option: ContentsProOption<T>,
  docData: DocData<T,D>,
) => void
\`\`\`

ContentsProOption 见 [xueyan-react-contents](/xueyan-react-contents)

## DocOnChangeVersion

\`\`\`typescript
type DocOnChangeVersion<T,D> = (
  value: string,
  option: SelectOption<string>,
  docData: DocData<T,D>
) => void
\`\`\`

## DocOnChangeLanguage

\`\`\`typescript
type DocOnChangeLanguage<T,D> = (
  value: string,
  option: SelectOption<string>,
  docData: DocData<T,D>
) => void
\`\`\`

## DocData

\`\`\`typescript
interface DocData<T,D> {
  /** 已选值 */
  value: T;
  /** 当前内容 */
  option: ContentsProOption<T>
  /** 当前合集 */
  collection: CollectionStruct<T,D>
  /** 合集列表 */
  collections: CollectionStruct<T,D>[]
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
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
