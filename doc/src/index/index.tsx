import React from 'react'
import Doc from 'xueyan-react-doc'
import contents from './contents'
import messages from './messages'
import type { PageProps } from 'xueyan-react'
import type { LinkImage, LinkText } from 'xueyan-react-doc'

const AVATAR: LinkImage = {
  src: '',
  href: 'https://xueyan.site'
}

const LOGOS: LinkImage[] = [
  {
    title: 'github',
    src: XT_PATH + 'github.png',
    href: 'https://github.com/xueyan-site',
  },
  {
    title: 'xueyan-site',
    src: XT_PATH + 'xueyan-site.svg',
    href: 'https://xueyan.site',
  }
]

const VERSIONS: LinkText[] = [
  {
    label: 'v1.0.0',
    href: 'https://xueyan.site/doc/v1.0.1'
  },
  {
    label: 'v1.0.1'
  }
]

export default function Index({ page, pager }: PageProps) {
  return (
    <Doc
      id={XT_ID}
      name={XT_NAME}
      version={XT_VERSION}
      description="This is a react component store tools for xueyan-typescript-cli tool"
      avatar={AVATAR}
      logos={LOGOS}
      versions={VERSIONS}
      contents={contents}
      messages={messages}
      article={page.query.article}
      onChange={article => {
        pager.changeUrl(page.path, {
          ...page.query,
          article: article.id
        })
      }}
    >
      <div>author: {XT_AUTHOR_NAME}</div>
      <div>concat: {XT_AUTHOR_EMAIL}</div>
      <div>copyright © 2021 {XT_NAME}</div>
    </Doc>
  )
}
