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
	const accuracy = 500;

	console.log('Lat : ', lat);
	console.log('Long : ', long);
	
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
	if (!document.querySelector('.custom-button')) {
		var CustomButton = L.Control.extend({
		  options: {
		    position: 'bottomright' // Position of the button
		  },
		  onAdd: function (map) {
		    // Create a button element
		    var button = L.DomUtil.create('button', 'custom-button');
		    button.innerHTML = `<i class='fa-solid fa-location-crosshairs'></i>`;
		    // button.innerHTML = `<i class='fa-solid fa-street-view'></i>`;
		    button.classList.add('btn')
		    button.classList.add('btn-primary')
		    button.classList.add('rounded-circle')

		    // Attach a click event
		    L.DomEvent.on(button, 'click', function () {
		      	map.setView([lat, long]);
		    });

		    return button;
		  }
		});

		// Add the custom button to the map
		map.addControl(new CustomButton());
	}
	
}

function error(error) {
	console.log(error)
	if (error.code == 1) {
		alert('Please allow the location permission.');
	} else {
		alert("Doesn't support locatinon.");
	}
}

navigator.geolocation.getCurrentPosition(success, error, {
	enableHighAccuracy : true,
});


// fetch(`https://ipinfo.io/json?token=${API_KEY}`)
// .then(res => res.json())
// .then(data => {
// 	console.log('Data : ', data)
// 	var location = data.loc.split(',');
// 	console.log('location : ', location)
// 	const latitude = location[0];
// 	const longitude = location[1];

// 	marker = L.marker([latitude, longitude]).addTo(map);
// 	circle = L.circle([latitude, longitude], { radius: 500 }).addTo(map);
// })