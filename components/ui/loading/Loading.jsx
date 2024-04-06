import styles from "./loading.module.css"

const Loading = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.load}><span></span></div>
      </div>
    </div>
  )
}

export default Loading