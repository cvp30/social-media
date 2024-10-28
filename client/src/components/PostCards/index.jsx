import PropTypes from 'prop-types'
import GeneralPostCard from "./GeneralPostCard"

const PostCards = ({ posts }) => {

  return (
    <div className="w-full h-fit">
      {
        posts.map(post => (
          <div key={post.postId} className="border-b-1 border-divider">
            <GeneralPostCard postInfo={post} />
          </div>
        ))
      }
    </div>
  )
}

export default PostCards

PostCards.propTypes = {
  posts: PropTypes.array,
}