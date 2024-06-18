import { AuthContext } from "@/contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const Sidebar = () => {

  const { isAuthenticated } = AuthContext()

  if (!isAuthenticated) return <Navigate to='/auth' />

  return (
    <div>
      sidebar
      <Outlet />
    </div>
  )
}

export default Sidebar