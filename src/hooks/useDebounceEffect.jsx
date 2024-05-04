import { useEffect } from 'react'

export default function useDebounceEffect(
  fn= () => {},
  waitTime= 100,
  deps=[],
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
