import React from 'react'
import cn from 'classnames'
import styles from './switch.scss'

export interface SwitchOption<T> {
  value: T
  label: React.ReactNode
  disabled?: boolean
}

export default function Switch<T>({
  className,
  style,
  options,
  value,
  active,
  onChange
}: {
  className?: string
  style?: React.CSSProperties
  options?: SwitchOption<T>[]
  value?: T
  active?: T
  onChange?: (value?: T, option?: SwitchOption<T>) => void
}) {
  return options ? (
    <div
      className={cn(styles.wrapper, className)}
      style={style}
    >
      {options.map((item, index) => (
        <div
          key={index}
          className={cn(styles.opt, {
            [styles.current]: item.value === value
          })}
          onClick={() => {
            onChange && onChange(item.value, item)
          }}
        >
          {item.value === active ? (
            <span className={styles.active}>{item.label}</span>
          ) : item.label}
        </div>
      ))}
    </div>
  ) : null
}