import Loading from "@/components/Loading"
import { useCommunityUsers } from "./hooks/useCommunityUsers"
import { useLoadUsers } from "./hooks/useLoadUsers"
import CommunityUsers from "./components/CommunityUsers"
import UserSearch from "./components/UserSearch"

const Community = () => {

  const { users, loading, hasMore, page, lastDate } = useCommunityUsers()
  const { loadMoreUsers, loadingUsers } = useLoadUsers()

  const handleLoadUsers = async () => {
    await loadMoreUsers({
      variables: {
        nPage: page,
        before: lastDate,
      }
    })
  }

  return (
    <div className="w-full py-4">
      <div className="w-80 px-4 pb-12">
        <UserSearch />
      </div>

      {
        loading ? (
          <div className="w-full h-fit">
            <Loading />
          </div>
        )
          : (
            <>
              <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <CommunityUsers users={users} />
              </div>
              {loadingUsers ? <Loading /> : <></>}
              {
                hasMore ? (
                  <p
                    className="w-fit mx-auto my-6 cursor-pointer font-black underline italic"
                    onClick={handleLoadUsers}
                  >
                    Show more
                  </p>
                )
                  : <></>
              }
            </>
          )
      }
    </div>
  )
}

export default Community