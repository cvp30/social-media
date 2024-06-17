// import PropTypes from 'prop-types'
import CustomInput from "@/components/CustomInput"
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/solid"
import { Button, Divider, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useState } from "react"
import { GoogleButton } from "./SocialButtons"
import { useFormik } from "formik"
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { REGISTER_USER } from "../graphql/RegisterMutation"

const RegisterForm = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const handlePasswordVisibility = () => setIsVisible(!isVisible)

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      navigate('/')

    },
    onError: error => {
      console.log(error)
    }
  })

  const registerFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: loginSchema,
    onSubmit: async (values) => {

      const { data } = await registerUser({
        variables: values
      })

      console.log(data)
    }
  })

  if (loading) return;

  return (
    <ModalContent>
      {
        (onClose) => (
          <form
            onSubmit={registerFormik.handleSubmit}
            className="w-full"
          >
            <ModalHeader className="flex justify-center">
              <h2>Welcome!</h2>
            </ModalHeader>
            <ModalBody className="mb2">
              <GoogleButton text="Register with Google" />
              <Divider className="my-2" />

              <div className="w-full h-fit flex flex-col gap-5">
                <CustomInput
                  placeholder='Email'
                  type='email'
                  startContent={<EnvelopeIcon />}
                />
                <CustomInput
                  type='text'
                  placeholder='Username'
                  startContent={<UserIcon />}
                />

                <CustomInput
                  type={isVisible ? 'text' : 'password'}
                  placeholder='Password'
                  startContent={<LockClosedIcon />}
                  endContent={
                    <div className="cursor-pointer" onClick={handlePasswordVisibility} >
                      {
                        isVisible ? <EyeIcon /> : <EyeSlashIcon />
                      }
                    </div>
                  }
                />
                {/* <Button
                  size="lg"
                  color="primary"
                  radius="sm"
                  onPress={onClose}
                  fullWidth
                >
                  <p className="font-bold">
                    SIGN UP
                  </p>
                </Button> */}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="lg"
                color="primary"
                radius="sm"
                onPress={onClose}
                fullWidth
              >
                <p className="font-bold">
                  SIGN UP
                </p>
              </Button>
            </ModalFooter>
          </form>
        )
      }
    </ModalContent>
  )
}

export default RegisterForm

// RegisterForm.propTypes = {
//   onClose: PropTypes.func,
// }