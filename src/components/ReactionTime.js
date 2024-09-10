import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  textAlign: 'center',
  marginTop: '0px',
  padding: '0px',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#f0f0f5',
});

const Header = styled('div')({
  backgroundColor: '#f0f0f5',
  color: 'black',
  padding: '50px 20px',
  textAlign: 'center',
});

const Title = styled('h1')({
  margin: 0,
  fontSize: '2.5rem',
});

const Instructions = styled('p')({
  marginTop: '10px',
  fontSize: '1.2rem',
});

const TestArea = styled('div')(({ waiting }) => ({
  margin: '50px auto',
  width: '600px',
  height: '300px',
  backgroundColor: waiting ? 'red' : 'green',
  cursor: waiting ? 'default' : 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  color: 'white',
  borderRadius: '8px',
}));

const InfoSection = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

const InfoBox = styled('div')({
  width: '300px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '0 20px',
  textAlign: 'left',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)', // Slight scaling on hover
    backgroundColor: "#e5d6f9", // Light grey background on hover
  },
});

const ReactionTime = () => {
  const [waiting, setWaiting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [testCount, setTestCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);

  const startTest = () => {
    if (testCount >= 5) return;

    setReactionTime(null);
    setWaiting(true);
    const delay = Math.floor(Math.random() * 4000) + 2000;

    setTimeout(() => {
      setStartTime(Date.now());
      setWaiting(false);
    }, delay);
  };

  const handleClick = () => {
    if (waiting) {
      return;
    }

    if (!waiting && startTime) {
      const endTime = Date.now();
      const newReactionTime = endTime - startTime - 140;
      setReactionTime(newReactionTime);
      setReactionTimes((prevTimes) => [...prevTimes, newReactionTime]);
      setTestCount((prevCount) => prevCount + 1);
      setStartTime(null);
    } else if (!startTime && testCount < 5) {
      startTest();
    }
  };

  const getAverageReactionTime = () => {
    if (reactionTimes.length === 0) return 0;
    const sum = reactionTimes.reduce((acc, time) => acc + time, 0);
    return (sum / reactionTimes.length).toFixed(2);
  };

  return (
    <Container>
      <Header>
        <Title>Reaction Time Test</Title>
        <Instructions>
          When the red box turns green, click as quickly as you can. Click anywhere to start.
        </Instructions>
      </Header>

      <TestArea onClick={handleClick} waiting={waiting}>
        {reactionTime === null && testCount < 5 ? (
          waiting ? 'Click as soon as it turns green' : 'Click to start'
        ) : testCount < 5 ? (
          `Your reaction time: ${reactionTime} ms`
        ) : (
          'Test Complete!'
        )}
      </TestArea>

      {testCount === 5 && (
        <div>
          <h3>Average Reaction Time: {getAverageReactionTime()} ms</h3>
        </div>
      )}

      <InfoSection>
        <InfoBox>
          <h4>Statistics</h4>
          <p>The average reaction time is around 273ms based on collected data.</p>
        </InfoBox>
        <InfoBox>
          <h4>About the test</h4>
          <p>
            This test measures your reaction time by having you click as soon as the red box
            turns green. Your reaction time may be affected by your computer's latency.
          </p>
        </InfoBox>
      </InfoSection>
    </Container>
  );
};

export default ReactionTime;
