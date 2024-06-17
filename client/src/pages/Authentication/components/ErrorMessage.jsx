import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => {

  return (
    <p className="flex items-center gap-1 text-xs">
      <ExclamationTriangleIcon className="size-5" />
      {message}
    </p>
  )
}

export default ErrorMessage

ErrorMessage.propTypes = {
  message: PropTypes.string,
}