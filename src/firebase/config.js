import { initializeApp } from "firebase/app"
import { getFirestore, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDOPHMs_h-ZiKSLiw9kpFRKe09NYk14ARc",
  authDomain: "muso-ninjas-9706a.firebaseapp.com",
  projectId: "muso-ninjas-9706a",
  storageBucket: "muso-ninjas-9706a.appspot.com",
  messagingSenderId: "578432246464",
  appId: "1:578432246464:web:9e266f3c737dde9784c325",
}

//Initialize Firebase
const app = initializeApp(firebaseConfig)

// init firestore service
const auth = getAuth(app)
const db = getFirestore(app)
const timestamp = serverTimestamp()
const storage = getStorage(app)
const sRef = ref

// export firestore
export { db, auth, timestamp, storage, sRef, uploadBytes, getDownloadURL }
