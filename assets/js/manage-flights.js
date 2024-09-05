// Handle flight form submission
document.getElementById('addFlightForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const flightNumber = document.getElementById('flightNumber').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const price = document.getElementById('price').value;

    const flight = { flightNumber, from, to, date, price };

    // Save the flight to local storage
    let flights = JSON.parse(localStorage.getItem('flights')) || [];
    const existingFlightIndex = flights.findIndex(f => f.flightNumber === flightNumber);

    if (existingFlightIndex !== -1) {
        flights[existingFlightIndex] = flight; // Update existing flight
    } else {
        flights.push(flight); // Add new flight
    }

    localStorage.setItem('flights', JSON.stringify(flights));

    alert(`Flight ${flightNumber} added/updated successfully!`);
    document.getElementById('addFlightForm').reset();
    
    // Close the modal programmatically
    const addFlightModal = new bootstrap.Modal(document.getElementById('addFlightModal'));
    addFlightModal.hide();

    // Reload the flight list
    loadFlights();
});

// Display flights in the list
function addFlightToList(flight) {
    const flightList = document.getElementById('flightList');
    const flightCard = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${flight.flightNumber}</h5>
                <p class="card-text">From: ${flight.from} To: ${flight.to}</p>
                <p class="card-text">Date: ${flight.date}</p>
                <p class="card-text">Price: ${flight.price}</p>
                <button class="btn btn-danger" onclick="deleteFlight('${flight.flightNumber}')">Delete</button>
            </div>
        </div>
    `;
    flightList.innerHTML += flightCard;
}

// Delete flight and update local storage
function deleteFlight(flightNumber) {
    let flights = JSON.parse(localStorage.getItem('flights')) || [];
    flights = flights.filter(flight => flight.flightNumber !== flightNumber);
    localStorage.setItem('flights', JSON.stringify(flights));
    
    loadFlights();
    alert('Flight deleted successfully!');
}

// Load flights from local storage on page load
function loadFlights() {
    const flights = JSON.parse(localStorage.getItem('flights')) || [];
    const flightList = document.getElementById('flightList');
    flightList.innerHTML = '';
    flights.forEach(addFlightToList);
}

// Call the function to load flights when the page loads
window.onload = loadFlights;
