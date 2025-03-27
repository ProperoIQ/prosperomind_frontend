import {useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"


export const InputField = ({
  id,
  label,
  inputType,
  placeholder,
  inputClassName,
  fieldName,
  control,
  labelClassName,
  errorClassName,
  className,
  readOnly,
  containerClassName,
  autoComplete,
  onChange,
  onKeyDown,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={cn(containerClassName)}>
      <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem id={id ?? ""} className={cn(className)}>
            {!!label && (
              <FormLabel className={cn("text-sm font-normal leading-[17.5px]", labelClassName)}>
                {label}
              </FormLabel>
            )}
            <div className="w-full">
              <FormControl>
                {inputType === "password" ? (
                  <div className="relative">
                    <Input
                      autoComplete={autoComplete}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="select-none"
                      readOnly={readOnly ?? false}
                      {...field}
                      onChange={onChange ?? ((e) => field.onChange(e))}
                      onKeyDown={onKeyDown}
                    />
                    <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                      {showPassword ? (
                        <HiEyeOff className="h-6 w-6" onClick={togglePasswordVisibility} />
                      ) : (
                        <HiEye className="h-6 w-6" onClick={togglePasswordVisibility} />
                      )}
                    </div>
                  </div>
                ) : (
                  <Input
                    className={cn(inputClassName)}
                    placeholder={placeholder ?? ""}
                    type={inputType ?? "text"}
                    readOnly={readOnly ?? false}
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage className={cn(errorClassName, "text-red-600")} />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
