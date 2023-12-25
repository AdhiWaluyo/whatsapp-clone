// Login.tsx
import React from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useStateValue } from "./stateProvider";
import { actionTypes } from "./actionTypes";
import "./Login.css";
const Login = () => {
  const [, dispatch] = useStateValue(); // Destructure only dispatch, ignore state

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Ensure result.user has the expected structure
        const { uid, displayName } = result.user || {};
        if (uid && displayName) {
          dispatch({
            type: actionTypes.SET_USER,
            user: {
              id: uid,
              name: displayName,
            },
          });
        } else {
          // Handle the case where result.user is missing expected properties
          throw new Error("Invalid user object");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="Whatsapp"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button type="submit" variant="outlined" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
