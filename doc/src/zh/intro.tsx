import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
这是一段测试文本  
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
