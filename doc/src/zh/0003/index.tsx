import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
获取文档数据

\`\`\`typescript
type Doc: React.ForwardRefExoticComponent<
  DocProps<any, any> & React.RefAttributes<DocRef>
>
\`\`\`

> 仅限在 Doc 组件包裹下使用

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
  name?: string;
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
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
