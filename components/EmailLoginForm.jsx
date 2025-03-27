import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Cookies from "js-cookie"
import { useEffect } from "react"
import Link from "next/link"
import { InputField } from "@/components/InputField"
import { Button } from "@/components/ui/button"
import { login } from "@/services"
import { Form } from "@/components/ui/form"
import { iterateErrorResponse } from "@/lib/utils"
import { useUserStore } from "@/store/user"

const emailLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("Enter valid email address"),
  password: z.string().min(2, { message: "Minimum 2 characters are required" }),
})


const defaultValues = {
  email: "",
  password: "",
}

export function EmailLoginForm() {
  const { updateUserStore } = useUserStore()
  const pathName = usePathname()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(emailLoginFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (pathName === "/login" && Cookies.get("userInfo")) {
      router.push("/")
    }
  }, [pathName])

  async function onSubmit(data) {
    const { data: res, errRes } = (await login(data))
    if (res) {
      const userInfo = {
        accessToken: res.access_token,
        userId: res.user_id,
        role: res.role?.toUpperCase() ?? "END_USER",
        userName: res.user_name,
        email: res.email,
        subscription: res.subscription,
        customerOtherDetails: res.customer_other_details,
      }
      updateUserStore({ isLoading: false, data: userInfo, error: null })
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      Cookies.set("userInfo", JSON.stringify(userInfo), { path: "/" })
      router.push("/", { scroll: false })
    } else {
      iterateErrorResponse(errRes )
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)()
        }}
        className="w-full lg:w-[360px]"
      >
        <InputField
          fieldName="email"
          control={form.control}
          label="Email Address"
          placeholder="Email Address"
          inputType="email"
        />
        <InputField
          control={form.control}
          fieldName="password"
          label="Password"
          placeholder="Password"
          inputType="password"
          className="mb-[22px] mt-4"
        />
        <Button type="submit" className="mt-11 h-10 w-full rounded-[10px]">
          Sign in
        </Button>
       or
        <div className="flex items-center justify-center">
          <Link
            className="cursor-pointer text-sm font-medium text-primary transition-transform duration-300 ease-in-out hover:scale-105"
            href="/login?type=mobile"
          >
            Sign in with Mobile
          </Link>
        </div>
      </form>
    </Form>
  )
}
