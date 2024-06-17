import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Authentication from "@/pages/Authentication";


export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentication />
  },
  {
    path: '/',

    children: [
      {
        index: true,
        element: <Home />,
      }
    ]
  }
])