import { cn } from "@/lib/utils"

export function Heading({ className, text, children, type }) {
  let heading

  if (type === "h2") {
    heading = <h2 className={cn("text-3xl leading-[42px]", className)}>{children || text}</h2>
  } else if (type === "h3") {
    heading = <h3 className={cn("text-2xl leading-[34px]", className)}>{children || text}</h3>
  } else if (type === "h4") {
    heading = <h4 className={cn("text-xl", className)}>{children || text}</h4>
  } else {
    heading = <h1 className={cn("text-4xl leading-[48px]", className)}>{children || text}</h1>
  }

  return heading
}
