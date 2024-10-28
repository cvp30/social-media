import PropTypes from 'prop-types'
import { Avatar, Tooltip } from "@nextui-org/react"
import OptionsButton from './OptionsButton'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import ButtonActions from './ButtonActions'
import ImageGrid from './ImageGrid'
import { useNavigate } from 'react-router-dom'
import UserTooltip from '../UserTooltip'


const GeneralPostCard = ({ postInfo }) => {

  const navigate = useNavigate()
  const { postId, author, content, images, createdAt, comments, likes, bookmarks } = postInfo

  dayjs.extend(relativeTime)
  const { username, slug, photoURL } = author

  const handleRedirect = () => {
    navigate(`/${slug}`)
  }


  return (
    <article className="h-fit w-full flex gap-2 px-4 py-3 ">
      <UserTooltip
        author={author}
      >
        <Avatar
          src={`${photoURL}`}
          showFallback
          onClick={handleRedirect}
          className='cursor-pointer'
        />
      </UserTooltip>

      <div className="flex flex-col flex-1 gap-2">
        {/* HEADER */}
        <header className='w-full h-fit flex justify-between items-center'>

          <div className='flex flex-col flex-1'>
            <UserTooltip
              author={author}
            >
              <p
                className='w-fit max-w-72 font-semibold truncate cursor-pointer hover:underline underline-offset-2'
                onClick={handleRedirect}
              >
                {username}
              </p>
            </UserTooltip>
            <div className='w-fit max-w-72 text-default-500 inline-flex'>
              <p>
                @{slug} ·
              </p>
              <span>
                <Tooltip
                  delay={0}
                  closeDelay={0}
                  offset={-2}
                  radius='sm'
                  placement='bottom'
                  color='foreground'
                  content={dayjs(createdAt).format('dddd, MMMM D, YYYY h:mm A')}
                >
                  {dayjs(createdAt).fromNow()}
                </Tooltip>
              </span>
            </div>

          </div>

          <OptionsButton postInfo={postInfo} />
        </header>
        {/* BODY */}
        <div className='w-full h-fit bg-[ed]'>
          <p className='mb-2'>{content}</p>
          {
            images.length ? (
              <ImageGrid postId={postId} images={images} />
            )
              :
              <></>
          }
        </div>
        {/* FOOTER */}
        <ButtonActions
          postId={postId}
          author={author}
          comments={comments}
          content={content}
          date={dayjs(createdAt).fromNow()}
          likes={likes}
          bookmarks={bookmarks}
        />
      </div>

    </article>
  )
}

export default GeneralPostCard

GeneralPostCard.propTypes = {
  postInfo: PropTypes.object,
}