import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../api/notificationService';
import { getTopNotifications } from '../utils/priority';
import { useReadStatus } from '../hooks/useReadStatus';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../logging_middleware/logger';
import '../App.css';

const PriorityInbox = () => {
  const [notifications, setNotifications] = useState([]);
  const [limit, setLimit] = useState(10);
  const { readIds, markAsRead } = useReadStatus();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchNotifications();
      const topPriority = getTopNotifications(data, limit);
      setNotifications(topPriority);
    };
    loadData();
  }, [limit]);

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    Log("frontend", "info", "page", `Priority limit changed to ${e.target.value}`);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Priority Inbox</h1>
        <div className="select-group">
          <label>Top N</label>
          <select className="select-input" value={limit} onChange={handleLimitChange}>
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
          </select>
        </div>
      </div>
      {notifications.map(notif => (
        <NotificationCard 
          key={notif.ID} 
          notification={notif} 
          isRead={readIds.includes(notif.ID)}
          onClick={markAsRead}
        />
      ))}
    </div>
  );
};

export default PriorityInbox;