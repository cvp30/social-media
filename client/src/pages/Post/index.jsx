import { useParams } from "react-router-dom"


const Post = () => {

  const { postId } = useParams()

  return (
    <div>
      post: {postId}
    </div>
  )
}

export default Post