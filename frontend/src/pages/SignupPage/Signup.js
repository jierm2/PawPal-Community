import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fdd835",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: "white",
          },
          "& label": {
            color: "gray",
          },
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "gray",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white",
          },
        },
      },
    },
  },
});

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state for success animation
  const signUp = (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false); // Reset success state on new submission

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsSuccess(true); // Set success state to true
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
          setError('Email already in use. Please try another.');
        } else if (errorCode === 'auth/invalid-email') {
          setError('Invalid email format. Please check your email.');
        } else {
          setError(errorMessage);
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
            Join our community today! Create an account to unlock exclusive features and personalized experiences.
          </p>
          <form className="space-y-4" onSubmit={signUp}>
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
            {isSuccess && (
          <div className="text-center">
            <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
            <p>Registration Successful!</p>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Signup;
