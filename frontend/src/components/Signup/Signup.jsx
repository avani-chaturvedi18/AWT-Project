import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { TextField, Button, Typography } from "@mui/material"; 
import { ThemeProvider, createTheme } from "@mui/material/styles";



import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fffff",
      },
    },
  });

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Sign Up</h1>

          {/* <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        /> */}

          <TextField
            label="Name"
            placeholder="Enter your name"
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
          />

          {/* <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        /> */}
          <TextField
            label="Email"
            placeholder="Enter email address"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
          />

          {/* <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        /> */}

          <TextField
            label="Password"
            placeholder="Enter password"
            value={values.pass}
            onChange={(event) => setValues({ ...values, pass: event.target.value })}
            type="password" // Set password type
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <Button variant="contained" disabled={submitButtonDisabled} onClick={handleSubmission}>
              Signup
            </Button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
};


export default Signup;