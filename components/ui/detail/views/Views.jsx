import styles from "./views.module.css"

const Views = () => {
  return (
    <div className={styles.container}>
      <h3>Total Views</h3>
      <h1 className={styles.highlight}>2.1M</h1>
      <p>The content has amassed a substantial 2.1 million views, reflecting considerable audience engagement.</p>
    </div >
  )
}

export default Views