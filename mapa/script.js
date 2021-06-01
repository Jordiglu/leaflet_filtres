getData();

var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 17);
map.locate({ setView: true, maxZoom: 17 });

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];

var foodStyles = ["mediterraneo", "hindu", "vegetariano", "tapas", "marisqueria", "paellas"];
var filter = document.getElementById("kind_food_selector");


//LLamada al la API  datos almacenados & Loop de markers
function onMapLoad() {
}

var marker;
async function getData() {
	const response = await fetch('http://localhost/mapa/api/apiRestaurantes.php');
	var data = await response.json();
	data_markers = data;
	for (i of data_markers) {
		i.lat = parseFloat(i.lat);
		i.lng = parseFloat(i.lng);
		marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress);
		markers.addLayer(marker).addTo(map);
	}
}
// funcion para Cargar kind-food al campo <select>
function kindOfFood() {
	foodStyles.sort();

	for (var i = 0; i < foodStyles.length; i++) {
		option = document.createElement("option");
		option.innerHTML = foodStyles[i];
		filter.appendChild(option);
	}
}
kindOfFood();


$('#kind_food_selector').on('change', function () {
	render_to_map(data_markers, this.value);
	console.log(this.value);



});


//Remove all markers

map.on('click', function () {
	map.removeLayer(markers);
});



// });
function render_to_map(data_markers, filter) {
	data_markers.forEach(function (index) {
		if (filter == 'all' || index.kind_food.split(',').includes(filter)) {
			marker = L.marker([index.lat, index.lng]).bindPopup("<b>" + index.name + "</b> " + index.kind_food).addTo(map);
		}
	});
}




