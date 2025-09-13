import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CaringHand from '../assets/Caring_hands.png';
import LogoGreen from '..//assets/logo-green.png';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
 
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here

    navigate('/home'); // Redirect to home after login
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="login-container">
      <img src={LogoGreen} alt="logo" className='login-logo' />
      <img src={CaringHand} alt="caring-hands" className='login-graphic' />
      <h4 className="login-subhead">Rootd in resilience. United in healing.</h4>
      <h2 className='login-h2'>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <input
          className='login-input'
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='login-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='frlogin-btn' type="submit">Login</button>
      </form>
        <p className="signup-link">
            Don't have an account? <a href="/signup">Signup here</a>
        </p>
    </div>
  );
};