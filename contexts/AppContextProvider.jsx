"use client"

import { useMemo } from "react"
import { AppContext } from "@/contexts/app-context"
import {  useApp } from "@/hooks/use-app"
import {  useModal } from "@/hooks/use-modal"
import { ModalContext } from "./modal-context"


export function AppContextProvider({ children }) {
  const { appState, setAppState } = useApp()
  const { modalState, setModalState } = useModal()

  const appMemoState = useMemo(() => ({ appState, setAppState }), [appState, setAppState])

  const modalMemoState = useMemo(
    () => ({ modalState, setModalState }),
    [modalState, setModalState],
  )

  return (
    <AppContext.Provider value={appMemoState}>
      <ModalContext.Provider value={modalMemoState}>{children}</ModalContext.Provider>
    </AppContext.Provider>
  )
}
