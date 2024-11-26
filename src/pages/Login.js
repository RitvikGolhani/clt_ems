import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:8081/authenticate', {
        username,
        password,
      });

      // If login is successful, save JWT and redirect to home page
      const token = response.data.token;
      localStorage.setItem('token', token); // Save token to localStorage
      navigate('/home'); // Redirect to home page
    } catch (error) {
      // If error occurs (e.g., invalid credentials), show an alert
      alert('Invalid username or password');
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', margin: '5px', width: '200px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '5px', width: '200px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
