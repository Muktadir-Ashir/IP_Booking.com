document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const admin = JSON.parse(localStorage.getItem('admin')) || { email: 'admin@example.com', password: 'admin123' };

    // Check if admin is logging in
    if (email === admin.email && password === admin.password && role === 'admin') {
        localStorage.setItem('loggedInUser', JSON.stringify({ email, role }));
        window.location.href = 'admin.html';
    } else {
        const user = users.find(user => user.email === email && user.password === password && user.role === role);
        
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'user-interface.html';  // Redirect to user interface
        } else {
            alert('Invalid credentials or role selection. Please try again.');
        }
    }
});
