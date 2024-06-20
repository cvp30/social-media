import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  BellIcon as BellIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid
} from "@heroicons/react/24/solid"
import { HomeIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, BellIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"

export const menuItems = [
  {
    name: 'home',
    icon: HomeIcon,
    boldIcon: HomeIconSolid,
  },
  {
    name: 'community',
    icon: UserGroupIcon,
    boldIcon: UserGroupIconSolid,
  },
  {
    name: 'messages',
    icon: ChatBubbleLeftEllipsisIcon,
    boldIcon: ChatBubbleLeftEllipsisIconSolid,
  },
  {
    name: 'notification',
    icon: BellIcon,
    boldIcon: BellIconSolid,
  },
  {
    name: 'profile',
    icon: UserIcon,
    boldIcon: UserIconSolid,
  },
  {
    name: 'settings',
    icon: Cog6ToothIcon,
    boldIcon: Cog6ToothIconSolid,
  },
]