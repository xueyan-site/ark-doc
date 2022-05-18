import React from 'react'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'xueyan-react'
import type { Collection } from 'xueyan-react-doc'

const COLLECTIONS: Collection<string,string>[] = [
  {
    value: '1',
    label: '文档集一',
    contents: [
      {
        value: '1-1',
        label: '第一篇',
        content: () => import('./intro')
      },
      {
        value: '1-2',
        label: '第二篇',
        content: () => import('./intro'),
        children: [
          {
            value: '1-2-1',
            label: '第一章',
            content: () => import('./intro')
          },
          {
            value: '1-2-2',
            label: '第二章',
            content: () => import('./intro'),
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '文档集二',
    contents: [
      {
        value: '2-1',
        label: '第一篇',
        content: () => import('./intro')
      },
      {
        value: '2-2',
        label: '第二篇',
        content: () => import('./intro')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="zh"
      name={pkg.name}
      version={pkg.version}
      collections={COLLECTIONS}
      description={pkg.description}
    />
  )
}
