// src/components/VerbalMemory.js
import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Container, Grid, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import statsimg from "../assets/voilet.png";
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
    'hydrogen', 'oxygen', 'carbon', 'nitrogen', 'helium', 'neon', 'argon', 'krypton', 'xenon', 'radon',
    'sodium', 'potassium', 'calcium', 'magnesium', 'chlorine', 'fluorine', 'iodine', 'bromine', 'phosphorus', 'sulfur',
    'heart', 'brain', 'lung', 'liver', 'kidney', 'stomach', 'intestine', 'muscle', 'bone', 'skin',
    'hair', 'nail', 'tooth', 'eye', 'ear', 'nose', 'mouth', 'tongue', 'finger', 'toe',
    'arm', 'leg', 'hand', 'foot', 'head', 'neck', 'shoulder', 'elbow', 'wrist', 'knee',
    'ankle', 'hip', 'chest', 'back', 'face', 'forehead', 'chin', 'cheek', 'lip', 'eyebrow',
    'eyelash', 'mustache', 'beard', 'sideburn', 'dimple', 'wrinkle', 'freckle', 'mole', 'scar', 'tattoo',
    'ring', 'necklace', 'bracelet', 'earring', 'brooch', 'pendant', 'tiara', 'crown', 'scepter', 'throne',
    'castle', 'palace', 'tower', 'bridge', 'road', 'street', 'avenue', 'boulevard', 'alley', 'highway',
    'railway', 'subway', 'airport', 'harbor', 'station', 'hotel', 'restaurant', 'cafe', 'bar', 'pub'
  ];

  const generateWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
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
      setGameOver(true);
    } else {
      setOldWords([...oldWords, word]);
      setWord(generateWord());
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleOld = () => {
    if (!oldWords.includes(word)) {
      setGameOver(true);
    } else {
      setOldWords([...oldWords, word]);
      setWord(generateWord());
      setScore(prevScore => prevScore + 1);
    }
  };

  return (
    <ThemeProvider theme={theme } >
      <Box  sx={{ bgcolor: 'background.default' , minHeight: '100vh'}}>

      <Box sx={{ bgcolor: 'background.default', minHeight: '40vh', py: 4 }}>
        <Container maxWidth="sm">
          <Box>
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
          </Box>
        </Container>
      </Box>

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
    </ThemeProvider>

  );
};






export default VerbalMemory;
