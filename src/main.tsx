import React, { useEffect, useState, useRef } from 'react'
import cn from 'classnames'
import styles from './main.scss'
import { Empty } from './empty'
import { Failed } from './failed'
import { Loading } from './loading'
import { useDocData } from './store'
import { PageTurner } from './page-turner'
import type { DocProps } from './doc'

enum STATUS {
  INIT = 0,
  LOADING = 1,
  SUCCESS = 2,
  FAILED = -1
}

interface MainProps<T,D> extends Pick<
  DocProps<T,D>,
  | 'onChange'
> {
  className?: string
  header?: React.ReactNode
}

export function Main<T,D>({
  className,
  header,
  onChange
}: MainProps<T,D>) {
  const docData = useDocData<T,D>()
  const [status, setStatus] = useState<STATUS>(STATUS.INIT)
  const renderRef = useRef<React.ComponentType<any>|undefined>()
  const Render = renderRef.current
  const { option } = docData

  useEffect(() => {
    if (option && option.content) {
      setStatus(STATUS.LOADING)
      option.content().then((data: any) => {
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
  }, [option])
  
  return (
    <div className={cn(styles.xrdocmain, className)}>
      {header}
      <h1 className={styles.title}>{option.label}</h1>
      {option.banner && (
        <img className={styles.banner} src={option.banner} />
      )}
      <div className={styles.content}>
        {status === STATUS.LOADING ? (
          <Loading />
        ) : status === STATUS.FAILED ? (
          <Failed />
        ) : status === STATUS.SUCCESS ? (
          Render ? <Render /> : <Empty />
        ) : null}
      </div>
      <div className={styles.turners}>
        <PageTurner
          data={option.prev}
          direction="left"
          onChange={onChange}
        />
        <PageTurner
          data={option.next}
          direction="right"
          onChange={onChange}
        />
      </div>
    </div>
  )
}
