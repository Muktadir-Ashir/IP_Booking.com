document.addEventListener('DOMContentLoaded', function() {
    loadPassengers();
});

function loadPassengers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const passengerList = document.getElementById('passengerList');

    // Filter out only those who are not admins
    const passengers = users.filter(user => user.role === 'user');

    if (passengers.length === 0) {
        passengerList.innerHTML = '<p>No passengers registered yet.</p>';
        return;
    }

    passengerList.innerHTML = '';
    passengers.forEach((passenger, index) => {
        const passengerItem = document.createElement('div');
        passengerItem.className = 'card mb-3';
        passengerItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${passenger.username}</h5>
                <p class="card-text"><strong>Email:</strong> ${passenger.email}</p>
                <button class="btn btn-danger" onclick="deletePassenger(${index})">Delete</button>
            </div>
        `;
        passengerList.appendChild(passengerItem);
    });
}

function deletePassenger(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const passengers = users.filter(user => user.role === 'user');
    passengers.splice(index, 1);

    // Update the main user list
    const updatedUsers = users.filter(user => user.role !== 'user').concat(passengers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    loadPassengers();
}
