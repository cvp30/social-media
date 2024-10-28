import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react"
import { AuthContext } from '@/contexts/AuthContext';
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@/hooks/useTheme";

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
      placement="bottom-start"
      classNames={{
        content: 'bg-background dropdownOptions',
      }}
    >
      <DropdownTrigger>
        <User
          as="button"
          name={currUser.username}
          description={`@${currUser.slug}`}
          classNames={{
            base: 'w-fit p-2 hover:bg-hoverPost xl:w-full mx-auto flex justify-start gap-2',
            name: 'text-start text-base line-clamp-1 font-semibold',
            description: 'text-base text-default-500 line-clamp-1',
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
          onPress={onChangeTheme}
          endContent={isDarkMode ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
          title={<p className="text-base">{isDarkMode ? 'Light ' : 'Dark'} Theme</p>}
          textValue="desc"
        />
        <DropdownItem
          key="logout"
          onPress={handleSignOut}
          endContent={<ArrowLeftStartOnRectangleIcon className="size-6" />}
          title={<p className="text-base">Log Out</p>}
          textValue="desc"
          color="danger"
        />
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserCardDropdown