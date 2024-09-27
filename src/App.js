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
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Navbar /> {/* Ensure the Navbar is loading outside the Routes */}
      <div style={{ height: '100%' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Wrap all protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reaction-time"
            element={
              <ProtectedRoute>
                <ReactionTime />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aim-trainer"
            element={
              <ProtectedRoute>
                <AimTrainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visual-memory"
            element={
              <ProtectedRoute>
                <VisualMemoryTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sequence-memory"
            element={
              <ProtectedRoute>
                <SequenceMemory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/number-memory"
            element={
              <ProtectedRoute>
                <NumberMemory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verbal-memory"
            element={
              <ProtectedRoute>
                <VerbalMemory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
