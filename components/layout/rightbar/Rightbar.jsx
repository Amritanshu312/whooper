import TopCommunity from "./Top/TopCommunity"
import styles from "./rightbar.module.css"

const Rightbar = () => {
  return (
    <div className={styles.container}>

      <TopCommunity />
      <div className={styles.linesplit}></div>
      <TopCommunity />

    </div >
  )
}

export default Rightbar