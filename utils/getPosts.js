import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, limit, orderBy, query, serverTimestamp, startAt } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useState, useEffect } from "react";

export const GetPosts = (datasToFetch = 0) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Assuming initially loading is true
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        orderBy("random", "asc"),
        limit(datasToFetch === 0 ? 6 : 2 * datasToFetch),
        startAt(datasToFetch)
      ),
      (querySnapshot) => {
        const postPromises = querySnapshot.docs.map(async (docSnap) => {
          const postData = docSnap.data();
          const uid = postData.uid;
          const userDocSnap = await getDoc(doc(db, "users", uid));

          if (!userDocSnap.exists()) {
            console.error("User document not found for UID:", uid);
            return null;
          }

          const userData = userDocSnap.data();
          return { ...postData, user: userData, id: docSnap.id };
        });

        Promise.all(postPromises)
          .then((resolvedPosts) => {
            const filteredPosts = resolvedPosts.filter(post => post !== null);
            setPosts(filteredPosts);
            setLoading(false); // Set loading to false after posts are fetched
            setError(null);
          })
          .catch((err) => {
            console.error("Error fetching posts:", err);
            setError("Error fetching posts. Please try again later.");
            setLoading(false); // Set loading to false in case of an error
          });
      },
      (err) => {
        console.error("Error subscribing to posts:", err);
        setError("Error subscribing to posts. Please try again later.");
        setLoading(false); // Set loading to false in case of an error
      }
    );

    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, [datasToFetch]);

  return { posts, loading, error };
};




export const addPost = async (postData, isAuthenticated) => {
  if (!isAuthenticated) {
    throw new Error("User is not authenticated. Please log in to add a post.");
  }

  try {
    const postDocData = {
      uid: postData.uid,
      description: postData.description,
      likes: 0,
      random: Math.floor(Math.random() * (99 * 99 * 345 - 100 + 1)) + 100,
      comments: [],
      photo: postData?.photo || "",
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "posts"), postDocData);
    return { success: true };
  } catch (error) {
    console.error("Error adding post: ", error);
    return { success: false, error: "Failed to add post. Please try again later." };
  }
};

export const deletePost = async (id, userUID) => {
  try {
    if (!id) {
      throw new Error("No ID provided for deleting post");
    }

    if (!userUID) {
      throw new Error("User UID is not provided. Please login first to delete a post.");
    }
    
    const postDocRef = doc(db, "posts", id);
    await deleteDoc(postDocRef);
  } catch (error) {
    console.error("Error deleting post:", error.message);
  }
};
