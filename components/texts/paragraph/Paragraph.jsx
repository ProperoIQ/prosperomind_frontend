import { clsx } from "clsx"
import { ReactNode } from "react"


export function Paragraph({ className, text, children }) {
  return <p className={clsx(className)}>{children ?? text}</p>
}
