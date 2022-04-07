import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";

const Home = ({ setLoggedInInfo }) => {
  const [query, setQuery] = useState("");
  const [_mapData, set_MapData] = useState([]);
  const navigate = useNavigate();

  const addtoDb = async () => {
    try {
      await addDoc(collection(db, "testing"), {
        query,
      });
    } catch (error) {
      alert(JSON.stringify(error));
    }
    setQuery("");
  };

  const getDocss = async () => {
    const querySnapshot = await getDocs(collection(db, "testing"));
    set_MapData(querySnapshot.docs.map((res) => res.data()));
  };

  useEffect(() => {
    getDocss();
  }, [query, _mapData]);

  const logout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    setLoggedInInfo({});
    navigate("/login");
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={addtoDb}>Send</button>

      <button onClick={logout}>Logout</button>
      <div>
        {_mapData?.map(({ query }, index) => (
          <h1 key={index}> {query}</h1>
        ))}
      </div>
    </div>
  );
};

export default Home;
