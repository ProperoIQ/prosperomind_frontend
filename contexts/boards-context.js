import { createContext, useContext } from "react"
import { RUseBoards } from "@/hooks/use-boards"


export const BoardsContext = createContext(undefined)


export const useBoardContext = () => {
  const boardsContext = useContext(BoardsContext)

  if (!boardsContext) {
    throw new Error("boards context is undefined")
  }

  return boardsContext
}
