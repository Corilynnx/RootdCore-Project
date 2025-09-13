// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import GreenLogo from '../assets/logo-green.png';
import { Home as HomeIcon, HeartHandshake, UserRound, Bell } from 'lucide-react';

// Example: You might want to pass this as a prop or get from context/store in a real app
const notificationCount = 1; // Replace with your unread count logic

export const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <img src={GreenLogo} alt="Logo" className="logo" />
        <Link to="/home" className="nav-icon nav-icon-labeled">
          <HomeIcon size={24} />
          <span className="nav-label">Home</span>
        </Link>
        <Link to="/community" className="nav-icon nav-icon-labeled">
          <HeartHandshake size={24} />
          <span className="nav-label">Community</span>
        </Link>
        <Link to="/profile" className="nav-icon nav-icon-labeled">
          <UserRound size={24} />
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/notifications" className="nav-icon notification-bell nav-icon-labeled">
          <Bell size={24} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
          <span className="nav-label">Notifications</span>
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/login" className="nav-logout">Logout</Link>
      </div>
    </nav>
  );
};
