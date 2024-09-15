import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CssBaseline, IconButton, Collapse, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

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
  fontSize: '1.7rem',
  color: 'white',
  letterSpacing: '2px',
  fontFamily: 'Pacifico, ',
  whiteSpace: 'nowrap', // Prevent wrapping to new line
}));

// Button styling with hover and focus effects for modern animations
const StyledButton = styled(Button)({
  color: '#ffffff',  // Ensure the text color is white
  fontWeight: 'bold',
  marginLeft: '10px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

// Dropdown menu for mobile screens with a background color to ensure contrast
const DropdownMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#7f60d4',  // Match the AppBar's color for consistency
  padding: theme.spacing(2),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { label: "Reaction Time", path: "/reaction-time" },
    { label: "Number Memory", path: "/number-memory" },
    { label: "Verbal Memory", path: "/verbal-memory" },
    { label: "Visual Memory", path: "/visual-memory" },
    { label: "Sequence Memory", path: "/sequence-memory" },

  ];

  return (
    <GlobalStyle>
      <CssBaseline />
      <StyledAppBar position="static">
        <Toolbar>
          <Logo component={Link} to="/" variant="h6">
            HUMAN BENCHMARK
          </Logo>

          {isMobile ? (
            // Show menu icon on mobile screens
            <>
              <IconButton
                size="1.7rem"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu}
              >
                <MenuIcon style={{ color: 'white' }} />
              </IconButton>
            </>
          ) : (
            // Show full menu on desktop screens
            <div>
              {menuItems.map((item, index) => (
                <StyledButton component={Link} to={item.path} key={index}>
                  {item.label}
                </StyledButton>
              ))}
            </div>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Dropdown menu for mobile screens */}
      {isMobile && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <DropdownMenu>
            {menuItems.map((item, index) => (
              <StyledButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setMenuOpen(false)} // Close menu on item click
                style={{ color: '#ffffff' }}  // Ensure the text is white for visibility
              >
                {item.label}
              </StyledButton>
            ))}
          </DropdownMenu>
        </Collapse>
      )}
    </GlobalStyle>
  );
};

export default Navbar;
