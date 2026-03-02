import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ResumeAI Pro
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/analyzer" className="text-gray-700 hover:text-indigo-600 transition">Analyzer</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition">Dashboard</Link>
              <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 transition">Jobs</Link>
              <Link to="/history" className="text-gray-700 hover:text-indigo-600 transition">History</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-indigo-600 transition">Admin</Link>
              )}
              
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <span className="text-sm text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={24} />
          </button>
        </div>

        {mobileOpen && user && (
          <div className="md:hidden mt-4 space-y-2 border-t pt-4">
            <Link to="/analyzer" className="block text-gray-700 hover:text-indigo-600 py-2">Analyzer</Link>
            <Link to="/dashboard" className="block text-gray-700 hover:text-indigo-600 py-2">Dashboard</Link>
            <Link to="/jobs" className="block text-gray-700 hover:text-indigo-600 py-2">Jobs</Link>
            <Link to="/history" className="block text-gray-700 hover:text-indigo-600 py-2">History</Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="block text-gray-700 hover:text-indigo-600 py-2">Admin</Link>
            )}
            <button onClick={handleLogout} className="w-full bg-red-500 text-white px-3 py-2 rounded-lg">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
