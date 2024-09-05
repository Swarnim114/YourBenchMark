import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/reaction-time">Reaction Time</Button>
        <Button color="inherit" component={Link} to="/memory-test">Memory Test</Button>
        <Button color="inherit" component={Link} to="/typing-test">Typing Test</Button>
        <Button color="inherit" component={Link} to="/visual-memory-test">Visual Memory Test</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
