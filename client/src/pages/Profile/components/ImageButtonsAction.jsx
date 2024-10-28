import PropTypes from 'prop-types'
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button } from "@nextui-org/react"

const ImageButtonsAction = ({ image, openImageFn, revertImageFn }) => {
  return (
    <div className="absolute z-20 flex gap-1">
      <Button
        isIconOnly
        variant="flat"
        color="default"
        size="md"
        radius="full"
        aria-label="add photo"
        onPress={openImageFn}
      >
        <PhotoIcon className="size-6" />
      </Button>
      {
        image && (
          <Button
            isIconOnly
            variant="flat"
            color="default"
            size="md"
            radius="full"
            aria-label="revert photo"
            onPress={revertImageFn}
          >
            <XMarkIcon className="size-6" />
          </Button>
        )
      }
    </div>
  )
}

export default ImageButtonsAction

ImageButtonsAction.propTypes = {
  image: PropTypes.any,
  openImageFn: PropTypes.func,
  revertImageFn: PropTypes.func,
}