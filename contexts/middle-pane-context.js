import { createContext, useContext } from "react"
import { RUseMiddlePane } from "@/hooks/use-middle-pane"

export interface RMiddlePaneContext extends RUseMiddlePane {}

export const MiddlePaneContext = createContext<RUseMiddlePane | undefined>(undefined)

type UseMiddlePaneContext = () => RMiddlePaneContext

export const useMiddlePaneContext: UseMiddlePaneContext = () => {
  const middlePaneContext = useContext(MiddlePaneContext)

  if (!middlePaneContext) {
    throw new Error("middlePane context is undefined")
  }

  return middlePaneContext
}
