import { Avatar, Tooltip } from "@nextui-org/react"
import PropTypes from 'prop-types'
import FollowButton from "./FollowButton"
import { useNavigate } from "react-router-dom"

const UserTooltip = ({ author, children }) => {

  const navigate = useNavigate()
  const { id, username, slug, photoURL, bio } = author

  const handleRedirect = () => navigate(`/${slug}`)

  return (
    <Tooltip
      delay={1000}
      placement='bottom-start'
      classNames={{
        content: 'bg-background dropdownOptions'
      }}
      content={
        <div className='w-72 h-fit text-base py-5 space-y-2'>
          <header className='flex justify-between'>
            <Avatar
              src={`${photoURL}`}
              showFallback
              onClick={handleRedirect}
              className='cursor-pointer'
              size='lg'
            />
            <FollowButton id={id} />
          </header>
          <div className='w-full h-fit'>
            <p
              className='max-w-full font-semibold truncate cursor-pointer hover:underline underline-offset-2'
              onClick={handleRedirect}
            >
              {username}
            </p>
            <p className='max-w-full text-default-500'>
              @{slug}
            </p>
          </div>
          <p className=' max-w-full line-clamp-5'>
            {bio}
          </p>
        </div>
      }
    >
      {children}
    </Tooltip>
  )
}

export default UserTooltip

UserTooltip.propTypes = {
  author: PropTypes.object,
  children: PropTypes.any,
}