import PropTypes from 'prop-types'
import { Button } from "@nextui-org/react"
import { Google } from "../../../../icons"

const GoogleButton = ({ text }) => {

  return (
    <Button
      size="lg"
      radius="sm"
      startContent={<Google />}
      fullWidth
      color="primary"
      variant="flat"
    >
      <p className="text-foreground font-semibold">
        {text}
      </p>
    </Button>
  )
}

export default GoogleButton

GoogleButton.propTypes = {
  text: PropTypes.string,
}