import UserCardDropdown from "@/components/UserCardDropdown"
import { menuItems } from "@/utils/MenuItems"
import { AuthContext } from "@/contexts/AuthContext"
import { NavLink } from "react-router-dom"
import Logo from "@/components/Logo"



const Sidebar = () => {
  const { currUser } = AuthContext()

  return (
    <nav className="fixed h-screen py-4 w-28 xl:w-72 flex flex-col justify-between border-r-1 border-divider">

      <div className="w-full h-fit">

        {/* LOGO  */}
        <Logo />

        {/* ITEMS */}
        <div className="w-full h-fit mt-16 flex flex-col items-center justify-between gap-4 px-4">
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
                  className={({ isActive }) => `${isActive ? 'bg-hoverPost' : ''} w-fit xl:w-full h-fit p-3 hover:bg-hoverPost duration-300 rounded-small flex items-center gap-4 capitalize`}
                >
                  {
                    ({ isActive }) => (
                      <>
                        <span className="size-8">
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

      </div>


      {/* USER CARD */}
      <div className="w-full h-fit px-7">
        <UserCardDropdown />
      </div>
    </nav>
  )
}

export default Sidebar