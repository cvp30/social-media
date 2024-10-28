import UserCard from "./UserCard"
import PropTypes from 'prop-types'

const CommunityUsers = ({ users }) => {
  return (
    <>
      {
        users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            photoURL={user.photoURL}
            username={user.username}
            slug={user.slug}
            bio={user.bio}
          />
        ))
      }
    </>
  )
}

export default CommunityUsers

CommunityUsers.propTypes = {
  users: PropTypes.array,
}
