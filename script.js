// Toggle background color between beige and sky blue
function toggleBackgroundColor() {
  const body = document.body;
  const currentColor = window.getComputedStyle(body).backgroundColor;
  
  // Default beige color: rgb(247, 245, 241)
  // Sky blue color: rgb(135, 206, 235)
  
  if (currentColor === 'rgb(247, 245, 241)' || currentColor === 'rgb(135, 206, 235)') {
    if (currentColor === 'rgb(247, 245, 241)') {
      // Switch to sky blue
      body.style.backgroundColor = '#87ceeb';
      localStorage.setItem('bgColor', 'skyblue');
    } else {
      // Switch back to beige
      body.style.backgroundColor = '#f7f5f1';
      localStorage.setItem('bgColor', 'beige');
    }
  }
}

// Load saved background color on page load
function loadBackgroundColor() {
  const savedColor = localStorage.getItem('bgColor');
  if (savedColor === 'skyblue') {
    document.body.style.backgroundColor = '#87ceeb';
  }
}

// Show welcome popup
function showWelcomePopup() {
  alert('Welcome to my personal Website!');
}

// Toggle About Me section visibility
function toggleAboutMe() {
  const aboutSection = document.getElementById('about');
  if (aboutSection.style.display === 'none') {
    aboutSection.style.display = 'block';
  } else {
    aboutSection.style.display = 'none';
  }
}

// Display current date and time
function updateDateTime() {
  const now = new Date();
  const dateTimeString = now.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('datetime-display').textContent = dateTimeString;
}

// Update date and time every second
function initializeDateTime() {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// Handle contact form submission (does nothing)
function handleContactSubmit(event) {
  event.preventDefault();
  // Form submission does nothing - just prevents default behavior
  document.getElementById('contact-form').reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  loadBackgroundColor();
  initializeDateTime();
});
