import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReactionTime from './components/ReactionTime';
import MemoryTest from './components/MemoryTest';
import TypingTest from './components/TypingTest';
import VisualMemoryTest from './components/VisualMemoryTest';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/reaction-time" element={<ReactionTime />} />
        <Route path="/memory-test" element={<MemoryTest />} />
        <Route path="/typing-test" element={<TypingTest />} />
        <Route path="/visual-memory-test" element={<VisualMemoryTest />} />
      </Routes>
    </div>
  );
}

export default App;
