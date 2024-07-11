import { AuthContext } from "@/contexts/AuthContext"
import { Avatar, Button, Image, Textarea } from "@nextui-org/react"
import PhotoButton from "./PhotoButton"
import FeelingButton from "./FeelingButton"
import VideoButton from "./VideoButton"
import { useFormik } from "formik"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { postSchema } from "@/schemas/postSchema"
import { useMutation } from "@apollo/client"
import { CREATE_POST } from "@/graphql/CreatePost"
import { uploadPostImages } from "@/services/firebase"

const PostForm = () => {
  const { currUser } = AuthContext()
  const [createPost] = useMutation(CREATE_POST)

  const postFormik = useFormik({
    initialValues: {
      content: "",
      images: [],
    },
    validationSchema: postSchema,
    onSubmit: async (values, { resetForm }) => {

      const input = {}
      if (values.content.length) input.content = values.content

      if (values.images.length) {
        try {
          const arrImagesPromises = values.images.map(image => uploadPostImages(currUser.id, image))
          const arrImages = await Promise.all(arrImagesPromises)
          console.log(arrImages)
          input.images = arrImages

        } catch (error) {
          throw new Error(error.message)
        }
      }

      await createPost({
        variables: input
      })
      resetForm()
    }
  })
  const removeImage = (index) => {
    const newArr = postFormik.values.images
    newArr.splice(index, 1)
    postFormik.setFieldValue('images', newArr)
  }

  return (
    <form
      onSubmit={postFormik.handleSubmit}
      className="w-full h-fit flex p-4"
    >
      <Avatar
        src={`${currUser.photoURL}`}
      />
      <div className="flex-1 flex flex-col gap-2">
        <Textarea
          size="lg"
          name="content"
          minRows={1}
          maxRows={15}
          placeholder="What's happening?"
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
            <FeelingButton />
            <VideoButton />
          </div>

          <Button
            color="primary"
            radius="sm"
            type="submit"
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