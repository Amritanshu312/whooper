import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useState, useEffect } from "react"; // Added useEffect for async initialization

export const GetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = [];
        for (const docSnap of querySnapshot.docs) {
          const postData = docSnap.data();
          const uid = postData.uid;
          const userDocSnap = await getDoc(doc(db, "users", uid));
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            data.push({
              ...postData,
              user: userData,
              id: docSnap.id,
            });
          } else {
            console.error("User document not found for UID:", uid);
          }
        }
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Error fetching posts. Please try again later.");
      }
    };

    fetchData();

    // Cleanup function (no need to unsubscribe as we're not using onSnapshot)
  }, []);

  return { posts, error };
};

export const addPost = async (postData, isAuthenticated) => {
  if (!isAuthenticated) {
    throw new Error("User is not authenticated. Please log in to add a post.");
  }

  try {
    await addDoc(collection(db, "posts"), {
      uid: postData.uid,
      description: postData.description,
      likes: 0,
      comments: [],
      photo: postData?.photo || "",
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding post: ", error);
    throw new Error("Failed to add post. Please try again later.");
  }
};

export const deletePost = async (id) => {
  try {
    if (!id) {
      throw new Error("No ID provided for deleting post");
    }

    const postDocRef = doc(db, "posts", id);



    await deleteDoc(postDocRef);
    // If successful, no need for further action as the document has been deleted.
  } catch (error) {
    console.error("Error deleting post:", error.message);
    // You can handle the error here, such as displaying an error message to the user
    // or performing other actions based on the type of error.
  }
};