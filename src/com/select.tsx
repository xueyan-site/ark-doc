import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './select.scss'
import useFadeStyle from '../utl/use-fade-style'

interface SelectOption<T> {
  value: T
  label: React.ReactNode
}

export default function Select<T>({
  className,
  style,
  children,
  options,
  value,
  onChange
}: {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  options?: SelectOption<T>[]
  value?: T
  onChange?: (value?: T, option?: SelectOption<T>) => void
}) {
  const [visible, setVisible] = useState<boolean>(false)
  const fadeStyle = useFadeStyle(visible)
  const targetRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef<boolean>(visible)
  const currOpts = options || []
  visibleRef.current = visible

  useEffect(() => {
    const target = targetRef.current
    if(!target || currOpts.length <= 0) {
      return
    }
    const close = (event: MouseEvent) => {
      if (!target.contains(event.target as any)) {
        setVisible(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, [options])

  return (
    <div
      ref={targetRef}
      className={cn(styles.wrapper, className, {
        [styles.pointer]: currOpts.length > 0
      })}
      style={style}
      onClick={() => setVisible(!visible)}
    >
      {children}
      {currOpts.length > 0 && (
        <div className={styles.opts} style={fadeStyle}>
          {currOpts.map((item, index) => (
            <div
              key={index}
              className={cn(styles.opt, {
                [styles.active]: item.value === value
              })}
              onClick={() => {
                onChange && onChange(item.value, item)
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}