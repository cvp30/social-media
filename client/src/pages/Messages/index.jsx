import { Outlet, useLocation } from "react-router-dom"
import ChatList from "./components/ChatList"
import NewMessageButton from "./components/NewMessageButton"


const Messages = () => {

  const location = useLocation()

  return (
    <div className="h-screen flex">
      <ChatList />

      <div className="flex-1 grid grid-cols-1 grid-rows-10">
        {
          location.pathname === '/messages' ? (
            <div className="row-span-10 flex flex-col justify-center items-center gap-6">
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