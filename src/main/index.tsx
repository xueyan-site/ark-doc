import React, { useEffect, useState, useRef } from 'react'
import styles from './index.scss'
import Skeleton from '../com/skeleton'
import Empty from '../com/empty'
import Failed from '../com/failed'
import { useDoc } from '../store'

enum STATUS {
  INIT = 0,
  LOADING = 1,
  SUCCESS = 2,
  FAILED = -1
}

export default function Main({
  menuNode,
  className
}: {
  menuNode?: React.ReactNode
  className?: string
}) {
  const { article } = useDoc()
  const [status, setStatus] = useState<STATUS>(STATUS.INIT)
  const renderRef = useRef<React.ComponentType<any>|undefined>()
  const Render = renderRef.current

  useEffect(() => {
    if (article && article.content) {
      setStatus(STATUS.LOADING)
      article.content().then(data => {
        if (data && data.default) {
          renderRef.current = data.default
        }
        setStatus(STATUS.SUCCESS)
      }).catch(() => {
        setStatus(STATUS.FAILED)
      })
    } else {
      setStatus(STATUS.SUCCESS)
    }
  }, [article])

  return article ? (
    <div className={className}>
      {menuNode}
      <h1 className={styles.title}>{article.label}</h1>
      {article.banner && (
        <img className={styles.banner} src={article.banner} />
      )}
      {status === STATUS.LOADING ? (
        <Skeleton visible={true}>
          <Skeleton.Title />
          <Skeleton.Line />
          <Skeleton.Line />
          <Skeleton.Title />
          <Skeleton.Line />
          <Skeleton.Line />
          <Skeleton.Title />
          <Skeleton.Line />
          <Skeleton.Line />
        </Skeleton>
      ) : status === STATUS.FAILED ? (
        <Failed />
      ) : status === STATUS.SUCCESS ? (
        Render ? <Render /> : <Empty />
      ) : null}
    </div>
  ) : null
}
