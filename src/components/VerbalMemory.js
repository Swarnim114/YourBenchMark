import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Grid, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import statsimg from "../assets/voilet.png";
import axios from 'axios';
import { theme, infoSectionStyles, infoBoxStyles, gameButtonStyles, wordDisplayStyles, scoreDisplayStyles } from './Theme';

const InfoSection = styled('div')(infoSectionStyles);
const InfoBox = styled('div')(infoBoxStyles);
const GameButton = styled(Button)(gameButtonStyles);
const WordDisplay = styled(Typography)(wordDisplayStyles);
const ScoreDisplay = styled(Typography)(scoreDisplayStyles);

const VerbalMemory = () => {
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState('');
  const [oldWords, setOldWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState('');
  const [testResults, setTestResults] = useState([]);

  const wordList = [
    'apple', 'banana', 'grape', 'orange', 'pineapple', 'dog', 'cat', 'mouse', 'elephant', 'giraffe',
    'house', 'car', 'tree', 'flower', 'book', 'computer', 'phone', 'table', 'chair', 'window',
    'door', 'pencil', 'pen', 'notebook', 'backpack', 'shoe', 'shirt', 'pants', 'hat', 'glasses',
    'watch', 'clock', 'lamp', 'picture', 'painting', 'television', 'radio', 'camera', 'guitar', 'piano',
    'drum', 'violin', 'flute', 'trumpet', 'saxophone', 'mountain', 'river', 'ocean', 'lake', 'forest',
    'desert', 'island', 'beach', 'sun', 'moon', 'star', 'planet', 'galaxy', 'universe', 'cloud',
    'rain', 'snow', 'wind', 'thunder', 'lightning', 'rainbow', 'fire', 'water', 'earth', 'air',
    'metal', 'wood', 'plastic', 'glass', 'paper', 'cotton', 'silk', 'leather', 'rubber', 'stone',
    'diamond', 'gold', 'silver', 'bronze', 'iron', 'steel', 'copper', 'aluminum', 'titanium', 'platinum',
    'hydrogen', 'oxygen', 'carbon', 'nitrogen', 'helium', 'neon', 'argon', 'krypton', 'xenon', 'radon'
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
          console.error('User data not found in localStorage');
          return;
        }

        // Parse the stored user object
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser._id;

        if (!userId) {
          console.error('User ID is missing in stored user data');
          return;
        }

        setUserId(userId);

        // Update the URL to point to your backend
        const response = await axios.get(`https://yourbenchmark.onrender.com/users/${userId}`);
        setTestResults(response.data.testResults);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const generateWord = () => {
    const repetitionProbability = 0.4;
    let newWord;


    if (oldWords.length > 0 && Math.random() < repetitionProbability) {

      do {
        const randomIndex = Math.floor(Math.random() * oldWords.length);
        newWord = oldWords[randomIndex];
      } while (newWord === word); // Avoid consecutive same words
    } else {
      // Generate a completely new word
      do {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        newWord = wordList[randomIndex];
      } while (newWord === word); // Ensure no consecutive same words
    }

    return newWord;
  };



  const startGame = () => {
    setStarted(true);
    setGameOver(false);
    setWord(generateWord());
    setOldWords([]);
    setScore(0);
  };

  const handleNew = () => {
    if (oldWords.includes(word)) {
      endGame();
    } else {
      setOldWords([...oldWords, word]);
      setWord(generateWord());
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleOld = () => {
    if (!oldWords.includes(word)) {
      endGame();
    } else {
      setOldWords([...oldWords, word]);
      setWord(generateWord());
      setScore(prevScore => prevScore + 1);
    }
  };

  const endGame = () => {
    setGameOver(true);
    saveTestResults();
  };

  const saveTestResults = async () => {
    try {
      const response = await axios.get(`https://yourbenchmark.onrender.com/users/${userId}`);
      const userData = response.data;

      // Ensure testResults exists, including all test types
      const currentTestResults = userData.testResults || {
        reactionTime: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        sequenceMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        numberMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        verbalMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 }, // Include verbalMemory here
        aimTrainer: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
        visualMemory: { noOfTests: 0, total: 0, min: 0, max: 0, avg: 0 },
      };

      // Update the verbalMemory test results
      const verbalMemory = currentTestResults.verbalMemory || {}; // Safeguard to ensure verbalMemory is not undefined
      const newNoOfTests = (verbalMemory.noOfTests || 0) + 1;
      const newTotal = (verbalMemory.total || 0) + score;
      const newMin = Math.min(verbalMemory.min || score, score);
      const newMax = Math.max(verbalMemory.max || score, score);
      const newAvg = newTotal / newNoOfTests;

      currentTestResults.verbalMemory = {
        noOfTests: newNoOfTests,
        total: newTotal,
        min: newMin,
        max: newMax,
        avg: newAvg,
      };

      // Send updated testResults back to the server
      await axios.patch(`https://yourbenchmark.onrender.com/users/${userId}`, {
        testResults: currentTestResults,
      });

      console.log('Test results saved successfully');
    } catch (error) {
      console.error('Error saving test results:', error);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '40vh', py: 4 }}>
          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', py: 4 }}>
              {!started && !gameOver && (
                <>
                  <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                    Verbal Memory Game
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                    Test your verbal memory skills. Click start to begin!
                  </Typography>
                  <GameButton variant="contained" color="primary" onClick={startGame} size="large">
                    Start Game
                  </GameButton>
                </>
              )}
              {(started || gameOver) && (
                <Grid container direction="column" spacing={2}>
                  {!gameOver && (
                    <>
                      <Grid item>
                        <WordDisplay variant="h2">{word}</WordDisplay>
                      </Grid>
                      <Grid item>
                        <GameButton variant="contained" color="primary" onClick={handleNew}>
                          New
                        </GameButton>
                        <GameButton variant="contained" color="secondary" onClick={handleOld}>
                          Seen
                        </GameButton>
                      </Grid>
                    </>
                  )}
                  {gameOver && (
                    <>
                      <Grid item>
                        <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                          Game Over
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" gutterBottom>
                          Your final score: {score}
                        </Typography>
                      </Grid>
                    </>
                  )}
                  <Grid item>
                    <ScoreDisplay variant="h6">Score: {score}</ScoreDisplay>
                  </Grid>
                  {gameOver && (
                    <Grid item>
                      <GameButton variant="contained" color="primary" onClick={startGame}>
                        Play Again
                      </GameButton>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Container>
        </Box>

        <InfoSection>
          <InfoBox>
            <Typography variant="h6" gutterBottom>Statistics</Typography>
            <img src={statsimg} alt="Statistics" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} />
          </InfoBox>
          <InfoBox sx={{minHeight: '400px'}}>
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
          </InfoBox>
        </InfoSection>
      </Box>
    </ThemeProvider>
  );
};

export default VerbalMemory;
