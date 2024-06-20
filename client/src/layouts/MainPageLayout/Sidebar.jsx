import DarkmodeToggle from "@/components/DarkmodeToggle"
import UserCardDropdown from "@/components/UserCardDropdown"
import { menuItems } from "@/utils/MenuItems"
import { AuthContext } from "@/contexts/AuthContext"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  const { currUser } = AuthContext()

  return (
    <nav className="fixed h-screen py-2 w-28 xl:w-64 flex flex-col justify-between">

      {/* LOGO  */}
      <div className="w-full h-20 bg-[silver]">
        Logo
        <DarkmodeToggle />
      </div>

      {/* ITEMS */}
      <div className="w-full h-fit flex flex-col items-center justify-between gap-2 px-4">
        {
          menuItems.map((item) => {
            const path = item.name === 'home' ?
              ''
              : item.name === 'profile' ?
                currUser.slug : item.name
            return (
              <NavLink
                key={item.name}
                to={`/${path}`}
                className={({ isActive }) => `${isActive ? 'bg-default-200' : ''} w-fit xl:w-full h-fit p-3 hover:bg-default-200 rounded-small flex items-center gap-4 capitalize`}
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
                      <p className={`${isActive ? 'font-bold' : 'font-normal'} text-xl hidden xl:block`}>
                        {item.name}
                      </p>
                    </>
                  )
                }

              </NavLink>
            )
          })
        }
      </div>

      {/* USER CARD */}
      <div className="w-full h-fit px-7">
        <UserCardDropdown />
      </div>
    </nav>
  )
}

export default Sidebar