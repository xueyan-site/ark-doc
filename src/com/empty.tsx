import React from 'react'
import Block from './block'
import styles from './empty.scss'
import EmptyIcon from '../ast/empty'

export default function Empty(style: Pick<React.CSSProperties, 'width'|'height'>) {
  return (
    <Block className={styles.wrapper} style={style}>
      <EmptyIcon width="50" height="50" fill="#666" />
    </Block>
  )
}