"use client"
import ProfileInfo from "@/components/ui/profile/Profile"
import styles from "./profile.module.css"
import { GetPosts } from "@/utils/getPosts"
import { useState } from "react"
import { useUserContext } from "@/context/getUserInfo"
import Post from "@/components/ui/post/Post"

const Profile = () => {
  const [itemsFetched, setItemsFetched] = useState(0)
  const { userInfo: { uid, email, photoURL, displayName } } = useUserContext()
  const { posts } = GetPosts(itemsFetched, uid)

  const handleLoadMore = () => {
    setItemsFetched(prev => prev + 6)
  }

  return (
    <div className={styles.container}>
      <ProfileInfo />
      <p className={`highlight ${styles.highlight}`}>{posts.length} POSTS</p>

      <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        {posts.length >= itemsFetched ? <div className={styles.loadmore} onClick={handleLoadMore}>load more</div> : null}

      </div>
    </div>
  )
}

export default Profile