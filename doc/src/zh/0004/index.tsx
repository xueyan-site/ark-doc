import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
设置图标

\`\`\`
const ICON: ImageLinkProps = {
  src: '项目图标',
  href: '点击跳转的地址'
}
\`\`\`

\`\`\`
const ICONS: ImageLinkProps[] = [
  {
    src: '其他自定义图标1',
    href: '点击跳转的地址',
    title: '描述',
  },
  {
    src: '其他自定义图标2',
    href: '点击跳转的地址',
    title: '描述'
  }
]
\`\`\`

设置版本选项

\`\`\`
const VERSIONS: SelectOption<string>[] = [
  {
    value: '1.0.0',
    label: '1.0.0'
  }
]
\`\`\`

设置语言选项

\`\`\`
const LANGUAGES: SelectOption<string>[] = [
  {
    value: 'zh',
    label: '中文'
  },
  {
    value: 'en',
    label: 'English'
  }
]
\`\`\`

设置文档集

\`\`\`
const COLLECTIONS: Collection<string,string>[] = [
  {
    value: '9999',
    label: '指南',
    contents: [
      {
        value: '0001',
        label: '介绍',
        content: () => import('./0001')
      }
    ]
  },
  {
    value: '9998',
    label: '接口文档',
    contents: [
      {
        value: '0002',
        label: 'API 1',
        content: () => import('./0002')
      }
    ]
  }
]
\`\`\`

配置文档节点

\`\`\`
<Doc
  icon={ICON}
  icons={ICONS}
  versions={VERSIONS}
  languages={LANGUAGES}
  collections={COLLECTIONS}
  name="文档名称"
  description="文档描述"
  version="1.0.0"
  language="zh"
  value="0001"
  onChangeLanguage={value => {
    // 修改语言
  }}
  getHref={option => {
    // 提前生成文章URL
  }}
  onChange={(value, option) => {
    // 或者点击时修改URL
  }}
>
  侧边栏底部的文字
</Doc>
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
