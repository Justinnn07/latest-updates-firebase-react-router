import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoading, setLoggedInInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getUserIfLoggedIn = () => {
    setLoading(true);
    setLoggedInInfo(JSON.parse(localStorage.getItem("user")));
    navigate("/");
    setLoading(false);
  };

  useEffect(() => {
    getUserIfLoggedIn();
    //eslint-disable-next-line
  }, []);

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user));
        setLoggedInInfo(res.user);
        navigate("/");
        setLoading(false);
      })
      .catch((err) => alert(JSON.stringify(err)));
    setEmail("");
    setPassword("");
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/");
        setLoggedInInfo(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      })
      .catch((err) => alert(JSON.stringify(err)));
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>

      <button onClick={googleSignIn}> Google</button>
    </div>
  );
};

export default Login;
