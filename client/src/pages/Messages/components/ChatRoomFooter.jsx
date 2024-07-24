import CustomInput from "@/components/CustomInput"
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { ChatRoomContext } from "../contexts/ChatRoomContext"
import { useSendMessage } from "../hooks/useSendMessage"

const ChatRoomFooter = () => {

  const { chatId } = ChatRoomContext()
  const [message, setMessage] = useState('')
  const { sendMessage, loading } = useSendMessage(chatId, message)

  const isDisabled = loading || !message.trim().length

  const handleChangeMessage = (e) => setMessage(e.target.value)

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
      <CustomInput
        name='message'
        placeholder='input message...'
        autoComplete="off"
        value={message}
        onChange={handleChangeMessage}
      />
      <Button
        isIconOnly
        color="primary"
        variant="light"
        radius="full"
      >
        <PaperClipIcon className="size-5" />
      </Button>

      <Button
        type="submit"
        isIconOnly
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