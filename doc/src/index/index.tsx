import React from 'react'
import Doc from 'xueyan-react-doc'
import contents from './contents'
import messages from './messages'
import packageInfo from '../../../package.json'
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
    href: packageInfo.repository.url,
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
      id={packageInfo.name}
      name={packageInfo.name}
      version={packageInfo.version}
      description={packageInfo.description}
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
      <div>copyright © 2021 {packageInfo.name}</div>
    </Doc>
  )
}
