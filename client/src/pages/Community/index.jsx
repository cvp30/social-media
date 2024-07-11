import CustomInput from "@/components/CustomInput"
import { useQuery } from "@apollo/client"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { COMMUNITY_USERS } from "./graphql/CommunityUsers"
import { Spinner } from "@nextui-org/react"
import UserCard from "@/components/UserCard"

const Community = () => {

  const { loading, data } = useQuery(COMMUNITY_USERS)


  return (
    <div className="w-full py-4 bg[#0080002e]">
      <div className="w-80 px-4 pb-12">
        <CustomInput
          startContent={<MagnifyingGlassIcon />}
          type="search"
          placeholder="Find user..."
        />

      </div>

      <div className="w-full h-fit">
        {
          loading ?
            <Spinner />
            : (
              data.communityUsers.map(user => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  photoURL={user.photoURL}
                  username={user.username}
                  slug={user.slug}
                  bio={user.bio}
                />
              ))
            )
        }
      </div>

    </div>
  )
}

export default Community