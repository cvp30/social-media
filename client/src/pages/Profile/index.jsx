import { NavLink, Outlet, useParams } from "react-router-dom"
import RecomendedUser from "@/components/RecomendedUser"
import ProfileInfo from "./components/ProfileInfo"
import { ProfileInfoProvider } from "./contexts/ProfileContext"

const Profile = () => {
  const { slug } = useParams()
  const items = ['posts', 'likes', 'bookmarks']

  return (
    <section className="h-fit flex gap-8">
      <div className="sm:w-148 xl:w-164 min-h-screen pt-4 border-r-1 border-divider">
        <ProfileInfoProvider slug={slug}>
        <ProfileInfo />

        <div className="w-full flex justify-between mt-4 border-y border-divider">
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

        </ProfileInfoProvider>
      </div>

      <div className="hidden lg:block sticky flex-1 top-4 mt-4 h-fit border-divider rounded-lg">
        <RecomendedUser />
      </div>



    </section>
  )
}

export default Profile