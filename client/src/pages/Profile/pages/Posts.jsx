import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { USER_POSTS } from "../graphql/UserPosts"
import { Divider, Spinner } from "@nextui-org/react"
import GeneralPostCard from "@/components/PostCards/GeneralPostCard"

const Posts = () => {
  const { slug } = useParams()

  const { data, loading } = useQuery(USER_POSTS,
    {
      variables: { slug }
    }
  )

  if (loading) return <Spinner />
  return (
    <div>
      {
        data?.userPosts.map(post => (
          <div key={post.postId}>
            <GeneralPostCard
              postId={post.postId}
              author={post.author}
              content={post.content}
              images={post.images}
              createdAt={post.createdAt}
            />
            <Divider />
          </div>
        ))
      }
    </div>
  )
}

export default Posts