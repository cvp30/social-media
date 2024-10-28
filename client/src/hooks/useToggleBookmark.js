import { AuthContext } from "@/contexts/AuthContext"
import { BOOKMARK_POST } from "@/graphql/BookmarkPostMutation"
import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment"
import { UNBOOKMARK_POST } from "@/graphql/UnbookmarkPostMutation"
import { USER_BOOKMARKS } from "@/pages/Profile/graphql/UserBookmarksQuery"
import { useMutation } from "@apollo/client"


export const useToggleBookmark = () => {

  const { currUser } = AuthContext()

  const [bookmarkPost] = useMutation(BOOKMARK_POST, {
    update: (cache, { data }) => {
      const postBookmarked = data.bookmarkPost

      const existingPost = cache.readFragment({
        id: cache.identify({ id: postBookmarked, __typename: 'Post' }),
        fragment: POST_DETAILS_FRAGMENT,
      })

      if (existingPost) {
        const updatedPost = {
          ...existingPost,
          bookmarks: [...existingPost.bookmarks, currUser.id]
        }

        cache.writeFragment({
          id: cache.identify({ id: postBookmarked, __typename: 'Post' }),
          fragment: POST_DETAILS_FRAGMENT,
          data: updatedPost
        })

        // USER BOOKMARKED(POFILE)
        const userBookmarks = cache.readQuery({
          query: USER_BOOKMARKS,
          variables: { slug: currUser.slug }
        })

        if (userBookmarks) {
          cache.writeQuery({
            query: USER_BOOKMARKS,
            data: {
              userBookmarks: [updatedPost, ...userBookmarks.userBookmarks]
            },
            variables: { slug: currUser.slug }
          })
        }
      }
    }
  })

  const [unbookmarkPost] = useMutation(UNBOOKMARK_POST, {
    update: (cache, { data }) => {
      const postUnbookmarked = data.unbookmarkPost

      const existingPost = cache.readFragment({
        id: cache.identify({ id: postUnbookmarked, __typename: 'Post' }),
        fragment: POST_DETAILS_FRAGMENT,
      })

      if (existingPost) {
        const updatedPost = {
          ...existingPost,
          bookmarks: existingPost.bookmarks.filter(id => id !== currUser.id)
        }

        cache.writeFragment({
          id: cache.identify({ id: postUnbookmarked, __typename: 'Post' }),
          fragment: POST_DETAILS_FRAGMENT,
          data: updatedPost
        })

        // USER BOOKMARKED(PROFILE)
        const userBookmarks = cache.readQuery({
          query: USER_BOOKMARKS,
          variables: { slug: currUser.slug }
        })

        if (userBookmarks) {
          cache.writeQuery({
            query: USER_BOOKMARKS,
            data: {
              userBookmarks: userBookmarks.userBookmarks.filter(post => post.postId !== postUnbookmarked)
            },
            variables: { slug: currUser.slug }
          })
        }
      }
    }
  })

  const toggleBookmark = async (postId, isBookmarked) => {
    isBookmarked ?
      await unbookmarkPost({ variables: { postId } })
      :
      await bookmarkPost({ variables: { postId } })
  }

  return {
    toggleBookmark
  }
}