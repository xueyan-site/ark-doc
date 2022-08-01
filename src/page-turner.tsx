import React from 'react'
import cn from 'classnames'
import { ArrowIcon } from 'sicon'
import { Link } from 'ark-link'
import { ContentsProOption } from "ark-contents"
import styles from './page-turner.scss'
import { useDocData } from './store'
import type { ContentsProps } from 'ark-contents'
import type { DocProps } from './doc'

interface PageTurnerProps<T,D> extends
  Pick<DocProps<T,D>, 'onChange'>,
  Pick<ContentsProps<T>, 'getHref'>
{
  className?: string
  data?: ContentsProOption<T>
  direction: 'left' | 'right'
}

export function PageTurner<T,D>({
  className,
  data,
  direction,
  getHref,
  onChange
}: PageTurnerProps<T,D>) {
  const docData = useDocData<T,D>()
  if (!data) {
    return <div/>
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
    <Link
      {...data}
      target="_self"
      href={data.href || (getHref && getHref(
        data,
        data.collection.contents
      ))}
      className={className}
      onClick={event => {
        if (data.onClick) {
          data.onClick(event)
        } else {
          const disabled = data.disabled
          const hasChildren = data.children.length > 0
          if (onChange && !hasChildren && !disabled && !data.href) {
            onChange(data.value, data, docData)
          }
        }
      }}
    >
      <div
        className={cn(
          styles.xrdocpageturner,
          right && styles.right
        )}
      >
        {right ? main : arrow}
        {right ? arrow : main}
      </div>
    </Link>
  )
}
