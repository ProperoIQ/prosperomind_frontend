import { useState } from "react"

export const useModal = () => {
  const [modalState, setModalState] = useState({
    isActive: false,
    isOpen: false,
    contentName: null,
    prevContentName: null,
    isOperationComplete: false,
  })

  return { modalState, setModalState }
}




export const openModal = (setState, lockScroll, options) => {
  const { modalState } = options

  lockScroll()

  setState((prev) => ({
    ...modalState,
    isActive: true,
    isOpen: true,
    contentName: modalState?.contentName ?? null,
    prevContentName: prev.contentName,
    isOperationComplete: false,
    prevHeading: prev.heading,
    prevData: prev.data,
  }))
}


export const closeModal = (setState, unlockScroll, isOperationComplete) => {
  setState((prevState) => ({
    ...prevState,
    isOpen: false,
    isActive: false,
    contentName: null,
    canDeactivate: true,
    prevContentName: prevState.contentName,
    isOperationComplete: !!isOperationComplete,
    prevHeading: prevState.heading,
    prevData: prevState.data,
    heading: undefined,
  }))
  unlockScroll()
}


export const shouldDeactivate = (contentName, allowExceptions) => {
  const exceptions = [...allowExceptions]

  return !!contentName && !exceptions.includes(contentName)
}
