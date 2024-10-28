import FollowButton from '@/components/FollowButton';
import UserInfoCard from '@/components/UserInfoCard';
import PropTypes from 'prop-types';

const UserInfo = ({ user }) => {

  const { id, bio } = user

  return (
    <article className='w-96 border border-divider rounded-xl py-2 px-3 space-y-3'>
      <h3>Post Author</h3>
      <div className='w-full flex justify-between items-center'>
        <UserInfoCard
          user={user}
        />

        <FollowButton id={id} />
      </div>

      <p className='w-full line-clamp-4'>
        {bio}
      </p>
    </article>
  )
}

export default UserInfo

UserInfo.propTypes = {
  user: PropTypes.object
}