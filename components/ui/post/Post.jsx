import Image from "next/image"
import { useState } from "react";
import styles from "./post.module.css"
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

import { compareTime } from "@/utils/Time";
import SocialOption from "./socialOption/SocialOption";
import { LikePost } from "@/utils/handlePost";

const Post = ({ post }) => {
  const { id, uid, likedBy, comments, description, photo, createdAt, user } = post
  const [liked, setLiked] = useState(likedBy ? likedBy.includes(uid) : false);
  const [likeCount, setLikeCount] = useState(likedBy ? likedBy.length : 0);


  const handleLikeClick = async () => {
    try {
      setLiked(prev => !prev);
      setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));

      const isLiked = await LikePost(id, uid)
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
            <Image src={photo} alt="post" layout="responsive" width={5000} height={5000} />
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

        <SocialOption info={{ id, uid }} />

      </div>
    </div>
  )
}

export default Post