import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { auth } from "../../secrets/firebase-secrets";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fdd835",
    },
  },
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          input: {
            color: "white", // Text color
          },
          "& label": {
            color: "gray", // Label color
          },
          "& label.Mui-focused": {
            color: "white", // Label color when the input is focused
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "gray", // Underline color before input is touched
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white", // Underline color when input is focused
          },
        },
      },
    },
  },
});

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          // email already exists
        } else if (errorCode === "auth/invalid-email") {
          // invalid email
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="p-1 rounded-lg shadow-xl text-white max-w-lg w-full">
          <h2 className="text-yellow-400 text-4xl font-bold mb-6 text-center">
            Sign Up
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Join our community today! Create an account to unlock exclusive
            features and personalized experiences.
          </p>
          <form className="space-y-4">
            <div className="row">
              <TextField
                fullWidth
                label="Enter First Name"
                variant="filled"
                margin="normal"
                style={{ flex: 1, marginRight: "8px" }}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Enter Last Name"
                variant="filled"
                margin="normal"
                style={{ flex: 1 }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="row">
              <TextField
                fullWidth
                label="Enter your Email"
                variant="filled"
                margin="normal"
                type="email"
                style={{ flex: 1, marginRight: "8px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Enter your Password"
                variant="filled"
                margin="normal"
                type="password"
                style={{ flex: 1 }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: "16px" }}
            >
              Sign Up
            </Button>
            <div className="text-center mt-4">
              <Button color="primary" component={Link} to="/login">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Signup;
