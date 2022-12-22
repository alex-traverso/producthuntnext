import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAutentication from "../hooks/useAutentication";

const MyApp = (props) => {
  const user = useAutentication();
  console.log(user);
  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
