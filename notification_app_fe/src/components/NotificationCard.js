import React from 'react';
import '../App.css';

const NotificationCard = ({ notification, isRead, onClick }) => {

return (
    <div 
      className={`card ${isRead ? 'read' : 'unread'}`} 
      onClick={() => onClick(notification.ID)}
    >
      <div className="card-header">
        <span className={`chip ${notification.Type || 'default'}`}>
          {notification.Type}
        </span>
        <span className="timestamp">
          {new Date(notification.Timestamp).toLocaleString()}
        </span>
      </div>
      <p className="message">{notification.Message}</p>
    </div>
  );
};

export default NotificationCard;