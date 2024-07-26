import { Avatar, Badge } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"
import defaultUser from '@/assets/defaultUser.jpg'
import { formatChatDate } from '@/utils/FormatChatDate';
import { useMessageAdded } from '../../hooks/useMessageAdded';
import { AuthContext } from '@/contexts/AuthContext';

const ChatCard = ({ chatId, user, lastMessage, unreadMessages }) => {

  useMessageAdded(chatId)

  const { currUser } = AuthContext()

  const isSender = lastMessage ? lastMessage.sender.id === currUser.id : null

  return (
    <NavLink
      to={`${chatId}`}
      className={({ isActive }) => `${isActive ? 'bg-hoverPost' : ''} w-full h-20 flex items-center justify-between gap-1 py-2 px-2 cursor-pointer duration-300 hover:bg-hoverPost`}
    >

      {
        unreadMessages ? (
          <Badge content={unreadMessages} size='lg' color="danger" shape="circle">
            <Avatar
              src={user.photoURL || defaultUser}
              size='lg'
              alt="userImg"
            />
          </Badge>
        ) : (
          <Avatar
            src={user.photoURL || defaultUser}
            size='lg'
            alt="userImg"
          />
        )
      }


      <div className='h-full pt-2 ml-2 flex-1'>
        <p className='line-clamp-1 font-bold'>
          {user.username}
        </p>
        <p className='text-default-500 text-sm line-clamp-1'>
          {
            lastMessage && (
              <>
                <span>
                  {isSender ? 'you: ' : ''}
                </span>
                <span>
                  {lastMessage.content}
                </span>
              </>
            )
          }
        </p>

      </div>

      {
        lastMessage?.timestamp ? (
          <div className='w-fit h-full pt-2'>
            <p className='text-default-500 text-sm'> {formatChatDate(lastMessage.timestamp)} </p>
          </div>

        ) : <></>
      }

    </NavLink>
  )
}

export default ChatCard

ChatCard.propTypes = {
  chatId: PropTypes.string,
  user: PropTypes.object,
  lastMessage: PropTypes.object,
  unreadMessages: PropTypes.number,
}