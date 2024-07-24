import { AddMessage } from "@/icons"
import { useQuery } from "@apollo/client"
import { ScrollShadow, Spinner } from "@nextui-org/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useLocation } from "react-router-dom"
import CustomInput from "@/components/CustomInput"
import { ALL_CHATS } from "../../graphql/AllChats"
import ChatCard from "./ChatCard"
import NewMessageButton from "../NewMessageButton"

const ChatList = () => {

  const location = useLocation()
  const { data, loading } = useQuery(ALL_CHATS)

  return (
    <div className={`${location.pathname === '/messages' ? '' : 'hidden'} w-full lg:w-96 h-full lg:grid grid-cols-1 grid-rows-10 pt-3 border-r-1 border-divider`}>
      <div className="row-span-1 flex justify-between items-center px-4">
        <h3>Messages</h3>

        <NewMessageButton
          isIconOnly
          variant="light"
          radius="full"
          aria-label="AddMessage"
        >
          <AddMessage />
        </NewMessageButton>

      </div>
      {
        loading ? (
          <div className="row-span-3 mx-auto place-content-center w-fit">
            <Spinner />
          </div>
        ) : data?.allChats.length ? (
          <div className="w-full row-span-9 flex flex-col items-center gap-4">
            <CustomInput
              startContent={<MagnifyingGlassIcon />}
              type="search"
              placeholder="Find chat..."
              className="px-4"
            />

            <ScrollShadow
              isEnabled={false}
              className="w-full flex flex-col gap-1"
            >
              {
                data?.allChats.map(chat => {
                  return (
                    <ChatCard
                      key={chat.id}
                      chatId={chat.id}
                      user={chat.user}
                      lastMessage={chat.lastMessage}
                      isSender={chat.isSender}
                      messageDate={chat.messageDate}
                      unreadMessages={chat.unreadMessages}
                    />
                  )
                })
              }
            </ScrollShadow>

          </div>
        ) : (
          <div className="w-full row-span-9 pt-8 px-8 flex flex-col items-center gap-4">
            <h1>Welcome to your inbox</h1>
            <p className="text-default-500">Write down conversations between you and other people.
            </p>

            <NewMessageButton
              size="lg"
              radius="sm"
              className="font-bold w-fit"
            >
              New Message
            </NewMessageButton>
          </div>
        )
      }


    </div>
  )
}

export default ChatList