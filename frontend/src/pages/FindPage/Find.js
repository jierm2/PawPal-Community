import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, Card, Grid, Typography, Button } from '@mui/material';

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

function Find() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9001/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleApply = (taskId) => {
    console.log('Applying for task:', taskId);
    // Further implementation needed based on your API
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} style={{ paddingLeft: '10vw', paddingRight:'10vw',paddingTop:'5vh' }}>
        <Grid item xs={12}>
          <Typography color='white' variant="h4" gutterBottom>
            Available Tasks
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/walker')}
          >
            Post New Task
          </Button>
        </Grid>
        {tasks.map((task) => (
          <Grid item key={task._id} xs={12} sm={12} md={12}>
            <Card className="p-4 rounded-lg shadow">
              <Typography variant="h5" gutterBottom>
                {task.name}
              </Typography>
              <Typography variant="body1">
                {task.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApply(task._id)}
                style={{ marginTop: '1rem' }}
              >
                Apply
              </Button>
            </Card>
          </Grid>
        ))}
       
      </Grid>
    </ThemeProvider>
  );
}

export default Find;
