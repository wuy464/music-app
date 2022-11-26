import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login } from "./components";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/stateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const [authState, setAuthState] = useState(false);
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      console.log(userCred);
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-auto min-w-[680px] bg-primary-400 flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};
export default App;
