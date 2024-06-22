import { Navbar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, NavbarBrand } from "@nextui-org/react";
import { useState } from "react";
import { menuItems } from "@/utils/MenuItems";
import { AuthContext } from "@/contexts/AuthContext";
import { NavLink } from "react-router-dom";
import UserCardDropdown from "@/components/UserCardDropdown";
import Logo from "@/components/Logo";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currUser } = AuthContext()
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="h-20 fixed"
    >
      <NavbarContent className="flex gap-0" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserCardDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="backdrop-blur-xl px-10">
        {
          menuItems.map((item, index) => {
            const path = item.name === 'home' ?
              ''
              : item.name === 'profile' ?
                currUser.slug : item.name
            return (
              <NavbarMenuItem
                key={`${item}-${index}`}

              >
                <NavLink
                  key={item.name}
                  to={`/${path}`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={({ isActive }) => `${isActive ? 'bg-default-200' : ''} w-full h-fit p-3 hover:bg-default-200 rounded-small flex items-center gap-4 capitalize`}
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
                        <p className={`${isActive ? 'font-bold' : 'font-normal'} text-xl`}>
                          {item.name}
                        </p>
                      </>
                    )
                  }

                </NavLink>
              </NavbarMenuItem>
            )
          })
        }
      </NavbarMenu>
    </Navbar>
  )
}

export default NavigationBar
