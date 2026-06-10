import { Log } from '../logging_middleware/logger';

const API_URL = "http://4.224.186.213/evaluation-service/notifications";
const TOKEN = "YOUR_BEARER_TOKEN_HERE"; 

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
    Log("frontend", "info", "api", `Successfully fetched ${data.notifications?.length || 0} notifications`);
    return data.notifications || [];
    
  } catch (error) {
    Log("frontend", "error", "api", `Fetch failed: ${error.message}`);
    return [];
  }
};