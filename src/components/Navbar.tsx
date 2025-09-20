import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import GreenLogo from '../assets/logo-green.png';

export const Navbar = () => {
  return (
    <>
      <nav className="nav-bar">

        <div className="nav-right">
          {/* Logo aligned to the right */}
          <img src={GreenLogo} alt="RootdCore logo" className="logo" />
        </div>
        <div className="nav-left">
          {/* Logout on the left */}
          <Link to="/login" className="nav-logout">Logout</Link>
        </div>

        
      </nav>

      {/* Bottom navigation for mobile */}
      <div className="bottom-nav">
        {/* nav-left removed: icons will be in footer */}
      </div>
    </>
  );
};
