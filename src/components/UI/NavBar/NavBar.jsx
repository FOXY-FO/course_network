import React from "react"
import { NavLink } from "react-router-dom"

import s from "./NavBar.module.scss"

const NavBar = () => {
  return (
    <aside className={s.navBar}>
      <nav>
        <ul>
          <li className={s.item}>
            <NavLink to="/profile" activeClassName={s.active}>
              Profile
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to="/dialogs" activeClassName={s.active}>
              Dialogs
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to="/news" activeClassName={s.active}>
              News
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to="/users" activeClassName={s.active}>
              Users
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to="/music" activeClassName={s.active}>
              Music
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink to="/settings" activeClassName={s.active}>
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar
