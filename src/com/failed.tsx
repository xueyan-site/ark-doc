import React from 'react'
import Block from './block'
import styles from './failed.scss'
import FailedIcon from '../ast/failed'

export default function Failed(style: Pick<React.CSSProperties, 'width'|'height'>) {
  return (
    <Block className={styles.wrapper} style={style}>
      <FailedIcon width="50" height="50" fill="#666" />
      <button className={styles.button} onClick={() => location.reload()}>
        reload
      </button>
    </Block>
  )
}
