import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
Article 将主题配置信息供应给子节点使用。我们可以通过下面展示的API，获取和修改 Article 中的主题配置信息。

## MarkdownConfig

主题配置信息包含的字段及其含义如下：

| 字段 | 类型 | 默认值 | 含义 |
|-|-|-|-|
|dark|? \`boolean\`|false|是否开启暗黑模式|
|darkCode|? \`boolean\`|false|是否开启暗黑模式（仅针对代码）|

## useMarkdownConfig

获取主题配置信息。定义如下：

\`\`\`typescript
function useMarkdownConfig(props?: MarkdownConfig): {
  dark: boolean | undefined;
  darkCode: boolean | undefined;
}
\`\`\`

## useMarkdownConfigStore

获取主题配置信息的操纵句柄。定义如下：

\`\`\`typescript
function useMarkdownConfigStore(): Store<MarkdownConfig>
\`\`\`

Store 相关信息，详见 <https://xueyan.site/xueyan-react-store>。

## 应用场景

点击按钮，切换当前Markdown的主题。
`

export default function Main() {
  return (
    <div>
      <Article>
        <Segment>{MARK1}</Segment>
      </Article>
    </div>
  )
}