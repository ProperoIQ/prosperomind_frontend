import { createContext, useContext } from "react"


export const AppContext = createContext(undefined)


export const useAppContext = () => {
  const appContext = useContext(AppContext)

  if (!appContext) {
    throw new Error("app context is undefined")
  }

  return appContext
}
