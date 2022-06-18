import React, { useState } from 'react'
import cn from 'classnames'
import { SwitchTheme } from 'xueyan-react-style'
import { Link } from 'xueyan-react-link'
import { BoxSelect, Select } from 'xueyan-react-select'
import { Contents } from 'xueyan-react-contents'
import styles from './side.scss'
import { useDocData } from './store'
import { CollectionStruct } from './types'
import type { DocProps } from './doc'

interface SideProps<T,D> extends Pick<
  DocProps<T,D>, 
  | 'children'
  | 'getHref'
  | 'onChange'
  | 'onChangeVersion'
  | 'onChangeLanguage'
> {
  className?: string
}

export function Side<T,D>({
  className,
  children,
  getHref,
  onChange,
  onChangeVersion,
  onChangeLanguage
}: SideProps<T,D>) {
  const docData = useDocData<T,D>()
  const {
    name,
    value,
    collections,
    description,
    icon, 
    icons, 
    version,
    versions,
    language,
    languages,
  } = docData
  const [collection, setCollection] = useState<CollectionStruct<T, D>>(
    docData.collection
  )
  const showVersion = version || versions.length > 0
  const showLanguage = language || languages.length > 0
  const hideCollection = collections.length === 1 && !collections[0].label
  return (
    <aside className={cn(styles.xrdocside, className)}>
      {(icon || icons.length > 0) && (
        <div className={cn(styles.cl, styles.icons)}>
          {icon && <Link className={cn(styles.rl, styles.mainicon)} {...icon}/>}
          {icons.length > 0 && icons.map((item, index) => (
            <Link key={index} className={cn(styles.rl, styles.subicon)} {...item} />
          ))}
        </div>
      )}
      {(name || description) && (
        <div className={styles.cl}>
          {name && <h1 className={cn(styles.cs, styles.name)}>{name}</h1>}
          {description && <div className={cn(styles.cs, styles.desc)}>{description}</div>}
        </div>
      )}
      <div className={styles.cl}>
        <div className={cn(styles.cs, styles.kinds)}>
          {showVersion && (
            <Select 
              className={cn(styles.rs, styles.version)} 
              placeholder="version"
              value={version} 
              options={versions}
              onChange={(value, option) => {
                if (onChangeVersion) {
                  onChangeVersion(value, option, docData)
                }
              }}
            />
          )}
          {showLanguage && (
            <Select 
              className={cn(styles.rs, styles.language)} 
              placeholder="language"
              value={language}
              options={languages}
              onChange={(value, option) => {
                if (onChangeLanguage) {
                  onChangeLanguage(value, option, docData)
                }
              }}
            />
          )}
        </div>
        <SwitchTheme className={styles.cs}/>
      </div>
      {!hideCollection && (
        <BoxSelect 
          className={cn(styles.cl, styles.collection)}
          vertical={true}
          value={collection.value}
          options={collections}
          onChange={(_a, option: any) => {
            setCollection(option)
          }}
        />
      )}
      <Contents
        className={styles.cl}
        value={value}
        options={collection.contents}
        getHref={getHref}
        onChange={(value, option) => {
          if (onChange) {
            onChange(value, option, docData)
          }
        }}
      />
      {children && (
        <div className={styles.cl}>
          {children}
        </div>
      )}
    </aside>
  )
}
