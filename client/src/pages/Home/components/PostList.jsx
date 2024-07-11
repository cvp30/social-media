import GeneralPostCard from "@/components/PostCards/GeneralPostCard"
import { ALL_POSTS } from "@/graphql/AllPosts"
import { useQuery } from "@apollo/client"
import { Divider, Spinner } from "@nextui-org/react"


const PostList = () => {

  const { loading, data } = useQuery(ALL_POSTS)

  if (loading) return <Spinner />

  return (
    <div className="mx-auto w-fit">
      {
        data?.allPosts.map(post => (
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

export default PostList