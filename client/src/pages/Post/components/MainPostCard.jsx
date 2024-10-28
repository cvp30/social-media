import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import UserInfoCard from '@/components/UserInfoCard'
import ImageGrid from '@/components/PostCards/ImageGrid'
import ButtonActions from '@/components/PostCards/ButtonActions'
import { PostInfoContext } from '../contexts/PostContext'
import OptionsButton from './OptionsButton'
import { useSearchParams } from 'react-router-dom'

const MainPostCard = () => {

  dayjs.extend(relativeTime)
  const [params] = useSearchParams()
  const { post } = PostInfoContext()
  const { postId, author, content, images, createdAt, comments, likes, bookmarks } = post

  dayjs().format()
  const timeFormat = dayjs(createdAt).format('h:mm A · MMMM D, YYYY')

  return (
    <article className='h-fit w-full px-4 flex flex-col gap-5'>
      <header className='w-full flex justify-between items-center'>
        <UserInfoCard
          user={author}
        />

        <OptionsButton />
      </header>

      {/* CONTENT */}
      <div className='w-full flex flex-col gap-4'>
        <p>{content}</p>
        {
          images.length && params.get('photo') === null ? (
            <ImageGrid postId={postId} images={images} />
          )
            :
            <></>
        }

        <p className='text-default-500'>
          {timeFormat}
        </p>
      </div>

      <footer className='w-full border-y border-divider py-2'>
        <ButtonActions
          postId={postId}
          author={author}
          comments={comments}
          content={content}
          date={dayjs(createdAt).fromNow()}
          likes={likes}
          bookmarks={bookmarks}
        />
      </footer>
    </article>
  )
}

export default MainPostCard