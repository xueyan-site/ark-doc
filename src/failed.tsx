import React from 'react'
import styles from './failed.scss'
import { Button } from 'ark-button'
import { ErrorIcon } from 'sicon'

export function Failed() {
  return (
    <div className={styles.xrdocfailed}>
      <ErrorIcon size="40px" />
      <Button 
        className={styles.button} 
        onClick={() => location.reload()}
      >
        reload
      </Button>
    </div>
  )
}
