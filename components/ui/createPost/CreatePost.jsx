"use client"
import { addPost } from "@/utils/getPosts";
import styles from "./createPost.module.css"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion"
import Image from "next/image";
import { toast } from 'react-toastify';

const CreatePost = ({ info }) => {
  const { isAuthenticated, userInfo } = info

  const [isVisible, setIsVisible] = useState(false)
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState(null)


  const handleClick = (e) => {
    if (e?.target?.className && typeof e.target.className === 'string' && e.target.className.toLowerCase().includes("bgcontainer")) {
      setIsVisible(prev => !prev)
    }
  }


  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.3, // Increased duration for smoother animation
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    }
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0])
  }

  const handlePost = () => {
    try {
      const { uid } = userInfo;
      if (!uid || !description) {
        throw new Error('Missing user ID or description');
      }
      const data = { uid, description };
      const res = addPost(data, isAuthenticated);
      if (res) {
        toast("🦄 Post created successfully")
        setIsVisible(false)
        setDescription("")
      } else toast(res.error)
    } catch (error) {
    }
  };


  return (
    <>
      <button className={styles.createicon} onClick={() => setIsVisible(true)}><FaPlus /></button>

      {isVisible ? <motion.div
        className={styles.bgcontainer}
        onClick={e => handleClick(e)}>
        <motion.div
          className={styles.container}
          variants={dropIn}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className={styles.input}>
            <textarea
              cols="80"
              rows="15"
              placeholder={`What's on your mind ? ${userInfo.displayName ? userInfo.displayName : ''}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {
              photo ? <div className={styles.Uploadedimage}>
                <Image src={URL.createObjectURL(photo)} alt="post" width={65} height={65} />
                <div className={styles.close} onClick={() => setPhoto(null)}>
                  <MdClose />
                </div>
              </div> : null
            }
            <div className={styles.option}>
              <input type="file" accept="image/*" id="photoUpload" onChange={handlePhoto} style={{ display: "none" }} />
              <label htmlFor="photoUpload">Photo</label>
              <button>Gif</button>
              <button>Live</button>
            </div>
          </div>


          <button
            className={styles.post}
            onClick={handlePost}
          >Post</button>
        </motion.div>
      </motion.div > : null
      }
    </>
  )
}

export default CreatePost