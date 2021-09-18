import React from 'react'
import cn from 'classnames'
import styles from './avatar-line.scss'
import { useDoc } from '../store'
import LinkImageRender from '../com/link-image-render'

export default function AvatarLine({
  className
}: {
  className?: string
}) {
  const { avatar, logos } = useDoc()
  return (
    <div className={cn(styles.wrapper, className)}>
      <LinkImageRender className={styles.avatar} data={avatar} />
      {logos.length > 0 && (
        <div className={styles.logos}>
          {logos.map((item, index) => (
            <LinkImageRender 
              key={index}
              className={styles.logo} 
              target="_blank" 
              data={item}
            />
          ))}
        </div>
      )}
    </div>
  )
}
