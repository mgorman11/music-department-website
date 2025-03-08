let slideIndex = 0;
showSlides();

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000);
}

// Load events dynamically
fetch('data/events.json')
    .then(response => response.json())
    .then(events => {
        const container = document.getElementById('events-container');
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'events';
            eventDiv.innerHTML = `
                <h3>${event.title}</h3>
                <p>Date: ${event.date}</p>
                <p>Location: ${event.location}</p>
            `;
            container.appendChild(eventDiv);
        });
    })
    .catch(error => console.error('Error loading events:', error));
