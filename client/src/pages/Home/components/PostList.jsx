import Loading from "@/components/Loading"
import PostCards from "@/components/PostCards"
import { useAllPosts } from "../hooks/useAllPosts"
import { useMorePosts } from "../hooks/useMorePosts"


const PostList = () => {

  const { loading, posts, page, hasMore, lastDate } = useAllPosts()
  const { loadMorePosts, loadingPosts } = useMorePosts()

  if (loading) return <Loading />

  const handleLoadPosts = async () => {

    await loadMorePosts({
      variables: {
        nPage: page,
        before: lastDate
      }
    })
  }
  return (
    <>
      <PostCards posts={posts} />

      {loadingPosts ? <Loading /> : <></>}

      {
        hasMore ? (
          <p
            className="w-fit mx-auto my-6 cursor-pointer font-black underline italic"
            onClick={handleLoadPosts}
          >
            Show more
          </p>
        )
          : <></>
      }
    </>
  )
}

export default PostList