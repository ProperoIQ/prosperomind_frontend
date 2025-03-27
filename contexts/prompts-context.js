import { createContext, useContext } from "react"


export const PromptsContext = createContext(undefined)


export const usePromptsContext = () => {
  const promptsContext = useContext(PromptsContext)

  if (!promptsContext) {
    throw new Error("prompts context is undefined")
  }

  return promptsContext
}
