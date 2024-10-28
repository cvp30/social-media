// import PropTypes from 'prop-types'
// import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline"
// import { Button } from "@nextui-org/react"
// import { formattedNumbers } from '@/utils/FormattedNumers'
// import { AuthContext } from '@/contexts/AuthContext'
// import { useMutation } from '@apollo/client'
// import { SHARE_POST } from '@/graphql/SharePostMutation'
// import { UNSHARE_POST } from '@/graphql/UnsharePostMutation'
// import { ALL_POSTS } from '@/pages/Home/graphql/AllPostsQuery'

// const ShareButton = ({ postId, shares }) => {

//   const { currUser } = AuthContext()
//   const isShared = shares.includes(currUser.id)

//   const [sharePost] = useMutation(SHARE_POST, {
//     update: (cache, { data }) => {
//       const postShared = data.sharePost

//       const { allPosts } = cache.readQuery({
//         query: ALL_POSTS
//       })

//       cache.writeQuery({
//         query: ALL_POSTS,
//         data: {
//           allPosts: {
//             ...allPosts,
//             posts: allPosts.map(post => {
//               return post.postId === postShared ? {
//                 ...post,
//                 shares: [...post.shares, currUser.id]
//               }
//                 :
//                 post
//             })
//           }
//         }
//       })
//     }
//   })

//   const [unsharePost] = useMutation(UNSHARE_POST, {
//     update: (cache, { data }) => {
//       const postUnshared = data.unsharePost

//       const { allPosts } = cache.readQuery({
//         query: ALL_POSTS
//       })

//       cache.writeQuery({
//         query: ALL_POSTS,
//         data: {
//           allPosts: allPosts.map(post => {
//             return post.postId === postUnshared ? {
//               ...post,
//               shares: post.shares.filter(id => id !== currUser.id)
//             }
//               :
//               post
//           })
//         }
//       })
//     }
//   })

//   const handleSharePost = async () => {
//     await sharePost({
//       variables: { postId }
//     })
//   }

//   const handleUnsharePost = async () => {
//     await unsharePost({
//       variables: { postId }
//     })
//   }

//   return (
//     <Button
//       radius="sm"
//       onPress={isShared ? handleUnsharePost : handleSharePost}
//       {...(!isShared && { className: 'hover:text-warning hover:bg-warning/20' })}
//       startContent={<ArrowPathRoundedSquareIcon className="size-6" />}
//       variant={isShared ? "light" : ''}
//       color="warning"
//     >
//       {formattedNumbers(shares.length)}
//     </Button>
//   )
// }

// export default ShareButton

// ShareButton.propTypes = {
//   postId: PropTypes.string,
//   shares: PropTypes.array,
// }