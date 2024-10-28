import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { USER_BOOKMARKS } from "../graphql/UserBookmarksQuery"
import PostCards from "@/components/PostCards"
import Loading from "@/components/Loading"

const Bookmarks = () => {
  const { slug } = useParams()

  const { data, loading } = useQuery(USER_BOOKMARKS,
    {
      variables: { slug }
    }
  )

  if (loading) return <Loading />

  return (
    <PostCards posts={data.userBookmarks} />
  )
}

export default Bookmarks