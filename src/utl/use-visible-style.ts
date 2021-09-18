import { useEffect, useState } from "react"

/**
 * let the dom what toggle visible has transition style
 * @param visible
 */
export default function useVisibleStyle(
  visible?: boolean,
  timeout: number = 200
): [React.CSSProperties, number] {
  const [status, setStatus] = useState<number>(0)
  useEffect(() => {
    if (!visible) {
      setStatus(0)
      const timer = setTimeout(() => setStatus(-1), timeout)
      return () => clearTimeout(timer)
    } else {
      setStatus(0)
      const timer = setTimeout(() => setStatus(1), 10)
      return () => clearTimeout(timer)
    }
  }, [visible])
  return [{
    transition: `opacity ${timeout}ms`,
    opacity: status > 0 ? 1 : 0,
    display: status < 0 ? 'none' : 'block'
  }, status]
}