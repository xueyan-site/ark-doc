import React from 'react'
import { MarkdownSegment } from 'xueyan-react-markdown'
import mark from './doc1.md'

export default function Doc() {
  return <MarkdownSegment>{mark}</MarkdownSegment>
}
