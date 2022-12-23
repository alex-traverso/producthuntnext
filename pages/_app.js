import App from "next/app";
import { FirebaseContext } from "../firebase";
import firebase from "../firebase/firebase";
import useAutentication from "../hooks/useAutentication";

const MyApp = (props) => {
  const user = useAutentication();
  const { Component, pageProps } = props;

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
