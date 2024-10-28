import { Button, Divider, Navbar, NavbarBrand } from "@nextui-org/react"
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import PostForm from "@/components/PostForm"
import RecomendedUser from "@/components/RecomendedUser"
import UserInfo from "./components/UserInfo"
import Loading from "@/components/Loading"
import FullScreenImages from "./components/FullScreenImages"
import { PostInfoContext } from "./contexts/PostContext"
import PostCards from "@/components/PostCards"
import MainPostCard from "./components/MainPostCard"

const Post = () => {

  const { postId } = useParams()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const postInfo = PostInfoContext()

  const photo = params.get("photo")
  const { post, postLoading, comments, commentsLoading, error } = postInfo

  if (postLoading) return <Loading />

  if (error) return <h1>ERROR</h1>

  if (photo && Number(photo) >= post.images.length) {
    return <Navigate to={`/post/${postId}`} replace={true} />
  }

  const handleBackButton = () => navigate(-1)

  return (
    <div className="h-fit w-full flex gap-8">
      <FullScreenImages />

      <div className="sm:w-148 xl:w-164 min-h-screen border-r-1 border-divider space-y-4">
        <Navbar
          className="bg-transparent"
          classNames={{
            brand: "flex gap-2",
          }}
        >
          <NavbarBrand>
            <Button
              isIconOnly
              color="primary"
              variant="light"
              radius="full"
              onPress={handleBackButton}
            >
              <ArrowLeftIcon className="size-5" />
            </Button>
            <h3 className="font-bold text-inherit text-primary">POST</h3>
          </NavbarBrand>
        </Navbar>

        <div className="w-full h-fit">
          <MainPostCard />
          <PostForm parentPostId={postId} />
          <Divider className="w-full" />
          {
            commentsLoading ?
              <Loading />
              :
              <PostCards posts={comments} />
          }
        </div>
      </div>

      {/* SECONDARY COLUMN */}
      <div className="hidden lg:block sticky top-4 mt-4 flex-1 h-fit border-divider rounded-lg space-y-4">
        <UserInfo
          user={post.author}
        />
        <RecomendedUser />
      </div>

    </div>
  )
}

export default Post