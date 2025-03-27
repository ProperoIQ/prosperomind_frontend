"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Dashboard  from "@/components/dashboard/page"
import { useAppContext } from "@/contexts/app-context"
import { useUserStore } from "@/store/user"

export default function Home() {
  const [userRole, setUserRole] = useState(null)
  const router = useRouter()
  const {
    appState: { userInfo },
  } = useAppContext()

  const { data: storeUserInfo, updateUserStore } = useUserStore()

  useEffect(() => {
    if (userInfo) {
      setUserRole(userInfo.role)
      if (!storeUserInfo) {
        updateUserStore({ isLoading: false, data: userInfo, error: null })
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (storeUserInfo) {
      setUserRole(storeUserInfo.role)
    }
  }, [storeUserInfo])

  

  return (
    <main className="h-full">
      {userRole?.toUpperCase() === "CONSULTANT" && <Dashboard />}
    </main>
  )
}
