import React from 'react'
import cn from 'classnames'
import styles from './block.scss'

export default function Block({
  className,
  style,
  children
}: {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  return (
    <div className={cn(styles.wrapper, className)} style={style}>
      {children}
    </div>
  )
}