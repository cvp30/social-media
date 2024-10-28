import PropTypes from 'prop-types';
import { FaceSmileIcon } from "@heroicons/react/24/outline"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const EmojiButton = ({ handleAddEmoji }) => {


  return (
    <Popover
      placement="bottom-start"
      showArrow
      offset={10}
      radius="md"
      classNames={{
        base: 'p-0 m-0 rounded-sm',
        content: 'px-0 py-0 dropdownOptions'
      }}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          radius="full"
          color="primary"
          aria-label="Feeling"
        >
          <FaceSmileIcon className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Picker
          data={data}
          onEmojiSelect={handleAddEmoji}
          icons='solid'
          previewPosition='none'
          skin={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiButton

EmojiButton.propTypes = {
  handleAddEmoji: PropTypes.func,
}