import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    // Mock authentication - in a real app, this would call an API
    if (password === 'password') {
      // Create mock user data based on role
      let userData;
      
      if (role === 'student') {
        userData = {
          id: 'STU001',
          name: username,
          department: 'Computer Science',
          year: '3rd Year',
          registrationNumber: 'SIST2022CS001'
        };
      } else if (role === 'faculty') {
        userData = {
          id: 'FAC001',
          name: username,
          department: 'Computer Science',
          position: 'Assistant Professor',
          employeeId: 'SIST-FAC-001'
        };
      } else if (role === 'admin') {
        userData = {
          id: 'ADM001',
          name: username,
          department: 'Administration',
          position: 'System Administrator',
          employeeId: 'SIST-ADM-001'
        };
      }
      
      onLogin(role, userData);
    } else {
      setError('Invalid credentials. Try using "password" as the password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <div className="login-logo" style={{ textAlign: "center" }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/1/13/Sathyabama_Institute_of_Science_and_Technology_logo.png" 
            alt="Sathyabama Institute Logo" 
            style={{ width: "100px", height: "100px", marginBottom: "10px" }} 
          />
          <h1>Sathyabama Institute Of Science And Technology</h1>
          <h3>Event Manager</h3>
        </div>

        
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Login As</label>
            <select 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;