const currentUser = localStorage.getItem('currentUser');
if(!currentUser) window.location.href = 'index.html';

document.getElementById('logout-btn').addEventListener('click', ()=>{
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

let users = JSON.parse(localStorage.getItem('users')) || {};
let transactions = users[currentUser].transactions || [];

function addTransaction(e){
    e.preventDefault();
    const transaction = { id: Math.floor(Math.random()*1000000), text:text.value, amount:+amount.value, category:category.value };
    transactions.push(transaction);
    saveTransactions();
    addTransactionDOM(transaction);
    updateValues();
    renderChart();
    text.value=''; amount.value='';
}

function addTransactionDOM(t){
    const sign = t.amount<0?'-':'+';
    const item = document.createElement('li');
    item.classList.add(t.amount<0?'minus':'plus');
    item.innerHTML = `${t.text} (${t.category}) <span>${sign}$${Math.abs(t.amount)}</span><button class="delete-btn" onclick="removeTransaction(${t.id})">x</button>`;
    list.appendChild(item);
}

function updateValues(){
    const amounts = transactions.map(t=>t.amount);
    balance.innerText = `$${amounts.reduce((a,b)=>a+b,0).toFixed(2)}`;
    money_plus.innerText = `+$${amounts.filter(x=>x>0).reduce((a,b)=>a+b,0).toFixed(2)}`;
    money_minus.innerText = `-$${(amounts.filter(x=>x<0).reduce((a,b)=>a+b,0)*-1).toFixed(2)}`;
}

function removeTransaction(id){
    transactions = transactions.filter(t=>t.id!==id);
    saveTransactions();
    init();
}

function saveTransactions(){
    users[currentUser].transactions = transactions;
    localStorage.setItem('users', JSON.stringify(users));
}

function renderChart(){
    const categoryTotals = {};
    transactions.forEach(t=>{ if(!categoryTotals[t.category]) categoryTotals[t.category]=0; categoryTotals[t.category]+=t.amount; });
    const ctx = document.getElementById('categoryChart').getContext('2d');
    if(window.categoryChart) window.categoryChart.destroy();
    window.categoryChart = new Chart(ctx, { type:'bar', data:{ labels:Object.keys(categoryTotals), datasets:[{label:'Amount ($)', data:Object.values(categoryTotals), backgroundColor:Object.values(categoryTotals).map(a=>a>=0?'green':'red') }]}, options:{responsive:true, plugins:{legend:{display:false}}} });
}

function init(){
    list.innerHTML='';
    transactions.forEach(addTransactionDOM);
    updateValues();
    renderChart();
}

form.addEventListener('submit', addTransaction);
init();
