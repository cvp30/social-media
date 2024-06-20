import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react"
import { AuthContext } from '@/contexts/AuthContext';

const UserCardDropdown = () => {

  const { currUser } = AuthContext()


  return (
    <Dropdown
      showArrow
      placement="bottom-start"
      classNames={{
        content: 'bg-background shadow-medium'
      }}
    >
      <DropdownTrigger>
        <User
          as="button"
          name={currUser.username}
          description={`@${currUser.slug}`}
          classNames={{
            base: 'w-fit xl:w-full mx-auto flex justify-start gap-2',
            name: 'text-start text-base line-clamp-1',
            description: 'text-sm text-default-500 line-clamp-1',
            wrapper: 'hidden xl:flex flex-col flex-1 overflow-hidden',
          }}
          avatarProps={{
            src: `${currUser.photoURL}`,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        variant="flat"
        color="primary"
      >
        <DropdownItem
          key="theme"
          // startContent={<Settings />}
          title={<p className="text-base">Theme</p>}
          textValue="desc"
        />
        <DropdownItem
          key="logout"
          // startContent={<Settings />}
          title={<p className="text-base">Log Out</p>}
          textValue="desc"
          color="danger"
        />
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserCardDropdown