// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Get DOM elements
const stateInput = document.getElementById('state-input');
const getAlertsBtn = document.getElementById('get-alerts-btn');
const alertsContainer = document.getElementById('alerts-container');
const errorMessage = document.getElementById('error-message');

// Step 1: Fetch weather alerts from the API
async function fetchWeatherAlerts(state) {
  const url = `https://api.weather.gov/alerts/active?area=${state}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}