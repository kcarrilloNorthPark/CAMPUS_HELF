// Camp-helf Super App JavaScript
// This file controls interactivity, API calls, map loading, profile saving, and events.

console.log("Camp-helf JS Loaded Successfully");

//---------------------------------------------
// EVENTS PAGE: Fetch Events from a Public API
//---------------------------------------------
async function loadEvents() {
    const eventContainer = document.getElementById("eventsContainer");
    if (!eventContainer) return;

    try {
        // Placeholder API (replace with actual events API)
        const response = await fetch("https://api.sampleapis.com/futurama/episodes");
        const data = await response.json();

        const events = data.slice(0, 6);
        eventContainer.innerHTML = "";

        events.forEach(event => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card card-custom">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.desc || 'No description available.'}</p>
                    <button class="save-btn">Add to Calendar</button>
                </div>
            `;
            eventContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Events API error:", error);
    }
}

//---------------------------------------------
// DINING PAGE: Display Menu Cards
//---------------------------------------------
function loadMenu() {
    const menuContainer = document.getElementById("menuContainer");
    if (!menuContainer) return;

    const menuItems = {
        'Entrees': ['Pizza', 'Burger', 'Mango'],
        'Drinks': ['Coke', 'Shake', 'Fanta'],
        'Dessert': ['Muffin', 'Sorbet', 'Pie']
    };

    menuContainer.innerHTML = "";

    for (const category in menuItems) {
        menuItems[category].forEach(item => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class='card card-custom'>
                    <h5 class='card-title'>${item}</h5>
                    <p class='card-text'>Category: ${category}</p>
                </div>
            `;
            menuContainer.appendChild(card);
        });
    }
}

//---------------------------------------------
// MAP PAGE: Initialize Leaflet Map
//---------------------------------------------
function initMap() {
    const mapElement = document.getElementById("campusMap");
    if (!mapElement) return;

    const map = L.map("campusMap").setView([41.8781, -87.6298], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    const buildings = [
        {name: 'Main Library', coords: [41.8785, -87.6298]},
        {name: 'Student Center', coords: [41.8780, -87.6285]},
        {name: 'Dining Hall', coords: [41.8775, -87.6305]},
        {name: 'Engineering Building', coords: [41.8790, -87.6290]}
    ];

    buildings.forEach(b => {
        L.marker(b.coords).addTo(map).bindPopup(`<b>${b.name}</b>`);
    });
}

//---------------------------------------------
// PROFILE PAGE: Save User Info to Local Storage
//---------------------------------------------
function saveProfile() {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const preferencesField = document.getElementById("preferences");

    if (!nameField || !emailField) return;

    const profile = {
        name: nameField.value,
        email: emailField.value,
        preferences: preferencesField.value
    };

    localStorage.setItem("camphelfProfile", JSON.stringify(profile));
    const message = document.getElementById("profileMessage");
    if (message) message.style.display = 'block';
}

function loadProfile() {
    const saved = localStorage.getItem("camphelfProfile");
    if (!saved) return;

    const profile = JSON.parse(saved);
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const preferencesField = document.getElementById("preferences");

    if (nameField) nameField.value = profile.name;
    if (emailField) emailField.value = profile.email;
    if (preferencesField) preferencesField.value = profile.preferences;
}

//---------------------------------------------
// INITIALIZE PAGE ON LOAD
//---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
    loadMenu();
    initMap();
    loadProfile();

    const saveBtn = document.getElementById("saveProfile");
    if (saveBtn) saveBtn.addEventListener("click", saveProfile);

    console.log("All Camp-helf scripts initialized.");
});
