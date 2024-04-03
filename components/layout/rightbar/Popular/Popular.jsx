import styles from "./Popular.module.css"

const Popular = () => {
  return (
    <div className={styles.container}>
      <h3>Suggested Peoples</h3>

      <ul>
        <li className={styles.user}>
          <div className={img}>

          </div>

        </li>
      </ul>
    </div>
  )
}

export default Popular