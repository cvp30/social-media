import Loading from "@/components/Loading"
import PostCards from "@/components/PostCards"
import { ALL_FOLLOWING_USER_POSTS } from "@/graphql/FollowingUserPost"
import { useQuery } from "@apollo/client"

const FollowingPostList = () => {

  const { loading, data } = useQuery(ALL_FOLLOWING_USER_POSTS)

  if (loading) return <Loading />

  return (
    <PostCards posts={data.allFollowingUserPost} />
  )
}

export default FollowingPostList