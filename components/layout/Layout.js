import React from "react";
import Header from "./Header";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <html lang='es' />
        <title>Product Hunt</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
          crossOrigin='anonymous'
          referrerpolicy='no-referrer'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
      </Head>

      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
