import React, { useState } from 'react';
import { Button, TextField, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

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
                Change Avatar
              </div>
            )}
          </div>
          <div style={{ marginLeft: 16 }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fdd835' }}>Loki Laufeyson</div>
            <div style={{ color: '#aaaaaa' }}>Dog Walker</div>
            <div style={{ color: '#aaaaaa' }}>Champaign, Illinois</div>
          </div>
        </div>

        <form>
          <TextField label="Email Address" type="email" />
          <TextField label="Phone Number" type="tel" />
          <TextField label="Current Password" type="password"  />

          <div style={{ display: 'flex' }}>
          <TextField label="New Password" type="password" style={{ marginRight: 16 }}/>

          <TextField label="Confirm New Password" type="password" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            {/* <Button variant="outlined" color="primary">Cancel</Button> */}
            <Button variant="contained" color="primary">Save Changes</Button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Settings;
