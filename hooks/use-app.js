import { Dispatch, useEffect, useState } from "react"




export const useApp = () => {
  const [appState, setAppState] = useState({
    userInfo: null,
    showLoader: false,
  })

  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo =  window.localStorage.getItem("userInfo")
      if (userInfo) {
        const { accessToken, userId, role, userName, email, subscription, customerOtherDetails } =
          JSON.parse(userInfo)
        setAppState((prev) => ({
          ...prev,
          userInfo: {
            accessToken,
            userId,
            role,
            userName,
            email,
            subscription,
            customerOtherDetails,
          },
        }))
      }
    }

    fetchUserInfo()
  }, [])

  return { appState, setAppState }
}
