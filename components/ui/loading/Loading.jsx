import styles from "./loading.module.css"

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.device}>
        <div className={styles.device__a}>
          <div className={styles.device__a_1}></div>
          <div className={styles.device__a_2}></div>
        </div>
        <div className={styles.device__b}></div>
        <div className={styles.device__c}></div>
        <div className={styles.device__d}></div>
        <div className={styles.device__e}></div>
        <div className={styles.device__f}></div>
        <div className={styles.device__g}></div>
      </div>
    </div>
  )
}

export default Loading