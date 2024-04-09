import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { deletePost } from "@/utils/getPosts";
import styles from "./socialOption.module.css"
import { useUserContext } from "@/context/getUserInfo";

const SocialOption = ({ info }) => {
  const { isAuthenticated, userInfo } = useUserContext()
  const { uid: userUID } = userInfo
  const { id, UserUID: uid, photo, photoID } = info

  const handleDelete = (id) => {
    const res = confirm("Are you sure you want to delete this post?")
    if (!res) return
    deletePost(id, userUID, photo, photoID)
  }

  return userUID === uid && isAuthenticated ? (
    <div className={styles.socialuser}>
      <div
        className={styles.delete}
        onClick={() => handleDelete(id)}
      >
        <MdDelete />
        <span>delete</span>
      </div>

      <div className={styles.edit}><MdOutlineEdit /> <span>edit</span></div>

    </div>
  ) : null
}

export default SocialOption