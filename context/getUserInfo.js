"use client";
import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { auth, db } from "@/config/firebase";
import Loading from "@/components/ui/loading/Loading";
import { doc, getDoc } from "firebase/firestore";

export const userContext = createContext();

export const UserState = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [FirebaseUserInfo, setFirebaseUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          metadata: user.metadata,
        };

        setUserInfo(userData);
        setIsAuthenticated(true);

        if (user.uid) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFirebaseUserInfo(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } else {
        setUserInfo({});
        setIsAuthenticated(false);
        setFirebaseUserInfo({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ userInfo, FirebaseUserInfo, isAuthenticated }), [
    userInfo,
    FirebaseUserInfo,
    isAuthenticated,
  ]);

  if (loading) return <Loading />;

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export function useUserContext() {
  return useContext(userContext);
}
