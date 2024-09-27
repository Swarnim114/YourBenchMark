import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Grid, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7f60d4',
    },
    secondary: {
      main: '#5e45a0',
    },
    background: {
      default: '#f5f3ff',
      paper: '#ffffff',
    },
  },
});



const AboutUser = () => {
  const [userResults, setUserResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('User data not found in localStorage');
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser._id;
        if (!userId) {
          setError('User ID is missing in stored user data');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUserResults(response.data);
      } catch (error) {
        setError('Error fetching user data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };


  const handleDeleteData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('User data not found in localStorage');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      const response = await axios.delete(`http://localhost:5000/users/${userId}`);

      if (response.status === 200) {
        localStorage.removeItem('user');
        localStorage.removeItem('key');
        window.location.href = '/login'; // Redirect to login page after deletion
      } else {
        setError('Failed to delete user. Server responded with status: ' + response.status);
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      setError('Error deleting user data: ' + (error.response?.data?.message || error.message));
    }
  };  

  const ResultSection = ({ title, data, unit }) => (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        {title} Results
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1">
          <strong>Number of Tests:</strong> {data?.noOfTests || 0}
        </Typography>
        <Typography variant="body1">
          <strong>Minimum {unit}:</strong> {data?.min || 0} {unit}
        </Typography>
        <Typography variant="body1">
          <strong>Maximum {unit}:</strong> {data?.max || 0} {unit}
        </Typography>
        <Typography variant="body1">
          <strong>Average {unit}:</strong> {data?.avg || 0} {unit}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
        maxWidth={false}
      >
        <Container maxWidth="md">
          {/* User info and Logout button */}
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h3" sx={{ color: theme.palette.primary.main }} gutterBottom>
                  Name: {userResults?.name || 'N/A'}
                </Typography>
                <Typography variant="body1">Email: {userResults?.email || 'N/A'}</Typography>
              </Box>

              <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
                <Button sx={{ marginBottom: 2 }} variant="outlined" color="primary" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDeleteData}>
                  Delete All Data
                </Button>
              </Box>

            </Box>

            {/* Delete All Data button */}

          </Paper>

          {/* Display test results */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ResultSection title="Aim Trainer" data={userResults?.testResults?.aimTrainer} unit="ms" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ResultSection title="Reaction Time" data={userResults?.testResults?.reactionTime} unit="ms" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ResultSection title="Number Memory" data={userResults?.testResults?.numberMemory} unit="level" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ResultSection title="Verbal Memory" data={userResults?.testResults?.verbalMemory} unit="words" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ResultSection title="Visual Memory" data={userResults?.testResults?.visualMemory} unit="level" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ResultSection title="Sequence Memory" data={userResults?.testResults?.sequenceMemory} unit="level" />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default AboutUser;
