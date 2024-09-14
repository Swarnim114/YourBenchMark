import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Container, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import correctSound from '../assets/sounds/correct.mp3';
import incorrectSound from '../assets/sounds/incorrect.mp3';
import statsimg from "../assets/voilet.png";
import { infoSectionStyles, infoBoxStyles, gameButtonStyles } from './Theme';

const InfoSection = styled('div')(infoSectionStyles);
const InfoBox = styled('div')(infoBoxStyles);
const GameButton = styled(Button)(gameButtonStyles);

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

function VisualMemoryTest() {
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState(Array(9).fill(false));
  const [highlighted, setHighlighted] = useState([]);
  const [stage, setStage] = useState('start');
  const [correctSelections, setCorrectSelections] = useState([]);
  const [message, setMessage] = useState('');
  const [flipStatus, setFlipStatus] = useState('');
  const gridContainerRef = useRef(null);

  useEffect(() => {
    if (level >= 1 && level <= 3) {
      setGridSize(3);
    } else if (level >= 4 && level <= 8) {
      setGridSize(4);
    } else if (level >= 9 && level <= 15) {
      setGridSize(5);
    } else {
      setGridSize(6);
    }
  }, [level]);

  useEffect(() => {
    setGrid(Array(gridSize * gridSize).fill(false));
    setHighlighted([]);
    setCorrectSelections([]);
    setFlipStatus('');
  }, [gridSize]);

  const startGame = () => {
    setStage('memorizing');
    generateHighlightedSquares();
  };

  const generateHighlightedSquares = () => {
    const newHighlighted = [];
    while (newHighlighted.length < level) {
      const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
      if (!newHighlighted.includes(randomIndex)) {
        newHighlighted.push(randomIndex);
      }
    }
    setHighlighted(newHighlighted);
    setGrid((prevGrid) =>
      prevGrid.map((_, index) => newHighlighted.includes(index))
    );
    setFlipStatus('flip');
    setTimeout(() => {
      setGrid(Array(gridSize * gridSize).fill(false));
      setStage('input');
      setFlipStatus('');
    }, 2000);
  };

  const handleSquareClick = (index) => {
    if (stage === 'input') {
      const isCorrect = highlighted.includes(index);
      const audio = new Audio(isCorrect ? correctSound : incorrectSound);
      audio.play();

      setGrid((prevGrid) =>
        prevGrid.map((val, i) => (i === index ? isCorrect : val))
      );
      setCorrectSelections([...correctSelections, index]);

      setTimeout(() => {
        setGrid((prevGrid) =>
          prevGrid.map((val, i) => (i === index ? false : val))
        );
      }, 500);
    }
  };

  useEffect(() => {
    if (stage === 'input' && correctSelections.length === highlighted.length) {
      const isCorrect = highlighted.every((index) =>
        correctSelections.includes(index)
      );
      if (isCorrect) {
        setMessage('Correct! Moving to next level.');
        setTimeout(() => {
          setLevel((prevLevel) => prevLevel + 1);
          setCorrectSelections([]);
          setHighlighted([]);
          setMessage('');
          setStage('memorizing');
        }, 1000);
      } else {
        setMessage('Incorrect! Try again.');
        setTimeout(() => {
          setStage('failed');
        }, 1000);
      }
    }
  }, [correctSelections, highlighted, stage]);

  useEffect(() => {
    if (stage === 'memorizing' && !highlighted.length) {
      generateHighlightedSquares();
    }
  }, [stage, highlighted]);

  const resetGame = () => {
    setLevel(1);
    setCorrectSelections([]);
    setHighlighted([]);
    setMessage('');
    setStage('start');
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.default, }}>
      <ThemeProvider theme={theme} >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: { xs: '15px', sm: '25px' },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '40vh',
          margin: '0 auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Visual Memory Test - Level {level}
        </Typography>

        <Box sx={{ height: '80px', mb: 2 }}>
          {message && (
            <Typography
              variant="h6"
              color="secondary"
              sx={{ mb: 2 }}
            >
              {message}
            </Typography>
          )}

          {stage === 'start' && (
            <GameButton variant="contained" color="primary" onClick={startGame}>
              Start Game
            </GameButton>
          )}
          {stage === 'failed' && (
            <GameButton variant="contained" color="secondary" onClick={resetGame}>
              Play Again
            </GameButton>
          )}
        </Box>

        <Box
          ref={gridContainerRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: { xs: '5px', sm: '10px' },
            width: '80%',
            aspectRatio: '1',
            margin: '0 auto',
            justifyContent: 'center',
          }}
        >
          {grid.map((square, index) => (
            <Box
              key={index}
              sx={{
                aspectRatio: '1',
                backgroundColor: square ? '#d4eaad' : theme.palette.primary.main,
                cursor: 'pointer',
                transition: 'background-color 0.5s ease, transform 0.2s ease',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: square ? '#888' : theme.palette.primary.light,
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => handleSquareClick(index)}
            />
          ))}
        </Box>
      </Container>
      <InfoSection  >
        <InfoBox>
          <Typography variant="h6" gutterBottom>Statistics</Typography>
          <img src={statsimg} alt="Statistics" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} />
        </InfoBox>
        <InfoBox sx={{ minHeight: { xs: '200px', sm: '400px' } }}>
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
    </ThemeProvider>
    </div>
  );
}

export default VisualMemoryTest;
