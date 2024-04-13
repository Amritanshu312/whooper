import { useUserContext } from "@/context/getUserInfo"
import styles from "./profile.module.css"
import Image from "next/image"
import { useState } from "react"
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { changeBanner } from "@/utils/handleUser";
import { checkFile } from "@/utils/ImageHandling";

const Profile = () => {
  const { userInfo, FirebaseUserInfo, isAuthenticated } = useUserContext()
  const { uid, email, photoURL, displayName } = userInfo

  const [banner, setBanner] = useState(FirebaseUserInfo.banner)
  const [photo, setPhoto] = useState(photoURL)


  const bannerOnChange = (e) => {
    if (checkFile(e.target.files[0])) {
      setBanner(e.target.files[0])
      changeBanner(uid, isAuthenticated, e.target.files[0]) //live banner upload
      return
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Image src={banner ? banner?.name ? URL.createObjectURL(banner) : banner : `/sample/banner.jpg`} alt="banner" width={1200} height={300} />
        <input type="file" id="photoUpload" onChange={(e) => bannerOnChange(e)} style={{ display: "none" }} />
        <label htmlFor="photoUpload" className={styles.changeBanner}>
          <MdEdit />
        </label>
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