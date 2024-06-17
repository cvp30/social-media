import PropTypes from 'prop-types'
import { createContext, useContext } from "react"

const AuthUserContext = createContext()


export const AuthContextProvider = ({ children }) => {

  // const [isSignIn, setIsSignIn] = useState(true)


  return (
    <AuthUserContext.Provider value={{
      // isSignIn,
      // setIsSignIn
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