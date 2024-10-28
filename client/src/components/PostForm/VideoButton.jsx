import { VideoCameraIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"

const VideoButton = () => {
  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      radius="full"
      color="primary"
      aria-label="Video"
    >
      <VideoCameraIcon className="size-6" />
    </Button>
  )
}

export default VideoButton