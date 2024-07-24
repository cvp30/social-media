import { ArrowTopRightOnSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Avatar, Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { ChatRoomContext } from '../../contexts/ChatRoomContext';
import defaultUser from '@/assets/defaultUser.jpg'
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDeleteChat } from "../../hooks/useDeleteChat";

const ChatSettings = () => {

  const navigate = useNavigate()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { chatId, chat: { user } } = ChatRoomContext()
  const { deleteChat, loading } = useDeleteChat()


  const handleRedirect = () => {
    onClose()
    navigate(`/${user.slug}`)
  }

  const handleDeleteChat = async () => {
    await deleteChat({
      variables: { chatId }
    })
    navigate('/messages')
    onClose()
  }

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        variant="light"
        radius="full"
        onPress={onOpen}
      >
        <InformationCircleIcon className="size-7" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col items-center gap-2'>
              <Avatar
                src={user.photoURL || defaultUser}
                alt="userImg"
                className='w-20 h-20 mx-auto'
              >
              </Avatar>
              <div className='w-full flex flex-col items-center'>
                <h2 className='line-clamp-1 text-center'>{user.username}</h2>
                <p className='text-default-500'>@{user.slug}</p>
              </div>
              <Divider />
            </ModalHeader>
            <ModalBody>
              <div>
                <p className='font-semibold'>bio:</p>
                <p className=''>{user.bio}</p>
              </div>
              <Divider />

            </ModalBody>
            <ModalFooter className='flex justify-evenly'>
              <Button
                size='lg'
                color="primary"
                radius='sm'
                startContent={<ArrowTopRightOnSquareIcon className='size-6' />}
                onPress={handleRedirect}
              >
                Visit profile
              </Button>
              <Button
                size='lg'
                color="danger"
                radius='sm'
                startContent={<TrashIcon className="size-6" />}
                isLoading={loading}
                onPress={handleDeleteChat}
              >
                Delete chat
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChatSettings