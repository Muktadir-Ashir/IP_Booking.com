document.addEventListener("DOMContentLoaded", function () {
    const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    const bookingList = document.getElementById("bookingList");

    if (bookingHistory.length > 0) {
        bookingHistory.forEach((booking, index) => {
            const bookingItem = document.createElement("div");
            bookingItem.classList.add("col-md-6", "mb-4");

            bookingItem.innerHTML = `
                <div class="card p-3">
                    <h5 class="card-title">Flight Number: ${booking.flightNumber || 'N/A'}</h5>
                    <p class="card-text">
                        <strong>Date:</strong> ${booking.date || 'N/A'}<br>
                        <strong>From:</strong> ${booking.from || 'N/A'}<br>
                        <strong>To:</strong> ${booking.to || 'N/A'}<br>
                        <strong>Seats:</strong> ${booking.seats || 'N/A'}<br>
                        <strong>Class:</strong> ${booking.class || 'N/A'}<br>
                    </p>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            bookingList.appendChild(bookingItem);
        });
    } else {
        bookingList.innerHTML = '<p>No bookings found.</p>';
    }

    bookingList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            bookingHistory.splice(index, 1);
            localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
            window.location.reload();
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});
