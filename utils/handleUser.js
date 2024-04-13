import { db, storage } from "@/config/firebase"; // Assuming the correct path to your firebase configuration
import { doc, setDoc } from "firebase/firestore";
import { checkFile, resizeFile } from "./ImageHandling";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";


export const changeBanner = async (uid, isAuthenticated, file = null) => {
  if (!isAuthenticated) {
    throw new Error("User is not authenticated. Please log in to add a post.");
  }

  let banner = "";

  if (file) {
    if (!checkFile(file)) return
    const compressFile = await resizeFile(file)

    try {
      const uploadTask = uploadBytesResumable(
        ref(storage, `${uid}/info/banner`),
        compressFile,
      );

      await toast.promise(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
              console.error("Error uploading image: ", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  banner = url;
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
          pending: 'Image is uploading',
          success: '🦄 Image Uploaded successfully',
          error: 'Error uploading image 🤯'
        }
      );

      await uploadTask;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Failed to upload image. Please try again later.");
    }
  }

  if (!banner) return;
  const bannerRef = doc(db, "users", uid);
  await setDoc(bannerRef, { banner }, { merge: true });
};