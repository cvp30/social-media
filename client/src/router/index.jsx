import { createBrowserRouter } from "react-router-dom";
import Authentication from "@pages/Authentication";


export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentication />
  },
])