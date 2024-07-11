import { FaceSmileIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"

const FeelingButton = () => {
  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      radius="full"
      color="primary"
      aria-label="Feeling"
    >
      <FaceSmileIcon className="size-5" />
    </Button>
  )
}

export default FeelingButton