import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, LinearProgress, Container, Grid, useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from '@mui/material';
import statsimg from "../assets/voilet.png";

// Custom theme with purple palette (same as VerbalMemory)
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



const GameButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 4),
  borderRadius: 25,
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(127, 96, 212, 0.2)',
  },
}));

const NumberDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  userSelect: 'none',
}));

const LevelDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(2),
}));

const InfoSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
}));

const InfoBox = styled('div')(({ theme }) => ({
  display: "block",
  width: '90%',
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '500px',
  },
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '20px 0',
  [theme.breakpoints.up('md')]: {
    margin: '0 20px',
  },
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
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="sm">
          <Box>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              {!testOver ? (
                <>
                  <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                    Number Memory
                  </Typography>
                  <LevelDisplay variant="h6" gutterBottom>
                    {correct ? `Level ${level}` : 'Incorrect, try again!'}
                  </LevelDisplay>

                  {showNumber ? (
                    <>
                      <NumberDisplay variant="h3" gutterBottom>
                        {number}
                      </NumberDisplay>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ width: '80%', margin: '20px auto', height: 10 }}
                      />
                    </>
                  ) : (
                    <>
                      {testStarted && (
                        <Grid container direction="column" spacing={2}>
                          <Grid item>
                            <Typography variant="h5" gutterBottom>
                              What was the number?
                            </Typography>
                          </Grid>
                          <Grid item>
                            <TextField
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              variant="outlined"
                              placeholder="Enter the number"
                              inputProps={{
                                style: { textAlign: 'center', fontSize: '24px' },
                                autoFocus: true
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <GameButton variant="contained" color="primary" onClick={handleSubmit}>
                              Submit
                            </GameButton>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                    Test Over!
                  </Typography>
                  <Typography variant="h5">
                    You reached Level {level}
                  </Typography>
                  <GameButton variant="contained" color="primary" onClick={restartTest} sx={{ mt: 2 }}>
                    Restart
                  </GameButton>
                </>
              )}

              {!showNumber && !testOver && !testStarted && (
                <GameButton variant="contained" color="primary" onClick={() => startTest(level)} size="large">
                  Start Game
                </GameButton>
              )}
            </Box>
          </Box>
        </Container>

        <InfoSection sx={{ marginTop: '210px' }}>
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
              <Link href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
                Katapayadi system
              </Link>
            </Typography>
            <Typography component="div">
              <Link href="https://en.wikipedia.org/wiki/Mnemonic_major_system" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
                Mnemonic major system
              </Link>
            </Typography>
            <Typography component="div">
              <Link href="https://en.wikipedia.org/wiki/Dominic_system" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
                Dominic system
              </Link>
            </Typography>
          </InfoBox>
        </InfoSection>
      </Box>
    </ThemeProvider>
  );
};

export default NumberMemory;
