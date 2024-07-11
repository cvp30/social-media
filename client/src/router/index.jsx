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
import Post from "@/pages/Post";
import ChatRoom from "@/pages/Messages/pages/ChatRoom";

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
        path: 'post/:postId',
        element: <Post />,
      },
      {
        path: 'messages',
        element: <Messages />,
        children: [
          {
            path: ':chatId',
            element: <ChatRoom />,
          },
        ]
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