import "./App.css";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  getFirestore,
  addDoc,
  collection,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { auth, app } from "../firebase";
import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";

const db = getFirestore(app);

function App() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  }

  async function sendMessage() {
    await addDoc(collection(db, "messages"), {
      uid: user?.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  }

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <ChatRoom
          user={user}
          messages={messages}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          newMessage={newMessage}
        />
      ) : (
        <button className="signInBtn" onClick={handleGoogleSignIn}>SignIn</button>
      )}
    </>
  );
}

export default App;
