import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Global style reset for body and html to remove default margins
const GlobalStyle = styled('div')({
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
});

// Styled AppBar
const StyledAppBar = styled(AppBar)({
  width: '100%',
  margin: 0,
  background: '#7f60d4',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

// Logo styling with gradient effect
const Logo = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 'bold',
  fontSize: '2rem',
  color: 'white',
  letterSpacing: '2px',
  fontFamily: 'Pacifico, cursive',
}));

// Button styling with hover and focus effects for modern animations
const StyledButton = styled(Button)({
  color: '#ffffff',
  fontWeight: 'bold',
  marginLeft: '10px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const Navbar = () => {
  return (
    <GlobalStyle>
      <CssBaseline />
      <StyledAppBar position="static">
        <Toolbar>
          <Logo component={Link} to="/" variant="h6">HUMAN BENCHMARK</Logo>
          <div>
            <StyledButton component={Link} to="/reaction-time">Reaction Time</StyledButton>


            {/* <StyledButton component={Link} to="/visual-memory-test">Visual Memory </StyledButton>
            <StyledButton component={Link} to="/sequence-memory">Sequence Memory</StyledButton> */}
            <StyledButton component={Link} to="/number-memory">Number Memory</StyledButton>
            <StyledButton component={Link} to="/verbal-memory">Verbal Memory</StyledButton>
          </div>
        </Toolbar>
      </StyledAppBar>
    </GlobalStyle>
  );
}

export default Navbar;
