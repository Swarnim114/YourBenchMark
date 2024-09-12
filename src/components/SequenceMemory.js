import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, LinearProgress, Container, Grid, useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from '@mui/material';
import statsimg from "../assets/voilet.png";


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
const isTablet = window.innerWidth <= 768; // Define the 'isTablet' variable based on the window width
const isMobile = window.innerWidth <= 480; // Define the 'isMobile' variable based on the window width
const InfoSection = styled('div')({
  display: 'flex',
  flexDirection: isTablet ? 'column' : 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
});

const InfoBox = styled('div')(({ theme }) => ({
  display: "block",
  width: isMobile ? '90%' : isTablet ? '80%' : '500px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: isTablet ? '20px 0' : '0 20px',
  textAlign: 'left',
  transition: 'transform 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#e5d6f9",
    borderRadius: '8px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const SequenceMemory = () => {
  const [sequence, setSequence] = useState([Math.floor(Math.random() * 4)]); // Sample sequence

  const generateNextInSequence = () => {
    setSequence([...sequence, Math.floor(Math.random() * 4)]);
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4">Sequence Memory Test</Typography>
      <Box sx={{ marginTop: '20px' }}>
        {sequence.map((num, index) => (
          <Typography key={index} variant="h6">
            {num}
          </Typography>
        ))}
      </Box>
      <Button variant="contained" onClick={generateNextInSequence} sx={{ marginTop: '20px' }}>
        Next in Sequence
      </Button>
      <InfoSection>
        <InfoBox>
          <Typography variant="h6" gutterBottom>Statistics</Typography>
          <img src={statsimg} alt="Statistics" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} />
        </InfoBox>
        <InfoBox sx={{minHeight: '400px '}}>
          <Typography variant="h6" gutterBottom>About the test</Typography>
          <Typography paragraph>
            The average person can only remember 7 digit numbers reliably, but it's possible to do much better using mnemonic techniques. Some helpful links are provided below.
          </Typography>
          <Typography component="div">
            <Link style={{ color: '#7f60d4' }} href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank" rel="noopener noreferrer">
              Katapayadi system
            </Link>
          </Typography>
          <Typography component="div">
            <Link style={{ color: '#7f60d4' }} href="https://en.wikipedia.org/wiki/Mnemonic_major_system" target="_blank" rel="noopener noreferrer">
              Mnemonic major system
            </Link>
          </Typography>
          <Typography component="div">
            <Link style={{ color: '#7f60d4' }} href="https://en.wikipedia.org/wiki/Dominic_system" target="_blank" rel="noopener noreferrer">
              Dominic system
            </Link>
          </Typography>
          <Typography component="div">
            <Link style={{ color: '#7f60d4' }} href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank" rel="noopener noreferrer">
              Katapayadi system
            </Link>
          </Typography>
        </InfoBox>
      </InfoSection>
    </Box>
  );
};

export default SequenceMemory;
