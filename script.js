function toggleBackgroundColor() {
  const body = document.body;
  const currentColor = window.getComputedStyle(body).backgroundColor;
  
  if (currentColor === 'rgb(247, 245, 241)' || currentColor === 'rgb(135, 206, 235)') {
    if (currentColor === 'rgb(247, 245, 241)') {
      body.style.backgroundColor = '#87ceeb';
      localStorage.setItem('bgColor', 'skyblue');
    } else {
      body.style.backgroundColor = '#f7f5f1';
      localStorage.setItem('bgColor', 'beige');
    }
  }
}

function loadBackgroundColor() {
  const savedColor = localStorage.getItem('bgColor');
  if (savedColor === 'skyblue') {
    document.body.style.backgroundColor = '#87ceeb';
  }
}

function showWelcomePopup() {
  alert('Welcome to my personal Website!');
}

function toggleAboutMe() {
  const aboutSection = document.getElementById('about');
  const isHidden = aboutSection.style.display === 'none';
  aboutSection.style.display = isHidden ? 'block' : 'none';
}

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

function initializeDateTime() {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

function handleContactSubmit(event) {
  event.preventDefault();
  document.getElementById('contact-form').reset();
}

document.addEventListener('DOMContentLoaded', function() {
  loadBackgroundColor();
  initializeDateTime();
});
