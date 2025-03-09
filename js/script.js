const sheetId = '1Y9CXKU_kDafCxBK8vjMYfA5h_U5vt9REuzHQXN2RRxQ'; // Your Sheet ID
const sheetName = 'Sheet1';

// The API Key will be injected by GitHub Actions
const apiKey = window.API_KEY;
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

// Function to load events from Google Sheets
async function loadEvents() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const rows = data.values.slice(1); // Skip header row
        const container = document.getElementById('events-container');
        const pastContainer = document.getElementById('past-events-container');
        container.innerHTML = '';
        pastContainer.innerHTML = '';

        const today = new Date();
        const upcomingEvents = [];
        const pastEvents = [];

        rows.forEach(row => {
            const eventName = row[0] || '';
            const eventDate = row[1] || '';
            const eventTime = row[2] || '';
            const eventLocation = row[3] || '';
            const eventDescription = row[4] || '';
            const eventLink = row[5] || '';

            // Convert eventDate to JavaScript Date object
            const eventDateObj = new Date(eventDate);

            // Sort events into upcoming or past
            const eventDiv = document.createElement('div');
            eventDiv.className = 'events';

            // Dynamically build the HTML, excluding empty fields
            let eventHTML = `<h3>${eventName}</h3>`;
            if (eventDate) eventHTML += `<p><strong>Date:</strong> ${eventDate}</p>`;
            if (eventTime) eventHTML += `<p><strong>Time:</strong> ${eventTime}</p>`;
            if (eventLocation) eventHTML += `<p><strong>Location:</strong> ${eventLocation}</p>`;
            if (eventDescription) eventHTML += `<p>${eventDescription}</p>`;
            if (eventLink) {
                if (eventLink.includes('livestream')) {
                    eventHTML += `<a href="${eventLink}" target="_blank" class="event-link">Watch Livestream</a>`;
                } else {
                    eventHTML += `<a href="${eventLink}" target="_blank" class="event-link">Get Tickets</a>`;
                }
            }

            eventDiv.innerHTML = eventHTML;

            if (eventDateObj >= today) {
                upcomingEvents.push({ date: eventDateObj, element: eventDiv });
            } else {
                pastEvents.push({ date: eventDateObj, element: eventDiv });
            }
        });

        // Sort upcoming events by date
        upcomingEvents.sort((a, b) => a.date - b.date);
        pastEvents.sort((a, b) => b.date - a.date);

        // Append to respective containers
        upcomingEvents.forEach(event => container.appendChild(event.element));
        pastEvents.forEach(event => pastContainer.appendChild(event.element));

    } catch (error) {
        console.error('Error loading events:', error);
    }
}

loadEvents();

// Slideshow functionality
let slideIndex = 0;
showSlides();

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

function showSlides() {
    let slides = document.querySelectorAll('.slides');
    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'block' : 'none';
    });
}

setInterval(() => {
    slideIndex++;
    showSlides();
}, 5000);

// Navigation functionality (if needed for future features)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Navigation functionality can be added here');
    });
});


