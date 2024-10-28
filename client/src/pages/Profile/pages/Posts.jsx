import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { USER_POSTS } from "../graphql/UserPosts"
import PostCards from "@/components/PostCards"
import Loading from "@/components/Loading"

const Posts = () => {
  const { slug } = useParams()

  const { data, loading } = useQuery(USER_POSTS, {
    variables: { slug }
  })

  if (loading) return <Loading />

  return (
    <PostCards posts={data.userPosts} />
  )
}

export default Posts