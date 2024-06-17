import PropTypes from 'prop-types'
import { Input } from "@nextui-org/react"
import { cloneElement, forwardRef } from "react"

const CustomInput = forwardRef(({ startContent, endContent, ...props }, ref) => {

  const StartIcon = startContent ? cloneElement(startContent, {
    className: `size-6 ${startContent.props.className || ''}`
  }) : null

  const EndIcon = endContent ? cloneElement(endContent, {
    className: `size-6 ${endContent.props.className || ''}`
  }) : null

  return (
    <Input
      ref={ref}
      size="lg"
      radius="sm"
      variant='bordered'
      color="primary"
      startContent={StartIcon}
      endContent={EndIcon}
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

CustomInput.propTypes = {
  startContent: PropTypes.element,
  endContent: PropTypes.element,
}