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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  loadBackgroundColor();
});
