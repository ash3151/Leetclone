import { initializeApp } from "firebase/app";
import { Signin } from "./components/Signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
import { Topbar } from "./components/Topbar";
import { ProblemList } from "./components/ProblemList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Landing } from "./components/Landing";
import { Submissions } from "./components/Sumissions";

const firebaseConfig = {
  apiKey: "AIzaSyCWGjGwxxuSKBV7UNO-dbc4DhzmEnGmMCQ",
  authDomain: "leetcode-clone-754ea.firebaseapp.com",
  projectId: "leetcode-clone-754ea",
  storageBucket: "leetcode-clone-754ea.firebasestorage.app",
  messagingSenderId: "737037119844",
  appId: "1:737037119844:web:4649b83f29c064871c0a71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
function App() {
  return (
    <RecoilRoot>
      <StoreApp />
    </RecoilRoot>
  );
}

function StoreApp() {
  const [user, setUser] = useRecoilState(userAtom);

  const problemList = [
    { id: "1", problemName: "Two Sum", tags: ["Array", "Hash Table"] },
    { id: "2", problemName: "Reverse String", tags: ["String"] },
    { id: "3", problemName: "Palindrome Check", tags: ["String"] },
    { id: "4", problemName: "Merge Intervals", tags: ["Array", "Sorting"] },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        setUser({
          loading: false,
          user: {
            email: user.email,
          },
        });
      } else {
        setUser({
          loading: false,
        });
        // No user is signed in.
        console.log("There is no logged in user");
      }
    });
  }, [])

  if (user.loading) {
    return <div>loading ...</div>;
  }
  
  if (!user.user) {
    return <div><Signin /></div>
  }
  
  return (
    <div className="place-items-center grid">
      <div className="max-w-screen-lg w-full">
      <Router>
        <Topbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/activity" element={<Submissions />} />
            <Route path="/problems" element={<ProblemList problemList={problemList} />} />
          </Routes>
        </Router>
        {/* <Leaderboard /> */}
        {/* <Leaderboard leaderboard={leaderboardData} /> */}
      </div>
    </div>
  );
}

export default App;