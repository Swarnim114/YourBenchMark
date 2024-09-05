import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const SequenceMemory = () => {
  const [sequence, setSequence] = useState([Math.floor(Math.random() * 4)]); // Sample sequence

  const generateNextInSequence = () => {
    setSequence([...sequence, Math.floor(Math.random() * 4)]);
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4">Sequence Memory Test</Typography>
      <Box sx={{ marginTop: '20px' }}>
        {sequence.map((num, index) => (
          <Typography key={index} variant="h6">
            {num}
          </Typography>
        ))}
      </Box>
      <Button variant="contained" onClick={generateNextInSequence} sx={{ marginTop: '20px' }}>
        Next in Sequence
      </Button>
    </Box>
  );
};

export default SequenceMemory;
