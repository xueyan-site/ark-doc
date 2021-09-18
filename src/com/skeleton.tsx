import React from 'react'
import styles from './skeleton.scss'
import useVisibleStyle from '../utl/use-visible-style'

function Skeleton({
  visible,
  children,
  className,
  style
}: {
  visible?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const [visibleStyle] = useVisibleStyle(visible, 1000)
  return (
    <div className={className} style={{ ...style, ...visibleStyle }}>
      {children}
    </div>
  )
}

export function Line(style: React.CSSProperties) {
  return <div className={styles.line} style={style} />
}

export function Title(style: React.CSSProperties) {
  return <div className={styles.title} style={style} />
}

export function Image(style: React.CSSProperties) {
  return <div className={styles.image} style={style} />
}

Skeleton.Line = Line
Skeleton.Title = Title
Skeleton.Image = Image

export default Skeleton
