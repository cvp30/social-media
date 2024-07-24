import PropTypes from 'prop-types';
import { User } from "@nextui-org/react"
import defaultUser from '@/assets/defaultUser.jpg'


const UserInfoCard = ({ username, slug, photoURL }) => {
  return (
    <User
      name={username}
      description={`@${slug}`}
      classNames={{
        base: 'w-full mx-auto flex justify-start gap-2',
        name: 'text-start text-base line-clamp-1',
        description: 'text-sm text-left text-default-500 line-clamp-1',
        wrapper: 'flex flex-col flex-1 overflow-hidden',
      }}
      avatarProps={{
        src: `${photoURL || defaultUser}`,
      }}
    />
  )
}

export default UserInfoCard


UserInfoCard.propTypes = {
  username: PropTypes.string,
  slug: PropTypes.string,
  photoURL: PropTypes.string,
}