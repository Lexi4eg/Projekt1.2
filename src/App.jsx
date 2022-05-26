import Channelbar from "./components/ChannelBar";
import ContentContainer from "./components/ContentContainer";
import SideBar from "./components/SideBar";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TopNavigation from "./components/TopNavigation";

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

function All() {
  return (
    <>
      <SideBar />
      <Channelbar />
      <ContentContainer />
    </>
  );
}
//<TopNavigation />
function App() {
  const [user] = useAuthState(auth);
  return <div className="flex">{user ? <All /> : <SignIn />}</div>;
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="signin">
      <>
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </>
    </div>
  );
}

export default App;
