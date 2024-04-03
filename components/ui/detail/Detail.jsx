import styles from "./detail.module.css"
import Followers from "./followers/Followers"
import Profile from "./profile/Profile"
import Views from "./views/Views"

const Detail = ({ info }) => {

  const { userInfo } = info

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Views />
        <Followers />
      </div>

      <Profile userInfo={userInfo} />
    </div>
  )
}

export default Detail