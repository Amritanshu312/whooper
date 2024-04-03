import { db } from "@/config/firebase";
import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";

export const createUser = async (uid, userdetails) => {
  if (!uid || !userdetails) {
    throw new Error("Method requires uid and userdetails.");
  }

  console.log(uid, userdetails);

  const { displayName, email, photoURL, emailVerified, description, banner } = userdetails;

  try {
    await setDoc(doc(db, "users", uid), {
      uid: uid,
      name: displayName,
      email: email,
      photo: photoURL,
      emailVerified: emailVerified,
      description: description || "",
      banner: banner || "",
      views: 0,
      followers: 0,
      following: 0,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error setting user document: ", error);
    throw new Error("Failed to add user. Please try again later.");
  }
};
