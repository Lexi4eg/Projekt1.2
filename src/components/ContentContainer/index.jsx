import React, { useRef, useState } from "react";
import TopNavigation from "../TopNavigation";
import { BsPlusCircleFill } from "react-icons/bs";
// import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBAw7IcdM3DXY0YTR-qLa9ZigCmFSCWaeM",
  authDomain: "react-projekt-1.firebaseapp.com",
  projectId: "react-projekt-1",
  storageBucket: "react-projekt-1.appspot.com",
  messagingSenderId: "403975538884",
  appId: "1:403975538884:web:42de82ac30e1f834e4a191",
  measurementId: "G-5L51QH5CE3",
});
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function ContentContainer() {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <ChatRoom />
      </div>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages && messages.map((msg) => <Post key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <div className="bottom-bar">
          <button
            type="submit"
            className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
            disabled={!formValue}
          >
            <BsPlusCircleFill />
          </button>
          <input
            onChange={(e) => setFormValue(e.target.value)}
            type="text"
            value={formValue}
            placeholder="Enter message..."
            className="bottom-bar-input"
          />
        </div>
      </form>
    </>
  );
}

const Post = (props) => {
  const { text, uid, displayName, photoURL, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <div className={"post"}>
        <div className="avatar-wrapper">
          <img src={photoURL} referrerPolicy="no-referrer" className="avatar" />
        </div>

        <div className="post-content">
          <p className="post-owner">
            {displayName}
            <small className="timestamp"></small>
          </p>
          <p className="post-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentContainer;
