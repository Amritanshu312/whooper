"use client";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase"; // Assuming auth is correctly exported from your firebase configuration
import { useRouter } from "next/navigation"; // Changed from "next/navigation" to "next/router"
import Loading from "@/components/ui/loading/Loading";

const Logout = () => {
  const router = useRouter(); // Changed to useRouter

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // Added auth parameter
      if (user) {
        // User is logged in, proceed with logout
        logout();
      }
      router.push("/");

    });

    return () => unsubscribe(); // Cleanup function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Effect runs only once

  const logout = async () => { // Removed auth parameter
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
      // Handle errors gracefully
    }
  };

  return <Loading />;
};

export default Logout;
