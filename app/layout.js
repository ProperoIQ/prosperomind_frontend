import "./globals.css"
import { Toaster } from "react-hot-toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppContextProvider } from "@/contexts/AppContextProvider"

export const metadata = {
  title: "ProsperoIQ",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <AppContextProvider>
          <TooltipProvider>{children}</TooltipProvider>
       
          <Toaster />
        </AppContextProvider>
      </body>
    </html>
  )
}
