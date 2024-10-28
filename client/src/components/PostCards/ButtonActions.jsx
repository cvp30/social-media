import { AuthContext } from "@/contexts/AuthContext"
import BookmarkButton from "./BookmarkButton"
import CommentButton from "./CommentButton"
import LikeButton from "./LikeButton"
import PropTypes from 'prop-types'

const ButtonActions = ({ postId, author, comments, content, date, likes, bookmarks }) => {

  const { currUser } = AuthContext()

  const dataLike = {
    allLikes: likes.length,
    isLiked: likes.includes(currUser.id)
  }

  const dataBookmark = {
    allBookmarks: bookmarks.length,
    isBookmarked: bookmarks.includes(currUser.id)
  }

  return (
    <div className='columns-3 w-fll'>
      <div>
        <CommentButton postId={postId} author={author} comments={comments} content={content} date={date} />
      </div>
      <div>
        <LikeButton postId={postId} dataLike={dataLike} />
      </div>
      <div className='text-rigt'>
        <BookmarkButton postId={postId} dataBookmark={dataBookmark} />
      </div>
    </div>
  )
}

export default ButtonActions

ButtonActions.propTypes = {
  postId: PropTypes.string,
  author: PropTypes.object,
  comments: PropTypes.array,
  content: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.array,
  bookmarks: PropTypes.array,
}
