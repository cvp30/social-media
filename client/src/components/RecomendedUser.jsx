import { AuthContext } from "@/contexts/AuthContext"
import UserInfoCard from "./UserInfoCard"
import { Button } from "@nextui-org/react"


const RecomendedUser = () => {
  const { currUser } = AuthContext()

  return (
    <div className="w-96 border border-divider rounded-xl flex flex-col gap-2">
      <div className="cursor-pointer flex items-center py-2 px-3">
        <UserInfoCard
          username={currUser.username}
          photoURL={currUser.photoURL}
          slug={currUser.slug}
        />
        <Button
          color="primary"
          radius="sm"
        >
          Follow
        </Button>
      </div>

      <div className="cursor-pointer flex items-center py-2 px-3">
        <UserInfoCard
          username={currUser.username}
          photoURL={currUser.photoURL}
          slug={currUser.slug}
        />
        <Button
          color="primary"
          radius="sm"
        >
          Follow
        </Button>
      </div>

      <div className="cursor-pointer flex items-center py-2 px-3">
        <UserInfoCard
          username={currUser.username}
          photoURL={currUser.photoURL}
          slug={currUser.slug}
        />
        <Button
          color="primary"
          radius="sm"
        >
          Follow
        </Button>
      </div>

    </div>
  )
}

export default RecomendedUser