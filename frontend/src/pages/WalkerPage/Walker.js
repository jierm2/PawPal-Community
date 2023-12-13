import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./Walker.css"
import { useAuth } from '../../auth';
import Alert from '@mui/material/Alert'; // Import the Alert component
import Stack from '@mui/material/Stack';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fdd835', 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {

        root: {
          input: {
            color: 'white',
          },
          '& label': {
            color: 'gray',
          },
          '& label.Mui-focused': {
            color: 'white', 
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'gray', 
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
        },
      },
      
      
    },
    
    
    
  },
});

function DropdownExample({ onNumberOfDogsChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedOption(value);
    onNumberOfDogsChange(value);
  };
  

  return (
    <div>
      <label className="text-gray-300 text-center mb-8" htmlFor="number">How many dogs? (Max 3 dogs per post) </label>
      <br></br>
        <select className=" custom-dropdown text-white text-center mb-8" id="number" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">-- Please Select Amount --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

    </div>
  );
}



function Walker() {
  const { mongoDBUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    duration: '',
    numberOfDogs: '',
    sizeOfDogs: '',
    location: [1, 1] // Default location
  });
  const [dogSizeError, setDogSizeError] = useState('');

  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);
  
  const minDate = today.toISOString().split('T')[0];
  const maxDate = nextMonth.toISOString().split('T')[0];
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Date validation
    if (name === 'date' && (new Date(value) < today || new Date(value) > nextMonth)) {
      // Inform user about invalid date selection
      return;
    }

    // Dog weight input validation
    if (name === 'sizeOfDogs') {
      if (!value.split(',').every(v => !isNaN(v.trim()) && v.trim() !== '')) {
        // Inform user about invalid format
        return;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'duration' ? parseInt(value, 10) : value
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.date ||
      !formData.duration ||
      !formData.numberOfDogs ||
      !formData.sizeOfDogs
    ) {
      setErrorMessage('Please fill out all required fields');
      return;
    }
    if (!mongoDBUser) {
      // console.error('No ownerID found. User must be logged in.');
      return;
    }

    // Parse dog sizes
    const dogSizes = formData.sizeOfDogs.split(',').map(size => parseInt(size.trim(), 10));
    setDogSizeError('');

    const dogSizesArray = formData.sizeOfDogs.split(',').map(size => parseInt(size.trim(), 10));
    if (formData.numberOfDogs !== dogSizesArray.length) {
      setDogSizeError(`Number of dogs and weight entries must match. Expected ${formData.numberOfDogs} weight entries.`);
      return; // Stop form submission if there's an error
    }
    const taskData = {
      ...formData,
      ownerID: mongoDBUser._id,
      sizeOfDogs: dogSizes
    };
    // console.log('taskdata',taskData);
    try {
      const response = await fetch('http://localhost:9001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('Task Created:', result);
      setIsSuccess(true); // Set success state to true
      setSuccessMessage('Form submitted successfully'); // Set success message
      setTimeout(() => {
        navigate('/search');
      }, 1000);
    } catch (error) {
      // console.error('Failed to create task:', error);
      setErrorMessage('Failed to submit form'); // Set error message

    }
  };
  const [selectedDate, setSelectedDate] = useState('');
  
  // Calculate today's date in the correct format for the min attribute

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: '5vh' }}>

      <h2 className="text-yellow-400 text-4xl font-bold mb-6 text-center">Find The Perfect Match For Your Dog's Needs</h2>
    <div className="min-h-[80vh] flex items-center justify-center">
        <div className="p-1 rounded-lg shadow-xl text-white max-w-lg w-full">
        <p className="text-gray-300 text-center mb-8">
          Whether you have a busy schedule, unexpected plans, or just need an extra hand in caring for your furry friend, 
          we're here to help you connect with reliable and loving dog walkers in your area. Our dedicated dog walkers are 
          passionate about ensuring the well-being of your pets and are ready to provide the care and attention they deserve.
          Start your search now and discover the ideal dog walker who will treat your pet like family!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="row">

            <TextField
  name="date"
  fullWidth
  label="Enter Date for Sitting"
  type="date"
  variant="filled"
  required
  margin="normal"
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    min: minDate,
    max: maxDate,
    
  }}
  value={selectedDate}
  onChange={(event) => {
    setSelectedDate(event.target.value);
    handleInputChange(event);
  }}
  style={{ flex: 1, marginRight: '8px' }}
/>

             <TextField
  name="duration"
  onChange={handleInputChange}
  fullWidth
  label="Enter Time Range for Sitting (hours)"
  variant="filled"
  margin="normal"
  required
  type="number"
  inputProps={{ min: "1", max: "24", step: "1" }}
  style={{ flex: 1, marginRight: '8px' }}
/>


            <br></br>
            <br></br>
            <DropdownExample onNumberOfDogsChange={(value) => setFormData({...formData, numberOfDogs: value})} />
            {/* <DropdownExample2 />  */}
            <TextField
            fullWidth
            name="sizeOfDogs"
            onChange={handleInputChange}
            label="Enter the Weight of Each Dog in lbs (separated by commas)"
            helperText={dogSizeError || "Format: 10, 15, 20 (Use commas to separate weights)"}
            error={Boolean(dogSizeError)}
            variant="filled"
            required
            margin="normal"
            style={{ flex: 1, marginRight: '8px' }}
          />
              </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: '16px' }}
              onClick= {handleSubmit}
            >
              Submit the request
            </Button>
            {isSuccess && (
            <Stack spacing={2}>
              <Alert severity="success" onClose={() => setIsSuccess(false)}>
                {successMessage}
              </Alert>
            </Stack>
          )}
          {errorMessage && (
            <Stack spacing={2}>
              <Alert severity="error" onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            </Stack>
          )}
          </form>
        </div>
      </div>
      </div>

      </ThemeProvider>
    );
}

export default Walker;