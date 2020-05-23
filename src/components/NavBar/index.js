import React from "react"

const NavBar = () => {
  return (
    <aside className="nav-bar">
      <nav className="nav">
        <ul>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/messages">Messages</a>
          </li>
          <li>
            <a href="/messages">News</a>
          </li>
          <li>
            <a href="/messages">Music</a>
          </li>
          <li>
            <a href="/messages">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar
