import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react"
import { AuthContext } from '@/contexts/AuthContext';
import { useTheme } from "@/hooks/useTheme";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const UserCardDropdown = () => {

  const navigate = useNavigate()
  const client = useApolloClient()
  const { currUser } = AuthContext()
  const { isDarkMode, onChangeTheme } = useTheme()

  const handleSignOut = async () => {
    localStorage.removeItem("Session")
    client.resetStore()
    navigate('/auth')
  }

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
          onClick={onChangeTheme}
          // startContent={<Settings />}
          title={<p className="text-base">Theme</p>}
          textValue="desc"
        />
        <DropdownItem
          key="logout"
          onClick={handleSignOut}
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