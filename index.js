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

// Step 2: Display alerts on the page
function displayAlerts(data) {
  // Clear previous content
  alertsContainer.innerHTML = '';
  
  // Hide error message on successful fetch
  errorMessage.textContent = '';
  errorMessage.style.display = 'none';
  
  // Get the title and number of alerts
  const title = data.title;
  const alertCount = data.features.length;
  
  // Create summary message
  const summary = document.createElement('h2');
  summary.textContent = `${title}: ${alertCount}`;
  alertsContainer.appendChild(summary);
  
  // Create list of alert headlines
  if (alertCount > 0) {
    const alertList = document.createElement('ul');
    
    data.features.forEach(alert => {
      const listItem = document.createElement('li');
      listItem.textContent = alert.properties.headline;
      alertList.appendChild(listItem);
    });
    
    alertsContainer.appendChild(alertList);
  } else {
    const noAlerts = document.createElement('p');
    noAlerts.textContent = 'No active alerts for this state.';
    alertsContainer.appendChild(noAlerts);
  }
}