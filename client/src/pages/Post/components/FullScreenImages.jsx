import { useNavigate, useSearchParams } from "react-router-dom"
import { Button, Divider, Image, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react"
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { PostInfoContext } from "../contexts/PostContext"
import { useState } from "react"
import ButtonActions from "@/components/PostCards/ButtonActions"
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import MainPostCard from "./MainPostCard"
import Loading from "@/components/Loading"
import PostCards from "@/components/PostCards"
import PostForm from "@/components/PostForm"

const FullScreenImages = () => {

  dayjs.extend(relativeTime)
  const navigate = useNavigate()
  const [orientation, setOrientation] = useState(false)
  const { post, postId, comments, commentsLoading } = PostInfoContext()
  const [params, setParams] = useSearchParams()
  const { onOpenChange, onClose } = useDisclosure();

  const photoIdx = params.get('photo')

  if (photoIdx !== null && Number(photoIdx) >= post.images.length) {
    navigate(`/post/${postId}`)
  }

  const handleClose = () => {
    navigate(`/post/${postId}`)
    onClose()
  }

  const prevImage = () => {
    const imageIndex = Number(photoIdx)

    if (imageIndex > 0) {
      setParams({
        photo: imageIndex - 1
      })
    }
  }

  const nextImage = () => {
    const imageIndex = Number(photoIdx)

    if (imageIndex < post.images.length - 1) {
      setParams({
        photo: imageIndex + 1
      })
    }
  }



  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;

    if (naturalWidth < naturalHeight) setOrientation(true)
  }

  const isOpen = photoIdx !== null && Number(photoIdx) < post.images.length

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      hideCloseButton
      classNames={{
        base: 'bg-overlay/80 w-screen h-screen',
        body: 'p-0 w-full h-full flex flex-row gap-0',
      }}
    >
      <ModalContent>
        <>
          <ModalBody>
            <Button
              isIconOnly
              color="danger"
              aria-label="Like"
              radius="full"
              variant="flat"
              className="absolute top-2 left-2 z-20"
              onPress={handleClose}
            >
              <XMarkIcon className="size-7" />
            </Button>

            <div className="relative h-full grow box-border flex justify-center items-center">
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                radius="full"
                variant="flat"
                className="absolute bottom-1/2 left-2 z-20"
                onPress={prevImage}
              >
                <ArrowLeftIcon className="size-8" />
              </Button>
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                radius="full"
                variant="flat"
                className="absolute bottom-1/2 right-2 z-20"
                onPress={nextImage}
              >
                <ArrowRightIcon className="size-8" />
              </Button>

              <div className="w-full h-screen grid grid-rows-8">
                <div className="row-span-7 flex justify-center items-center">
                  <Image
                    removeWrapper
                    src={post.images[photoIdx]}
                    alt={`image-${photoIdx}`}
                    onLoad={handleImageLoad}
                    radius="none"
                    className={`${orientation ? 'max-h-full w-fit' : 'max-w-full h-fit'}`}
                  />
                </div>
                <div className="row-span-1 flex justify-center items-center boder">
                  <ButtonActions
                    postId={postId}
                    author={post.author}
                    content={post.content}
                    date={dayjs(post.createdAt).fromNow()}
                    comments={post.comments}
                    likes={post.likes}
                    bookmarks={post.bookmarks}
                  />
                </div>
              </div>
            </div>

            <div className="bg-background h-screen pt-5 w-96 hidden lg:flex flex-col gap-1">
              <MainPostCard />
              <PostForm parentPostId={postId} />
              <Divider className="w-full" />
              <div className="w-full overflow-auto">
                {
                  commentsLoading ?
                    <Loading />
                    :
                    <PostCards posts={comments} />
                }
              </div>
            </div>

          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  )
}

export default FullScreenImages