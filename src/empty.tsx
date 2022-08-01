import React from 'react'
import styles from './empty.scss'
import { FileIcon } from 'sicon'

export function Empty() {
  return (
    <div className={styles.xrdocempty}>
      <FileIcon size="40px" />
      <div className={styles.label}>
        The article is empty.
      </div>
    </div>
  )
}