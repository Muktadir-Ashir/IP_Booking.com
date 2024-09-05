function displayFlights(flights) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (flights.length > 0) {
        flights.forEach(flight => {
            const flightCard = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${flight.flightNumber}</h5>
                        <p class="card-text">From: ${flight.from} To: ${flight.to}</p>
                        <p class="card-text">Date: ${flight.date}</p>
                        <p class="card-text">Price: ${flight.price}</p>
                        <button class="btn btn-primary" onclick="bookFlight('${flight.flightNumber}')">Book Now</button>
                    </div>
                </div>
            `;
            resultsDiv.innerHTML += flightCard;
        });
    } else {
        resultsDiv.innerHTML = '<p>No flights found.</p>';
    }
}

// Load all flights on page load
window.onload = function() {
    const flights = JSON.parse(localStorage.getItem('flights')) || [];
    displayFlights(flights);
};

// Search functionality
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;

    const flights = JSON.parse(localStorage.getItem('flights')) || [];

    const results = flights.filter(flight => 
        flight.from.toLowerCase() === from.toLowerCase() && 
        flight.to.toLowerCase() === to.toLowerCase() && 
        flight.date === date
    );

    displayFlights(results);
});

function bookFlight(flightNumber) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        alert('You must be logged in to book a flight.');
        window.location.href = 'login.html';
    } else {
        // Retrieve the full flight details from the list of flights
        const flights = JSON.parse(localStorage.getItem('flights')) || [];
        const selectedFlight = flights.find(flight => flight.flightNumber === flightNumber);

        // Save the selected flight details to localStorage
        localStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
        window.location.href = 'booking.html';
    }
}


// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});
