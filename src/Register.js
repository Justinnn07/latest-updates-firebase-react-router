import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Register = ({ setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => alert(JSON.stringify(err)));
    setEmail("");
    setPassword("");
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
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
