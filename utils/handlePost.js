import { db } from "@/config/firebase";
import { arrayRemove, getDoc, increment, serverTimestamp } from "firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from 'react-toastify';

export const LikePost = async (postID, userID) => {
  try {
    if (!userID) {
      throw new Error("User ID is not provided. Please login first to like!");
    }
    if (!postID) {
      throw new Error("Post ID is not provided. Post might not be found!");
    }

    const postRef = doc(db, "posts", postID);

    const postSnapshot = await getDoc(postRef);
    if (!postSnapshot.exists()) {
      throw new Error("Post not found.");
    }

    const postData = postSnapshot.data();
    const likedByUser = postData.likedBy?.includes(userID);

    if (likedByUser) {
      await updateDoc(postRef, {
        likes: increment(-1),
        likedBy: arrayRemove(userID)
      });
      toast.success('Post unliked successfully!');
    } else {
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userID)
      });
      toast.success('Post liked successfully!');
    }
  } catch (error) {
    console.error('Error toggling like: ', error.message);
    toast.error(error.message); // Display error message using toast
  }
}



