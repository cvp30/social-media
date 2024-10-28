import { AuthContext } from "@/contexts/AuthContext"
import { useFollowUser } from "@/hooks/useFollowUser";
import { Button } from "@nextui-org/react"
import PropTypes from 'prop-types';

const FollowButton = ({ id }) => {

  const { currUser, followingList } = AuthContext()
  const { followUser, unfollowUser } = useFollowUser()

  const isCurrUser = currUser.id === id
  const isFollowing = followingList.includes(id)

  const handleFollow = async () => {
    isFollowing ?
      await unfollowUser({ variables: { unfollowUserId: id } })
      :
      await followUser({ variables: { followUserId: id } })
  }


  if (isCurrUser) return <></>

  return (
    <Button
      color={isFollowing ? "danger" : "primary"}
      radius="sm"
      variant={isFollowing ? "ghost" : "solid"}
      className='font-semibold'
      onPress={handleFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default FollowButton

FollowButton.propTypes = {
  id: PropTypes.string
}