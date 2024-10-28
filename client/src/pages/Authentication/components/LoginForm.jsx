import CustomInput from "@/components/CustomInput"
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { Button } from "@nextui-org/react"
import { useFormik } from "formik"
import { loginSchema } from "../schemas/loginSchema"
import ErrorMessage from "./ErrorMessage"
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../graphql/LoginMutation"
import { useNavigate } from "react-router-dom"
// import { AuthContext } from "@/contexts/AuthContext"
import { GET_PROFILE } from "@/graphql/GetProfile"
import toast from "react-hot-toast"

const LoginForm = () => {

  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  // const { setIsAuthenticated } = AuthContext()

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: () => {
      // setIsAuthenticated(true)
      navigate('/')
    },

    onError: error => {
      toast.error(error.message)
    },

    update: (cache, { data }) => {
      const { token, userInfo } = data.loginUser

      localStorage.setItem('Session', token)

      cache.writeQuery({
        query: GET_PROFILE,
        data: {
          userProfile: {
            __typename: 'UserInfo',
            followingList: userInfo.followingList,
            user: userInfo.user,
          }
        }
      })
    }
  })

  const handlePasswordVisibility = () => setIsVisible(!isVisible)

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await loginUser({
        variables: values
      })
    }
  })

  return (
    <form
      onSubmit={loginFormik.handleSubmit}
      className="w-full h-fit flex flex-col gap-2"
    >
      <CustomInput
        placeholder='Email'
        type='email'
        name='email'
        startContent={<EnvelopeIcon className="size-6" />}
        onBlur={loginFormik.handleBlur}
        value={loginFormik.values.email}
        onChange={loginFormik.handleChange}
        isInvalid={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
      // errorMessage={loginFormik.touched?.email ? <ErrorMessage message={loginFormik.errors.email} /> : <></>}
      />
      <CustomInput
        type={isVisible ? 'text' : 'password'}
        name='password'
        placeholder='Password'
        startContent={<LockClosedIcon className="size-6" />}
        endContent={
          <div className="cursor-pointer" onClick={handlePasswordVisibility} >
            {
              isVisible ? <EyeIcon /> : <EyeSlashIcon />
            }
          </div>
        }
        onBlur={loginFormik.handleBlur}
        value={loginFormik.values.password}
        onChange={loginFormik.handleChange}
        isInvalid={Boolean(loginFormik.touched.password) && Boolean(loginFormik.errors.password)}
        errorMessage={loginFormik.touched.password ? <ErrorMessage message={loginFormik.errors.password} /> : <></>}
      />

      <Button
        type="submit"
        size="lg"
        color="primary"
        radius="sm"
        isLoading={loading}
      >
        <p className="font-bold">
          SIGN IN
        </p>
      </Button>


    </form>
  )
}

export default LoginForm