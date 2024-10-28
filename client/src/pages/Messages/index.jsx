import { Outlet, useLocation } from "react-router-dom"
import NewMessageButton from "./components/NewMessageButton"
import ChatList from "./components/ChatList"


const Messages = () => {

  const location = useLocation()

  return (
    <div className="w-full md:h-screen h-[calc(100vh-5rem)] flex box-border">
      <ChatList />

      <div className="flex-1 grid grid-cols-1 grid-rows-7 border-divider border-r-1">
        {
          location.pathname === '/messages' ? (
            <div className="hidden lg:flex flex-col justify-center items-center row-span-7 gap-6">
              <h1>Select a message</h1>
              <p className="text-default-500">Choose from your existing conversations or just start a new one</p>

              <NewMessageButton
                size="lg"
                radius="sm"
                className="font-bold w-fit"
              >
                New Message
              </NewMessageButton>

            </div>
          )
            :
            <Outlet />
        }

      </div>
    </div>
  )
}

export default Messages