import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./Walker.css"
import { useAuth } from '../../auth';
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

function DropdownExample() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label className="text-gray-300 text-center mb-8" htmlFor="number">How many dogs? (Max 3 dogs per post) </label>
      <br></br>
        <select className=" custom-dropdown text-white text-center mb-8" id="number" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">-- Please Select Amount --</option>
        <option value="One dog">1</option>
        <option value="Two dogs">2</option>
        <option value="Three dogs">3</option>
      </select>

    </div>
  );
}


// function DropdownExample2() {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleDropdownChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div>
//       <label className="text-gray-300 text-center mb-8" htmlFor="weight">Dog Weight (lbs)</label>
//       <br></br>
//       <select className=" custom-dropdown text-white text-center mb-8" id="weight" value={selectedOption} onChange={handleDropdownChange}>
//         <option value="">-- Please Select Weight --</option>
//         <option value="1-15">1 - 15</option>
//         <option value="16">16 - 30</option>
//         <option value="31">31 - 50</option>
//         <option value="51">51- 70</option>
//         <option value="71">71 - 100</option>
//         <option value="100">100+</option>
//       </select>

//     </div>
//   );
// }


function Walker() {
  const { mongoDBUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    duration: '',
    numberOfDogs: '',
    sizeOfDogs: [],
    location: []
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!mongoDBUser) {
      console.error('No ownerID found. User must be logged in.');
      return;
    }

    const taskData = {
      ...formData,
      ownerID: mongoDBUser._id, 
    };

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
      console.log('Task Created:', result);
      navigate('/some-success-page')
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };
  const [selectedDate, setSelectedDate] = useState('');
  
  // Calculate today's date in the correct format for the min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
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
             name='date'
          fullWidth
          label="Enter Date for Sitting"
          type="date"
          variant="filled"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today, 
          }}
          value={selectedDate}
          onChange={handleDateChange}
          style={{ flex: 1, marginRight: '8px' }}
        />
              <TextField
               name="duration" 
                fullWidth
                label="Enter Time Range for Sitting (hours)"
                variant="filled"
                margin="normal"
                style={{ flex: 1, marginRight: '8px' }}
              />
            <br></br>
            <br></br>
            <DropdownExample /> 
            {/* <DropdownExample2 />  */}
              <TextField
                fullWidth
                label="Enter the Weight of Each Dog in lbs (separated by commas)"
                variant="filled"
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
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      </ThemeProvider>
    );
}

export default Walker;