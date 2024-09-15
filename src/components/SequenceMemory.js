import React, { useState, useEffect } from "react";
import { infoSectionStyles, infoBoxStyles, gameButtonStyles } from "./Theme";
import { Box, Button, Typography, Container, Link } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import statsimg from "../assets/voilet.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7f60d4",
    },
    secondary: {
      main: "#5e45a0",
    },
    background: {
      default: "#f5f3ff",
      paper: "#ffffff",
    },
  },
});

const InfoSection = styled("div")(infoSectionStyles);
const InfoBox = styled("div")(infoBoxStyles);
const GameButton = styled(Button)(gameButtonStyles);

const generateRandomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&";
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function SequenceMemory() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [options, setOptions] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  const [displayingSequence, setDisplayingSequence] = useState(true);

  useEffect(() => {
    if (testStarted && !testOver) {
      const newChar = generateRandomChar();
      const newChar2 = generateRandomChar();
      const newSequence = [...sequence, newChar, newChar2];
      setSequence(newSequence);

      setDisplayingSequence(true);
      setCurrentDisplayIndex(newSequence.length-2);

      const correctOption = newSequence.join("");
      const otherOptions = [generateRandomChar(), generateRandomChar(), generateRandomChar()]
        .map((char) => newSequence.slice(0, -1).join("") + char)
        .filter((option) => option !== correctOption);

      const shuffledOptions = shuffleArray([correctOption, ...otherOptions]);
      setOptions(shuffledOptions);
    }
  }, [level, testStarted]);

  useEffect(() => {
    if (displayingSequence && currentDisplayIndex < sequence.length) {
      const timer = setTimeout(() => {
        setCurrentDisplayIndex(currentDisplayIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentDisplayIndex === sequence.length) {
      setDisplayingSequence(false); 
    }
  }, [currentDisplayIndex, displayingSequence, sequence]);

  const handleOptionClick = (option) => {
    const correctSequence = sequence.join("");
    if (option === correctSequence) {
      setUserInput([...userInput, option]);
      setLevel(level + 1);
    } else {
      setTestOver(true);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setSequence([]);
    setUserInput([]);
    setTestStarted(false);
    setTestOver(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, height: "100vh" }}>
        <Container sx={{ backgroundColor:theme.palette.background.default, height: "48vh"  , flexDirection: "column", justifyContent: "center", alignItems: "top"}}>
          {testStarted && !testOver && (
            <Box>
              <Typography variant="h5">Level {level}</Typography>
              {displayingSequence ? (
                <Typography variant="h6">Remember this sequence:</Typography>
              ) : (
                <Typography variant="h6">Choose the correct sequence:</Typography>
              )}

              {displayingSequence && (
                <Typography variant="h4" sx={{ margin: "16px" }}>
                  {sequence[currentDisplayIndex] ? sequence[currentDisplayIndex] : ""}
                </Typography>
              )}

              {!displayingSequence &&
                options.map((option, index) => (
                  <GameButton
                    key={index}
                    variant="contained"
                    color="primary"
                    onClick={() => handleOptionClick(option)}
                    sx={{ margin: "8px" }}
                  >
                    {option}
                  </GameButton>
                ))}
            </Box>
          )}
          {testOver && (
            <Box>
              <Typography variant="h6">Game Over!</Typography>
              <GameButton variant="contained" color="primary" onClick={handleRestart}>
                Test Again
              </GameButton>
            </Box>
          )}
          {!testStarted && !testOver && (
            <GameButton variant="contained" color="primary" onClick={() => setTestStarted(true)}>
              Start Test
            </GameButton>
          )}
        </Container>

        <Container sx={{ backgroundColor: theme.palette.background.default, height: "47vh" }}>
          <InfoSection sx={{ marginTop: "0px" }}>
            <InfoBox>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <img src={statsimg} alt="Statistics" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }} />
            </InfoBox>
            <InfoBox sx={{ minHeight: { xs: "200px", sm: "400px" } }}>
              <Typography variant="h6" gutterBottom>
                About the test
              </Typography>
              <Typography paragraph>
                The average person can only remember 7 digit numbers reliably, but it's possible to do much better using mnemonic techniques.
              </Typography>
              <Typography component="div">
                <Link href="https://en.wikipedia.org/wiki/Katapayadi_system" target="_blank" rel="noopener noreferrer" sx={{ color: "primary.main" }}>
                  Katapayadi system
                </Link>
              </Typography>
              <Typography component="div">
                <Link href="https://en.wikipedia.org/wiki/Mnemonic_major_system" target="_blank" rel="noopener noreferrer" sx={{ color: "primary.main" }}>
                  Mnemonic major system
                </Link>
              </Typography>
              <Typography component="div">
                <Link href="https://en.wikipedia.org/wiki/Dominic_system" target="_blank" rel="noopener noreferrer" sx={{ color: "primary.main" }}>
                  Dominic system
                </Link>
              </Typography>
            </InfoBox>
          </InfoSection>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default SequenceMemory;
