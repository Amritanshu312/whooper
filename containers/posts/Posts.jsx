"use client"
import Detail from "@/components/ui/detail/Detail"
import styles from "./posts.module.css"
import Post from "@/components/ui/post/Post"
import CreatePost from "@/components/ui/createPost/CreatePost"
import { useUserContext } from "@/context/getUserInfo"
import { GetPosts } from "@/utils/getPosts"
import { useState } from "react"

const Posts = () => {
  const { isAuthenticated, userInfo } = useUserContext();
  const [itemsFetched, setItemsFetched] = useState(0)
  const { posts } = GetPosts(itemsFetched)

  const handleLoadMore = () => {
    setItemsFetched(prev => prev + 6)
  }



  return (
    <div className={styles.container}>
      {isAuthenticated ? <Detail info={{ isAuthenticated, userInfo }} /> : null}
      <p className="highlight">{posts.length} POSTS</p>

      <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        {posts.length >= itemsFetched ? <div className={styles.loadmore} onClick={handleLoadMore}>load more</div> : null}

      </div>

      <CreatePost info={{ isAuthenticated, userInfo }} />
    </div>
  )
}

export default Posts