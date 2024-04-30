import { useUserContext } from "@/context/getUserInfo"
import styles from "./editProfile.module.css"
import { useState } from "react"
import Image from "next/image"
import { checkFile } from "@/utils/ImageHandling"

const EditProfile = () => {
  const { FirebaseUserInfo } = useUserContext()
  const { name, photoURL } = FirebaseUserInfo
  const [Name, setName] = useState(name)
  const [photo, setPhoto] = useState(photoURL)



  return (
    <div className={styles.container}>
      <h3>Edit Profile</h3>

      <form className={styles.form}>
        <div className={styles.right}>
          <div className={styles.input}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter Your Name" value={Name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={styles.imageUpload}>
            <label>Photo</label>
            <input
              type="file"
              id="profilePhoto"
              style={{ display: "none" }}
              onChange={(e) => {
                if (checkFile(e.target.files[0])) {
                  setPhoto(e.target.files[0])
                }
              }}
            />
            <label
              htmlFor="profilePhoto"
              className={styles.changePhoto}
            >
              {photo ? <Image src={URL.createObjectURL(photo)} alt="profile" fill /> : null}
              <span>Click here to change your photo</span>
            </label>
          </div>
        </div>

        <div className={styles.left}>
          <label htmlFor="name">Description</label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>

      </form>
      <button type="submit" className={styles.saveButton}>Save</button>

    </div>
  )
}

export default EditProfile