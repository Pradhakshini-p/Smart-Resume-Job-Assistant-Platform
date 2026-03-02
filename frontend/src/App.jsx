import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Common/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Analyzer from './components/Resume/Analyzer';
import History from './components/Resume/History';
import Dashboard from './components/Dashboard/Dashboard';
import AdminPanel from './components/Admin/AdminPanel';
import JobRecommendations from './components/Jobs/JobRecommendations';
import HomePage from './pages/HomePage';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, token } = useAuth();
  return token && user?.role === 'admin' ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route path="/analyzer" element={
                <ProtectedRoute>
                  <Analyzer />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="/jobs" element={
                <ProtectedRoute>
                  <JobRecommendations />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } />
            </Routes>

            <ToastContainer position="bottom-right" autoClose={3000} />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
