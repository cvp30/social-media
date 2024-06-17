import { cloneElement } from "react"

const Icon = ({ children }) => {
  return (
    <>
      {
        cloneElement(children, {
          className: `size-6 text-default-500 focus:text-[##006FEE] ${children.props.className}`,
          stroke: "#71717a",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: .5
        })
      }
    </>
  )
}

export default Icon