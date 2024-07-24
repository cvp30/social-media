import { Chip, ScrollShadow, Spinner } from "@nextui-org/react"
import MessageCard from "./MessageCard"
import { groupMessagesByDate } from "@/utils/GroupMessagesByDate"
import { useEffect, useRef } from "react"
import { ChatRoomContext } from "../../contexts/ChatRoomContext"

const ChatRoomBody = () => {

  const containerRef = useRef(null)
  const { chat, loading } = ChatRoomContext()

  //ALL KEYS ARE DATES 
  const formattedMessages = groupMessagesByDate(chat?.messages || [])
  //GET KEYS
  const dates = Object.keys(formattedMessages)

  useEffect(() => {
    scrollToEnd()
  }, [dates])

  const scrollToEnd = () => {
    containerRef.current?.scrollIntoView()
  }

  if (loading) return (
    <div className="row-span-5 flex justify-center items-center">
      <Spinner />
    </div>
  )

  return (
    <ScrollShadow
      isEnabled={false}
      className="row-span-5 p-1 flex flex-col gap-2"
    >
      {
        dates.map(date => (
          <div
            key={date}
            className="w-full flex flex-col gap-2"
          >
            <Chip
              color="primary"
              variant='faded'
              className='shadow-medium mx-auto'
              radius='sm'
            >
              {date}
            </Chip>

            <div className="w-full flex flex-col gap-1">
              {
                formattedMessages[date].map(message => (
                  <MessageCard
                    key={message.id}
                    id={message.id}
                    content={message.content}
                    sender={message.sender}
                    isRead={message.isRead}
                    timestamp={message.timestamp}
                  />
                ))
              }
            </div>

          </div>
        ))
      }
      <div ref={containerRef}></div>
    </ScrollShadow>
  )
}

export default ChatRoomBody