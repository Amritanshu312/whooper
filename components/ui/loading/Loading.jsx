import styles from "./loading.module.css"

const Loading = () => {
  return (
    <div className={styles.background}>
      <div class={styles.container}>
        <div class={styles.load}><span></span></div>
      </div>
    </div>
  )
}

export default Loading