"use client"
import { useUserContext } from "@/context/getUserInfo"
import styles from "./profile.module.css"
import Image from "next/image"
import { useState } from "react"

const Profile = () => {
  const { userInfo: { email, photoURL, displayName } } = useUserContext()
  const [photo, setPhoto] = useState(photoURL)

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Image src="/sample/banner.jpg" alt="banner" width={1200} height={300} />
      </div>

      <div className={styles.info}>
        <div className={styles.profile}>
          <Image src={photo} alt="profile" width={200} height={200} />
        </div>

        <div className={styles.userInfo}>
          <div className={styles.name}>{displayName}</div>
          <div className={styles.email}>{email}</div>
        </div>
      </div>
    </div>
  )
}

export default Profile