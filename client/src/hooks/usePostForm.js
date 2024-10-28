import { AuthContext } from "@/contexts/AuthContext"
import { CREATE_POST } from "@/graphql/CreatePost"
import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment"
import { ALL_POSTS } from "@/pages/Home/graphql/AllPostsQuery"
import { COMMENTS_LIST } from "@/pages/Post/graphql/GetCommentsList"
import { USER_POSTS } from "@/pages/Profile/graphql/UserPosts"
import { postSchema } from "@/schemas/postSchema"
import { uploadImages } from "@/services/firebase"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"


export const usePostForm = (parentPostId, closeFn) => {

  const { currUser } = AuthContext()
  const [createPost] = useMutation(CREATE_POST, {
    update: (cache, { data }) => {
      const newPost = data.createPost

      // IS COMMENT
      if (parentPostId) {
        // VERIFICAR 
        const parentPost = cache.readFragment({
          id: cache.identify({ id: newPost.parentPostId, __typename: 'Post' }),
          fragment: POST_DETAILS_FRAGMENT,
        })

        cache.writeFragment({
          id: cache.identify({ id: newPost.parentPostId, __typename: 'Post' }),
          fragment: POST_DETAILS_FRAGMENT,
          data: {
            ...parentPost,
            comments: [...parentPost.comments, newPost.postId]
          }
        })

        const commentsPost = cache.readQuery({
          query: COMMENTS_LIST,
          variables: { postId: newPost.parentPostId }
        })

        if (commentsPost) {
          cache.writeQuery({
            query: COMMENTS_LIST,
            data: {
              comments: [newPost, ...commentsPost.comments]
            },
            variables: { postId: newPost.parentPostId }
          })
        }
      }

      else {
        const allPosts = cache.readQuery({
          query: ALL_POSTS
        })

        cache.writeQuery({
          query: ALL_POSTS,
          data: {
            allPosts: {
              ...allPosts.allPosts,
              posts: [newPost, ...allPosts.allPosts.posts]
            }
          }
        })

        const userPosts = cache.readQuery({
          query: USER_POSTS,
          variables: { slug: currUser.slug }
        })

        if (userPosts) {
          cache.writeQuery({
            query: USER_POSTS,
            data: {
              userPosts: [newPost, ...userPosts.userPosts]
            },
            variables: { slug: currUser.slug }
          })
        }
      }
    }
  })

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
          const arrImagesPromises = values.images.map(image => uploadImages(currUser.id, image))

          const arrImages = await Promise.all(arrImagesPromises)

          input.images = arrImages

        } catch (error) {
          throw new Error(error.message)
        }
      }

      if (Object.keys(input).length) {
        if (parentPostId) input.parentPostId = parentPostId

        await createPost({
          variables: input
        })

        if (closeFn) closeFn()
        resetForm()
      }
    }
  })

  const removeImage = (index) => {
    const newArr = postFormik.values.images
    newArr.splice(index, 1)
    postFormik.setFieldValue('images', newArr)
  }

  return {
    postFormik,
    removeImage
  }
}