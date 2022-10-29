import React from 'react'
import { Article, Segment } from 'ark-markdown'

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

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| className | 类名 | \`? string\` |  |
| style | 样式 | \`? React.CSSProperties\` |  |
| children | 子节点 | \`? React.ReactNode\` | 渲染于侧边栏最下方 |
| onChange | 切换页面 | \`? DocOnChange<T,D>\` |  |
| onChangeVersion | 切换版本 | \`? DocOnChangeVersion<T,D>\` |  |
| onChangeLanguage | 切换语言 | \`? DocOnChangeLanguage<T,D>\` |  |

> 继承 [DocConfig](#docconfig) 所有属性  
> 继承 [ContentsProps](/ark-contents?doc=0002#contentsprops) 部分属性：\`getHref\` 

## DocConfig

\`\`\`typescript
interface DocConfig<T,D> {
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
\`\`\`

## ImageLinkProps

图片链接参数

\`\`\`typescript
type ImageLinkProps = Omit<LabelLinkProps, 'children'>
\`\`\`

> 涉及类型：[LabelLinkProps](/ark-link?doc=0003#labellinkprops)

## Collection

\`\`\`typescript
interface Collection<T,D> extends SelectOption<D> {
  contents: CollectionContentsOption<T>[]
}
\`\`\`

\`\`\`typescript
interface CollectionContentsOption<T> extends ContentsOption<T> {
  /** 顶部横幅，例如：https://xxx.com/xxx.webp */
  banner?: string
  /** 文章内容，例如：() => import('./0001') */
  content?: () => Promise<{ default: React.ComponentType }>
}
\`\`\`

> 涉及类型：[SelectOption](/ark-select?doc=0002#selectoption)、[ContentsOption](/ark-contents?doc=0002#contentsoption)

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

> 涉及类型：[DocData](?doc=0003#docdata)、[ContentsProOption](/ark-contents?doc=0002#contentsprooption)

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
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
