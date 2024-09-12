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

function VisualMemoryTest() {
  const [grid, setGrid] = useState(Array(9).fill(false));
  const [highlighted, setHighlighted] = useState([]);
  const [stage, setStage] = useState('ready'); // 'ready', 'memorizing', 'input'

  const generateGrid = () => {
    const newGrid = [...grid];
    const indices = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
    indices.forEach((index) => {
      newGrid[index] = true;
    });
    setHighlighted(indices);
    setGrid(newGrid);
    setStage('memorizing');
    setTimeout(() => {
      setGrid(Array(9).fill(false));
      setStage('input');
    }, 2000); // Show for 2 seconds
  };

  const checkAnswer = (index) => {
    if (highlighted.includes(index)) {
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
    setStage('ready');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Visual Memory Test</h2>
      {stage === 'ready' ? (
        <Button variant="contained" onClick={generateGrid}>Start Test</Button>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
          {grid.map((active, index) => (
            <div
              key={index}
              onClick={() => stage === 'input' && checkAnswer(index)}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: active ? 'blue' : 'grey',
              }}
            />
          ))}
        </div>
      )}
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
    </div>
  );
}

export default VisualMemoryTest;
