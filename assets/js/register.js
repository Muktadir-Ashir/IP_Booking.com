document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('A user with this email already exists.');
        return;
    }

    const newUser = { username, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`User ${username} registered successfully!`);
    window.location.href = 'login.html';
});
