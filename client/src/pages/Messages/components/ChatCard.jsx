import { AuthContext } from '@/contexts/AuthContext';
import { Avatar, AvatarGroup, Badge } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"
import defaultUser from '@/assets/defaultUser.jpg'
import defaultGroup from '@/assets/group.webp'
import { formatChatDate } from '@/utils/FormatChatDate';

const ChatCard = ({ chatId, users, lastMessage, messageDate, isSender, unreadMessages }) => {

  // const { currUser } = AuthContext()
  console.log({ users })

  return (
    <NavLink
      to={`${chatId}`}
      className={({ isActive }) => `${isActive ? 'bg-hoverPost' : ''} w-full h-20 flex items-center justify-between gap-1 py-2 px-2 cursor-pointer duration-300 hover:bg-hoverPost`}>

      {
        unreadMessages ? (
          <Badge content={unreadMessages} size='lg' color="danger" shape="circle">
            <Avatar
              src={users.length > 1 ? `${defaultGroup}` : `${users[0].photoURL || defaultUser}`}
              size='lg'
              alt="userImg"
            />
          </Badge>
        ) : (
          <Avatar
            src={users.length > 1 ? `${defaultGroup}` : `${users[0].photoURL || defaultUser}`}
            size='lg'
            alt="userImg"
          />
        )
      }


      <div className='h-full flex flex-col justify-stretch py-1 ml-2 flex-1'>
        <p className='line-clamp-1 font-bold'>
          {
            users.length > 1 ? (
              users.map(user => user.username)
            )
              :
              users[0].username
          }
        </p>
        <p className='text-default-500 line-clamp-1'>
          {
            lastMessage && (
              <>
                <span>
                  {isSender ? 'you: ' : ''}
                </span>
                <span>
                  {lastMessage}
                </span>
              </>
            )
          }
        </p>
      </div>

      <div className='w-fit h-full text-xs  flex flex-col justify-center items-end'>
        {
          messageDate ?
            <p className='text-default-500'>{formatChatDate(messageDate)}</p>
            :
            <></>
        }
      </div>

    </NavLink>
  )
}

export default ChatCard

ChatCard.propTypes = {
  chatId: PropTypes.string,
  users: PropTypes.array,
  lastMessage: PropTypes.string,
  messageDate: PropTypes.string,
  isSender: PropTypes.bool,
  unreadMessages: PropTypes.number,
}