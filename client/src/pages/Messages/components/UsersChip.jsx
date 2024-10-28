import { Avatar, Chip } from '@nextui-org/react';
import PropTypes from 'prop-types';
const UsersChip = ({ usersSelected, setUsersSelected }) => {

  const handleRemoveChip = (userIdToDelete) => {
    const usersFiltered = usersSelected.filter(user => user.id !== userIdToDelete)
    setUsersSelected(usersFiltered)
  }

  if (!usersSelected.length) return <></>

  return (
    <div
      className='w-full h-fit flex flex-wrap gap-2'
    >
      {
        usersSelected.map(user => (
          <Chip
            key={`${user.username}${user.id}`}
            color='primary'
            variant='faded'
            onClose={() => handleRemoveChip(user.id)}
            avatar={
              <Avatar
                src={`${user.photoURL}`}
                showFallback
              />
            }
            radius='sm'
            classNames={{
              content: 'text-base font-bold'
            }}
          >
            {user.username}
          </Chip>
        ))
      }
    </div>
  )
}

export default UsersChip

UsersChip.propTypes = {
  usersSelected: PropTypes.array,
  setUsersSelected: PropTypes.func,
}