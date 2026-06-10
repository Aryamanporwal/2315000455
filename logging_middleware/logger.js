const LOG_URL = "http://4.224.186.213/evaluation-service/logs";
const ACCESS_TOKEN = " eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."; 

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