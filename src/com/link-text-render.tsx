import React from 'react'
import cn from 'classnames'
import styles from './link-text-render.scss'

/**
 * link text description object 
 */
export interface LinkText {
  /**
   * link label
   */
  label: React.ReactNode
  /**
   * link title
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

export default function LinkTextRender({
  className,
  style,
  target,
  data,
  onClick
}: {
  className?: string
  style?: React.CSSProperties
  target?: React.HTMLAttributeAnchorTarget
  data?: LinkText
  onClick?: React.MouseEventHandler<HTMLElement>
}) {
  if (!data) {
    return null
  }
  return data.href ? (
    <a
      className={cn(styles.wrapper, className)}
      style={style}
      href={data.href}
      title={data.title}
      target={data.target || target}
      onClick={onClick}
    >
      {data.label}
    </a>
  ) : (
    <span
      className={cn(styles.wrapper, className)}
      style={style}
      onClick={onClick || data.onClick}
    >
      {data.label}
    </span>
  )
}
