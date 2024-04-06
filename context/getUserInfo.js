"use client";
import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { auth } from "@/config/firebase";

export const userContext = createContext();

export const UserState = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleAuthStateChanged = (user) => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          metadata: user.metadata,
        });
        setIsAuthenticated(true);
      } else {
        setUserInfo({});
        setIsAuthenticated(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsubscribe();
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ userInfo, isAuthenticated }), [
    userInfo,
    isAuthenticated,
  ]);

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export function useUserContext() {
  return useContext(userContext);
}
