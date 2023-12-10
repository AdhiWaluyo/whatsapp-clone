import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCIGJTHehNFLTZmd2BO8AZK17Nfc0VQh5U",
	authDomain: "whatsapp-clone-df006.firebaseapp.com",
	projectId: "whatsapp-clone-df006",
	storageBucket: "whatsapp-clone-df006.appspot.com",
	messagingSenderId: "1085690787319",
	appId: "1:1085690787319:web:50b873d39a43b27ae0aaf2",
	measurementId: "G-3NGF78FGYK"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;

