import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, LinearProgress, Container, Grid } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { theme, infoSectionStyles, infoBoxStyles, gameButtonStyles } from './Theme';
import statsimg from "../assets/voilet.png";
import axios from 'axios';

const InfoSection = styled('div')(infoSectionStyles);
const InfoBox = styled('div')(infoBoxStyles);
const GameButton = styled(Button)(gameButtonStyles);

const LetterDisplay = styled(Typography)(({ theme }) => ({
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

const SequenceMemory = () => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showSequence, setShowSequence] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timerDuration, setTimerDuration] = useState(2000);
  const [userId, setUserId] = useState('');
  const [testResults, setTestResults] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          console.error('User data not found in localStorage');
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser._id;
        if (!userId) {
          console.error('User ID is missing in stored user data');
          return;
        }

        setUserId(userId);

        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setTestResults(response.data.testResults);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  const saveTestResults = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = response.data;

      const currentTestResults = userData.testResults || {
        reactionTime: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        sequenceMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        numberMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        verbalMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        aimTrainer: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        visualMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
      };

      const sequenceMemory = currentTestResults.sequenceMemory || {};
      const newNoOfTests = (sequenceMemory.noOfTests || 0) + 1;
      const newTotal = (sequenceMemory.total || 0) + level;
      const newMin = Math.min(sequenceMemory.min || level, level);
      const newMax = Math.max(sequenceMemory.max || level, level);
      const newAvg = newTotal / newNoOfTests;

      currentTestResults.sequenceMemory = {
        noOfTests: newNoOfTests,
        total: newTotal,
        min: newMin,
        max: newMax,
        avg: newAvg,
      };

      await axios.patch(`http://localhost:5000/users/${userId}`, {
        testResults: currentTestResults,
      });

      console.log('Test results saved successfully');
    } catch (error) {
      console.error('Error saving test results:', error);
    }
  };
  const generateRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    return letters.charAt(Math.floor(Math.random() * letters.length));
  };

  const startTest = (currentLevel) => {
    const newSequence = [...sequence, generateRandomLetter()];
    setSequence(newSequence);
    setShowSequence(true);
    const newDuration = 1500  ;
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
            setShowSequence(false);
          }
          return nextProgress;
        });
      }, 100);
    };

    startProgress();

    setTimeout(() => {
      setShowSequence(false);
    }, newDuration);

    setTestStarted(true);
  };

  const handleSubmit = () => {
    if (userInput === sequence.join('')) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setUserInput('');
      startTest(nextLevel);
      setCorrect(true);
    } else {
      saveTestResults();
      setTestOver(true);
      setCorrect(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!testStarted) {
        startTest(level);
      } else if (!showSequence) {
        handleSubmit();
      }
    }
  };

  const restartTest = () => {
    setLevel(1);
    setSequence([]);
    setTestOver(false);
    setCorrect(true);
    setUserInput('');
    startTest(1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [testStarted, showSequence, userInput, sequence]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="sm">
          <Box>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              {!testOver ? (
                <>
                  <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                    Sequence Memory
                  </Typography>
                  <LevelDisplay variant="h6" gutterBottom>
                    {correct ? `Level ${level}` : 'Incorrect, try again!'}
                  </LevelDisplay>

                  {showSequence ? (
                    <>
                      <LetterDisplay variant="h3" gutterBottom>
                      {sequence[sequence.length - 1]}
                      </LetterDisplay>
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
                              What was the sequence?
                            </Typography>
                          </Grid>
                          <Grid item>
                            <TextField
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              variant="outlined"
                              placeholder="Enter the sequence"
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

              {!showSequence && !testOver && !testStarted && (
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
              This test helps improve memory by challenging you to remember and correctly input a sequence of letters. The sequence length increases with each level.
            </Typography>
          </InfoBox>
        </InfoSection>
      </Box>
    </ThemeProvider>
  );
};

export default SequenceMemory;
