import React, { useState } from 'react'
import { Side } from './side'
import { Main } from './main'
import styles from './narrow-screen.scss'
import { Drawer } from 'xueyan-react-drawer'
import { MenuIcon } from 'xueyan-react-icon'
import type { DocProps } from './doc'

interface NarrowScreenProps<T,D> extends Pick<
  DocProps<T,D>, 
  | 'children'
  | 'onChange'
  | 'onChangeVersion'
  | 'onChangeLanguage'
> {}

export function NarrowScreen<T,D>({
  children,
  onChange,
  onChangeVersion,
  onChangeLanguage
}: NarrowScreenProps<T,D>) {
  const [visible, setVisible] = useState<boolean>()
  return (
    <div className={styles.xrdocnarrowscreen}>
      <Drawer 
        direction="left"
        value={visible}
        onChange={setVisible}
      >
        <Side 
          className={styles.side}
          onChange={onChange}
          onChangeVersion={onChangeVersion}
          onChangeLanguage={onChangeLanguage}
        >
          {children}
        </Side>
      </Drawer>
      <Main 
        className={styles.main}
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
