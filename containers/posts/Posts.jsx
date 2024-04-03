"use client"
import Detail from "@/components/ui/detail/Detail"
import styles from "./posts.module.css"
import Post from "@/components/ui/post/Post"
import CreatePost from "@/components/ui/createPost/CreatePost"
import { useUserContext } from "@/context/getUserInfo"
import { GetPosts } from "@/utils/getPosts"

const Posts = () => {
  const { isAuthenticated, userInfo } = useUserContext();
  const { posts } = GetPosts()

  return (
    <div className={styles.container}>
      {/* {isAuthenticated ? <Detail info={{ isAuthenticated, userInfo }} /> : null} */}
      <p className="highlight">{posts.length} POSTS</p>

      {/* <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div> */}

      <CreatePost info={{ isAuthenticated, userInfo }} />
    </div>
  )
}

export default Posts