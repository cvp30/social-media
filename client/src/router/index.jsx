import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Authentication from "@/pages/Authentication";
import { Sidebar } from '@/layouts'
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
    element: <Sidebar />,
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