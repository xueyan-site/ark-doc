import React from 'react'
import { Side } from './side'
import { Main } from './main'
import styles from './wide-screen.scss'
import cn from 'classnames'
import type { DocProps } from './doc'

interface WideScreenProps<T,D> extends Pick<
  DocProps<T,D>, 
  | 'children'
  | 'onChange'
  | 'onChangeVersion'
  | 'onChangeLanguage'
> {
  width: number
}

export function WideScreen<T,D>({
  children,
  width,
  onChange,
  onChangeVersion,
  onChangeLanguage
}: WideScreenProps<T,D>) {
  return (
    <div className={cn(
      styles.xrdocwidescreen,
      width >= 1600
        ? styles.large
        : width >= 1200
        ? styles.normal
        : width >= 1048
        ? styles.middle
        : styles.small
    )}>
      <Side 
        className={styles.side}
        onChange={onChange}
        onChangeVersion={onChangeVersion}
        onChangeLanguage={onChangeLanguage}
      >{children}</Side>
      <Main 
        className={styles.main}
        onChange={onChange}
      />
    </div>
  )
}