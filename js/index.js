var map = L.map('map');
let marker, circle, zoomed;

map.setView([51.505, -0.09], 13);

// Change the position of zoom controls to bottom-right
map.zoomControl.setPosition('bottomleft');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function success(position) {
	const lat = position.coords.latitude;
	const long = position.coords.longitude;
	const accuracy = position.coords.accuracy;
	
	if(marker){
		map.removeLayer(marker);
		map.removeLayer(circle);
	}

	marker = L.marker([lat, long]).addTo(map);
	circle = L.circle([lat, long], { radius: accuracy }).addTo(map);

	
	if(!zoomed){
		zoomed = map.fitBounds(circle.getBounds());
	}

	map.setView([lat, long]);

	// Create a custom control
	var CustomButton = L.Control.extend({
	  options: {
	    position: 'bottomright' // Position of the button
	  },
	  onAdd: function (map) {
	    // Create a button element
	    var button = L.DomUtil.create('button', 'custom-button');
	    button.innerHTML = "Click Me"; // Button text
	    button.classList.add('btn')
	    button.classList.add('btn-primary')

	    // Attach a click event
	    L.DomEvent.on(button, 'click', function () {
	      	map.setView([lat, long]);
	    });

	    return button;
	  }
	});

	// Add the custom button to the map
	console.log(map.CustomButton);
	map.addControl(new CustomButton());
	console.log(map.CustomButton);
	
}

function error(error) {
	console.log(error)
	if (error.code == 1) {
		alert('Please allow the location permission.');
	} else {
		alert("Doesn't support locatino");
	}
}

navigator.geolocation.watchPosition(success, error);