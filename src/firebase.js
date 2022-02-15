import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCorK1GHH7vsnE72l0KjC4fxf-wz9e7u6I",
  authDomain: "automedical-66123.firebaseapp.com",
  projectId: "automedical-66123",
  storageBucket: "automedical-66123.appspot.com",
  messagingSenderId: "495137405001",
  appId: "1:495137405001:web:2f1631267bcb8724cbe798"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDY2IM80DE-GozBM49pbGCXKFPk9r5TV8k",
//   authDomain: "auto-medical.firebaseapp.com",
//   projectId: "auto-medical",
//   storageBucket: "auto-medical.appspot.com",
//   messagingSenderId: "245284067504",
//   appId: "1:245284067504:web:13221acebe084895200375"
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;