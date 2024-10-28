import PropTypes from 'prop-types';
import { Avatar } from "@nextui-org/react"
import UserTooltip from './UserTooltip';

const UserInfoCard = ({ user }) => {

  return (
    <UserTooltip
      author={user}
    >
      <article className='w-fit max-w-full flex justify-start items-center gap-2'>
        <Avatar
          src={`${user.photoURL}`}
          showFallback
        />

        <div className='w-full h-fit flex-1 overflow-hidden'>
          <p className='text-start line-clamp-1 font-semibold'>
            {user.username}
          </p>

          <p className='w-full text-sm text-left text-default-500 line-clamp-1'>
            @{user.slug}
          </p>

        </div>

      </article>
    </UserTooltip>
  )
}

export default UserInfoCard


UserInfoCard.propTypes = {
  user: PropTypes.object,
}