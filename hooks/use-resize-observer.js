import { useEffect, useRef, useState, RefObject } from "react"



export const useResizeObserver = (targetRef) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })
  const resizeObserverRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current

    const handleResize = (entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      })
    }

    if (target) {
      resizeObserverRef.current = new ResizeObserver(handleResize)
      resizeObserverRef.current.observe(target)

      return () => {
        resizeObserverRef.current?.disconnect()
      }
    }

    // Ensure that the cleanup function always returns undefined
    return undefined
  }, [targetRef])

  return dimensions
}
