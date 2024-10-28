import { AuthContext } from '@/contexts/AuthContext'
import { useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { createContext, useContext, useRef } from "react"
import { GET_DATA_PROFILE } from '../graphql/GetDataProfile'
import { useFormik } from 'formik'
import { UPDATE_USER } from '../graphql/UpdateUserMutation'
import { GET_PROFILE } from '@/graphql/GetProfile'
import { uploadImages } from '@/services/firebase'


const ProfileInfoContext = createContext()

export const ProfileInfoProvider = ({ slug, children }) => {

  const photoURLRef = useRef(null)
  const coverPhotoRef = useRef(null)
  const { currUser, loading: currUserLoading } = AuthContext()
  const { username, photoURL, coverPhoto, linkedin, github, portfolio, bio, location } = currUser

  const isCurrentUser = currUser.slug === slug

  const [updateUser] = useMutation(UPDATE_USER, {
    update: (cache, { data }) => {

      const { updateUser } = data

      const { userProfile } = cache.readQuery({
        query: GET_PROFILE
      })

      cache.writeQuery({
        query: GET_PROFILE,
        data: {
          userProfile: {
            ...userProfile,
            user: {
              ...userProfile.user,
              ...updateUser
            }
          }
        }
      })
    }
  })

  const { data, loading: profileLoading } = useQuery(GET_DATA_PROFILE, {
    variables: { slug },
    skip: isCurrentUser
  })

  const initialValues = {
    username,
    photoURL,
    coverPhoto,
    linkedin,
    github,
    portfolio,
    bio,
    location
  }

  // UPDATE CURRENT USER
  const updateUserFormik = useFormik({
    initialValues,
    onSubmit: async (values) => {

      const userInputData = {}
      const { photoURL, coverPhoto, ...otherValues } = values

      if (photoURL !== initialValues.photoURL) {
        userInputData.photoURL = await uploadImages(currUser.id, photoURL, 'photoURL')
      }

      if (coverPhoto !== initialValues.coverPhoto) {
        userInputData.coverPhoto = await uploadImages(currUser.id, coverPhoto, 'coverPhoto')
      }

      Object.keys(otherValues).forEach((key) => {
        if (otherValues[key].trim() !== initialValues[key]) {
          userInputData[key] = otherValues[key];
        }
      });

      console.log(userInputData)

      await updateUser({
        variables: { userInputData },
      })
    }
  })
  const handleOpenCoverPhoto = () => coverPhotoRef.current.click()

  const handleOpenphotoURL = () => photoURLRef.current.click()

  const handleRevertCoverPhoto = () => updateUserFormik.setFieldValue('coverPhoto', coverPhoto)

  const handleRevertPhotoURL = () => updateUserFormik.setFieldValue('photoURL', photoURL)

  const handleChangeCoverPhoto = (e) => {
    const { files } = e.target

    if (files[0]) {
      updateUserFormik.setFieldValue('coverPhoto', files[0])
    }
  }

  const handleChangePhotoURL = (e) => {
    const { files } = e.target

    if (files[0]) {
      updateUserFormik.setFieldValue('photoURL', files[0])
    }
  }

  return (
    <ProfileInfoContext.Provider value={{
      profile: isCurrentUser ? currUser : data?.user,
      loading: isCurrentUser ? currUserLoading : profileLoading,
      isCurrentUser,
      photoURLRef,
      coverPhotoRef,
      handleOpenCoverPhoto,
      handleOpenphotoURL,
      updateUserFormik,
      handleRevertCoverPhoto,
      handleRevertPhotoURL,
      handleChangeCoverPhoto,
      handleChangePhotoURL,
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