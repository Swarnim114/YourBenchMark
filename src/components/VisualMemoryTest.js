import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [level, setLevel] = useState(1); // Starting at level 1
  const [gridSize, setGridSize] = useState(3); // Default to 3x3 grid
  const [grid, setGrid] = useState(Array(gridSize * gridSize).fill(false));
  const [highlighted, setHighlighted] = useState([]); // Store highlighted squares
  const [stage, setStage] = useState('start'); // 'start', 'memorizing', 'input', 'failed'
  const [correctSelections, setCorrectSelections] = useState([]); // User selections
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Adjust grid size based on the level
    if (level >= 1 && level <= 3) {
      setGridSize(3); // 3x3 grid
    } else if (level >= 4 && level <= 8) {
      setGridSize(4); // 4x4 grid
    } else if (level >= 9 && level <= 15) {
      setGridSize(5); // 5x5 grid
    } else {
      setGridSize(6); // 6x6 grid for levels above 15
    }
  }, [level]);

  useEffect(() => {
    // Reset the grid whenever the level or gridSize changes
    setGrid(Array(gridSize * gridSize).fill(false));
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
        newHighlighted.push(randomIndex); // No duplicate indices
      }
    }
    setHighlighted(newHighlighted);
    setGrid((prevGrid) =>
      prevGrid.map((_, index) => newHighlighted.includes(index))
    );
    setTimeout(() => {
      setGrid(Array(gridSize * gridSize).fill(false));
      setStage('input');
    }, 2000);
  };

  const handleSquareClick = (index) => {
    if (stage === 'input') {
      const isCorrect = highlighted.includes(index);
      setCorrectSelections([...correctSelections, index]);
      setGrid((prevGrid) =>
        prevGrid.map((val, i) => (i === index ? isCorrect : val))
      );
    }
  };

  useEffect(() => {
    // Check if all selections have been made and validate
    if (stage === 'input' && correctSelections.length === highlighted.length) {
      const isCorrect = highlighted.every((index) =>
        correctSelections.includes(index)
      );
      if (isCorrect) {
        setMessage('Correct! Moving to next level.');
        setTimeout(() => {
          setLevel((prevLevel) => prevLevel + 1); // Move to next level
          setCorrectSelections([]);
          setHighlighted([]);
          setMessage('');
          setStage('memorizing'); // Automatically start the next level
        }, 1000);
      } else {
        setMessage('Incorrect! Try again.');
        setTimeout(() => {
          setStage('failed'); // Show "Play Again" button on failure
        }, 1000);
      }
    }
  }, [correctSelections, highlighted, stage]);

  useEffect(() => {
    // Automatically start the game if in memorizing stage
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
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ backgroundColor: theme.palette.background.default, padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Visual Memory Test - Level {level}
        </Typography>
        {message && (
          <Typography variant="h6" gutterBottom color="secondary">
            {message}
          </Typography>
        )}
        {stage === 'start' && (
          <Button variant="contained" color="primary" onClick={startGame}>
            Start Game
          </Button>
        )}
        {stage === 'failed' && (
          <Button variant="contained" color="secondary" onClick={resetGame}>
            Play Again
          </Button>
        )}
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {grid.map((square, index) => (
            <Grid item key={index} xs={12 / gridSize}>
              <Box
                sx={{
                  width: '100%',
                  height: '100px',
                  backgroundColor: square ? theme.palette.secondary.main : theme.palette.primary.main,
                  cursor: 'pointer',
                }}
                onClick={() => handleSquareClick(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default VisualMemoryTest;
