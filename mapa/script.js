getData();

var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 17);
map.locate({ setView: true, maxZoom: 17 });

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];

var foodStyles = ["Mediterraneo", "Hindu", "Vegetariano", "Tapas", "Marisqueria", "Paellas"];
var select = document.getElementById("kind_food_selector");


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
	// var foodStyles = ["Mediterraneo", "Hindu", "Vegetariano", "Tapas", "Marisuqeria", "Paellas"];
	foodStyles.sort();

	for (var i = 0; i < foodStyles.length; i++) {
		option = document.createElement("option");
		option.innerHTML = foodStyles[i];
		select.appendChild(option);
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


function render_to_map(data_markers) {
	for (i of data_markers) {
		if (select.value == "Mediterraneo" && i.name == "Leka") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Mediterraneo" && i.name == "Cala Nuri") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Mediterraneo" && i.name == "Blue Bar") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Mediterraneo" && i.name == "Hoppiness") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Marisqueria" && i.name == "rangoli") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Marisqueria" && i.name == "L'Escamarla") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Paellas" && i.name == "Can Bigotis") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Hindu" && i.name == "Punjab") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Vegetariano" && i.name == "La forastera") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Tapas" && i.name == "La Cova Fumada") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}
		if (select.value == "Vegetariano" && i.name == "La Forastera") {
			marker = L.marker([i.lat, i.lng]).bindPopup("<b>" + i.name + "</b><br>" + i.adress + "<br>" + i.kind_food).addTo(map);
		}

	}
}



