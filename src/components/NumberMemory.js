import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, LinearProgress, Link, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import statsimg from "../assets/voilet.png"

const NumberMemory = () => {
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showNumber, setShowNumber] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timerDuration, setTimerDuration] = useState(2000);

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const generateNumber = (len) => {
    let generated = '';
    for (let i = 0; i < len; i++) {
      generated += Math.floor(Math.random() * 10);
    }
    return generated;
  };

  const startTest = (currentLevel) => {
    const newNumber = generateNumber(currentLevel);
    setNumber(newNumber);
    setShowNumber(true);
    const newDuration = 2000 + (currentLevel - 1) * 700;
    setTimerDuration(newDuration);
    setProgress(100);

    let progressInterval;
    const startProgress = () => {
      const step = 100 / (newDuration / 100);
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress - step;
          if (nextProgress <= 0) {
            clearInterval(progressInterval);
            setShowNumber(false);
          }
          return nextProgress;
        });
      }, 100);
    };

    startProgress();

    setTimeout(() => {
      setShowNumber(false);
    }, newDuration);

    setTestStarted(true);
  };

  const handleSubmit = () => {
    if (userInput === number) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setUserInput('');
      startTest(nextLevel);
      setCorrect(true);
    } else {
      setTestOver(true);
      setCorrect(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!testStarted) {
        startTest(level);
      } else if (!showNumber) {
        handleSubmit();
      }
    }
  };

  const restartTest = () => {
    setLevel(1);
    setTestOver(false);
    setCorrect(true);
    setUserInput('');
    startTest(1);
  };

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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [testStarted, showNumber, userInput, number]);

  const buttonStyle = {
    backgroundColor: "#7f60d4",
    '&:hover': {
      backgroundColor: "#6a50b3"
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 5, userSelect: 'none', px: 2 }}>
      {!testOver ? (
        <>
          <Typography variant={isMobile ? "h3" : "h2"} gutterBottom>
            Number Memory
          </Typography>
          <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
            {correct ? `Level ${level}` : 'Incorrect, try again!'}
          </Typography>

          {showNumber ? (
            <>
              <Typography variant={isMobile ? "h4" : "h3"} gutterBottom sx={{ userSelect: 'none' }}>
                {number}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ width: isMobile ? '80%' : '50%', margin: '20px auto', height: 10 }}
              />
            </>
          ) : (
            <>
              {testStarted && (
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                    What was the number?
                  </Typography>
                  <TextField
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    variant="outlined"
                    placeholder="Enter the number"
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        fontSize: isMobile ? '18px' : '24px'
                      },
                      autoFocus: true
                    }}
                    sx={{ mt: 2, width: isMobile ? '80%' : 'auto' }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSubmit} sx={buttonStyle}>
                      Submit
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Test Over!
          </Typography>
          <Typography variant={isMobile ? "h6" : "h5"}>
            You reached Level {level}
          </Typography>
          <Button variant="contained" onClick={restartTest} sx={{ ...buttonStyle, mt: 2 }}>
            Restart
          </Button>
        </>
      )}

      {!showNumber && !testOver && !testStarted && (
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => startTest(level)} sx={buttonStyle}>
            Start
          </Button>
        </Box>
      )}
      <InfoSection>
        <InfoBox>
          <Typography variant="h6" gutterBottom>Statistics</Typography>
          <img src={statsimg} alt="Statistics" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} />
        </InfoBox>
        <InfoBox>
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

export default NumberMemory;
