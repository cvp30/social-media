import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import NavigationBar from "./NavigationBar"
import { AuthContext } from "@/contexts/AuthContext"
import { Spinner } from "@nextui-org/react"


const MainPageLayout = () => {

  const { loading } = AuthContext()
  const isAuthenticated = localStorage.getItem('Session')

  if (!isAuthenticated) return <Navigate to='/auth' />

  if (loading) return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  )

  return (
    <div className="w-full h-full max-w-screen-2xl flex flex-col md:flex-row items-center md:items-start mx-auto">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="w-full h-fit md:hidden">
        <NavigationBar />
      </div>
      <div className="h-fit mt-16 md:mt-0 md:ml-28 xl:ml-72 lg:flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default MainPageLayout