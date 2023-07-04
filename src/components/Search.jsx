import { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  async function handelSearch() {
    setUserName("");
    setErr(false);

    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  }

  async function handelSelect() {
    // check weather the group is exists, if now create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDocs(db, "chats", combinedId);
      if (!res.exists()) {
        //Create user Chats
        await setDoc(doc, (db, "chats", combinedId), { messages: [] });
      }
    } catch (err) {}
  }

  function handelKey(e) {
    e.code === "Enter" && handelSearch();
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handelKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && (
        <div className="userChat" onClick={handelSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
