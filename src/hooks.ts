import { useState, useEffect, useRef } from 'react'

export function useWindowRect(): [number, number] {
  const [rect, setRect] = useState<[number,number]>([
    window.innerWidth,
    window.innerHeight
  ])
  useEffect(() => {
    const handleResize = () => setRect([
      window.innerWidth,
      window.innerHeight
    ])
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return rect
}

export function useDomRect<D extends Element>(): [
  React.RefObject<D>, number, number
] {
  const domRef = useRef<D>(null)
  const [rect, setRect] = useState<[number,number]>([0, 0])
  useEffect(() => {
    const dom = domRef.current
    if (!dom) {
      return
    }
    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        const rect = entry.target.getBoundingClientRect()
        setRect([ rect.width, rect.height ])
      }
    })
    observer.observe(dom)
    return () => observer.disconnect()
  }, [domRef.current])
  return [domRef, rect[0], rect[1]]
}
