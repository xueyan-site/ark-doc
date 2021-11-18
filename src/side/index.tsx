import React from 'react'
import AvatarLine from './avatar-line'
import styles from './index.scss'
import Tag from '../com/tag'
import Switch from '../com/switch'
import Contents from '../com/contents'
import { SIDE_CONTENTS_KEY_PREFIX, SIDE_MESSAGES_KEY_PREFIX, SIDE_TAB_KEY_PREFIX, SIDE_TAB_TYPE } from '../constants'
import { useDocData } from '../store'
import useMemory from '../utl/use-memory'
import type { Article } from '../com/contents'
import type { DocData } from '../store'

export default function Side({
  style,
  className,
  onChange,
  children
}: {
  style?: React.CSSProperties
  className?: string
  onChange?: (node: Article, doc: DocData) => void
  children?: React.ReactNode
}) {
  const doc = useDocData()
  const [tabKey, setTabKey] = useMemory<SIDE_TAB_TYPE|undefined>(
    SIDE_TAB_KEY_PREFIX + doc.id,
    cache => (doc.sideTab || cache || SIDE_TAB_TYPE.CONTENTS)
  )

  const handleChange = onChange && ((node: Article) => onChange(node, doc))
  
  return (
    <aside className={className} style={style}>
      <AvatarLine className={styles.avatarLine} />
      <div className={styles.project}>
        <h1 className={styles.title}>{doc.name}</h1>
        <div className={styles.tags}>
          <Tag
            label={doc.language} 
            options={doc.languages} 
            style={{ backgroundColor: '#5856D6' }}
          />
          <Tag label={doc.version} options={doc.versions} />
        </div>
      </div>
      <Switch
        className={styles.tab}
        value={tabKey}
        active={doc.sideTab}
        onChange={key => setTabKey(key)}
        options={[
          {
            value: SIDE_TAB_TYPE.CONTENTS,
            label: doc.contentsLabel || 'contents'
          },
          {
            value: SIDE_TAB_TYPE.MESSAGES,
            label: doc.messagesLabel || 'messages'
          }
        ]}
      />
      {tabKey === SIDE_TAB_TYPE.MESSAGES && doc.description && (
        <div className={styles.desc}>
          {doc.description}
        </div>
      )}
      <Contents
        className={styles.contents}
        article={doc.article}
        articles={doc.contents}
        shrinkKey={SIDE_CONTENTS_KEY_PREFIX + doc.id}
        onChange={handleChange}
        hidden={tabKey !== SIDE_TAB_TYPE.CONTENTS}
      />
      <Contents
        className={styles.messages}
        article={doc.article}
        articles={doc.messages}
        shrinkKey={SIDE_MESSAGES_KEY_PREFIX + doc.id}
        onChange={handleChange}
        hidden={tabKey !== SIDE_TAB_TYPE.MESSAGES}
      />
      {children}
    </aside>
  )
}
