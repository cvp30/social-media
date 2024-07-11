import PropTypes from 'prop-types'
import GeneralPostCard from "./GeneralPostCard"

const PostCards = ({ posts }) => {

  return (
    <div className="mx-auto w-fit">
      {
        posts.map(post => (
          <GeneralPostCard
            key={post.id}
          />
        ))
      }
    </div>
  )
}

export default PostCards

PostCards.propTypes = {
  posts: PropTypes.array,
}