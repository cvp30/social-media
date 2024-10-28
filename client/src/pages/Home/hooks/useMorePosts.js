import { useLazyQuery } from "@apollo/client"
import { ALL_POSTS } from "../graphql/AllPostsQuery"

export const useMorePosts = () => {

  const [loadMorePosts, { loading: loadingPosts, client }] = useLazyQuery(ALL_POSTS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { allPosts } = client.readQuery({
        query: ALL_POSTS
      })

      client.writeQuery({
        query: ALL_POSTS,
        data: {
          allPosts: {
            ...data.allPosts,
            page: data.allPosts.page + 1,
            posts: [...allPosts.posts, ...data.allPosts.posts]
          }
        }
      })


    },
  })



  return {
    loadMorePosts,
    loadingPosts,
  }
}