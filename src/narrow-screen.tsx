import React, { useState } from 'react'
import { Side } from './side'
import { Main } from './main'
import styles from './narrow-screen.scss'
import { Drawer } from 'ark-drawer'
import { MenuIcon } from 'sicon'
import type { DocProps } from './doc'

interface NarrowScreenProps<T,D> extends Pick<
  DocProps<T,D>, 
  | 'children'
  | 'getHref'
  | 'onChange'
  | 'onChangeVersion'
  | 'onChangeLanguage'
> {}

export function NarrowScreen<T,D>({
  children,
  getHref,
  onChange,
  onChangeVersion,
  onChangeLanguage
}: NarrowScreenProps<T,D>) {
  const [visible, setVisible] = useState<boolean>()
  return (
    <div className={styles.arkdocnarrowscreen}>
      <Drawer 
        direction="left"
        value={visible}
        onChange={setVisible}
      >
        <Side 
          className={styles.side}
          getHref={getHref}
          onChange={onChange}
          onChangeVersion={onChangeVersion}
          onChangeLanguage={onChangeLanguage}
        >
          {children}
        </Side>
      </Drawer>
      <Main 
        className={styles.main}
        getHref={getHref}
        onChange={onChange}
        header={
          <div
            className={styles.menu}
            onClick={() => setVisible(true)}
          >
            <MenuIcon margin="0 4px 0 0"/>
            MENU
          </div>
        }
      />
    </div>
  )
}
