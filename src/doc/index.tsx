import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './index.scss'
import Side from '../side'
import Main from '../main'
import { DocProvider } from '../store'
import type { Article } from '../com/contents'
import type { DocStore, DocConfig, DocData } from '../store'

export interface DocProps extends DocConfig {
  className?: string
  style?: React.CSSProperties
  /**
   * listen article node click event
   * @param node
   * 1. node isn't equal current active node
   * 2. node isn't have href, onClick field value
   * 3. node have content field value
   */
  onChange?: (node: Article, doc: DocData) => void
  /**
   * fetch origin config JSON
   * @param id project id
   */
  fetch?: (id: string) => Promise<Partial<DocConfig>>
}

export default function Doc({
  className,
  style,
  fetch,
  onChange,
  ...config
}: DocProps) {
  const docRef = useRef<DocStore>(null)
  const domRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth)
    }
    const store = docRef.current
    if (fetch && store) {
      fetch(store.id).then(data => {
        store.setPart(store.configToData(data))
      })
    }
  }, [])

  return (
    <DocProvider ref={docRef} data={config}>
      <div 
        ref={domRef}
        className={cn(styles.wrapper, className, {
          [styles.small]: width < 1024,
          [styles.large]: width >= 1536
        })}
        style={style}
      >
        <Side className={styles.side} onChange={onChange}/>
        <Main className={styles.main} />
      </div>
    </DocProvider>
  )
}
