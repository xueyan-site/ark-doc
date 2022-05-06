import React, { useState } from 'react'
import cn from 'classnames'
import { SwitchTheme } from 'xueyan-react-style'
import { Link } from 'xueyan-react-link'
import { BoxSelect, Select } from 'xueyan-react-select'
import { Contents } from 'xueyan-react-contents'
import styles from './side.scss'
import { useDocData } from './store'
import { DocumentInfoStruct } from './types'
import type { DocProps } from './doc'

interface SideProps<T,D> extends Pick<
  DocProps<T,D>, 
  | 'children'
  | 'onChange'
  | 'onChangeVersion'
  | 'onChangeLanguage'
> {
  className?: string
}

export function Side<T,D>({
  className,
  children,
  onChange,
  onChangeVersion,
  onChangeLanguage
}: SideProps<T,D>) {
  const docData = useDocData<T,D>()
  const { 
    value,
    document,
    documents,
    name, 
    description,
    icon, 
    icons, 
    version,
    versions,
    language,
    languages,
  } = docData
  const [doc, setDoc] = useState<DocumentInfoStruct<T, D>>(document)
  return (
    <aside className={cn(styles.xrdocside, className)}>
      <div className={styles.icons}>
        <Link className={styles.mainicon} {...icon}/>
        {icons.length > 0 && icons.map((item, index) => (
          <Link key={index} className={styles.subicon} {...item} />
        ))}
      </div>
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.desc}>{description}</div>
      <div className={styles.selects}>
        <Select 
          className={styles.version} 
          placeholder="version"
          value={version} 
          options={versions}
          onChange={(value, option) => {
            if (onChangeVersion) {
              onChangeVersion(value, option, docData)
            }
          }}
        />
        <Select 
          className={styles.language} 
          placeholder="language"
          value={language}
          options={languages}
          onChange={(value, option) => {
            if (onChangeLanguage) {
              onChangeLanguage(value, option, docData)
            }
          }}
        />
      </div>
      <SwitchTheme className={styles.switchtheme}/>
      <BoxSelect 
        className={styles.document}
        vertical={true}
        value={doc.value}
        options={documents}
        onChange={(_a, option: any) => {
          setDoc(option)
        }}
      />
      <Contents
        className={styles.contents}
        value={value}
        options={doc.contents}
        onChange={(value, option) => {
          if (onChange) {
            onChange(value, option, docData)
          }
        }}
      />
      {children && (
        <div className={styles.footer}>
          {children}
        </div>
      )}
    </aside>
  )
}
