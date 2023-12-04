import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Link } from 'react-router-dom';
import "./Walker.css"

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fdd835', 
    },
  },
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          input: {
            color: 'white', // Text color
          },
          '& label': {
            color: 'gray', // Label color
          },
          '& label.Mui-focused': {
            color: 'white', // Label color when the input is focused
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'gray', // Underline color before input is touched
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white', // Underline color when input is focused
          },
        },
      },
    },
  },
});

function DropdownExample() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label className="text-gray-300 text-center mb-8" htmlFor="number">How many dogs?</label>
      <br></br>
            <select className=" custom-dropdown text-white text-center mb-8" id="number" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">-- Please Select Amount --</option>
        <option value="One dog">1</option>
        <option value="Two dogs">2</option>
        <option value="Three dogs">3</option>
        <option value="Four dogs">4</option>
      </select>

      {/* <p className="text-gray-300 text-center mb-8">Selected Number: {selectedOption}</p> */}
    </div>
  );
}


function DropdownExample2() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label className="text-gray-300 text-center mb-8" htmlFor="weight">Dog Weight (lbs)</label>
      <br></br>
      <select className=" custom-dropdown text-white text-center mb-8" id="weight" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">-- Please Select Weight --</option>
        <option value="1-15">1 - 15</option>
        <option value="16">16 - 30</option>
        <option value="31">31 - 50</option>
        <option value="51">51- 70</option>
        <option value="71">71 - 100</option>
        <option value="100">100+</option>
      </select>

      {/* <p className="text-gray-300 text-center mb-8">Selected Number: {selectedOption}</p> */}
    </div>
  );
}


function Walker() {
  return (
    // <div className="self-stretch text-amber-400 text-3xl font-medium leading-[58px] mt-5 max-md:max-w-full">
    <ThemeProvider theme={theme}>
      <h2 className="text-yellow-400 text-4xl font-bold mb-6 text-center">Find The Perfect Match For Your Dog's Needs</h2>
    <div className="min-h-[80vh] flex items-center justify-center">
        <div className="p-1 rounded-lg shadow-xl text-white max-w-lg w-full">
        <p className="text-gray-300 text-center mb-8">
          Whether you have a busy schedule, unexpected plans, or just need an extra hand in caring for your furry friend, 
          we're here to help you connect with reliable and loving dog walkers in your area. Our dedicated dog walkers are 
          passionate about ensuring the well-being of your pets and are ready to provide the care and attention they deserve.
          Start your search now and discover the ideal dog walker who will treat your pet like family!
          </p>
          <form className="space-y-4">
            <div className="row">
              <TextField
                fullWidth
                label="Enter Zip Code"
                variant="filled"
                margin="normal"
                style={{ flex: 1, marginRight: '8px' }}
              />
              <TextField
                fullWidth
                label="Enter Date for Sitting"
                variant="filled"
                margin="normal"
                style={{ flex: 1, marginRight: '8px' }}
              />
              <TextField
                fullWidth
                label="Enter Time Range for Sitting (hours)"
                variant="filled"
                margin="normal"
                style={{ flex: 1, marginRight: '8px' }}
              />
            </div>
            <DropdownExample /> 
            <DropdownExample2 /> 
            <Button
              type="Search"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: '16px' }}
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      </ThemeProvider>
    // </div>
    );
}

export default Walker;
