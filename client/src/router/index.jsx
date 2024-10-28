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
import Posts from "@/pages/Profile/pages/Posts";
import Replies from "@/pages/Profile/pages/Replies";
import Bookmarks from "@/pages/Profile/pages/Bookmarks";
import Likes from "@/pages/Profile/pages/Likes";
import { PostContextProvider } from "@/pages/Post/contexts/PostContext";

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
        element: <PostContextProvider><Post /></PostContextProvider>,
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
        children: [
          {
            index: true,
            element: <Posts />,
          },
          {
            path: 'replies',
            element: <Replies />,
          },
          {
            path: 'bookmarks',
            element: <Bookmarks />,
          },
          {
            path: 'likes',
            element: <Likes />,
          },
        ]
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ]
  }
])