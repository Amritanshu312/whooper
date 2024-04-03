import Image from "next/image"
import styles from "./profile.module.css"

const Profile = ({ userInfo }) => {
  const {
    email,
    photoURL,
    displayName
  } = userInfo


  return (
    <div className={styles.container}>
      <Image src={photoURL} alt="profile" width={200} height={200} />

      <div>
        <div className={styles.name}>{displayName}</div>
        <div className={styles.hashtag}>{email}</div>
      </div>


      <div className={styles.detail}>
        <div className={styles.section}>
          <div className={styles.highlight}>0k</div>
          <div className={styles.heading}>Posts</div>
        </div>
        <div className={styles.section}>
          <div className={styles.highlight}>0M</div>
          <div className={styles.heading}>Followers</div>
        </div>
        <div className={styles.section}>
          <div className={styles.highlight}>0k</div>
          <div className={styles.heading}>Following</div>
        </div>
      </div>


      <div className={styles.linesplit}></div>

      <button className={styles.option}>Change Info</button>
    </div>
  )
}

export default Profile