import React from 'react'
import styles from './failed.scss'
import { ErrorIcon } from 'xueyan-react-icon'

export function Failed() {
  return (
    <div className={styles.xrdocfailed}>
      <ErrorIcon size="40px" />
      <button 
        className={styles.button} 
        onClick={() => location.reload()}
      >
        reload
      </button>
    </div>
  )
}
