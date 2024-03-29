import React, { forwardRef, useImperativeHandle } from 'react'
import cn from 'classnames'
import { ContentsProps } from 'ark-contents'
import { DocProvider } from './store'
import { WideScreen } from './wide-screen'
import { NarrowScreen } from './narrow-screen'
import { useDomRect } from './hooks'
import { DocConfig, DocOnChange, DocOnChangeLanguage, DocOnChangeVersion } from './types'
import styles from './doc.scss'

export interface DocProps<T,D> 
  extends DocConfig<T,D>, 
  Pick<ContentsProps<T>, 'getHref'> 
{
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 子节点 */
  children?: React.ReactNode
  /** 切换页面 */
  onChange?: DocOnChange<T,D>
  /** 切换版本 */
  onChangeVersion?: DocOnChangeVersion<T,D>
  /** 切换语言 */
  onChangeLanguage?: DocOnChangeLanguage<T,D>
}

export interface DocRef {
  /** 根节点 */
  rootNode: HTMLDivElement | null
}

export const Doc = forwardRef<DocRef, DocProps<any, any>>(({
  className,
  style,
  children,
  getHref,
  onChange,
  onChangeVersion,
  onChangeLanguage,
  ...props
}, ref) => {
  const [rootRef, width] = useDomRect<HTMLDivElement>()

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  return (
    <DocProvider {...props}>
      <div 
        ref={rootRef} 
        style={style}
        className={cn(className, styles.xrdoc)} 
      >
        {width >= 1000 ? (
          <WideScreen 
            width={width}
            getHref={getHref}
            onChange={onChange}
            onChangeVersion={onChangeVersion}
            onChangeLanguage={onChangeLanguage}
          >{children}</WideScreen>
        ) : width >= 320 ? (
          <NarrowScreen
            getHref={getHref}
            onChange={onChange}
            onChangeVersion={onChangeVersion}
            onChangeLanguage={onChangeLanguage}
          >{children}</NarrowScreen>
        ) : null}
      </div>
    </DocProvider>
  )
})
