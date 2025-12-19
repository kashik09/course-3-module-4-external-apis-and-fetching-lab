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

// Step 3: Clear input after submission
function clearInput() {
  stateInput.value = '';
}

// Step 4: Display error messages
function displayError(error) {
  // Clear alerts container
  alertsContainer.innerHTML = '';
  
  // Show error message
  errorMessage.textContent = error.message;
  errorMessage.style.display = 'block';
}

// Main handler function
async function handleGetAlerts() {
  const state = stateInput.value.trim().toUpperCase();
  
  // Validate input
  if (!state) {
    displayError(new Error('Please enter a state abbreviation'));
    return;
  }
  
  if (state.length !== 2) {
    displayError(new Error('Please enter a valid 2-letter state abbreviation'));
    return;
  }
  
  try {
    // Fetch alerts
    const data = await fetchWeatherAlerts(state);
    
    // Display alerts
    displayAlerts(data);
    
    // Clear input
    clearInput();
  } catch (error) {
    // Display error
    displayError(error);
    
    // Clear input even on error
    clearInput();
  }
}

// Event listener for button click
getAlertsBtn.addEventListener('click', handleGetAlerts);

// Optional: Allow Enter key to submit
stateInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleGetAlerts();
  }
});