const sheetId = '1Y9CXKU_kDafCxBK8vjMYfA5h_U5vt9REuzHQXN2RRxQ'; // Your Sheet ID
const sheetName = 'Sheet1';
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${process.env.API_KEY}`;

// Function to load events from Google Sheets
async function loadEvents() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const rows = data.values.slice(1); // Skip header row
        const container = document.getElementById('events-container');
        container.innerHTML = '';

        rows.forEach(row => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'events';
            eventDiv.innerHTML = `
                <h3>${row[0]}</h3>
                <p>Date: ${row[1]}</p>
                <p>Location: ${row[2]}</p>
            `;
            container.appendChild(eventDiv);
        });
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
}, 5000); // Auto slide every 5 seconds

// Navigation functionality (if needed for future features)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Navigation functionality can be added here');
    });
});
