import ProfileInfo from "@/components/ui/profile/Profile"
import styles from "./profile.module.css"

const Profile = () => {
  return (
    <div className={styles.container}>
      <ProfileInfo />
      <p className={`highlight ${styles.highlight}`}>5 POSTS</p>
    </div>
  )
}

export default Profile