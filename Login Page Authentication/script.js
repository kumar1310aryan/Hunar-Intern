document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('signupFormContainer').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('signupFormContainer').style.display = 'none';
});


const users = JSON.parse(localStorage.getItem('users')) || {};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');

    if (users[username] && users[username] === password) {
        window.location.href = 'login_success.html';
    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Invalid username or password.';
    }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const messageElement = document.getElementById('signupMessage');

    if (users[username]) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Username already exists.';
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'signup_success.html';
    }
});
