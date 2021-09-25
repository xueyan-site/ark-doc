import React, { useMemo } from 'react'
import AvatarLine from './avatar-line'
import styles from './index.scss'
import Tag from '../com/tag'
import Switch from '../com/switch'
import Contents from '../com/contents'
import { SIDE_CONTENTS_KEY_PREFIX, SIDE_MESSAGES_KEY_PREFIX, SIDE_TAB_KEY_PREFIX, SIDE_TAB_TYPE } from '../common'
import { useDoc } from '../store'
import useMemory from '../utl/use-memory'
import type { Article } from '../com/contents'
import type { DocData } from '../store'

export default function Side({
  style,
  className,
  onChange
}: {
  style?: React.CSSProperties
  className?: string
  onChange?: (node: Article, doc: DocData) => void
}) {
  const doc = useDoc()
  const [tabKey, setTabKey] = useMemory<SIDE_TAB_TYPE|undefined>(
    SIDE_TAB_KEY_PREFIX + doc.id,
    cache => (doc.sideTab || cache || SIDE_TAB_TYPE.CONTENTS)
  )
  const tabOptions = useMemo(() => ([
    {
      value: SIDE_TAB_TYPE.CONTENTS,
      label: doc.sideContents || '目录'
    },
    {
      value: SIDE_TAB_TYPE.MESSAGES,
      label: doc.sideMessages || '信息'
    }
  ]), [doc.sideContents, doc.sideMessages])

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
        options={tabOptions}
        value={tabKey}
        active={doc.sideTab}
        onChange={key => setTabKey(key)}
      />
      <Contents
        className={styles.contents}
        article={doc.article}
        articles={doc.contents}
        shrinkKey={SIDE_CONTENTS_KEY_PREFIX + doc.id}
        onChange={handleChange}
        hidden={tabKey !== SIDE_TAB_TYPE.CONTENTS}
      />
      {tabKey === SIDE_TAB_TYPE.MESSAGES && doc.description && (
        <div className={styles.desc}>
          {doc.description}
        </div>
      )}
      <Contents
        size="large"
        className={styles.messages}
        article={doc.article}
        articles={doc.messages}
        shrinkKey={SIDE_MESSAGES_KEY_PREFIX + doc.id}
        onChange={handleChange}
        hidden={tabKey !== SIDE_TAB_TYPE.MESSAGES}
      />
      <div className={styles.footer}>{doc.children}</div>
    </aside>
  )
}
