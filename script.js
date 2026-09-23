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

function openWelcomePopup() {
  const modal = document.getElementById('welcomeModal');
  if (!modal) return;
  modal.style.display = 'block';
}

function closeWelcomePopup() {
  const modal = document.getElementById('welcomeModal');
  if (!modal) return;
  modal.style.display = 'none';
}

function toggleAboutMe() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  if (aboutSection.style.display === 'none') {
    aboutSection.style.display = 'block';
  } else {
    aboutSection.style.display = 'none';
  }
}

function updateDateTime() {
  const display = document.getElementById('datetime-display');
  if (!display) return;
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
  display.textContent = dateTimeString;
}

function initializeDateTime() {
  if (!document.getElementById('datetime-display')) return;
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  if (form) form.reset();
}

window.addEventListener('click', function (event) {
  const modal = document.getElementById('welcomeModal');
  if (modal && event.target == modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  loadBackgroundColor();
  initializeDateTime();
});
