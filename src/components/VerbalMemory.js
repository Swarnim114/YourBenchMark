import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Container, Grid } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from '@mui/material'; // Import Link from MUI
import statsimg from "../assets/voilet.png"
// Custom theme with purple palette
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(127, 96, 212, 0.1)',
  background: 'linear-gradient(145deg, #ffffff, #f8f6ff)',
  border: 'none',
}));

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

const WordDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
}));

const ScoreDisplay = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(2),
}));

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
