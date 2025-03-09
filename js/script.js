document.addEventListener("DOMContentLoaded", function() {
    const sheetId = '1Y9CXKU_kDafCxBK8vjMYfA5h_U5vt9REuzHQXN2RRxQ';
    const sheetName = 'Sheet1';
const apiKey = window.API_KEY;
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    // Load events from Google Sheets
    async function loadEvents() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (!data.values) {
                console.error("No data found.");
                return;
            }

            const rows = data.values.slice(1);
            const container = document.getElementById('upcoming-events');
            const today = new Date();
            container.innerHTML = '';

            rows.forEach(row => {
                const [date, time, title, location, description, link] = row;
                const eventDate = new Date(date);

                if (eventDate >= today) {
                    const eventElement = document.createElement("div");
                    eventElement.className = 'event';
                    eventElement.innerHTML = `
                        <h3>${title || 'Untitled Event'}</h3>
                        <p><strong>Date:</strong> ${date}</p>
                        ${time ? `<p><strong>Time:</strong> ${time}</p>` : ''}
                        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
                        ${description ? `<p>${description}</p>` : ''}
                        ${link ? `<a href="${link}" target="_blank">More Info</a>` : ''}
                    `;
                    container.appendChild(eventElement);
                }
            });
        } catch (error) {
            console.error("Error fetching events:", error);
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
        const slides = document.querySelectorAll('.slides');
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }

        slides.forEach((slide, index) => {
            slide.style.display = (index === slideIndex) ? 'block' : 'none';
        });
    }

    setInterval(() => {
        slideIndex++;
        showSlides();
    }, 3000);

    // Navigation functionality
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navigation functionality can be added here');
        });
    });
});




