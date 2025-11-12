// SIGNUP
const signupForm = document.getElementById('signup-form');
if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if(users[username]){
            alert('Username already exists');
            return;
        }
        users[username] = { password, transactions: [] };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created! Login now.');
        window.location.href = 'index.html';
    });
}

// LOGIN
const loginForm = document.getElementById('login-form');
if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if(!users[username] || users[username].password !== password){
            alert('Invalid username or password');
            return;
        }
        localStorage.setItem('currentUser', username);
        window.location.href = 'tracker.html';
    });
}
