import React from "react"
import { NavLink } from "react-router-dom"

import routes from "../../routes"
import styles from "./NavBar.module.scss"

const NavBar = () => {
  return (
    <aside className={styles.navBar}>
      <nav>
        <ul>
          {routes.map(({ id, route, name }) => {
            return (
              <li key={id} className={styles.item}>
                <NavLink to={route} activeClassName={styles.active}>
                  {name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar
