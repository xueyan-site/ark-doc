import React from 'react'
import { Side } from './side'
import { Main } from './main'
import styles from './wide-screen.scss'
import cn from 'classnames'
import type { DocProps } from './doc'

interface WideScreenProps<T,D> extends Pick<
  DocProps<T,D>, 
  | 'children'
  | 'getHref'
  | 'onChange'
  | 'onChangeVersion'
  | 'onChangeLanguage'
> {
  width: number
}

export function WideScreen<T,D>({
  children,
  width,
  getHref,
  onChange,
  onChangeVersion,
  onChangeLanguage
}: WideScreenProps<T,D>) {
  return (
    <div className={cn(
      styles.arkdocwidescreen,
      width >= 1600
        ? styles.large
        : width >= 1350
        ? styles.normal
        : width >= 1160
        ? styles.middle
        : styles.small
    )}>
      <Side 
        className={styles.side}
        getHref={getHref}
        onChange={onChange}
        onChangeVersion={onChangeVersion}
        onChangeLanguage={onChangeLanguage}
      >{children}</Side>
      <Main 
        className={styles.main}
        getHref={getHref}
        onChange={onChange}
      />
    </div>
  )
}