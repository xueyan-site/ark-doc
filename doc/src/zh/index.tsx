import React from 'react'
import { HookFunctionIcon, ComponentIcon } from 'sicon'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'sdin-react'
import type { ContentsOption } from 'ark-contents'

const HOOK_ICON = <HookFunctionIcon color="var(--green)" />
const COMPONENT_ICON = <ComponentIcon color="var(--blue)" />

const CONTENTS: ContentsOption<string>[] = [
  {
    value: '9999',
    label: '指南',
    children: [
      {
        value: '0001',
        label: '介绍',
        content: () => import('./0001')
      },
      {
        value: '0004',
        label: '示例',
        content: () => import('./0004')
      }
    ]
  },
  {
    value: '9998',
    label: '接口文档',
    children: [
      {
        value: '0002',
        label: 'Doc',
        icon: COMPONENT_ICON,
        content: () => import('./0002')
      },
      {
        value: '0003',
        label: 'useData',
        icon: HOOK_ICON,
        content: () => import('./0003')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="zh"
      version={pkg.version}
      contents={CONTENTS}
      name={pkg.name}
      description={pkg.description}
    />
  )
}
