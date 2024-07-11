import { Avatar, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';
import defaultUser from '@/assets/defaultUser.jpg'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFollowUser } from '@/hooks/useFollowUser';

const UserCard = ({ id, photoURL, username, slug, bio }) => {

  const navigate = useNavigate()
  const { followUser, loading } = useFollowUser()

  const handleRedirect = () => {
    navigate(`/${slug}`)
  }

  const handleFollow = async () => {
    await followUser({
      variables: { followUserId: id },
    })
  }

  return (
    <div onClick={handleRedirect} className="w-full flex items-center gap-2 h-fit p-4 hover:bg-hoverPost duration-300 cursor-pointer">
      <Toaster />
      <Avatar
        src={`${photoURL || defaultUser}`}
        size='lg'
      />

      <div className='flex flex-col flex-1'>
        <p className='line-clamp-1 text-xl font-medium'>{username}</p>
        <p className='text-default-500 line-clamp-1'>{`@${slug}`}</p>
        <p className='font-bold line-clamp-2'>{bio}</p>
      </div>

      <Button
        onClick={handleFollow}
        size='lg'
        color='primary'
        radius='sm'
        isLoading={loading}
      >
        Follow
      </Button>
    </div>
  )
}

export default UserCard


UserCard.propTypes = {
  id: PropTypes.string,
  photoURL: PropTypes.string,
  username: PropTypes.string,
  slug: PropTypes.string,
  bio: PropTypes.string,
}