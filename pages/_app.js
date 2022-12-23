import App from "next/app";
import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { FirebaseContext } from "../firebase";
import useAutentication from "../hooks/useAutentication";

const MyApp = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);
  const user = useAutentication();

  /* const { Component, pageProps } = props; */
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
  /*  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    ); */
};

export default MyApp;

/* export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
} */
