import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

  //Primer base de datos
  // const firebaseConfig = {
  //    apiKey: "AIzaSyCorK1GHH7vsnE72l0KjC4fxf-wz9e7u6I",
  //    authDomain: "automedical-66123.firebaseapp.com",
  //    projectId: "automedical-66123",
  //    storageBucket: "automedical-66123.appspot.com",
  //    messagingSenderId: "495137405001",
  //    appId: "1:495137405001:web:2f1631267bcb8724cbe798"
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyDzQDjWwmI_nvtkXcMtsbJVFEcZeVnD3Ps",
    authDomain: "proymedical.firebaseapp.com",
    projectId: "proymedical",
    storageBucket: "proymedical.appspot.com",
    messagingSenderId: "667149251190",
    appId: "1:667149251190:web:092f72ca624e3beeb42557"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;