import styles from "./Top.module.css"

const TopCommunity = () => {
  return (
    <div className={styles.container}>
      <h3>Top Community</h3>

      <ul>
        <li>
          <div className={styles.icon}>I</div>
          <span>Introduction</span>
        </li>
        <li>
          <div className={styles.icon}>W</div>
          <span>Whats New on Whooper</span>
        </li>
        <li>
          <div className={styles.icon}>D</div>
          <span>DesignNews</span>
        </li>
        <li>
          <div className={styles.icon}>Be</div>
          <span>Behance</span>
        </li>
        <li>
          <div className={styles.icon}>F</div>
          <span>Figma Community</span>
        </li>
      </ul>
    </div>
  )
}

export default TopCommunity