import React from 'react'
import Doc from 'utl/doc'
import type { PageProps } from 'xueyan-react'
import type { ArticleMeta } from 'xueyan-react-doc'

const CONTENTS: ArticleMeta[] = [
  {
    id: 'intro',
    label: '介绍',
    content: () => import('./intro')
  },
  {
    id: 'start',
    label: '快速开始',
    content: () => import('./start')
  },
  {
    id: 'components',
    label: '组件',
    children: [
      {
        id: 'doc',
        label: 'Doc - 文档',
        content: () => import('./doc')
      }
    ]
  },
  {
    id: 'tools',
    label: '工具',
    children: [
      {
        id: 'config',
        label: '配置',
        content: () => import('./config')
      },
      {
        id: 'interface',
        label: '结构定义',
        content: () => import('./interface')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return <Doc {...props} contents={CONTENTS} />
}
