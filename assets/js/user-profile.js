document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('No user is currently logged in.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById("userName").value = loggedInUser.username;
    document.getElementById("userEmail").value = loggedInUser.email;

    document.getElementById("profileForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;

        if (currentPassword !== loggedInUser.password) {
            alert("Current password is incorrect.");
            return;
        }

        const updatedUser = {
            ...loggedInUser,
            username: document.getElementById("userName").value,
            email: document.getElementById("userEmail").value,
            password: newPassword,
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(user => user.email === loggedInUser.email ? updatedUser : user);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        alert("Profile and password updated successfully!");
    });
});
