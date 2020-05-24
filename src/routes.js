import Profile from "./components/Profile"
import Dialogs from "./components/Dialogs"
import News from "./components/News"
import Music from "./components/Music"
import Settings from "./components/Settings"

export default [
  {
    id: 1,
    name: "Profile",
    route: "/profile",
    Component: Profile,
  },
  {
    id: 2,
    name: "Dialogs",
    route: "/dialogs",
    Component: Dialogs,
  },
  {
    id: 3,
    name: "News",
    route: "/news",
    Component: News,
  },
  {
    id: 4,
    name: "Music",
    route: "/music",
    Component: Music,
  },
  {
    id: 5,
    name: "Settings",
    route: "/settings",
    Component: Settings,
  },
]
