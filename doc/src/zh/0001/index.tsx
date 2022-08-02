import React from 'react'
import { Article, Segment } from 'ark-markdown'
import BLACK_IMG from './black.webp'
import LIGHT_IMG from './light.webp'

const MARK1 = `
<p>
  <img style="width: 450px" src="${BLACK_IMG}"/>
  <img style="width: 450px" src="${LIGHT_IMG}"/>
</p>

文档组件，适用于项目文档、教程、书籍、散文、日志等场景。

使用了 [solor](/solor) 主题包，支持配置多语言、多版本。

使用效果，如本站点所示。
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
