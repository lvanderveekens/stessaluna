import { useRef, useEffect } from "react"

export function usePrevious(value): any | undefined {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
