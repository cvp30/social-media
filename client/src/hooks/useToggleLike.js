import { AuthContext } from "@/contexts/AuthContext"
import { ADD_LIKE } from "@/graphql/AddLikeMutation"
import { REMOVE_LIKE } from "@/graphql/RemoveLikeMutation"
import { USER_LIKES } from "@/pages/Profile/graphql/UserLikesQuery"
import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment"
import { useMutation } from "@apollo/client"


export const useToggleLike = () => {
  const { currUser } = AuthContext()

  const [addLike] = useMutation(ADD_LIKE, {
    update: (cache, { data }) => {
      const postLiked = data.addLike

      const existingPost = cache.readFragment({
        id: cache.identify({ id: postLiked, __typename: 'Post' }),
        fragment: POST_DETAILS_FRAGMENT,
      })

      if (existingPost) {
        const updatedPost = {
          ...existingPost,
          likes: [...existingPost.likes, currUser.id]
        }

        cache.writeFragment({
          id: cache.identify({ id: postLiked, __typename: 'Post' }),
          fragment: POST_DETAILS_FRAGMENT,
          data: updatedPost
        })

        const postsLiked = cache.readQuery({
          query: USER_LIKES,
          variables: { slug: currUser.slug }
        })

        if (postsLiked) {
          cache.writeQuery({
            query: USER_LIKES,
            data: {
              userLikes: [updatedPost, ...postsLiked.userLikes]
            },
            variables: { slug: currUser.slug }
          })
        }
        // cache.modify({
        //   fields: {
        //     userLikes(existingLikedPosts = []) {

        //       return [updatedPost, ...existingLikedPosts]
        //     }
        //   }
        // })
      }
    }
  })

  const [removeLike] = useMutation(REMOVE_LIKE, {
    update: (cache, { data }) => {
      const postUnliked = data.removeLike

      const existingPost = cache.readFragment({
        id: cache.identify({ id: postUnliked, __typename: 'Post' }),
        fragment: POST_DETAILS_FRAGMENT,
      })

      if (existingPost) {
        const updatedPost = {
          ...existingPost,
          likes: existingPost.likes.filter(id => id !== currUser.id)
        }

        cache.writeFragment({
          id: cache.identify({ id: postUnliked, __typename: 'Post' }),
          fragment: POST_DETAILS_FRAGMENT,
          data: updatedPost
        })

        const postsLiked = cache.readQuery({
          query: USER_LIKES,
          variables: { slug: currUser.slug }
        })

        if (postsLiked) {
          cache.writeQuery({
            query: USER_LIKES,
            data: {
              userLikes: postsLiked.userLikes.filter(post => post.postId !== postUnliked)
            },
            variables: { slug: currUser.slug }
          })
        }
      }
    }
  })

  const toggleLike = async (postId, isLiked) => {
    isLiked ?
      await removeLike({ variables: { postId } })
      :
      await addLike({ variables: { postId } })
  }

  return {
    toggleLike
  }
}