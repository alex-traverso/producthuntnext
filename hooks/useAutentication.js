import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAutentication = () => {
  const [userAutentication, setUserAutentication] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAutentication(user);
      } else {
        setUserAutentication(null);
      }
    });
    return () => unsuscribe();
  }, []);
  return userAutentication;
};

export default useAutentication;
