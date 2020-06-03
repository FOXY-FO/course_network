import React from "react"
import s from "./ProfileInfo.module.scss"

const ProfileInfo = () => {
  return (
    <div>
      <div className={s.img}>
        <img
          src="https://pixlr.com/photo/image-editing-20200512-pw.jpg"
          alt=""
        />
      </div>
      <div className={s.info}>ava + info</div>
    </div>
  )
}

export default ProfileInfo
