const currentUser = localStorage.getItem('currentUser');
if (!currentUser) window.location.href = 'index.html';

// DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});

// Helper: get and save user data
function getUserData(username) {
  return JSON.parse(localStorage.getItem(`users_${username}`)) || { password: '', transactions: [] };
}
function saveUserData(username, data) {
  localStorage.setItem(`users_${username}`, JSON.stringify(data));
}

let userData = getUserData(currentUser);
let transactions = userData.transactions || [];

function addTransaction(e) {
  e.preventDefault();
  const transaction = {
    id: Math.floor(Math.random() * 1000000),
    text: text.value,
    amount: +amount.value,
    category: category.value
  };
  transactions.push(transaction);
  saveUserData(currentUser, { ...userData, transactions });
  addTransactionDOM(transaction);
  updateValues();
  renderChart();
  text.value = '';
  amount.value = '';
}

function addTransactionDOM(t) {
  const sign = t.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(t.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${t.text} (${t.category})
    <span>${sign}$${Math.abs(t.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${t.id})">x</button>
  `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expense = (
    amounts.filter(a => a < 0).reduce((a, b) => a + b, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveUserData(currentUser, { ...userData, transactions });
  init();
}
function renderChart() {
  const categoryTotals = {};
  transactions.forEach(t => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += Math.abs(t.amount);
  });

  const ctx = document.getElementById('categoryChart').getContext('2d');
  if (window.categoryChart) window.categoryChart.destroy();

  window.categoryChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#4e79a7',
            '#f28e2b',
            '#e15759',
            '#76b7b2',
            '#59a14f',
            '#edc948',
            '#b07aa1',
            '#ff9da7'
          ],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false // 🔹 hide category list
        },
        title: {
          display: false // 🔹 remove “Spending by Category” title
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: $${value}`;
            }
          }
        }
      },
      layout: {
        padding: 10
      }
    }
  });
}



function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
  renderChart();
}

form.addEventListener('submit', addTransaction);
init();
