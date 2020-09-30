import React, { FC } from "react"
import styles from "./DialogItem.module.scss"
import noUser from "../../../assets/img/no-user.jpg"

type Props = {
  name: string
  img?: string
}

const DialogItem: FC<Props> = ({ name, img = noUser }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        <div className={styles.img}>
          <img src={img} alt="" />
        </div>
      </div>
      <div className={styles.wrapperItem}>{name}</div>
    </div>
  )
}

export default DialogItem
