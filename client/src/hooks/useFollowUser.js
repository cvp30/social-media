import { FOLLOW_USER } from "@/graphql/FollowUserMutation"
import { GET_PROFILE } from "@/graphql/GetProfile"
import { UNFOLLOW_USER } from "@/graphql/UnfollowUserMutation"
import { COMMUNITY_USERS } from "@/pages/Community/graphql/CommunityUsers"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"


export const useFollowUser = () => {

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      toast.success("Now follow user!")
    },

    onError: (error) => {

      toast.error(error.message)
    },

    update: (cache, { data }) => {

      const followUserId = data.followUser

      const userProfile = cache.readQuery({
        query: GET_PROFILE
      })

      if (userProfile) {
        cache.writeQuery({
          query: GET_PROFILE,
          data: {
            userProfile: {
              ...userProfile.userProfile,
              followingList: [...userProfile.userProfile.followingList, followUserId]
            }
          }
        })
      }


      const communityUsers = cache.readQuery({
        query: COMMUNITY_USERS
      })

      if (communityUsers) {
        cache.updateQuery(
          { query: COMMUNITY_USERS },
          (data) => ({
            communityUsers: data.communityUsers.filter(user => user.id !== followUserId)
          })
        )
      }
    }

  })

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000
      })
    },
    update: (cache, { data }) => {

      const unfollowUserId = data.unfollowUser

      const userProfile = cache.readQuery({
        query: GET_PROFILE
      })

      cache.writeQuery({
        query: GET_PROFILE,
        data: {
          userProfile: {
            ...userProfile.userProfile,
            followingList: userProfile.userProfile.followingList.filter(id => id !== unfollowUserId)
          }
        }
      })
    }
  })

  return {
    followUser,
    unfollowUser,
  }
}