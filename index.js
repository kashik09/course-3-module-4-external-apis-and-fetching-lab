// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Get DOM elements
const stateInput = document.getElementById('state-input');
const getAlertsBtn = document.getElementById('get-alerts-btn');
const alertsContainer = document.getElementById('alerts-container');
const errorMessage = document.getElementById('error-message');