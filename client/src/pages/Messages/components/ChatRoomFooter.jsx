import CustomInput from "@/components/CustomInput"
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { ChatRoomContext } from "../contexts/ChatRoomContext"
import { useCreateMessage } from "../hooks/useCreateMessage"
import EmojiButton from "@/components/EmojiButton"

const ChatRoomFooter = () => {

  const { chatId } = ChatRoomContext()
  const [message, setMessage] = useState('')
  const { sendMessage, loading } = useCreateMessage(chatId, message)

  const isDisabled = loading || !message.trim().length

  const handleChangeMessage = (e) => setMessage(e.target.value)

  const handleAddEmoji = (emoji) => {
    setMessage(message + emoji.native)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (message.trim().length) {
      await sendMessage({
        variables: { chatId, message }
      })
      setMessage('')
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 flex items-center gap-2 row-span-1 border-t-1 border-divider"
    >
      {/* <Button
        isIconOnly
        color="primary"
        variant="light"
        radius="full"
        size="sm"
      >
        <PaperClipIcon className="size-5" />
      </Button> */}
      <CustomInput
        name='message'
        placeholder='input message...'
        autoComplete="off"
        value={message}
        onChange={handleChangeMessage}
        endContent={<EmojiButton handleAddEmoji={handleAddEmoji} />}
      />

      <Button
        isIconOnly
        type="submit"
        color="primary"
        variant="light"
        radius="sm"
        size="lg"
        isDisabled={isDisabled}
      >
        <PaperAirplaneIcon className="size-7" />
      </Button>
    </form>
  )
}

export default ChatRoomFooter