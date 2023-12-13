import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, Card, Grid, Typography, Button, Chip } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../auth';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert'; // Import the Alert component
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}                     variant="contained"
 color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm}                    variant="contained"
 color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
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
  const [owners, setOwners] = useState({});
  const navigate = useNavigate();
  const [deleteTaskId, setDeleteTaskId] = useState(null); // Task ID to be deleted
  const { mongoDBUser } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [walkers, setWalkers] = useState({});

  // Fetch walker details (similar to how you fetch owner info)
  const fetchWalkerInfo = async (walkerIds) => {
    try {
      // Remove duplicates and filter out null/undefined IDs
      const uniqueWalkerIds = [...new Set(walkerIds.filter(id => id))];
      let walkersData = {};
  
      for (const walkerId of uniqueWalkerIds) {
        const response = await fetch(`/api/users/${walkerId}`);
        const data = await response.json();
        
        // Assuming the response contains walker data
        walkersData[walkerId] = data.data; // Adjust based on your API response
      }
  
      setWalkers(walkersData);
      // console.log('wwalkering data',walkersData);
    } catch (error) {
      // console.error("Failed to fetch walker data", error);
    }
  };
  
  
  
  // Function to handle walker selection
  const handleSelectWalker = async (taskId, walkerId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignedWalker: walkerId,
        }),
      });
  
      if (response.ok) {
        const updatedTask = await response.json();
  
        // Update the tasks state
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
        );
  
        setAlert({ message: 'Walker selected successfully!', type: 'success', open: true });
        window.location.reload();

      } else {
        throw new Error('Failed to update the task.');
      }
    } catch (error) {
      // console.error('Error selecting walker:', error);
      setAlert({ message: 'Error selecting walker.', type: 'error', open: true });
    }
  };
  
  
  
  const handleDeleteDialogOpen = (taskId) => {
    setDeleteTaskId(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteTaskId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteTask(deleteTaskId);
    handleDeleteDialogClose();
  };
  const [alert, setAlert] = useState({ message: '', type: 'info', open: false });

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date();
        setTasks(
          data.data.filter(
            (task) =>
              !task.completed &&
              new Date(task.date) >= currentDate // Filter out tasks with dates in the past
          )
        );

        // Fetch dog owners' information and store it in the "owners" state
        const ownerIds = data.data.map((task) => task.ownerID);
        fetchOwnerInfo(ownerIds);
      })
      .catch((error) => {

      });  }, []);
  const handleDeleteTask = (taskId) => {
  
    // Send a DELETE request to the API endpoint for deleting the task
    fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Task deletion was successful; remove the task from the state
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
          setAlert({ message: 'Task deleted successfully.', type: 'success', open: true });

        } else {
          // console.error('Failed to delete task.');
        }
      })
      .catch((error) => {
        // console.error('Error deleting task:', error);
        setAlert({ message: 'Error deleting task.', type: 'error', open: true });

      });
  
    // Close the delete dialog
    handleDeleteDialogClose();
  };
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const fetchOwnerInfo = (ownerIds) => {
    ownerIds.forEach((ownerId) => {
      if (ownerId === 'deleted') {
        return; // Skip fetching when ownerId is "deleted"
      }

      fetch(`/api/users/${ownerId}`)
        .then((response) => response.json())
        .then((data) => {
          // Store owner's information by their ID
          setOwners((prevOwners) => ({
            ...prevOwners,
            [ownerId]: data.data[0],
          }));
        })
        .catch((error) => {
          // Display an error message to the user
          setAlert({ message: 'Error applying for task.', type: 'error', open: true });

        });
            });
  };
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const handleApply = (taskId) => {
    // console.log('Applying for task:', taskId);
  
    // Find the specific task from the state
    const taskToApply = tasks.find(task => task._id === taskId);
    const updatedPendingWalkers = taskToApply ? 
      [...(taskToApply.pendingWalkers || []), mongoDBUser._id] : [mongoDBUser._id];
  
    fetch(`http://localhost:9001/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pendingWalkers: updatedPendingWalkers,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to apply for task.');
      }
    })
.then((response) => {

  setTasks((prevTasks) => prevTasks.map(task => 
    task._id === taskId ? {...task, pendingWalkers: [...task.pendingWalkers, mongoDBUser._id]} : task
  ));

  setAlert({ message: 'Applied to task successfully!', type: 'success', open: true });
})

    .catch((error) => {
      // console.error('Error applying for task:', error);
      setAlert({ message: 'Error applying for task.', type: 'error', open: true });
    });
    
  };
  
  
  useEffect(() => {
    const walkerIds = tasks.flatMap(task => task.pendingWalkers || []);
    fetchWalkerInfo(walkerIds);

  }, [tasks]);
  // console.log('Walkers:', walkers);
  // console.log('current user:', mongoDBUser);

  const tasksWithApplications = tasks.filter(task => 
    task.ownerID === mongoDBUser?._id && task.pendingWalkers && task.pendingWalkers.length > 0
  );



  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} style={{ padding: '5vh 10vw' }}>
      {tasksWithApplications.length > 0 && (
  <Grid item xs={12}>
    <Typography color='white' variant="h4" gutterBottom>
      Applied Requests
    </Typography>

    {tasksWithApplications.map((task) => (
  <Card className="p-4 rounded-lg shadow" sx={{ margin: '1rem', position: 'relative' }} key={task._id}>
    {/* Task Details */}
    <Typography variant="h6">{formatDate(task.date)}</Typography>
    <Typography variant="body2"><strong>Duration:</strong> {task.duration} hours</Typography>
    <Typography variant="body2"><strong>Number of Dogs:</strong> {task.numberOfDogs}</Typography>
    <Typography variant="body2">
      <strong>Dog Sizes:</strong>
      {task.sizeOfDogs.map((size) => (
        <Chip key={size} label={`${size} lbs`} variant="outlined" style={{ margin: '4px' }} />
      ))}
    </Typography>

    {/* List of Walkers who applied */}
    <div style={{ marginTop: '1rem' }}>
    {task.pendingWalkers.map((walkerId) => (
  <div key={walkerId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
    {walkerId === mongoDBUser._id ? (
      <Typography variant="body2">You</Typography>
    ) : (
      <Typography variant="body2">{walkers[walkerId]?.[0]?.name || 'Loading...'}</Typography>
    )}

    {task.assignedWalker === "unassigned" ? ( // Check if the task is unassigned
      // Display the "Select" button if the user is the owner of the task
      task.ownerID === mongoDBUser._id ? (
        <Button onClick={() => handleSelectWalker(task._id, walkerId)} variant="contained" color="primary">
          Select
        </Button>
      ) : (
        // Display a message for other users who are not the owner
        <Typography variant="body2">Pending</Typography>
      )
    ) : (
      // Display icons based on the assigned walker
      <>
        {task.assignedWalker === walkerId ? (
          <CheckCircleIcon style={{ color: 'green' }} /> // Show "check" icon for the selected walker
        ) : (
          <CancelIcon style={{ color: 'red' }} /> // Show "cross" icon for other walkers
        )}
      </>
    )}
  </div>
))}


    </div>
  </Card>
))}

  </Grid>
)}



        <Grid item xs={12}>
          <Typography color='white' variant="h4" gutterBottom>
            Available Dog Care Requests
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/walker')}
          >
            Post Dog Care Request
          </Button>
        </Grid>
        {tasks.filter((task) => task.assignedWalker === "unassigned")
.map((task) => (
  <Grid item key={task._id} xs={12} sm={6} md={4}>
    <Card className="p-4 rounded-lg shadow" sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      
      {task.ownerID === mongoDBUser?._id && (
        <IconButton
          color="error"
          onClick={() => handleDeleteDialogOpen(task._id)}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <DeleteIcon />
        </IconButton>
      )}

      <div>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={2}>
            <PetsIcon fontSize="large" />
          </Grid>
          <Grid item xs={10}>
            
            <Typography variant="h6" gutterBottom>
              {formatDate(task.date)}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" gutterBottom>
          <strong>Duration:</strong> {task.duration} hours
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Number of Dogs:</strong> {task.numberOfDogs}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Dog Sizes:</strong>
          {task.sizeOfDogs.map((size) => (
            <Chip key={size} label={`${size} lbs`} variant="outlined" style={{ margin: '4px' }} />
          ))}
        </Typography>
        <Typography variant="body2">
          <strong>Owner:</strong> {owners[task.ownerID]?.name || 'Loading...'}
        </Typography>
      </div>

      <div>
     <Button
  variant="contained"
  color={task.assignedWalker === mongoDBUser._id ? "success" : task.assignedWalker === "unassigned" ? "primary" : "error"}
  fullWidth
  onClick={() => handleApply(task._id)}
  style={{ marginBottom: '10px' }}
  disabled={task.assignedWalker !== "unassigned" || task.pendingWalkers?.includes(mongoDBUser._id) || task.ownerID === mongoDBUser._id}
>
  {task.assignedWalker === mongoDBUser._id ? (
    <>
      <CheckCircleIcon style={{ color: 'green', marginRight: '5px' }} />
      Accepted
    </>
  ) : task.assignedWalker === "unassigned" ? (
    task.pendingWalkers?.includes(mongoDBUser._id) ? (
      <>
        <CheckCircleIcon style={{ color: 'green', marginRight: '5px' }} />
        Applied
      </>
    ) : task.ownerID === mongoDBUser._id ? (
      "Your Request"
    ) : (
      "Apply"
    )
  ) : (
    <>
      <CancelIcon style={{ color: 'red', marginRight: '5px' }} />
      Rejected
    </>
  )}
</Button>

  </div>
    </Card>
  </Grid>
))}

      </Grid>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
      {alert.open && (
        <Stack sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000, padding: '20px' }} spacing={2}>
          <Alert severity={alert.type} onClose={handleCloseAlert}>
            {alert.message}
          </Alert>
        </Stack>
      )}
    </ThemeProvider>
  );
}

export default Find;
