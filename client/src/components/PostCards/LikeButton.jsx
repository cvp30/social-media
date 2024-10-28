import PropTypes from 'prop-types'
import { HeartIcon as LikeIconOutline } from "@heroicons/react/24/outline"
import { HeartIcon as LikeIconSolid } from "@heroicons/react/24/solid"
import { Button } from "@nextui-org/react"
import { formattedNumbers } from '@/utils/FormattedNumers'
import { useToggleLike } from '@/hooks/useToggleLike'

const LikeButton = ({ postId, dataLike }) => {

  const { allLikes, isLiked } = dataLike

  const { toggleLike } = useToggleLike()

  const handleLike = async () => {
    await toggleLike(postId, isLiked)
  }

  return (
    <Button
      radius="sm"
      onPress={handleLike}
      {...(!isLiked && { className: 'hover:text-primary hover:bg-primary/20' })}
      startContent={isLiked ? <LikeIconSolid className='size-6' /> : <LikeIconOutline className='size-6' />}
      variant={isLiked ? "light" : ''}
      color="primary"
    >
      {formattedNumbers(allLikes)}
    </Button>
  )
}

export default LikeButton

LikeButton.propTypes = {
  postId: PropTypes.string,
  dataLike: PropTypes.object
}