import React, { Fragment, useState } from 'react'
import styles from './index.scss'
import Side from '../side'
import Main from '../main'
import useFadeStyle from '../utl/use-fade-style'
import useSlideStyle from '../utl/use-slide-style'
import type { Article } from '../com/contents'
import type { DocData } from '../store'

export default function DocInner({
  isPhone,
  onChange,
  children
}: {
  isPhone: boolean
  onChange?: (node: Article, doc: DocData) => void
  children?: React.ReactNode
}) {
  return isPhone ? (
    <PhoneInnder onChange={onChange}>{children}</PhoneInnder>
  ) : (
    <NormalInner onChange={onChange}>{children}</NormalInner>
  )
}

function NormalInner({
  onChange,
  children
}: {
  onChange?: (node: Article, doc: DocData) => void
  children?: React.ReactNode
}) {
  return (
    <Fragment>
      <Side className={styles.side} onChange={onChange}>
        {children}
      </Side>
      <Main className={styles.main}/>
    </Fragment>
  )
}

function PhoneInnder({
  onChange,
  children
}: {
  onChange?: (node: Article, doc: DocData) => void
  children?: React.ReactNode
}) {
  const [visible, setVisible] = useState<boolean>(false)
  const fadeStyle = useFadeStyle(visible)
  const slideStyle = useSlideStyle(visible)
  return (
    <Fragment>
      <div 
        style={fadeStyle}
        className={styles.mask}
        onClick={() => setVisible(false)}
      />
      <Side 
        className={styles.side} 
        onChange={onChange}
        style={slideStyle}
      >
        {children}
      </Side>
      <Main
        className={styles.main}
        menuNode={(
          <div
            className={styles.menu}
            onClick={() => setVisible(true)}
          >MENU</div>
        )}
      />
    </Fragment>
  )
}
