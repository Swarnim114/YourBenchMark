import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReactionTime from './components/ReactionTime';
import AimTrainer from './components/AimTrainer';
import VisualMemoryTest from './components/VisualMemoryTest';
import Home from './components/Home';
import SequenceMemory from './components/SequenceMemory';
import NumberMemory from './components/NumberMemory';
import VerbalMemory from './components/VerbalMemory';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutUser from './components/AboutUser';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Navbar /> {/* Ensure the Navbar is loading outside the Routes */}
      <div style={{ height: '100%' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* All routes are now accessible without protection */}
          <Route path="/" element={<Home />} />
          <Route path="/reaction-time" element={<ReactionTime />} />
          <Route path="/aim-trainer" element={<AimTrainer />} />
          <Route path="/visual-memory" element={<VisualMemoryTest />} />
          <Route path="/sequence-memory" element={<SequenceMemory />} />
          <Route path="/number-memory" element={<NumberMemory />} />
          <Route path="/verbal-memory" element={<VerbalMemory />} />
          <Route path="/about" element={<AboutUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
