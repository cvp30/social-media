import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import Authentication from "@pages/Authentication";

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentication />
  },
  {
    path: '/home',
    element: <Home />
  }
])

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes path='/auth' element={<></>}>
//       <Route index element={<Authentication />} />
//       <Route path="home" element={<Home />} />
//     </Routes>
//   )
// )