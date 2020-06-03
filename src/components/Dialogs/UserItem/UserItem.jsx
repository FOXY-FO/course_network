import React from "react"
import styles from "./UserItem.module.scss"
import noUser from "../../../assets/img/no-user.jpg"

const UserItem = ({ name, img }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        <div className={styles.img}>
          <img src={img ? img : noUser} alt="" />
        </div>
      </div>
      <div className={styles.wrapperItem}>{name}</div>
    </div>
  )
}

export default UserItem
