import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, limit, orderBy, query, serverTimestamp, startAt, where } from "firebase/firestore";
import { db, storage } from "@/config/firebase";
import { useState, useEffect } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from 'react-toastify';
import { checkFile, resizeFile } from "./ImageHandling";

export const GetPosts = (datasToFetch = 0, uid = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Assuming initially loading is true
  const [error, setError] = useState(null);
  console.log(uid);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      uid ?
        query(collection(db, "posts"),
          orderBy("random", "asc"),
          limit(datasToFetch === 0 ? 6 : 2 * datasToFetch),
          startAt(datasToFetch),
          where("uid", "==", uid))
        :
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



export const addPost = async (postData, isAuthenticated, file = null, uid) => {
  // Check if the user is authenticated
  if (!isAuthenticated) {
    throw new Error("User is not authenticated. Please log in to add a post.");
  }
  const randomINT = Math.floor(Math.random() * (99 * 99 * 345 - 100 + 1)) + 100


  let imageUrl = "";

  if (file) {
    if (!checkFile(file)) return
    const compressFile = await resizeFile(file)

    try {
      const uploadTask = uploadBytesResumable(
        ref(storage, `${uid}/posts/${randomINT}`),
        compressFile,
      );

      await toast.promise(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // You can add your progress logic here if needed
            },
            (error) => {
              console.error("Error uploading image: ", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  imageUrl = url;
                  resolve(url);
                })
                .catch((error) => {
                  console.error("Error getting download URL: ", error);
                  reject(error);
                });
            }
          );
        }),
        {
          pending: 'Post is uploading',
          success: '🦄 Post created successfully',
          error: 'Error uploading image 🤯'
        }
      );

      await uploadTask;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Failed to upload image. Please try again later.");
    }
  }

  try {
    const postDocData = {
      uid: postData.uid,
      description: postData.description,
      likes: 0,
      random: randomINT,
      comments: [],
      photo: imageUrl || "",
      createdAt: serverTimestamp()
    };

    // Add post to Firestore
    await addDoc(collection(db, "posts"), postDocData);

    // Return success response
    return { success: true };
  } catch (error) {
    console.error("Error adding post: ", error);
    throw new Error("Failed to add post. Please try again later.");
  }
};




export const deletePost = (id, userUID, photo, photoID) => {
  return toast.promise(
    new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error("No ID provided for deleting post"));
        return;
      }

      if (!userUID) {
        reject(new Error("User UID is not provided. Please login first to delete a post."));
        return;
      }

      const deletionPromises = [];

      if (photo) {
        const desertRef = ref(storage, `${userUID}/posts/${photoID}`);
        deletionPromises.push(deleteObject(desertRef));
      }

      const postDocRef = doc(db, "posts", id);
      deletionPromises.push(deleteDoc(postDocRef));

      Promise.all(deletionPromises)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    }),
    {
      loading: "Deleting post...",
      success: "Post deleted successfully",
      error: (error) => `Error deleting post: ${error.message}`,
    }
  );
};
