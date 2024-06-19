import { GET_PROFILE } from '@/graphql/GetProfile'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from "react"

const AuthUserContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('Session'))

  const { data, loading } = useQuery(GET_PROFILE)

  return (
    <AuthUserContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      currUser: data?.userProfile.user,
      loading
    }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const AuthContext = () => {
  return useContext(AuthUserContext)
}

AuthContextProvider.propTypes = {
  children: PropTypes.any,
}