import React from 'react'
import cn from 'classnames'
import styles from './link-image-render.scss'

/**
 * link image description object 
 */
 export interface LinkImage {
  /**
   * link image src
   */
  src: React.ReactNode
  /**
   * link name
   */
  title?: string
  /**
   * link address
   */
  href?: string
  /**
   * jump link way
   */
  target?: React.HTMLAttributeAnchorTarget
  /**
   * listen click event
   */
  onClick?: React.MouseEventHandler<HTMLElement>
}

export default function LinkImageRender({
  className,
  style,
  target,
  data,
  onClick
}: {
  className?: string
  style?: React.CSSProperties
  target?: React.HTMLAttributeAnchorTarget
  data?: LinkImage
  onClick?: React.MouseEventHandler<HTMLElement>
}) {
  if (!data) {
    return null
  }
  const imgNode = data.src
    ? typeof data.src === 'string'
      ? <img className={styles.image} src={data.src} />
      : data.src
    : null
  return data.href ? (
    <a
      className={cn(styles.wrapper, className)}
      style={style}
      href={data.href}
      title={data.title}
      target={data.target || target}
      onClick={onClick}
    >
      {imgNode}
    </a>
  ) : (
    <div
      className={cn(styles.wrapper, className)}
      style={style}
      title={data.title}
      onClick={onClick || data.onClick}
    >
      {imgNode}
    </div>
  )
}
