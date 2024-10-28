import { ArrowRightCircleIcon, EllipsisHorizontalIcon, TrashIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { PostInfoContext } from "../contexts/PostContext"
import { useNavigate } from "react-router-dom"
import { useDeletePost } from "@/hooks/useDeletePost"
import { AuthContext } from "@/contexts/AuthContext"

const OptionsButton = () => {

  const navigate = useNavigate()
  const { deletePost } = useDeletePost()
  const { currUser, followingList } = AuthContext()
  const { post: { author, postId } } = PostInfoContext()

  const isCurrUser = currUser.id === author.id
  const isFollowing = followingList.includes(author.id)

  const handleViewUser = () => navigate(`/${author.slug}`)

  const handleDeletePost = async () => {
    await deletePost({
      variables: { postId: postId }
    })
    navigate(-1)
  }
  return (
    <Dropdown
      placement='bottom-end'
      classNames={{
        content: 'w-full bg-background dropdownOptions',
      }}
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          size="md"
          radius="full"
          color="primary"
          aria-label="MainPostOptions"
        >
          <EllipsisHorizontalIcon className="size-6" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        variant='flat'
        color='primary'
        itemClasses={{
          title: 'text-base font-semibold'
        }}
      >
        {
          !isCurrUser && (
            <DropdownItem
              key='follow'
              startContent={
                isFollowing ?
                  <UserMinusIcon className="size-6" />
                  :
                  <UserPlusIcon className="size-6" />
              }
              title={isFollowing ? 'Unfollow User' : 'Follow User'}
            />
          )
        }
        <DropdownItem
          key='view User Info'
          startContent={<ArrowRightCircleIcon className="size-7" />}
          title={'View User'}
          onClick={handleViewUser}
        />

        <DropdownItem
          key='delete'
          startContent={<TrashIcon className="size-7" />}
          title='Delete Post'
          onClick={handleDeletePost}
        />
      </DropdownMenu>
    </Dropdown>
  )
}

export default OptionsButton