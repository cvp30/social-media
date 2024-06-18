import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Authentication from "@/pages/Authentication";
import { Sidebar } from '@/layouts'

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentication />
  },
  {
    path: '/',
    element: <Sidebar />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ]
  }
])