import { useParams } from "react-router-dom"

const Replies = () => {

  const { slug } = useParams()

  return (
    <div>Replies</div>
  )
}

export default Replies