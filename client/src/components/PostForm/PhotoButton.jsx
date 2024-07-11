import PropTypes from 'prop-types';
import { PhotoIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"
import { useRef } from "react"

const PhotoButton = ({ postFormik }) => {

  const fileInputRef = useRef(null)

  const handleOpenFile = () => {
    fileInputRef.current.click()
  }

  const handleChangeFile = (e) => {
    const { files } = e.target

    if (Object.keys(files)) {
      const values = Object.values(files)
      postFormik.setFieldValue('images', [...postFormik.values.images, ...values])
    }
  }

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      radius="full"
      color="primary"
      aria-label="Photo"
      onClick={handleOpenFile}
    >
      <PhotoIcon className="size-5" />
      <input
        type="file"
        name="image"
        className='hidden'
        ref={fileInputRef}
        onChange={handleChangeFile}
        multiple
        accept='image/*'
      />
    </Button>
  )
}

export default PhotoButton

PhotoButton.propTypes = {
  postFormik: PropTypes.any,
}