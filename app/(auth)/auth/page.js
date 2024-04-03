/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, providers } from "@/config/firebase";
import { FaGoogle } from "react-icons/fa";
import { createUser } from "@/utils/userHandling";
import "./auth.css";

const Auth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          router.push("/");
        }
      });
    };

    checkUser();
  }, []);

  const signIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, providers[provider]);
      const isNewUser = getAdditionalUserInfo(result).isNewUser;
      console.log(isNewUser);

      if (isNewUser) {
        createUser(result.user.uid, result.user);
      }

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <a href="#" className="neon-button" onClick={() => signIn("google")}>
        <FaGoogle />
        <span>Sign In with Google</span>
      </a>
    </div>
  );
};

export default Auth;