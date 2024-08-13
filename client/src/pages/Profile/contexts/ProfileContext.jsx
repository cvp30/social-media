import { AuthContext } from '@/contexts/AuthContext'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { createContext, useContext } from "react"
import { GET_DATA_PROFILE } from '../graphql/GetDataProfile'


const ProfileInfoContext = createContext()

export const ProfileInfoProvider = ({ slug, children }) => {

  const { currUser, loading: currUserLoading } = AuthContext()

  const isCurrentUser = currUser.slug === slug

  const { data, loading: profileLoading } = useQuery(GET_DATA_PROFILE, {
    variables: { slug },
    skip: isCurrentUser
  })

  return (
    <ProfileInfoContext.Provider value={{
      profile: isCurrentUser ? currUser : data?.user,
      loading: isCurrentUser ? currUserLoading : profileLoading,
    }}>
      {children}
    </ProfileInfoContext.Provider>
  )
}

export const ProfileContext = () => useContext(ProfileInfoContext)

ProfileInfoProvider.propTypes = {
  slug: PropTypes.string,
  children: PropTypes.any
}