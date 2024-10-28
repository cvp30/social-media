import { useQuery } from "@apollo/client"
import Loading from "./Loading"
import { GET_RANDOM_USERS } from "@/graphql/RandomUserListQuery"
import FollowButton from "./FollowButton"
import UserInfoCard from "./UserInfoCard"
import { useNavigate } from "react-router-dom"


const RecomendedUser = () => {

  const navigate = useNavigate()
  const { data, loading } = useQuery(GET_RANDOM_USERS)

  const handleRedirect = (slug) => {
    navigate(`/${slug}`)
  }

  return (
    <div className="w-96 border border-divider rounded-xl flex flex-col gap-2 overflow-hidden">
      <h3 className="py-2 px-3">Meet new people</h3>
      {
        loading ?
          <Loading />
          :
          data.randomUsers.map(user => (
            <div
              key={user.id}
              onClick={() => handleRedirect(user.slug)}
              className="cursor-pointer hover:bg-hoverPost flex justify-between items-center duration-300 py-2 px-3"
            >
              <div className="w-64 h-fit">
                <UserInfoCard
                  user={user}
                />
              </div>

              <FollowButton id={user.id} />
            </div>
          ))
      }
    </div>
  )
}

export default RecomendedUser