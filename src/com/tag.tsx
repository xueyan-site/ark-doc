import React from 'react'
import cn from 'classnames'
import styles from './tag.scss'
import Select from './select'
import LinkTextRender, { LinkText } from './link-text-render'

export default function Tag({
  className,
  style,
  label,
  options,
}: {
  className?: string
  style?: React.CSSProperties
  label?: string
  options?: LinkText[]
}) {
  return label ? (
    <Select
      className={cn(styles.wrapper, className)}
      value={label}
      options={options && options.map(i => ({
        value: i.label,
        label: <LinkTextRender className={styles.opt} data={i} />
      }))}
    >
      <div className={styles.tag} style={style}>{label}</div>
    </Select>
  ) : null
}