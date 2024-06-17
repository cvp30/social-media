import DarkmodeToggle from "@/components/DarkmodeToggle"
import { GoogleButton } from "@/pages/Authentication/components/SocialButtons"
import LoginForm from "./components/LoginForm"
import { Modal, useDisclosure } from "@nextui-org/react"
import RegisterForm from "./components/RegisterForm"
import { XCircleIcon } from "@heroicons/react/24/solid"

const Authentication = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className=" h-screen flex max-w-screen-2xl mx-auto">
      <div
        className="hidden lg:block lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')] bg-cover"
      ></div>
      <div className=" w-1/2 flex items-center relative">
        <div className="absolute top-5 right-5"> <DarkmodeToggle /> </div>

        <div className="shadow-medium rounded-md w-[26rem] h-fit flex flex-col items-center gap-3 p-2 mx-auto ">
          <h1>Hello Friend!</h1>
          <GoogleButton text="Sign in with Google" />

          <p className="text-xs text-center text-default-400 font-bold">
            or use your email account:
          </p>
          <LoginForm />

          <p className="w-full text-center">
            Don&apos;t have an account?
            <span
              className="text-primary cursor-pointer font-bold ml-2"
              onClick={onOpen}
            >Register</span>
          </p>
          <Modal
            closeButton={<XCircleIcon />}
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              base: 'bg-background',
              closeButton: 'size-10'
            }}
          >
            <RegisterForm />
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Authentication