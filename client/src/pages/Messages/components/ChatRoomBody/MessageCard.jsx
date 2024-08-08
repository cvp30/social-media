import PropTypes from 'prop-types';
import { AuthContext } from "@/contexts/AuthContext"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from "@nextui-org/react"
import defaultUser from '@/assets/defaultUser.jpg'
import dayjs from 'dayjs';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useDeleteMessage } from '../../hooks/useDeleteMessage';

const MessageCard = ({ id, content, sender, isRead, timestamp }) => {

  const { currUser } = AuthContext()
  const { deleteMessage } = useDeleteMessage()
  const isMyMessage = currUser.id === sender.id

  const generalDate = dayjs(timestamp).format('dddd, MMMM D, YYYY h:mm A')
  const formattedDate = dayjs(timestamp).format('hh:mm a')

  const handleDeleteMessage = async () => {
    await deleteMessage({
      variables: {
        messageId: id
      }
    })
  }

  return (
    <div className={`${isMyMessage ? 'flex-row-reverse' : ''} w-full flex gap-1 group`}>
      {/* IMAGE */}
      <Avatar
        src={`${sender.photoURL || defaultUser}`}
        size='sm'
        alt='userImg'
      />
      {/* CONTENT */}
      <div
        className={`${isMyMessage ? 'rounded-tl-md bg-primary text-white items-end' : 'rounded-tr-md bg-hoverPost '} min-w-28 max-w-[75%] flex flex-col px-3 py-1 rounded-b-md`}
      >
        <p> {content}</p>
        <Tooltip
          delay={0}
          closeDelay={0}
          className='text-xs font-bold'
          radius='sm'
          color='foreground'
          placement={`${isMyMessage ? 'left-end' : 'right-end'}`}
          content={`${generalDate}`}
        >
          <p className={`${isMyMessage ? 'text-gray-200' : 'text-gray-400'} w-fit text-xs `}>{formattedDate}</p>
        </Tooltip>

      </div>

      {/* BUTTON */}
      <div className='w-fit h-full flex items-center'>

        <Dropdown
          showArrow
          placement="bottom-start"
          radius='sm'
          classNames={{
            content: 'bg-background shadow-medium'
          }}
        >
          <DropdownTrigger>
            <Button
              isIconOnly
              color='primary'
              variant='light'
              radius='full'
              size='sm'
              className='hidden group-hover:block'
            >
              <EllipsisVerticalIcon className="size-5 mx-auto" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            itemClasses={{
              // title: 'text-base',
            }}
            variant="flat"
            color="primary"
            aria-label="Msg Options"
          >
            <DropdownItem
              key="delete"
              color="danger"
              title="Delete message"
              onClick={handleDeleteMessage}
            />
          </DropdownMenu>
        </Dropdown>
      </div>

    </div>
  )
}

export default MessageCard

MessageCard.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  sender: PropTypes.object,
  isRead: PropTypes.bool,
  timestamp: PropTypes.string,
}