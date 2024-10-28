import { useQuery } from "@apollo/client"
import { ALL_POSTS } from "../graphql/AllPostsQuery"

export const useAllPosts = () => {

  const { data, loading } = useQuery(ALL_POSTS)

  return {
    loading,
    posts: data?.allPosts.posts,
    page: data?.allPosts.page,
    hasMore: data?.allPosts.hasMore,
    lastDate: data?.allPosts.lastDate
  }
}