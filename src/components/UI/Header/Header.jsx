import React from "react"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"

let Header = ({ login, isAuth, logout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://cdn.shopify.com/shopifycloud/hatchful-web/assets/6fcc76cfd1c59f44d43a485167fb3139.png"
          alt="Logo"
        />
      </div>
      <div className={styles.auth}>
        {isAuth && (
          <>
            <div>{login}</div>
            <button onClick={logout}>Log Out</button>
          </>
        )}

        {!isAuth && <Link to="/login">Login</Link>}
      </div>
    </header>
  )
}

export default Header
