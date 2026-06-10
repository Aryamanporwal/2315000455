import { useState, useEffect } from 'react';
import { Log } from '../logging_middleware/logger';

export const useReadStatus = () => {
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('readNotifications');
    if (stored) {
      setReadIds(JSON.parse(stored));
    }
  }, []);

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updatedIds = [...readIds, id];
      setReadIds(updatedIds);
      localStorage.setItem('readNotifications', JSON.stringify(updatedIds));
      Log("frontend", "debug", "state", `Notification ${id} marked as read`);
    }
  };

  return { readIds, markAsRead };
};