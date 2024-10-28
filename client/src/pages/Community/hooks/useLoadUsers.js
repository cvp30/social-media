import { useLazyQuery } from "@apollo/client"
import { COMMUNITY_USERS } from "../graphql/CommunityUsers"

export const useLoadUsers = () => {

  const [loadMoreUsers, { loading: loadingUsers, client }] = useLazyQuery(COMMUNITY_USERS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const { communityUsers } = client.readQuery({
        query: COMMUNITY_USERS
      })

      client.writeQuery({
        query: COMMUNITY_USERS,
        data: {
          communityUsers: {
            ...data.communityUsers,
            page: data.communityUsers.page + 1,
            users: [...communityUsers.users, ...data.communityUsers.users]
          }
        }
      })
    },
  })



  return {
    loadMoreUsers,
    loadingUsers,
  }
}