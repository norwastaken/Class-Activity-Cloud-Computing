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

function getUserName() {
  try { return sessionStorage.getItem('username') || ''; } catch (e) { return ''; }
}

function openWelcomePopup() {
  const modal = document.getElementById('welcomeModal');
  if (!modal) return;
  const name = getUserName();
  const title = document.getElementById('welcomeTitle');
  const msg = document.getElementById('welcomeMessage');
  if (title) title.textContent = name ? 'Welcome, ' + name + '!' : 'Welcome!';
  if (msg) msg.textContent = 'Welcome to my personal Website!';
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
  ['welcomeModal', 'toolModal'].forEach(function (id) {
    const modal = document.getElementById(id);
    if (modal && event.target == modal) modal.style.display = 'none';
  });
  if (!event.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown.open').forEach(function (d) { d.classList.remove('open'); });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  loadBackgroundColor();
  initializeDateTime();
  initDropdown();
  try {
    if (sessionStorage.getItem('justLoggedIn') === '1') {
      sessionStorage.removeItem('justLoggedIn');
      openWelcomePopup();
    }
  } catch (e) {}
});

/* ---------- D. Login ---------- */
const VALID_PASSWORD = '1234';

function handleLogin(event) {
  event.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value;
  const error = document.getElementById('login-error');
  if (!user || !pass) { error.textContent = 'Please enter both username and password.'; return; }
  if (pass !== VALID_PASSWORD) { error.textContent = 'Incorrect password. Please try again.'; return; }
  try {
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('justLoggedIn', '1');
  } catch (e) {}
  window.location.href = 'home.html';
}

function logout() {
  try { sessionStorage.removeItem('username'); } catch (e) {}
}

/* ---------- Tools dropdown + pop-up window ---------- */
function initDropdown() {
  const dd = document.querySelector('.dropdown');
  if (!dd) return;
  dd.querySelector('.dropdown-toggle').addEventListener('click', function () { dd.classList.toggle('open'); });
  dd.querySelectorAll('[data-tool]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      dd.classList.remove('open');
      openTool(link.dataset.tool);
    });
  });
}

