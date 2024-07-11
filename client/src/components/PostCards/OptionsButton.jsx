import PropTypes from 'prop-types'
import { useDeletePost } from "@/hooks/useDeletePost"
import { ArrowRightCircleIcon, EllipsisHorizontalIcon, TrashIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useNavigate } from 'react-router-dom'

const OptionsButton = ({ postId, slug }) => {

  const navigate = useNavigate()
  const { deletePost } = useDeletePost()
  const handleDeletePost = async () => {
    await deletePost({
      variables: { postId }
    })
  }

  const handleViewUser = () => navigate(`/${slug}`)

  return (
    <Dropdown
      placement="bottom-end"
      className="shadow-medium "
      classNames={{
        content: 'w-full bg-background',
      }}
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          size="md"
          radius="full"
          color="primary"
          aria-label="Photo"
        >
          <EllipsisHorizontalIcon className="size-7" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Post Card Options"
        variant="flat"
        color="primary"
        itemClasses={{
          title: 'text-base',
        }}
      >
        <DropdownItem
          key='follow'
          // startContent={<UserMinusIcon className="size-7" />}
          startContent={<UserPlusIcon className="size-7" />}
          title={'follow User'}
        />

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

OptionsButton.propTypes = {
  postId: PropTypes.string,
  slug: PropTypes.string,
}