import React from "react"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"

const Header = ({ login, isAuth }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://cdn.shopify.com/shopifycloud/hatchful-web/assets/6fcc76cfd1c59f44d43a485167fb3139.png"
          alt="Logo"
        />
      </div>
      <div className={styles.auth}>
        {isAuth ? login : <Link to="/login">Login</Link>}
      </div>
    </header>
  )
}

export default Header
