import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import BLACK_IMG from './black.webp'
import LIGHT_IMG from './light.webp'

const MARK1 = `
文档组件，它适用于项目文档、教程、书籍、散文、日志等场景。

<p>
  <img style="width: 450px" src="${BLACK_IMG}"/>
  <img style="width: 450px" src="${LIGHT_IMG}"/>
</p>

主题使用 [xueyan-react-style](/xueyan-react-style) 实现，支持配置多语言、多版本。

> 它的使用效果如本站点所示。
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
