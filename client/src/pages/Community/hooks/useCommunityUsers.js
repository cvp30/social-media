import { useQuery } from "@apollo/client"
import { COMMUNITY_USERS } from "../graphql/CommunityUsers"

export const useCommunityUsers = () => {

  const { loading, data } = useQuery(COMMUNITY_USERS)

  return {
    loading,
    users: data?.communityUsers.users,
    page: data?.communityUsers.page,
    hasMore: data?.communityUsers.hasMore,
    lastDate: data?.communityUsers.lastDate,
  }
}
