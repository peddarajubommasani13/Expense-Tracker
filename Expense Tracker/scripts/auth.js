// SIGNUP
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(`users_${username}`)) {
      alert('Username already exists!');
      return;
    }

    const userData = { password, transactions: [] };
    localStorage.setItem(`users_${username}`, JSON.stringify(userData));
    alert('Account created successfully! Please login.');
    window.location.href = 'index.html';
  });
}

// LOGIN
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const userData = JSON.parse(localStorage.getItem(`users_${username}`));
    if (!userData || userData.password !== password) {
      alert('Invalid username or password!');
      return;
    }

    localStorage.setItem('currentUser', username);
    window.location.href = 'tracker.html';
  });
}
