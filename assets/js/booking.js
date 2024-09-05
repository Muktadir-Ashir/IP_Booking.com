// Load flight details
window.onload = function() {
    const selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));

    if (selectedFlight) {
        document.getElementById('flightDetails').innerHTML = `
            <h5>Flight Number: ${selectedFlight.flightNumber}</h5>
            <p>From: ${selectedFlight.from} To: ${selectedFlight.to}</p>
            <p>Date: ${selectedFlight.date}</p>
            <p>Price: ${selectedFlight.price}</p>
        `;
    } else {
        window.location.href = 'flights.html'; // Redirect back if no flight is selected
    }
};

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookingDetails = {
        flightNumber: JSON.parse(localStorage.getItem('selectedFlight')).flightNumber,
        from: JSON.parse(localStorage.getItem('selectedFlight')).from,
        to: JSON.parse(localStorage.getItem('selectedFlight')).to,
        date: JSON.parse(localStorage.getItem('selectedFlight')).date,
        email: document.getElementById('email').value,
        seats: document.getElementById('seats').value,
        class: document.getElementById('class').value,
        children: document.getElementById('children').value,
        passport: document.getElementById('passport').value
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // Show payment modal
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();
});

// Handle payment confirmation
document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    // Here you would normally handle the payment process
    // For this example, we will assume the payment is successful

    // Save booking details to booking history
    const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    bookingHistory.push(JSON.parse(localStorage.getItem('bookingDetails')));
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

    // Redirect to booking confirmation
    window.location.href = 'booking-confirmation.html';
});
