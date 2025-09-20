

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, User, Bell } from 'lucide-react';
import '../styles/footernav.css';


export const FooterNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [notificationCount] = useState(2); // Replace with dynamic logic as needed

    return (
        <div className="footer-nav">
            <Link to="/home" className={`footer-link${currentPath === '/home' ? ' active' : ''}`}> 
                <Home className='footer-icon' size={24} />
                <span className='icon-name'>Home</span>
            </Link>
            <Link to="/community" className={`footer-link${currentPath === '/community' ? ' active' : ''}`}> 
                <Globe className='footer-icon' size={24} />
                <span className='icon-name'>Community</span>
            </Link>
            <Link to="/profile" className={`footer-link${currentPath === '/profile' ? ' active' : ''}`}> 
                <User className='footer-icon' size={24} />
                <span className='icon-name'>Profile</span>
            </Link>
                        <Link to="/notifications" className={`footer-link notification-bell${currentPath === '/notifications' ? ' active' : ''}`}> 
                                <span className="notification-bell-wrapper">
                                    <Bell className='footer-icon' size={24} />
                                    {notificationCount > 0 && (
                                        <span className="notification-badge">{notificationCount}</span>
                                    )}
                                </span>
                                <span className='icon-name'>Notifications</span>
                        </Link>
        </div>
    );
};
