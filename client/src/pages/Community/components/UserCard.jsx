import { Avatar, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFollowUser } from '@/hooks/useFollowUser';

const UserCard = ({ id, photoURL, username, slug, bio }) => {

  const navigate = useNavigate()
  const { followUser } = useFollowUser()

  const handleRedirect = () => {
    navigate(`/${slug}`)
  }

  const handleFollow = async () => {
    await followUser({
      variables: { followUserId: id },
    })
  }

  return (
    <article onClick={handleRedirect} className="shadow-medium w-56 h-72 hover:bg-hoverPost duration-300 cursor-pointer mx-auto px-3 rounded-xl grid grid-rows-6">
      <header className="w-full row-span-2 flex justify-center items-center">
        <Avatar
          isBordered
          src={`${photoURL}`}
          showFallback
          color={`${photoURL ? 'primary' : ''}`}
          className="w-16 h-16 text-large"
        />
      </header>

      <div className="w-full row-span-3 flex flex-col items-center">
        <p className='line-clamp-1 font-bold'>{username}</p>
        <p className='text-default-400 line-clamp-1'>{`@${slug}`}</p>
        <p className='line-clamp-3 pt-2'>{bio}</p>
      </div>

      <footer className="w-full row-span-1 flex gap-2 justify-between">
        <Button
          fullWidth
          color='primary'
          radius='sm'
          onPress={handleFollow}
          className="w1/2 font-semibold"
        >
          Follow
        </Button>
      </footer>
    </article>
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