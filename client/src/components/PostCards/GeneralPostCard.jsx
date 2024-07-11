import PropTypes from 'prop-types'
import { Avatar, Image } from "@nextui-org/react"
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { ArrowPathRoundedSquareIcon, BookmarkIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { diffHours, diffMinutes, format } from '@formkit/tempo'
import { useNavigate } from 'react-router-dom'
import OptionsButton from './OptionsButton'


const GeneralPostCard = ({ postId, author, content, images, createdAt }) => {
  const navigate = useNavigate()
  const { username, slug, photoURL } = author

  const handleRedirect = () => {
    navigate(`/post/${postId}`)
  }

  const hours = diffHours(new Date(), new Date(createdAt))

  const postDate = hours > 23 ?
    format(new Date(createdAt), "MMM D", "en")
    :
    diffMinutes(new Date(), new Date()) > 59 ?
      `${hours}h`
      :
      `${diffMinutes(new Date(), new Date())}m`

  return (
    <article onClick={handleRedirect} className="h-fit sm:w-148 xl:w-164 flex gap-2 px-4 py-3 cursor-pointer hover:bg-hoverPost">
      <Avatar src={`${photoURL}`} />

      <div className="flex flex-col flex-1 gap-2">
        {/* HEADER */}
        <header className='w-full h-fit flex justify-between items-center'>

          <div className='flex flex-col flex-1'>
            <p className='w-fit max-w-72 font-bold truncate'>{username}</p>
            <p className='w-fit max-w-72 text-default-500'>
              @{slug} · {postDate}
            </p>

          </div>

          <OptionsButton postId={postId} slug={slug} />
        </header>
        {/* BODY */}
        <div className='w-full h-fit'>
          <p className='mb-2'>{content}</p>
          <div className='relative w-full h-fit'>
            <Image
              alt="postImage"
              src={images[0]}
              classNames={{
                wrapper: 'w-full object-cover'
              }}
            />
            {
              images.length > 1 ? (
                <SquaresPlusIcon className='z-10 absolute top-1 right-1 size-7 text-primary' />
              ) : <></>
            }
          </div>
        </div>
        {/* FOOTER */}
        <div className='w-full h-fit flex justify-between mt-2'>
          <ChatBubbleLeftIcon className='size-6' />
          <HeartIcon className='size-6' />
          <ArrowPathRoundedSquareIcon className='size-6' />
          <BookmarkIcon className='size-6' />
        </div>
      </div>

    </article>
  )
}

export default GeneralPostCard

GeneralPostCard.propTypes = {
  postId: PropTypes.string,
  author: PropTypes.object,
  content: PropTypes.string,
  images: PropTypes.array,
  createdAt: PropTypes.string,
}