function esc(t) {
  return String(t).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function peso(n) { return '\u20B1' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function showResult(html, isError) {
  const r = document.getElementById('toolResult');
  r.className = 'tool-result' + (isError ? ' error-text' : '');
  r.innerHTML = html;
}

const TOOLS = {
  grade: {
    title: 'Student Grade Calculator',
    html: `<label for="gradeName">Student name (optional):</label>
      <input type="text" id="gradeName" placeholder="e.g. Juan Dela Cruz">
      <label for="gradeInput">Grades (0&ndash;100, separated by commas):</label>
      <input type="text" id="gradeInput" placeholder="e.g. 88, 92, 79, 85">
      <button class="btn-submit" onclick="calcGrade()">Calculate</button>`
  },
  shopping: {
    title: 'Simple Shopping Calculator',
    html: `<div id="itemRows"></div>
      <button class="btn-theme" onclick="addItemRow()">+ Add item</button>
      <button class="btn-submit" onclick="calcShopping()">Calculate Total</button>
      <p class="hint">Discount: 5% for &#8369;500+, 10% for &#8369;1,000+, 15% for &#8369;2,000+</p>`
  },
  number: {
    title: 'Number Analyzer',
    html: `<label for="numInput">Numbers (separated by commas or spaces):</label>
      <input type="text" id="numInput" placeholder="e.g. 7, -4, 0, 12, 3.5">
      <button class="btn-submit" onclick="analyzeNumbers()">Analyze</button>`
  },
  table: {
    title: 'Multiplication Table Generator',
    html: `<label for="tblNum">Number:</label>
      <input type="number" id="tblNum" placeholder="e.g. 7">
      <label for="tblLimit">Up to (default 10):</label>
      <input type="number" id="tblLimit" value="10" min="1" max="100">
      <button class="btn-submit" onclick="makeTable()">Generate</button>`
  }
};

function openTool(id) {
  const tool = TOOLS[id];
  if (!tool) return;
  let modal = document.getElementById('toolModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'toolModal';
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-content tool-window"><span class="close" onclick="closeTool()">&times;</span>' +
      '<h2 id="toolTitle"></h2><div id="toolBody" class="tool-body"></div><div id="toolResult" class="tool-result"></div></div>';
    document.body.appendChild(modal);
  }
  document.getElementById('toolTitle').textContent = tool.title;
  document.getElementById('toolBody').innerHTML = tool.html;
  document.getElementById('toolResult').innerHTML = '';
  modal.style.display = 'block';
  if (id === 'shopping') { addItemRow(); addItemRow(); }
  const first = modal.querySelector('input');
  if (first) first.focus();
}
function closeTool() {
  const m = document.getElementById('toolModal');
  if (m) m.style.display = 'none';
}

/* A. Grade calculator */
function calcGrade() {
  const name = document.getElementById('gradeName').value.trim();
  const parts = document.getElementById('gradeInput').value.split(/[,\s]+/).filter(Boolean);
  const grades = parts.map(Number);
  if (!grades.length || grades.some(function (g) { return isNaN(g) || g < 0 || g > 100; })) {
    showResult('Please enter valid grades between 0 and 100.', true); return;
  }
  const avg = grades.reduce(function (a, b) { return a + b; }, 0) / grades.length;
  let letter, label;
  if (avg >= 90) { letter = 'A'; label = 'Outstanding'; }
  else if (avg >= 85) { letter = 'B'; label = 'Very Good'; }
  else if (avg >= 80) { letter = 'C'; label = 'Good'; }
  else if (avg >= 75) { letter = 'D'; label = 'Satisfactory'; }
  else { letter = 'F'; label = 'Failed'; }
  const status = avg >= 75 ? 'PASSED' : 'FAILED';
  showResult((name ? '<p><strong>' + esc(name) + '</strong></p>' : '') +
    '<p>Grades entered: ' + grades.length + '</p>' +
    '<p>Average: <strong>' + avg.toFixed(2) + '</strong></p>' +
    '<p>Classification: <strong>' + letter + ' &ndash; ' + label + '</strong> (' + status + ')</p>');
}

/* B. Shopping calculator */
function addItemRow() {
  const row = document.createElement('div');
  row.className = 'item-row';
  row.innerHTML = '<input type="text" class="it-name" placeholder="Item name">' +
    '<input type="number" class="it-price" placeholder="Price" min="0" step="0.01">' +
    '<input type="number" class="it-qty" placeholder="Qty" min="1" value="1">' +
    '<button class="btn-remove" title="Remove" onclick="this.parentElement.remove()">&times;</button>';
  document.getElementById('itemRows').appendChild(row);
}
function calcShopping() {
  const rows = document.querySelectorAll('#itemRows .item-row');
  let total = 0, lines = '', count = 0;
  for (const row of rows) {
    const name = row.querySelector('.it-name').value.trim();
    const priceText = row.querySelector('.it-price').value;
    if (!name && !priceText) continue;
    const price = parseFloat(priceText);
    const qty = parseInt(row.querySelector('.it-qty').value, 10) || 0;
    if (isNaN(price) || price < 0 || qty < 1) { showResult('Check your entries: every item needs a valid price and quantity.', true); return; }
    const sub = price * qty;
    total += sub; count++;
    lines += '<tr><td>' + esc(name || 'Item ' + count) + '</td><td>' + qty + ' &times; ' + peso(price) + '</td><td>' + peso(sub) + '</td></tr>';
  }
  if (!count) { showResult('Please add at least one item.', true); return; }
  const rate = total >= 2000 ? 0.15 : total >= 1000 ? 0.10 : total >= 500 ? 0.05 : 0;
  const discount = total * rate;
  showResult('<table class="result-table">' + lines + '</table>' +
    '<p>Subtotal: ' + peso(total) + '</p>' +
    '<p>Discount: ' + (rate ? (rate * 100) + '% (&minus;' + peso(discount) + ')' : 'None (spend &#8369;500 or more to get a discount)') + '</p>' +
    '<p>Total to pay: <strong>' + peso(total - discount) + '</strong></p>');
}

/* C. Number analyzer */
function analyzeNumbers() {
  const parts = document.getElementById('numInput').value.split(/[,\s]+/).filter(Boolean);
  if (!parts.length) { showResult('Please enter at least one number.', true); return; }
  let rows = '';
  for (const p of parts) {
    const n = Number(p);
    if (isNaN(n)) { showResult('"' + esc(p) + '" is not a valid number.', true); return; }
    const sign = n > 0 ? 'Positive' : n < 0 ? 'Negative' : 'Zero';
    const parity = Number.isInteger(n) ? (n % 2 === 0 ? 'Even' : 'Odd') : 'Not a whole number';
    rows += '<tr><td>' + esc(p) + '</td><td>' + sign + '</td><td>' + parity + '</td></tr>';
  }
  showResult('<table class="result-table"><tr><th>Number</th><th>Sign</th><th>Odd / Even</th></tr>' + rows + '</table>');
}

/* E. Multiplication table */
function makeTable() {
  const n = parseFloat(document.getElementById('tblNum').value);
  const limit = parseInt(document.getElementById('tblLimit').value, 10) || 10;
  if (isNaN(n)) { showResult('Please enter a number.', true); return; }
  if (limit < 1 || limit > 100) { showResult('"Up to" must be between 1 and 100.', true); return; }
  let out = '<h3>Multiplication table of ' + n + '</h3><table class="result-table">';
  for (let i = 1; i <= limit; i++) {
    out += '<tr><td>' + n + ' &times; ' + i + '</td><td>=</td><td>' + +(n * i).toFixed(10) + '</td></tr>';
  }
  showResult(out + '</table>');
}
