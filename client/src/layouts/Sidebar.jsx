import DarkmodeToggle from "@/components/DarkmodeToggle"
import { AuthContext } from "@/contexts/AuthContext"
import { NavLink, Navigate, Outlet } from "react-router-dom"
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  BellIcon as BellIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid
} from "@heroicons/react/24/solid"
import { HomeIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, BellIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"


const Sidebar = () => {

  const { isAuthenticated, currUser, loading } = AuthContext()

  if (!isAuthenticated) return <Navigate to='/auth' />

  const items = [
    {
      name: 'home',
      icon: HomeIcon,
      boldIcon: HomeIconSolid,
    },
    {
      name: 'community',
      icon: UserGroupIcon,
      boldIcon: UserGroupIconSolid,
    },
    {
      name: 'messages',
      icon: ChatBubbleLeftEllipsisIcon,
      boldIcon: ChatBubbleLeftEllipsisIconSolid,
    },
    {
      name: 'notification',
      icon: BellIcon,
      boldIcon: BellIconSolid,
    },
    {
      name: 'profile',
      icon: UserIcon,
      boldIcon: UserIconSolid,
    },
    {
      name: 'settings',
      icon: Cog6ToothIcon,
      boldIcon: Cog6ToothIconSolid,
    },
  ]

  if (loading) return;

  return (
    <div className="h-fit w-full max-w-screen-2xl flex mx-auto">

      <nav className="fixed w-screen h-fit bottom-0 sm:w-28 lg:w-64 sm:h-screen border-t-1 sm:border-r-1 border-divider  backdrop-blur-sm">
        <div className="hidden sm:block w-full h-20 bg-[silver]">
          Logo
        </div>
        <div className="absolute top-2 right-2">
          <DarkmodeToggle />
        </div>

        <div className="w-full h-fit flex sm:flex-col items-center justify-between sm:gap-2 sm:px-4">
          {
            items.map((item) => {
              const path = item.name === 'home' ?
                ''
                : item.name === 'profile' ?
                  currUser.slug : item.name
              return (
                <NavLink
                  key={item.name}
                  to={`/${path}`}
                  className='w-fit lg:w-full h-fit p-3 hover:bg-default-200 rounded-small flex items-center gap-4 capitalize'
                >
                  {
                    ({ isActive }) => (
                      <>
                        <span className="size-7">
                          {
                            isActive ?
                              <item.boldIcon /> : <item.icon />
                          }
                        </span>
                        <h3 className={`${isActive ? 'font-bold' : ''} hidden lg:block`}>
                          {item.name}
                        </h3>
                      </>
                    )
                  }

                </NavLink>
              )
            })
          }
        </div>

      </nav>
      <div className="sm:ml-28 lg:ml-64 flex-1 border">
        <Outlet />

      </div>
    </div>
  )
}

export default Sidebar