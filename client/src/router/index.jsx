import { createBrowserRouter } from "react-router-dom";
import Authentication from "@/pages/Authentication";
import MainPageLayout from "@/layouts/MainPageLayout";
import { AuthContextProvider } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import Messages from "@/pages/Messages";
import Community from "@/pages/Community";
import Notification from "@/pages/Notification";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentication />
  },
  {
    path: '/',
    element: <AuthContextProvider> <MainPageLayout /> </AuthContextProvider>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: ':slug',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ]
  }
])