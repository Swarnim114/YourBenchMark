import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Fade } from '@mui/material';
import VanillaTilt from 'vanilla-tilt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ViewListIcon from '@mui/icons-material/ViewList';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';

const HomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  minHeight: '100vh',
  backgroundColor: '#f5f3ff',
  maxWidth: '100%',
}));

const ButtonGrid = styled(Grid)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(4),
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center', // Ensure the grid is centered horizontally
  alignItems: 'center', // Ensure the grid is centered vertically (optional)
  gap: theme.spacing(3), // Adjust the gap between the buttons
}));
const SquareButton = styled(Button)(({ theme, isMobile, isTablet }) => ({
  width: isMobile ? '100%' : isTablet ? 300 : 400, // Use 100% width on mobile to fill the available space
  maxWidth: '100%', // Ensure there's some padding on mobile screens
  height: isMobile ? 200 : isTablet ? 250 : 300,  // Adjust height based on screen size
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',
  fontSize: isMobile ? '1rem' : '1.2rem',
  fontWeight: 'bold',
  color: theme.palette.common.white,
  backgroundColor: '#7f60d4',
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: isMobile ? 'none' : 'scale(1.05)',
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For mobile devices
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // For tablets
  const tiltRefs = useRef([]);

  useEffect(() => {
    if (!isMobile && !isTablet) {
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
    }
    return () => {
      tiltRefs.current.forEach(ref => ref && ref.vanillaTilt && ref.vanillaTilt.destroy());
    };
  }, [isMobile, isTablet]);

  const games = [
    { path: "/reaction-time", title: "Reaction Time", icon: AccessTimeIcon },
    { path: "/sequence-memory", title: "Sequence Memory", icon: ViewListIcon },
    { path: "/number-memory", title: "Number Memory", icon: NumbersIcon },
    { path: "/verbal-memory", title: "Verbal Memory", icon: TextFieldsIcon },
    { path: "/aim-trainer", title: "Aim Trainer", icon: KeyboardIcon },
    { path: "/visual-memory-test", title: "Visual Memory Test", icon: VisibilityIcon },
  ];

  return (
    <HomeContainer>
      <Fade in={true} timeout={1000}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom align="center">
          Welcome to Human Benchmark
        </Typography>
      </Fade>
      <ButtonGrid container>
        {games.map((game, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Fade in={true} timeout={1200 + index * 200}>
              <SquareButton
                ref={el => (tiltRefs.current[index] = el)}
                component={Link}
                to={game.path}
                isMobile={isMobile.toString()} // Pass isMobile to styled component
                isTablet={isTablet.toString()} // Pass isTablet to styled component
              >
                <game.icon fontSize={isMobile ? "medium" : "large"} />
                <Typography variant="button" mt={1}>
                  {game.title}
                </Typography>
              </SquareButton>
            </Fade>
          </Grid>
        ))}
      </ButtonGrid>
    </HomeContainer>
  );
};

export default Home;
