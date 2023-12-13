import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { EmailAuthProvider, reauthenticateWithCredential, } from "firebase/auth";
import { useAuth } from '../../auth';
import { getAuth, updatePassword,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fdd835',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '8px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true,
      },
    },
  },
});

function Settings() {
  const [isHovering, setIsHovering] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [currentPassword, setCurrentPassword] = useState("");
  const { currentUser, mongoDBUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // New loading state

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  

  const auth = getAuth();
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email || "");
    }

    if (mongoDBUser) {
      setLoading(false); // Set loading to false when mongoDBUser is available
      console.log('MongoDB user data ava')
    } else {
      console.log("Waiting for MongoDB user data...");
      
    }
  }, [mongoDBUser]);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading user data...</div>; // Display a loading message or spinner with white text
  }
  

  const userName = mongoDBUser && mongoDBUser.name ? mongoDBUser.name : '';

  const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      setSnackbar({ open: true, message: 'Re-authentication failed. Please try again.', severity: 'error' });
      return false;
    }
  };
  
  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match.', severity: 'error' });
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        setSnackbar({ open: true, message: 'Password successfully updated.', severity: 'success' });
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          // Call reauthenticate function here
          const isReauthenticated = await reauthenticate(currentPassword);
          if (isReauthenticated) {
            await updatePassword(user, newPassword);
            setSnackbar({ open: true, message: 'Password successfully updated.', severity: 'success' });
          }
        } else {
          setSnackbar({ open: true, message: 'Failed to update password. Please try again.', severity: 'error' });
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => console.log('Profile image clicked')}
          >
            <img
              src="https://m.media-amazon.com/images/M/MV5BYzhjNmVhMTctYjc1OC00ZDYxLTgwZDEtYmEyNjJhOTdhZDNjXkEyXkFqcGdeQXVyNjczOTE0MzM@._V1_.jpg" 
              alt="Profile"
              style={{ borderRadius: '50%', width: 100, height: 100 }}
            />
            {isHovering && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                {/* Change Avatar */}
              </div>
            )}
          </div>
          <div style={{ marginLeft: 16 }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fdd835' }}>{userName}</div>
            <div style={{ color: '#aaaaaa' }}>{userEmail}</div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
        <TextField 
  label="Current Password" 
  type="password" 
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
/>
        <TextField 
            label="New Password" 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginRight: 16 }}
          />

          <TextField 
            label="Confirm New Password" 
            type="password" 
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button 
              variant="contained" 
              color="error" 
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handlePasswordChange}
            >
              Save Changes
            </Button>
          </div>
        </form>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default Settings;
