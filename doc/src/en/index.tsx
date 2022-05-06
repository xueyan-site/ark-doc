import React from 'react'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'xueyan-react'
import type { DocumentInfo } from 'xueyan-react-doc'

const DOCUMENTS: DocumentInfo<string,string>[] = [
  {
    value: '1',
    label: 'document first',
    contents: [
      {
        value: '1-1',
        label: 'chapter one',
        content: () => import('./intro')
      },
      {
        value: '1-2',
        label: 'chapter two',
        content: () => import('./intro'),
        children: [
          {
            value: '1-2-1',
            label: 'part one',
            content: () => import('./intro')
          },
          {
            value: '1-2-2',
            label: 'part two',
            content: () => import('./intro'),
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'document second',
    contents: [
      {
        value: '2-1',
        label: 'chapter one',
        content: () => import('./intro')
      },
      {
        value: '2-2',
        label: 'chapter two',
        content: () => import('./intro')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="en"
      name={pkg.name}
      version={pkg.version}
      documents={DOCUMENTS}
      description={pkg.description}
    />
  )
}
