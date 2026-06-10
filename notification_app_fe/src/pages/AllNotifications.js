import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../api/notificationService';
import { useReadStatus } from '../hooks/useReadStatus';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../logging_middleware/logger';
import '../App.css';

const AllNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(0);
  const { readIds, markAsRead } = useReadStatus();

  useEffect(() => {
    const loadData = async () => {
      const params = { page, limit: 10 };
      if (typeFilter) params.notification_type = typeFilter;
      const data = await fetchNotifications(params);
      setNotifications(data);
    };
    loadData();
  }, [typeFilter, page]);

  const handleFilterChange = (e) => {
    setTypeFilter(e.target.value);
    setPage(1);
    Log("frontend", "info", "page", `Notification filter applied: ${e.target.value || 'All'}`);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>All Notifications</h1>
        <div className="select-group">
          <label>Filter Type</label>
          <select className="select-input" value={typeFilter} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Placement">Placement</option>
            <option value="Result">Result</option>
            <option value="Event">Event</option>
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
      <div className="pagination">
        <button className="btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous Page</button>
        <button className="btn" onClick={() => setPage(p => p + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default AllNotifications;