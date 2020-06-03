import React from "react"
import styles from "./Post.module.scss"

const Post = ({ children }) => {
  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <img src="" alt="" />
      </div>
      <div className={styles.text}>{children}</div>
    </div>
  )
}

export default Post
