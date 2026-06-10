export const getTopNotifications = (notifications, n) => {
  const weightMap = { Placement: 3, Result: 2, Event: 1 };
  
  return [...notifications].sort((a, b) => {
    const weightDiff = weightMap[b.Type] - weightMap[a.Type];
    if (weightDiff !== 0) return weightDiff;
    
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  }).slice(0, n);
};