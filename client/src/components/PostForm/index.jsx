import PropTypes from 'prop-types'
import { AuthContext } from "@/contexts/AuthContext"
import { Avatar, Button, Image, Textarea } from "@nextui-org/react"
import PhotoButton from "./PhotoButton"
import VideoButton from "./VideoButton"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { usePostForm } from '@/hooks/usePostForm'
import EmojiButton from '../EmojiButton'

const PostForm = ({ parentPostId, closeFn }) => {
  const { currUser } = AuthContext()

  const { postFormik, removeImage } = usePostForm(parentPostId, closeFn)

  const handleAddEmoji = (emoji) => {
    postFormik.setFieldValue('content', postFormik.values.content + emoji.native)
  }

  return (
    <form
      onSubmit={postFormik.handleSubmit}
      className="w-full h-fit flex p-4"
    >
      <Avatar
        src={`${currUser.photoURL}`}
        showFallback
      />
      <div className="flex-1 flex flex-col gap-2">
        <Textarea
          size="lg"
          name="content"
          minRows={1}
          maxRows={15}
          placeholder="What would you like to say?"
          radius="lg"
          variant="bordered"
          value={postFormik.values.content}
          onChange={postFormik.handleChange}
          classNames={{
            inputWrapper: 'border-none',
          }}
        />
        <div className="relative w-full h-fit flex gap-2 flex-wrap justify-center">

          {
            postFormik?.values.images.length > 0 && (
              <>
                <div className="w-full h-fit grid grid-cols-2 gap-2">
                  {
                    postFormik?.values.images.map((image, i) => {
                      return (
                        <div key={i} className="relative">
                          <Button
                            isIconOnly
                            color="primary"
                            variant="light"
                            radius="full"
                            className="absolute top-0 right-0 z-20"
                            onClick={() => removeImage(i)}
                          >
                            <XMarkIcon className="size-7" />
                          </Button>
                          <Image
                            src={URL.createObjectURL(image)}
                          />
                        </div>

                      )
                    })
                  }
                </div>
              </>
            )
          }
        </div>

        <div className="w-full h-fit flex justify-between">
          <div className="w-fit flex gap-1">
            <PhotoButton postFormik={postFormik} />
            <EmojiButton handleAddEmoji={handleAddEmoji} />
            <VideoButton />
          </div>

          <Button
            color="primary"
            radius="sm"
            type="submit"
            className='font-semibold'
            isDisabled={!!Object.keys(postFormik.errors).length}
          >
            Post
          </Button>
        </div>

      </div>


    </form>
  )
}

export default PostForm

PostForm.propTypes = {
  parentPostId: PropTypes.string,
  closeFn: PropTypes.func,
}