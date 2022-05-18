import React from 'react'
import cn from 'classnames'
import { ArrowIcon } from 'xueyan-react-icon'
import { ContentsProOption } from "xueyan-react-contents"
import styles from './page-turner.scss'
import type { DocProps } from './doc'
import { useDocData } from './store'

interface PageTurnerProps<T,D> extends Pick<
  DocProps<T,D>,
  | 'onChange'
> {
  className?: string
  data?: ContentsProOption<T>
  direction: 'left' | 'right'
}

export function PageTurner<T,D>({
  className,
  data,
  direction,
  onChange
}: PageTurnerProps<T,D>) {
  const docData = useDocData<T,D>()
  if (!data) {
    return null
  }
  const right = direction === 'right'
  const arrow = (
    <div className={styles.arrow} >
      <ArrowIcon 
        size={20} 
        direction={right ? 'right' : 'left'} 
      />
    </div>
  )
  const main = (
    <div className={styles.main}>
      <div className={styles.label}>
        {data.label}
      </div>
      <div className={styles.levels}>
        {data.collection && (
          <span className={styles.level}>
            {data.collection.label}
          </span>
        )}
        {data.parents.map((item, index) => (
          <span key={index} className={styles.level}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
  return (
    <div
      className={cn(
        className,
        styles.xrdocpageturner,
        right && styles.right
      )}
      onClick={() => {
        if (onChange) {
          onChange(data.value, data, docData)
        }
      }}
    >
      {right ? main : arrow}
      {right ? arrow : main}
    </div>
  )
}
