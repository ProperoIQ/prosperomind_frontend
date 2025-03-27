import { useEffect, useState } from "react"


export const useDimensions = () => {
  const [dimensionsState, setDimensionsState] = useState({
    winInnerH: 0,
    winInnerW: 0,
  })

  useEffect(() => {
    if (!dimensionsState.winInnerW || !dimensionsState.winInnerH) {
      setDimensionsState({
        ...dimensionsState,
        winInnerW: window.innerWidth,
        winInnerH: window.innerHeight,
      })
    }

    window.addEventListener("resize", () => {
      setDimensionsState({
        ...dimensionsState,
        winInnerW: window.innerWidth,
        winInnerH: window.innerHeight,
      })
    })

    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  return { dimensionsState }
}
