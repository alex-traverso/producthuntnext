import app, { initializeApp } from 'firebase/app';

//Firebase config
import firebaseConfig from './config';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
    }
}

const firebase = new Firebase();
export default firebase;