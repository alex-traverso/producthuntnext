import App from "next/app";
import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { FirebaseContext } from "../firebase";
import useAutentication from "../hooks/useAutentication";
import { app } from "../public/static/css/app.css";

const MyApp = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);
  const user = useAutentication();

  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
