document.addEventListener('DOMContentLoaded', function() {
    const confirmationDetails = document.getElementById('confirmationDetails');

    // Retrieve booking details from local storage
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

    if (bookingDetails) {
        // Display booking details
        confirmationDetails.innerHTML = `
            <p><strong>Flight Number:</strong> ${bookingDetails.flightNumber}</p>
            <p><strong>Email:</strong> ${bookingDetails.email}</p>
            <p><strong>Seats:</strong> ${bookingDetails.seats}</p>
            <p><strong>Class:</strong> ${bookingDetails.class}</p>
            <p><strong>Children:</strong> ${bookingDetails.children}</p>
            <p><strong>Passport Number:</strong> ${bookingDetails.passport}</p>
            <p><strong>Booking Status:</strong> Confirmed</p>
        `;

        // Save booking details in the booking history
        let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
        bookingHistory.push(bookingDetails);
        localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
    } else {
        confirmationDetails.innerHTML = '<p>No booking details found.</p>';
    }

    // Optionally, clear the booking details after saving to history
    localStorage.removeItem('bookingDetails');
});
