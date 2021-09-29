import React, { Fragment, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './index.scss'
import Side from '../side'
import Main from '../main'
import { DocProvider } from '../store'
import useVisibleStyle from '../utl/use-visible-style'
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
        store.setPart(store.mergeConfig(data))
      })
    }
  }, [])

  return (
    <DocProvider ref={docRef} data={config}>
      <div 
        ref={domRef}
        style={style}
        className={cn(
          styles.wrapper,
          className,
          width < 768
            ? styles.phone 
            : width < 1024
            ? styles.small
            : width >= 1536
            ? styles.large
            : undefined
        )}
      >
        <DocInner
          onChange={onChange}
          width={width}
        />
      </div>
    </DocProvider>
  )
}

function DocInner({
  width,
  onChange
}: {
  width: number
  onChange?: (node: Article, doc: DocData) => void
}) {
  const isPhone = width < 768
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleStyle, status] = useVisibleStyle(visible)

  return width < 280 ? null : (
    <Fragment>
      {isPhone ? (
        <div 
          style={visibleStyle}
          className={styles.mask}
          onClick={() => setVisible(false)}
        />
      ) : null}
      <Side 
        className={styles.side} 
        onChange={onChange}
        style={isPhone ? {
          transition: `transform 200ms`,
          transform: `translate3D(${status > 0 ? 0 : -100}%,0,0)`,
          display: status < 0 ? 'none' : 'block'
        } : undefined}
      />
      <Main 
        className={styles.main}
        menuNode={isPhone ? (
          <div
            className={styles.menu}
            onClick={() => setVisible(true)}
          >MENU</div>
        ) : null}
      />
    </Fragment>
  )
}
