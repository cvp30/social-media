import PropTypes from 'prop-types'
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid"
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"
import { useToggleBookmark } from '@/hooks/useToggleBookmark'
import { formattedNumbers } from '@/utils/FormattedNumers'

const BookmarkButton = ({ postId, dataBookmark }) => {

  const { allBookmarks, isBookmarked } = dataBookmark
  const { toggleBookmark } = useToggleBookmark()

  const handleBookmark = async () => {
    await toggleBookmark(postId, isBookmarked)
  }

  return (
    <Button
      radius="sm"
      onPress={handleBookmark}
      {...(!isBookmarked && { className: 'hover:text-secondary hover:bg-secondary/20' })}
      startContent={isBookmarked ? <BookmarkSolid className="size-6" /> : <BookmarkOutline className="size-6" />}
      variant={isBookmarked ? "light" : ''}
      color="secondary"
    >
      {formattedNumbers(allBookmarks)}

    </Button>
  )
}

export default BookmarkButton

BookmarkButton.propTypes = {
  postId: PropTypes.string,
  dataBookmark: PropTypes.object,
}