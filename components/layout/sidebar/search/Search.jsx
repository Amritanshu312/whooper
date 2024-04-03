import styles from "./search.module.css"
import { RiSearchLine } from "react-icons/ri";

const Search = () => {
  return (
    <div className={styles.search}>
      <RiSearchLine />
      <input type="text" placeholder="Search" />
    </div>
  )
}

export default Search