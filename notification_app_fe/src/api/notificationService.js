import { Log } from '../logging_middleware/logger';

const API_URL = "/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnlhbWFuLmdsYV9jczIzQGdsYS5hYy5pbiIsImV4cCI6MTc4MTA3OTA5MSwiaWF0IjoxNzgxMDc4MTkxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTcyMWU1MmEtMWI2Ni00YTZkLWE3NDUtMjE3YmI0ZjExZDY2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJ5YW1hbiIsInN1YiI6ImFkODEwMjE4LTBkOTctNDc4Mi04NjZhLTRiZTQyMGY5NWFmNCJ9LCJlbWFpbCI6ImFyeWFtYW4uZ2xhX2NzMjNAZ2xhLmFjLmluIiwibmFtZSI6ImFyeWFtYW4iLCJyb2xsTm8iOiIyMzE1MDAwNDU1IiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiYWQ4MTAyMTgtMGQ5Ny00NzgyLTg2NmEtNGJlNDIwZjk1YWY0IiwiY2xpZW50U2VjcmV0IjoiTmplc3RiVnVWYkN0eXNTbiJ9.DDZxhY0JxYvSi7iV1XoAToYRFsddq4hSvVuIDplISw0"; 

export const fetchNotifications = async (params = {}) => {
  try {
    Log("frontend", "info", "api", `Initiated notification fetch with params: ${JSON.stringify(params)}`);
    
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // DEBUG: Print the exact response to your browser console
    console.log(`API Response for ${queryParams || 'ALL'}:`, data);

    // Resilient fallback to find the array no matter how the server formats it
    let notificationsArray = [];
    if (Array.isArray(data)) {
        notificationsArray = data;
    } else if (data.notifications) {
        notificationsArray = data.notifications;
    } else if (data.content) {
        notificationsArray = data.content;
    } else if (data.data) {
        notificationsArray = data.data;
    }

    Log("frontend", "info", "api", `Successfully fetched ${notificationsArray.length} notifications`);
    return notificationsArray;
    
  } catch (error) {
    Log("frontend", "error", "api", `Fetch failed: ${error.message}`);
    return [];
  }
};