import { createContext, useContext } from "react"

export const ModalContext = createContext(undefined)


export const useModalContext = () => {
  const modalContext = useContext(ModalContext)

  if (!modalContext) {
    throw new Error("modal context is undefined")
  }

  return modalContext
}
