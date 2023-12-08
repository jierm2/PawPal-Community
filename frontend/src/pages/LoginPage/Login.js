import React from "react";
import { auth } from "../../secrets/firebase-secrets";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fdd835", // Your brand color for buttons and such
    },
    white: {
      main: "#FFFFFF",
    },
  },
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/settings"); // Redirect to a dashboard or another page on success
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Update the error state based on the error
        if (errorCode === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (errorCode === "auth/user-not-found") {
          setError("No user found with this email. Please sign up.");
        } else {
          setError(errorMessage); // Generic error message
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="p-1 rounded-lg shadow-xl text-white max-w-lg w-full">
          <h2 className="text-yellow-400 text-4xl font-bold mb-6 text-center">
            Log in
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Welcome back! Please log in to access your account.
          </p>
          <form className="space-y-4" onSubmit={signIn}>
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
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="text-center mt-4">
              {/* <Button color="white" component={Link} to="/forgot-password">
                Forgot Password?
              </Button> */}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: "16px" }}
            >
              Login
            </Button>
            <div className="text-center mt-4">
              <Button color="white" component={Link} to="/sign-up">
                Don't have an account? Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;