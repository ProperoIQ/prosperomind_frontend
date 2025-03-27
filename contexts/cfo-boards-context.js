import { createContext, useContext } from "react"
import { RUseCFOBoards } from "@/hooks/use-cfo-boards"


export const CFOBoardsContext = createContext<RUseCFOBoards | undefined>(undefined)


export const useCFOBoardsContext = () => {
  const cfoBoardsContext = useContext(CFOBoardsContext)

  if (!cfoBoardsContext) {
    throw new Error("cfo-boards context is undefined")
  }

  return cfoBoardsContext
}
