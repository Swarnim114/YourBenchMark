import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Container, Link, LinearProgress } from '@mui/material';
import { styled, ThemeProvider, keyframes } from '@mui/material/styles';
import { theme } from './Theme';
import { infoSectionStyles, infoBoxStyles, gameButtonStyles } from './Theme';
import statsimg from "../assets/voilet.png";

const InfoSection = styled('div')(infoSectionStyles);
const InfoBox = styled('div')(infoBoxStyles);
const GameButton = styled(Button)(gameButtonStyles);

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const GameArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '45vw',
  height: '30vh',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '16px',
  border: `4px solid ${theme.palette.primary.main}`,
  margin: '20px auto',
  overflow: 'hidden',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  [theme.breakpoints.down('md')]: {
    width: '65vw',
    height: '35vh',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80vw',
    height: '40vh',
  },
}));

const Circle = styled(Button)(({ theme, top, left }) => ({
  position: 'absolute',
  top: top,
  left: left,
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  animation: `${pulse} 1.5s infinite`,
  [theme.breakpoints.down('md')]: {
    width: '40px',
    height: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '30px',
    height: '30px',
  },
}));

const AimTrainer = () => {
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [circleCount, setCircleCount] = useState(0);
  const [positions, setPositions] = useState({ top: 0, left: 0 });
  const [testOver, setTestOver] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const targetCount = 20;
  const gameAreaRef = useRef(null);

  const getRandomPosition = () => {
    if (!gameAreaRef.current) return { top: '0px', left: '0px' };

    const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
    const gameAreaWidth = gameAreaRect.width;
    const gameAreaHeight = gameAreaRect.height;

    const circleWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--circle-size'), 10) || 50;
    const circleHeight = circleWidth;

    const maxX = gameAreaWidth - circleWidth;
    const maxY = gameAreaHeight - circleHeight;

    const left = Math.floor(Math.random() * maxX) + 'px';
    const top = Math.floor(Math.random() * maxY) + 'px';

    return { top, left };
  };

  const handleCircleClick = () => {
    const clickTime = Date.now() - startTime;
    setTotalTime((prevTotal) => prevTotal + clickTime);
    setCircleCount((prevCount) => prevCount + 1);
    if (circleCount + 1 === targetCount) {
      setTestOver(true);
    } else {
      setPositions(getRandomPosition());
      setStartTime(Date.now());
    }
  };

  const startTest = () => {
    setTestStarted(true);
    setTestOver(false);
    setCircleCount(0);
    setTotalTime(0);
    setPositions(getRandomPosition());
    setStartTime(Date.now());
  };

  const restartTest = () => {
    startTest();
  };

  useEffect(() => {
    const handleResize = () => {
      if (testStarted && !testOver) {
        setPositions(getRandomPosition());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testStarted, testOver]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h2" gutterBottom fontWeight="bold" color="primary" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              Aim Trainer
            </Typography>
            {!testOver ? (
              <>
                {testStarted ? (
                  <>
                    <Typography variant="h5" gutterBottom color="text.secondary">
                      Targets Hit: {circleCount} / {targetCount}
                    </Typography>
                    <LinearProgress variant="determinate" value={(circleCount / targetCount) * 100} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                    <GameArea ref={gameAreaRef}>
                      <Circle
                        top={positions.top}
                        left={positions.left}
                        onClick={handleCircleClick}
                      />
                    </GameArea>
                  </>
                ) : (
                  <GameButton variant="contained" color="primary" onClick={startTest}>
                    Start Game
                  </GameButton>
                )}
              </>
            ) : (
              <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 4, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                  Test Completed!
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                  Average Time: {(totalTime / targetCount).toFixed(2)} ms
                </Typography>
                <GameButton variant="contained" color="secondary" onClick={restartTest}>
                  Play Again
                </GameButton>
              </Box>
            )}
          </Box>
        </Container>
        <InfoSection>
          <InfoBox>
            <Typography variant="h6" gutterBottom>Statistics</Typography>
            <img src={statsimg} alt="Statistics" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
          </InfoBox>
          <InfoBox sx={{ minHeight: { xs: '200px', sm: '400px' } }}>
            <Typography variant="h6" gutterBottom>About the test</Typography>
            <Typography paragraph>
              The average person can only remember 7 digit numbers reliably, but it's possible to do much better using mnemonic techniques. Some helpful links are provided below.
            </Typography>
            <Typography component="div">
              <Link href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                Katapayadi system
              </Link>
            </Typography>
            <Typography component="div">
              <Link href="https://en.wikipedia.org/wiki/Mnemonic_major_system" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                Mnemonic major system
              </Link>
            </Typography>
            <Typography component="div">
              <Link href="https://en.wikipedia.org/wiki/Dominic_system" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                Dominic system
              </Link>
            </Typography>
          </InfoBox>
        </InfoSection>
      </Box>
    </ThemeProvider>
  );
};

export default AimTrainer;
