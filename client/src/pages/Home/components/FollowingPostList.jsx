import GeneralPostCard from "@/components/PostCards/GeneralPostCard"
import { ALL_FOLLOWING_USER_POSTS } from "@/graphql/FollowingUserPost"
import { useQuery } from "@apollo/client"
import { Divider, Spinner } from "@nextui-org/react"

const FollowingPostList = () => {

  const { loading, data } = useQuery(ALL_FOLLOWING_USER_POSTS)

  if (loading) return <Spinner />

  return (
    <div className="mx-auto w-fit">
      {
        data?.allFollowingUserPost.map(post => (
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

export default FollowingPostList