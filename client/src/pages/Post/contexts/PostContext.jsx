import { createContext, useContext } from "react";
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import { usePostInfo } from "../hooks/usePostInfo";
import { useComments } from "../hooks/useComments";


const PostContext = createContext()

export const PostContextProvider = ({ children }) => {

  const { postId } = useParams()

  const { post, loading: postLoading, error: postError } = usePostInfo(postId)

  const { comments, loading: commentsLoading, error: commentsError } = useComments(postId)

  return (
    <PostContext.Provider value={{
      postId,
      post,
      postLoading,
      comments,
      commentsLoading,
      error: (!postLoading && postError) || (!commentsLoading && commentsError)
    }}>
      {children}
    </PostContext.Provider>
  )
}

export const PostInfoContext = () => {
  return useContext(PostContext)
}

PostContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}