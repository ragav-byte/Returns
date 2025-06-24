// AuthApp.js
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './AuthApp.css';
import Dashboard from '../Dashboard';
import AdminPanel from './AdminPanel';

// Firebase configuration (mocked for now)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Mock Firebase functions
const mockSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isAdmin = email.includes("admin");
      const role = isAdmin ? "admin" : "user";
      resolve({ user: { email, role } });
    }, 1000);
  });
};

const mockSignUp = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isAdmin = email.includes("admin");
      const role = isAdmin ? "admin" : "user";
      resolve({ user: { email, role } });
    }, 1000);
  });
};

const AuthApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await mockSignIn(email, password);
      setUser(result.user);
      setUserRole(result.user.role);
      console.log('Login successful:', result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await mockSignUp(email, password);
      setUser(result.user);
      setUserRole(result.user.role);
      console.log('Signup successful:', result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setCurrentPage('login');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
  };

  const switchPage = (page) => {
    setCurrentPage(page);
    resetForm();
  };

  if (user) {
    return userRole === 'admin'
      ? <AdminPanel user={user} onLogout={handleLogout} />
      : <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-layout">
        {/* Left side - Image */}
        <div className="image-section">
          <div className="image-overlay">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Authentication"
              className="background-image"
            />
            <div className="image-content">
              <div className="image-text">
                <h1 className="image-title">Welcome Back</h1>
                <p className="image-subtitle">
                  {currentPage === 'login'
                    ? 'Sign in to access your account'
                    : 'Create your account to get started'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="form-section">
          <div className="form-container">
            <div className="form-card">
              <div className="form-header">
                <div className="form-icon">
                  {currentPage === 'login' ? (
                    <Mail className="icon" />
                  ) : (
                    <User className="icon" />
                  )}
                </div>
                <h2 className="form-title">
                  {currentPage === 'login' ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="form-subtitle">
                  {currentPage === 'login'
                    ? 'Welcome back! Please sign in to your account'
                    : 'Join us today! Create your new account'}
                </p>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-body">
                {currentPage === 'signup' && (
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <div className="input-wrapper">
                      <User className="input-icon" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input password-input"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
                    </button>
                  </div>
                </div>

                {currentPage === 'signup' && (
                  <div className="input-group">
                    <label className="input-label">Confirm Password</label>
                    <div className="input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-input password-input"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="password-toggle"
                      >
                        {showConfirmPassword ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={currentPage === 'login' ? handleLogin : handleSignup}
                  disabled={loading}
                  className="submit-btn"
                >
                  {loading ? (
                    <div className="spinner" />
                  ) : (
                    <>
                      {currentPage === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="arrow-icon" />
                    </>
                  )}
                </button>
              </div>

              <div className="form-footer">
                <p className="switch-text">
                  {currentPage === 'login'
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={() => switchPage(currentPage === 'login' ? 'signup' : 'login')}
                    className="switch-btn"
                  >
                    {currentPage === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>

            <div className="setup-notice">
              <p className="setup-text">
                <strong>Setup Required:</strong> Replace the mock Firebase functions with actual Firebase imports and configuration to enable real authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthApp;
