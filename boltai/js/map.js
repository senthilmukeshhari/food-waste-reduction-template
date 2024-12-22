// Initialize the map centered on Madurai
const map = L.map('map', {
    zoomControl: false // We'll add it manually to the top-right
}).setView([9.9252, 78.1198], 13);

// Add zoom control to the top-right
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Add OpenStreetMap tiles with a subtle color scheme
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    opacity: 0.9
}).addTo(map);

// Custom marker icon
const customIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Sample food donation locations
const locations = [
    {
        name: "Fresh Bread",
        lat: 9.9252,
        lng: 78.1198,
        description: "Fresh bread available for donation",
        time: "12:00 PM",
        quantity: "20 loaves"
    },
    {
        name: "Fresh Fruits",
        lat: 9.9300,
        lng: 78.1250,
        description: "Assorted fruits available for donation",
        time: "1:30 PM",
        quantity: "5 kg"
    }
];

// Add markers with enhanced popups
locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng], {
        icon: customIcon,
        riseOnHover: true
    }).addTo(map);
    
    // Create enhanced popup content
    const popupContent = `
        <h3>📍 ${location.name}</h3>
        <p>${location.description}</p>
        <p>🕐 Available at: ${location.time}</p>
        <p>📦 Quantity: ${location.quantity}</p>
    `;
    
    // Bind popup with custom options
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
    });

    // Add hover effect
    marker.on('mouseover', function() {
        this.openPopup();
    });
});

// Add a subtle animation when the map loads
map.on('load', () => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.setOpacity(0);
            setTimeout(() => {
                layer.setOpacity(1);
            }, 500);
        }
    });
});