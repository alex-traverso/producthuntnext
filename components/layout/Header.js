import React, { useContext } from "react";
import Search from "../ui/Search";
import Navigation from "./Navigation";
import Link from "next/link";
import Button from "../ui/Button";
import { FirebaseContext } from "../../firebase";

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <header>
      <div className='header-container'>
        <div className='nav-container'>
          <Link href={"/"}>
            <p className='logo'>P</p>
          </Link>
          <Search />
          <Navigation />
        </div>

        <div className='user-config-container'>
          {user ? (
            <>
              <p className='user-name'>Hola: {user.displayName}</p>
              <Button
                type='button'
                bgColor='true'
                signOut={() => firebase.signOut()}
              >
                Cerrar sesion
              </Button>
            </>
          ) : (
            <>
              <Link href='/login'>
                <Button bgColor='true'>Login</Button>
              </Link>
              <Link href='/createAccount'>
                <Button>Crear cuenta</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
