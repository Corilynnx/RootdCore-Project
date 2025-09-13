import '../styles/signup.css';
import { useState } from 'react';
import LogoOrange from '../assets/logo-orange.png';
import SignupGraphic from '../assets/Sign-up-graphic.png';


export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signing up with:', { username, email, password });
  };

  return (
    <div className="signup-container">
      <img src={LogoOrange} alt="logo-orange" className="logo-orange" />
      <img src={SignupGraphic} alt="signup-graphic" className="signup-graphic" />
      <h4 className="signup-subhead">Rootd in resilience. United in healing.</h4>
      <h2 className='signup-h2'>Sign Up</h2>
      <form className='signup-form' onSubmit={handleSignup}>
        <input
          className='signup-input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='signup-input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='signup-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='signup-btn' type="submit">Sign Up!</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login here!</a>
      </p>
    </div>
  );
};