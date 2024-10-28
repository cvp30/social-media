import { Avatar, Image, Link } from "@nextui-org/react"
import { LinkIcon, MapPinIcon } from "@heroicons/react/24/outline"
import Loading from "@/components/Loading"
import UpdateUserForm from "./UpdateUserForm"
import { ProfileContext } from "../contexts/ProfileContext"

const ProfileInfo = () => {

  const { profile, loading, isCurrentUser } = ProfileContext()

  if (loading) return (
    <div className="w-full aspect-[3/2]">
      <Loading />
    </div>
  )

  return (
    <div className="w-full h-fit">
      <div className={`${profile.coverPhoto ? '' : 'bg-default-500'} w-full aspect-[3/1] relative`}>
        {
          profile.coverPhoto && (
            <Image
              removeWrapper
              src={profile.coverPhoto}
              className="w-full object-cover object-center aspect-[3/1]"
              radius="none"
            />
          )
        }
        <Avatar
          isBordered
          src={profile.photoURL}
          color={`${profile.photoURL ? 'primary' : ''}`}
          showFallback
          className="w-28 h-28 absolute -bottom-10 left-0 ml-4 z-10"
        />
      </div>

      <div className="w-full h-fit px-4 flex flex-col gap-2 pt-2">
        <div className="w-full h-14 text-right">
          {
            isCurrentUser && <UpdateUserForm />
          }
        </div>

        <div className='w-full'>
          <h2 className="w-full line-clamp-1">{profile.username}</h2>
          <p className="text-default-500">@{profile.slug}</p>
        </div>

        <div className="w-full">
          <p>{profile.bio}</p>

          <div className="w-full flex flex-wrap gap-x-3 text-default-500">
            {
              profile.location &&
              <Link
                isExternal
                href={profile.location}
                className="inline-flex"
              >
                <MapPinIcon className="size-5" />
                {profile.location}
              </Link>
            }
            {
              profile.linkedin &&
              <Link
                isExternal
                href={`https://x.com/${profile.linkedin}`}
                className="inline-flex"
              >
                <LinkIcon className="size-5" />
                {profile.linkedin}
              </Link>
            }
            {
              profile.github &&
              <Link
                isExternal
                href={`https://github.com/${profile.github}`}
                className="inline-flex"
              >
                <LinkIcon className="size-5" />
                {profile.github}
              </Link>
            }
            {
              profile.portfolio &&
              <Link
                isExternal
                href={profile.portfolio}
                className="inline-flex"
              >
                <LinkIcon className="size-5" />
                {profile.portfolio}
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo