import PropTypes from 'prop-types'
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { XMarkIcon } from '@heroicons/react/24/solid'
import PostForm from '../PostForm'
import { formattedNumbers } from '@/utils/FormattedNumers'

const CommentButton = ({ postId, author, content, comments, date }) => {

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { username, slug, photoURL } = author

  return (
    <>
      <Button
        radius="sm"
        onPress={onOpen}
        startContent={<ChatBubbleLeftIcon className='size-6' />}
        className="hover:text-success hover:bg-success/20"
        variant=""
      >
        {formattedNumbers(comments.length)}
      </Button>

      <Modal
        size='lg'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton={<XMarkIcon />}
        classNames={{
          base: 'bg-background',
          closeButton: 'size-10 text-center'
        }}
      >
        <ModalContent>
          <ModalHeader />

          <ModalBody className='px-4'>
            <div className='w-full flex gap-2'>
              <div className='flex flex-col gap-2 items-center'>
                <Avatar
                  src={`${photoURL}`}
                  showFallback
                />
                <div className='flex-1 border border-default-500'></div>
              </div>
              <div className='flex flex-col flex-1'>
                <p className='font-bold truncate'>{username}</p>
                <p className='text-default-500'>@{slug} . {date}</p>

                <p className='mt-2'>{content}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className='p-0'>
            <PostForm parentPostId={postId} closeFn={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CommentButton

CommentButton.propTypes = {
  author: PropTypes.object,
  content: PropTypes.string,
  postId: PropTypes.string,
  date: PropTypes.string,
  comments: PropTypes.array,
}