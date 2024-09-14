// src/components/Theme.js
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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

const isTablet = window.innerWidth <= 768; // Tablet width threshold
const isMobile = window.innerWidth <= 480; // Mobile width threshold

// Container that holds info sections
const infoSectionStyles = {
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row', // Stack vertically for mobile, horizontally for larger screens
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap', // Ensure it wraps when there isn't enough space
  marginTop: isMobile ? '20px' : '50px',
  padding: isMobile ? '0PX' : '0',
  gap: isMobile ? '20px' : isTablet ? '30px' : '40px',
};

// Individual box style with a minimum size of 400x400
const infoBoxStyles = {
  display: 'block',
  minWidth: '375px',
  minHeight: '400px',
  width: isMobile ? '100%' : '45%', // Full width on mobile, 45% width for larger screens
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: isMobile ? '20px auto' : '20px', // Centered on mobile
  textAlign: 'left',
  transition: 'transform 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '375px',

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
};

// Game button styles
const gameButtonStyles = {
  margin: theme.spacing(1),
  padding: theme.spacing(1, 4),
  borderRadius: 25,
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(127, 96, 212, 0.2)',
  },
};

// Word display styles
const wordDisplayStyles = {
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
};

// Score display styles
const scoreDisplayStyles = {
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
};

// Styled Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: '8px',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(127, 96, 212, 0.2)',
  },
}));

export {
  theme,
  infoSectionStyles,
  infoBoxStyles,
  gameButtonStyles,
  wordDisplayStyles,
  scoreDisplayStyles,
  StyledPaper,
  isMobile,
  isTablet,
};
