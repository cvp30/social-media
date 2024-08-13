import { AuthContext } from "@/contexts/AuthContext"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_DATA_PROFILE } from "../graphql/GetDataProfile"
import { Avatar, Button, Link, Spinner } from "@nextui-org/react"
import { LinkIcon, MapPinIcon } from "@heroicons/react/24/outline"
// import { LinkIcon, MapPinIcon } from "@heroicons/react/24/solid"

const ProfileInfo = () => {

  const { slug } = useParams()
  const { currUser } = AuthContext()

  const isCurrentUser = currUser.slug === slug

  const { data, loading } = useQuery(GET_DATA_PROFILE, {
    variables: { slug },
    skip: isCurrentUser
  })

  if (loading) return <Spinner />

  const profileData = isCurrentUser ? currUser : data?.user

  return (
    <div className="w-full h-fit">
      <div
        className={`${profileData.coverPhoto ? 'transparent' : 'bg-default-500'} w-full aspect-[3/1] relative bg-cover bg-center `}
        style={{
          backgroundImage: profileData.coverPhoto ? `url(${profileData.coverPhoto})` : 'none',
        }}
      >
        <Avatar
          isBordered
          color="primary"
          src={profileData.photoURL}
          className="w-28 h-28 absolute -bottom-10 left-0 ml-4"
        />
      </div>

      <div className="w-full h-fit px-4 flex flex-col gap-2 pt-2">
        {
          !isCurrentUser && (
            <div className="w-full text-right">
              <Button
                variant="ghost"
                color="primary"
                size="lg"
              >
                Edit profile
              </Button>
            </div>
          )
        }

        <div className={`${!isCurrentUser ? '' : 'mt-14'} w-full`}>
          <h2 className="w-full line-clamp-1">{profileData.username}</h2>
          <p className="text-default-500">@{profileData.slug}</p>
        </div>

        <div className="w-full">
          <p>{profileData.bio}</p>

          <div className="w-full flex flex-wrap gap-x-3 text-default-500">
            {
              profileData.location &&
              <Link
                isExternal
                href={profileData.location}
                className="inline-flex"
              >
                <MapPinIcon className="size-5" />
                {profileData.location}
              </Link>
            }
            {
              profileData.linkedin &&
              <Link
                isExternal
                href={profileData.linkedin}
                className="inline-flex"
              >
                <LinkIcon className="size-5" />
                {profileData.linkedin}
              </Link>
            }
            {
              profileData.github &&
              <Link
                isExternal
                href={profileData.github}
                className="inline-flex"
              >
                <LinkIcon className="size-5" />
                {profileData.github}
              </Link>
            }
            {
              profileData.portfolio &&
              <Link
                isExternal
                href={profileData.portfolio}
                className="inline-flex"
              >
                <LinkIcon className="size-5" />
                {profileData.portfolio}
              </Link>
            }
          </div>
        </div>



      </div>


    </div>
  )
}

export default ProfileInfo