import React from 'react'
import cn from 'classnames'
import styles from './loading.scss'
import { FadeTransition } from 'ark-transition'

function Skeleton({
  className,
  style,
  children,
  value,
}: {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  value?: boolean
}) {
  return (
    <FadeTransition value={value} enterDelay=".3s">
      <div 
        className={cn(styles.xrdocskeleton, className)} 
        style={style}
      >
        {children}
      </div>
    </FadeTransition>
  )
}

function Rectangle(style: React.CSSProperties) {
  return <div className={styles.rect} style={style} />
}

export function Loading() {
  return (
    <Skeleton value={true}>
      <Rectangle width="40%" height="18px" />
      <Rectangle />
      <Rectangle />
      <Rectangle width="40%" height="18px" />
      <Rectangle />
      <Rectangle />
      <Rectangle width="40%" height="18px" />
      <Rectangle />
      <Rectangle />
    </Skeleton>
  )
}
