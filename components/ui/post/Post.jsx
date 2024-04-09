import Image from "next/image"
import { useState } from "react";
import styles from "./post.module.css"
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { toast } from 'react-toastify';

import { compareTime } from "@/utils/Time";
import SocialOption from "./socialOption/SocialOption";
import { LikePost } from "@/utils/handlePost";
import { useUserContext } from "@/context/getUserInfo";

const Post = ({ post }) => {
  const { isAuthenticated, userInfo } = useUserContext()
  const { uid } = userInfo
  const { id, likedBy, comments, description, photo, createdAt, user, uid: UserUID, random: photoID } = post
  const [liked, setLiked] = useState(likedBy ? likedBy.includes(uid) : false);
  const [likeCount, setLikeCount] = useState(likedBy ? likedBy.length : 0);


  const handleLikeClick = async () => {
    try {
      if (!isAuthenticated || !uid) return toast("🔒 Please login first to like! 🔑")

      setLiked(prev => !prev);
      setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));

      await LikePost(id, uid)
    } catch (error) {
      console.error('Error liking post:', error.message);
      setLiked(prev => !prev);
      setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));

    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.top}>

        <div className={styles.user}>
          <div className={styles.userimage}>
            <Image src={user?.photo} alt="profile" width={50} height={50} />
          </div>

          <span className={styles.name}>{user?.name}</span>
        </div>

        <div className={styles.time}>{compareTime(createdAt?.seconds)}</div>

      </div>

      <div>
        <div className={styles.description}>
          {description}
        </div>
        {photo === '' ? null :
          <div className={styles.image}>
            <Image src={photo} alt="post" quality={60} fill />
          </div>}

      </div>

      <div className={styles.social}>
        <div className={styles.socialuserinput}>
          <div
            onClick={() => handleLikeClick()}
            className={liked ? styles.active : null}
          >
            <AiOutlineLike /> {likeCount}
          </div>

          <div className={styles.comment}><BiCommentDetail /> {comments.length}</div>
        </div>

        <SocialOption info={{ id, UserUID, photo, photoID }} />

      </div>
    </div>
  )
}

export default Post