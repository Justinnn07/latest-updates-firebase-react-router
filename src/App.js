import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
const App = () => {
  const [loading, setLoading] = useState(false);
  const [loggedInInfo, setLoggedInInfo] = useState({});

  if (loading) {
    return <h1>Loadingg...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loggedInInfo?.email ? (
              <Home setLoggedInInfo={setLoggedInInfo} />
            ) : (
              <Navigate replace={true} to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setLoggedInInfo={setLoggedInInfo}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/register"
          element={<Register loading={loading} setLoading={setLoading} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
