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

const LoginForm = () => {

  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: () => {
      navigate('/')

    },
    onError: error => {
      console.log(error)
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

      const { data } = await loginUser({
        variables: values
      })

      console.log(data)
    }
  })

  if (loading) return;
  return (
    <form
      onSubmit={loginFormik.handleSubmit}
      className="w-full h-fit flex flex-col gap-2"
    >
      <CustomInput
        placeholder='Email'
        type='email'
        name='email'
        startContent={<EnvelopeIcon />}
        onBlur={loginFormik.handleBlur}
        value={loginFormik.values.email}
        onChange={loginFormik.handleChange}
        isInvalid={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
        errorMessage={loginFormik.touched?.email ? <ErrorMessage message={loginFormik.errors.email} /> : <></>}
      />
      <CustomInput
        type={isVisible ? 'text' : 'password'}
        name='password'
        placeholder='Password'
        startContent={<LockClosedIcon />}
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
        disabled={loading}
      >
        <p className="font-bold">
          SIGN IN
        </p>
      </Button>


    </form>
  )
}

export default LoginForm