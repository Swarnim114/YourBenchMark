import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Fade } from '@mui/material';
import VanillaTilt from 'vanilla-tilt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MemoryIcon from '@mui/icons-material/Memory';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewListIcon from '@mui/icons-material/ViewList'; // For SequenceMemory
import NumbersIcon from '@mui/icons-material/Numbers'; // For NumberMemory
import TextFieldsIcon from '@mui/icons-material/TextFields'; // For VerbalMemory

const HomeContainer = styled(Box)(({ theme }) => ({

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(6),
  minHeight: '80vh',
  backgroundColor: theme.palette.background.default,
}));

const ButtonGrid = styled(Grid)(({ theme }) => ({
  width: '80%',
  marginTop: theme.spacing(4),
}));

const SquareButton = styled(Button)(({ theme }) => ({
    width:  400, // Enlarged buttons
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.palette.common.white,
    backgroundColor: "#7f60d4",
    borderRadius: theme.shape.borderRadius * 3, // More rounded edges
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
    },
  }));

const Home = () => {
  const tiltRefs = useRef([]);

  useEffect(() => {
    // Initialize Vanilla Tilt for each button
    tiltRefs.current.forEach(ref => {
      if (ref) {
        VanillaTilt.init(ref, {
          max: 10,
          speed: 200,
          glare: true,
          'max-glare': 0.3,
        });
      }
    });
    return () => {
      // Clean up VanillaTilt instances on unmount
      tiltRefs.current.forEach(ref => ref && ref.vanillaTilt && ref.vanillaTilt.destroy());
    };
  }, []);

  return (
    <HomeContainer>
      <Fade in={true} timeout={1000}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Human Benchmark
        </Typography>
      </Fade>
      <ButtonGrid container spacing={4} justifyContent="center">
        <Grid item>
          <Fade in={true} timeout={1200}>
            <SquareButton ref={el => (tiltRefs.current[0] = el)} component={Link} to="/reaction-time">
              <AccessTimeIcon fontSize="large" />
              <Typography variant="button" mt={1}>
                Reaction Time
              </Typography>
            </SquareButton>
          </Fade>
        </Grid>
        <Grid item>
          <Fade in={true} timeout={1400}>
            <SquareButton ref={el => (tiltRefs.current[1] = el)} component={Link} to="/sequence-memory">
              <ViewListIcon fontSize="large" />
              <Typography variant="button" mt={1}>
                Sequence Memory
              </Typography>
            </SquareButton>
          </Fade>
        </Grid>
        <Grid item>
          <Fade in={true} timeout={1600}>
            <SquareButton ref={el => (tiltRefs.current[2] = el)} component={Link} to="/number-memory">
              <NumbersIcon fontSize="large" />
              <Typography variant="button" mt={1}>
                Number Memory
              </Typography>
            </SquareButton>
          </Fade>
        </Grid>
        <Grid item>
          <Fade in={true} timeout={1800}>
            <SquareButton ref={el => (tiltRefs.current[3] = el)} component={Link} to="/verbal-memory">
              <TextFieldsIcon fontSize="large" />
              <Typography variant="button" mt={1}>
                Verbal Memory
              </Typography>
            </SquareButton>
          </Fade>
        </Grid>
        <Grid item>
          <Fade in={true} timeout={2000}>
            <SquareButton ref={el => (tiltRefs.current[4] = el)} component={Link} to="/typing-test">
              <KeyboardIcon fontSize="large" />
              <Typography variant="button" mt={1}>
                Typing Test
              </Typography>
            </SquareButton>
          </Fade>
        </Grid>
        <Grid item>
          <Fade in={true} timeout={2200}>
            <SquareButton ref={el => (tiltRefs.current[5] = el)} component={Link} to="/visual-memory-test">
              <VisibilityIcon fontSize="large" />
              <Typography variant="button" mt={1}>
                Visual Memory Test
              </Typography>
            </SquareButton>
          </Fade>
        </Grid>
      </ButtonGrid>
    </HomeContainer>
  );
};

export default Home;
