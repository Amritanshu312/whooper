import { db } from "@/config/firebase";
import { arrayRemove, getDoc, increment, serverTimestamp } from "firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// Define rate limiting parameters
const RATE_LIMIT_INTERVAL = 60 * 1000; // 1 minute
const MAX_LIKES_PER_INTERVAL = 40; // Maximum likes per user within the interval

// Track likes per user within the rate limit interval
const likeTracker = {};

export const LikePost = async (postID, userID) => {
  try {
    // Check if the user has exceeded the rate limit
    const now = Date.now();
    if (!likeTracker[userID]) {
      likeTracker[userID] = { lastLiked: now, count: 1 };
    } else {
      const { lastLiked, count } = likeTracker[userID];
      if (now - lastLiked < RATE_LIMIT_INTERVAL && count >= MAX_LIKES_PER_INTERVAL) {
        throw new Error("You've reached the maximum likes allowed within a short period. Please try again later.");
      } else {
        likeTracker[userID] = { lastLiked: now, count: count + 1 };
      }
    }

    const documentRef = doc(db, "posts", postID);

    // Get the document snapshot
    const docSnapshot = await getDoc(documentRef);

    // Check if the document exists
    if (docSnapshot.exists()) {
      const postData = docSnapshot.data();
      const userLiked = postData.likes && postData.likedBy.includes(userID);

      if (userLiked) {
        // If the user has already liked the post, remove like
        await updateDoc(documentRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userID)
        });
        // Return false to indicate that the post is unliked now
        return false;
      } else {
        // If the user hasn't liked the post, add like
        await updateDoc(documentRef, {
          likes: increment(1),
          likedBy: arrayUnion(userID), // Add the user ID to the likedBy array
          lastLikedAt: serverTimestamp() // Update last liked timestamp
        });
        // Return true to indicate that the post is liked now
        return true;
      }
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    console.error('Error updating document: ', error.message);
    throw error; // Rethrow the error for handling in the calling function
  }
}
