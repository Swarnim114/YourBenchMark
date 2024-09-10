import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReactionTime from './components/ReactionTime';
import TypingTest from './components/TypingTest';
import VisualMemoryTest from './components/VisualMemoryTest';
import Home from './components/Home';
import SequenceMemory from './components/SequenceMemory';
import NumberMemory from './components/NumberMemory';
import VerbalMemory from './components/VerbalMemory';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      <div style={{ height: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reaction-time" element={<ReactionTime />} />
          <Route path="/typing-test" element={<TypingTest />} />
          <Route path="/visual-memory-test" element={<VisualMemoryTest />} />
          <Route path="/sequence-memory" element={<SequenceMemory />} />
          <Route path="/number-memory" element={<NumberMemory />} />
          <Route path="/verbal-memory" element={<VerbalMemory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
