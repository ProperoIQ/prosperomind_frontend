import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useModalContext } from "@/contexts/modal-context"


export const useScrollLock = () => {
  const pathname = usePathname()
  const [previousPathName, setPreviousPathName] = useState(pathname)
  const { setModalState } = useModalContext()

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden"
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ""
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      setModalState((prevState) => ({
        ...prevState,
        isActive: false,
        canDeactivate: false,
        type: null,
        contentName: null,
      }))
      unlockScroll()
    }
    if (pathname !== previousPathName) {
      handleRouteChange()
    }
    setPreviousPathName(pathname)
  }, [pathname])

  return { lockScroll, unlockScroll }
}
