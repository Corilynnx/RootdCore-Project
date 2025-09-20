

import { Navbar } from '../components/Navbar';
import '../styles/notifications.css';
import { useState } from 'react';
import { FooterNav } from '../components/FooterNav';



const Notifications = () => {
   
       
        const initialNotifications = [
          { id: 1, type: "friend_request", message: "Amara Lee sent you a friend request to connect and share chronic illness tips.", date: "2025-09-12", read: false },
          { id: 2, type: "like", message: "Jamal Carter liked your post: 'Managing fatigue on tough days.'", date: "2025-09-12", read: false },
          { id: 3, type: "comment", message: "Nina Wells commented: 'Thank you for sharing your pain management routine!'", date: "2025-09-11", read: true },
          { id: 4, type: "share", message: "Theo Moss shared your post about 'Staying positive during flare-ups.'", date: "2025-09-11", read: true },
          { id: 5, type: "friend_request", message: "Caring Hands Community invited you to join their support group.", date: "2025-09-10", read: false },
          { id: 6, type: "like", message: "Your story 'Living with invisible symptoms' received 5 new likes.", date: "2025-09-10", read: true },
          { id: 7, type: "comment", message: "Amara Lee commented: 'This advice on medication reminders is so helpful!'", date: "2025-09-09", read: false },
          { id: 8, type: "share", message: "Your post 'Balancing work and chronic illness' was shared by 2 friends.", date: "2025-09-09", read: true },
          { id: 9, type: "like", message: "Nina Wells liked your comment on 'Coping with brain fog.'", date: "2025-09-08", read: true },
          { id: 10, type: "comment", message: "Jamal Carter commented: 'Sending strength for your upcoming treatment!'", date: "2025-09-08", read: false },
        ];
    
        const [notifications, setNotifications] = useState(initialNotifications);
    
        //onclick read notification function changes to light green
        const markAsRead = (id: number) => {
          setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
              notification.id === id ? { ...notification, read: true } : notification
            )
          );
        };

   return (
   
       <div>
        
    <Navbar />
          {/* Map through notifications and display them here */}
            {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                  
                >
                  <p className='notification-message'>{notification.message}</p>
                  <span className='notification-date'>{notification.date}</span>
                </div>
            ))}
            <FooterNav />
        </div>
   )
   
};

export default Notifications;