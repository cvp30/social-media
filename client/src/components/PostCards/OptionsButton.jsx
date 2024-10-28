import PropTypes from 'prop-types'
import { useDeletePost } from "@/hooks/useDeletePost"
import { ArrowRightCircleIcon, EllipsisHorizontalIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/AuthContext'
import { UserMinusIcon } from '@heroicons/react/24/solid'
import { useApolloClient } from '@apollo/client'
import { POST_INFO } from '@/pages/Post/graphql/GetPostQuery'

const OptionsButton = ({ postInfo }) => {

  const navigate = useNavigate()
  const client = useApolloClient()
  const { currUser, followingList } = AuthContext()
  const { deletePost } = useDeletePost()

  const { postId, author } = postInfo
  const isCurrUser = currUser.id === postInfo.author.id
  const isFollowing = followingList.includes(postInfo.author.id)


  const handleDeletePost = async () => {
    await deletePost({
      variables: { postId }
    })
  }

  const handleViewUser = () => navigate(`/${author.slug}`)

  const handleViewPost = () => {

    client.writeQuery({
      query: POST_INFO,
      data: {
        post: postInfo
      },
      variables: { postId }
    })

    navigate(`/post/${postId}`)
  }

  return (
    <Dropdown
      placement="bottom-end"
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
          aria-label="GeneralPostOptions"
        >
          <EllipsisHorizontalIcon className="size-6" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Post Card Options"
        variant="flat"
        color="primary"
        itemClasses={{
          title: 'text-base font-semibold',
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
          key='view post'
          startContent={<ArrowRightCircleIcon className="size-6" />}
          title={'View Post'}
          onClick={handleViewPost}
        />

        <DropdownItem
          key='view User Info'
          startContent={<ArrowRightCircleIcon className="size-6" />}
          title={'View User'}
          onClick={handleViewUser}
        />
        {
          isCurrUser && (
            <DropdownItem
              key='delete'
              startContent={<TrashIcon className="size-6" />}
              title='Delete Post'
              onClick={handleDeletePost}
            />
          )
        }

      </DropdownMenu>

    </Dropdown>


  )
}

export default OptionsButton

OptionsButton.propTypes = {
  postInfo: PropTypes.object,
}