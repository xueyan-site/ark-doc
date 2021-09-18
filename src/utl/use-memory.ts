import { useCallback, useEffect, useState } from "react"

/**
 * use localStorage cache
 * @param key localStorage data key
 * @param state initialization state
 * @param justNull read state from localStorage when null
 * @returns 
 */
export default function useMemory<T>(key: string, init: (cache?: any) => T): [
  T, (value: T) => void
] {
  const [data, __set__] = useState<T>(init())
  useEffect(() => {
    const str = localStorage.getItem(key)
    __set__(init(str && JSON.parse(str)))
  }, [])
  const setData = useCallback((value: T) => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
    __set__(value)
  }, [__set__])
  return [data, setData]
}
