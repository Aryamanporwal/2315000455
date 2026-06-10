const LOG_URL = "/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnlhbWFuLmdsYV9jczIzQGdsYS5hYy5pbiIsImV4cCI6MTc4MTA3OTA5MSwiaWF0IjoxNzgxMDc4MTkxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTcyMWU1MmEtMWI2Ni00YTZkLWE3NDUtMjE3YmI0ZjExZDY2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJ5YW1hbiIsInN1YiI6ImFkODEwMjE4LTBkOTctNDc4Mi04NjZhLTRiZTQyMGY5NWFmNCJ9LCJlbWFpbCI6ImFyeWFtYW4uZ2xhX2NzMjNAZ2xhLmFjLmluIiwibmFtZSI6ImFyeWFtYW4iLCJyb2xsTm8iOiIyMzE1MDAwNDU1IiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiYWQ4MTAyMTgtMGQ5Ny00NzgyLTg2NmEtNGJlNDIwZjk1YWY0IiwiY2xpZW50U2VjcmV0IjoiTmplc3RiVnVWYkN0eXNTbiJ9.DDZxhY0JxYvSi7iV1XoAToYRFsddq4hSvVuIDplISw0"; 

/**
 * Sends application lifecycle logs to the evaluation server.
 @param {string} stack 
 * @param {string} level - Must be 'debug', 'info', 'warn', 'error', or 'fatal'
 * @param {string} pkg - Must be 'controller', 'db', 'component', 'hook', 'auth', etc.
 * @param {string} message - Description of the log event
 */

async function Log(stack, level, pkg, message) {
 
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message
  };

  try {
    const response = await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Logger Error] Server responded with status ${response.status}: ${errorText}`);
      return;
    }

    console.log(`[Remote Log Success] ${level.toUpperCase()} - ${message}`);
  } catch (error) {
    console.error("[Logger Network Error] Failed to connect to logging server:", error.message);
  }
}

module.exports = { Log };