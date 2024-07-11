import { FOLLOW_USER } from "@/graphql/FollowUserMutation"
import { COMMUNITY_USERS } from "@/pages/Community/graphql/CommunityUsers"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"


export const useFollowUser = () => {

  const [followUser, { loading }] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      toast.success("Now follow user!", {
        duration: 2000
      })
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000
      })
    },
    update: (cache, { data }) => {

      const newUser = data.followUser

      const communityUsers = cache.readQuery({
        query: COMMUNITY_USERS
      })

      if (communityUsers) {
        cache.updateQuery(
          { query: COMMUNITY_USERS },
          (data) => ({
            communityUsers: data.communityUsers.filter(user => user.id !== newUser.id)
          })
        )
      }
    }
  })

  return {
    followUser,
    loading
  }
}