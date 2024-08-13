import { NavLink, Outlet } from "react-router-dom"
import RecomendedUser from "@/components/RecomendedUser"
import ProfileInfo from "./components/ProfileInfo"

const Profile = () => {

  const items = ['posts', 'replies', 'bookmarks', 'likes']

  return (
    <section className="h-fit flex gap-2">
      <div className="sm:w-148 xl:w-164 pt-4 border-r-1 border-divider">
        {/* <ProfileInfoProvider slug={slug}> */}
        <ProfileInfo />

        <div className="w-full flex justify-between mt-4">
          {
            items.map(item => {

              return (
                <NavLink
                  key={item}
                  end
                  to={`${item === 'posts' ? '' : item}`}
                  className={({ isActive }) => `${isActive ? 'underline' : ''} hover:underline capitalize hover:bg-default-200 px-5 py-3  underline-offset-8 decoration-4 decoration-primary`}
                >
                  {item}
                </NavLink>
              )
            })
          }
        </div>

        <Outlet />

        {/* </ProfileInfoProvider> */}
      </div>

      <div className="hidden lg:block sticky top-0 flex-1 mx-6 h-fit border-divider rounded-lg">
        <RecomendedUser />
      </div>



    </section>
  )
}

export default Profile