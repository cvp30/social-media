import { Input } from "@nextui-org/react"
import { forwardRef } from "react"

const CustomInput = forwardRef((props, ref) => {

  return (
    <Input
      ref={ref}
      size="lg"
      radius="sm"
      variant='bordered'
      color="primary"
      classNames={{
        inputWrapper: "text-default-600 group-data-[focus=true]:text-primary group-data-[focus=true]:border-primary data-[hover=true]:border-default border-default-200",
        input: ' text-foreground placeholder:text-default-400',
      }}
      {...props}
    />
  )
})
CustomInput.displayName = 'CustomInput'

export default CustomInput