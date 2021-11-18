import { useEffect, useState } from "react"

/**
 * let the dom what toggle visible has transition style
 * @param visible
 */
export default function useSlideLeftStyle(
  visible?: boolean,
  timeout: number = 200
): React.CSSProperties {
  const [status, setStatus] = useState<number>(0)
  useEffect(() => {
    setStatus(0)
    const timer = visible 
      ? setTimeout(() => setStatus(1), 50) 
      : setTimeout(() => setStatus(-1), timeout)
    return () => clearTimeout(timer)
  }, [visible])
  return {
    transition: `transform ${timeout}ms`,
    transform: `translate3D(${status > 0 ? 0 : -100}%, 0, 0)`,
    display: status < 0 ? 'none' : 'block'
  }
}