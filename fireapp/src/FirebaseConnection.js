import { initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDO8K1rUYa7GlNa4-hyICTw1XggBCEQLp0",
    authDomain: "cursoreact-d0a18.firebaseapp.com",
    projectId: "cursoreact-d0a18",
    storageBucket: "cursoreact-d0a18.appspot.com",
    messagingSenderId: "1010205240927",
    appId: "1:1010205240927:web:60516ea035239340fdb5ea",
    measurementId: "G-SZ42W8GR5Y"
  };

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {db, auth}

//configurações para aceesar o banco do firebase aqui na nossa aplicacao