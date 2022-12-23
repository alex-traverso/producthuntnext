import app from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

//Firebase config
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      const app = initializeApp(firebaseConfig);
      this.auth = getAuth();
    }
  }
  //reigstrar el usuario
  async register(name, email, password) {
    const newUser = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    //   Actualiza el usuario creado, añadiendo el nombre del usuario
    return await updateProfile(newUser.user, {
      displayName: name,
    });
  }
  // Inicia sesion
  async login(email, password) {
    const login = await signInWithEmailAndPassword(this.auth, email, password);
    return login;
  }
  // Cierra la sesión del usuario
  async signOut() {
    const signOut = await this.auth.signOut();
    return signOut;
  }
}

const firebase = new Firebase();
export default firebase;
