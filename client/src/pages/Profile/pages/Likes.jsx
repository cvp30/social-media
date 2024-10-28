import { useParams } from "react-router-dom"
import { USER_LIKES } from "../graphql/UserLikesQuery"
import { useQuery } from "@apollo/client"
import PostCards from "@/components/PostCards"
import Loading from "@/components/Loading"

const Likes = () => {

  const { slug } = useParams()

  const { data, loading } = useQuery(USER_LIKES,
    {
      variables: { slug }
    }
  )

  if (loading) return <Loading />

  return (
    <PostCards posts={data.userLikes} />
  )
}

export default Likes