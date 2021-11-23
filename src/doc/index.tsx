import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './index.scss'
import { DocProvider } from '../store'
import type { Article } from '../com/contents'
import type { DocStore, DocConfig, DocData } from '../store'
import DocInner from './inner'
import useViewportHeight from '../utl/use-viewport-height'

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
  /**
   * side footer
   */
  children?: React.ReactNode
}

export default function Doc({
  className,
  style,
  children,
  fetch,
  onChange,
  ...config
}: DocProps) {
  const docRef = useRef<DocStore>(null)
  const domRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)
  const maxHeight = useViewportHeight()

  useEffect(() => {
    const dom = domRef.current
    if (dom) {
      setWidth(dom.offsetWidth)
    }
    const doc = docRef.current
    if (doc && fetch) {
      fetch(doc.id).then(data => {
        doc.setPart(doc.mergeConfig(data))
      })
    }
  }, [])

  return (
    <DocProvider ref={docRef} data={config}>
      <div 
        ref={domRef}
        style={{
          ...style,
          height: style?.height || maxHeight,
          maxHeight,
        }}
        className={cn(
          styles.wrapper,
          className,
          width < 898
            ? styles.phone 
            : width < 1150
            ? styles.small
            : width <= 1650
            ? styles.middle
            : undefined
        )}
      >
        {width < 280 ? null : (
          <DocInner onChange={onChange} isPhone={width < 898}>
            {children}
          </DocInner>
        )}
      </div>
    </DocProvider>
  )
}
