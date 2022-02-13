import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCorK1GHH7vsnE72l0KjC4fxf-wz9e7u6I",
//   authDomain: "automedical-66123.firebaseapp.com",
//   projectId: "automedical-66123",
//   storageBucket: "automedical-66123.appspot.com",
//   messagingSenderId: "495137405001",
//   appId: "1:495137405001:web:2f1631267bcb8724cbe798"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDQsctwnf0aAcfyh9A6KU6B63iNCP2tFYk",
  authDomain: "automedical-e320a.firebaseapp.com",
  projectId: "automedical-e320a",
  storageBucket: "automedical-e320a.appspot.com",
  messagingSenderId: "513376818576",
  appId: "1:513376818576:web:a609d27f7267da32d00f15"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;