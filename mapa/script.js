getData();

var map = L.map("mapid").on("load", onMapLoad).setView([41.4, 2.206], 17);
map.locate({ setView: true, maxZoom: 17 });

var tiles = L.tileLayer(
	"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	{}
).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];



//LLamada al la API  datos almacenados & Loop de markers
function onMapLoad() { }

async function getData() {
	const response = await fetch("http://localhost/mapa/api/apiRestaurantes.php");
	var data = await response.json();
	data_markers = data;
	render_to_map(data_markers, "todos");

	var filter = document.getElementById("kind_food_selector");

	var foodStyles = [];
	var result = [];

	//Loop to itereate over Kind_food
	for (var i of data_markers) {
		if (!i.kind_food.includes(',')) {
			foodStyles.push(i.kind_food);
		}
		foodStyles.forEach(function (item) {
			if (result.indexOf(item) < 0) {
				result.push(item);
			}
		});
	}
	// loop to create option elements
	for (var i = 0; i < result.length; i++) {
		var opt = result[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		filter.appendChild(el);
	}
}

// Create "todos" option as a filter
$("#kind_food_selector").html(new Option("Todos", "all"));

$("#kind_food_selector").on("change", function () {
	render_to_map(data_markers, this.value);
	console.log(this.value);
});

//Render markers to MAP

function render_to_map(data_markers, filter) {
	//clear markers first
	markers.clearLayers();
	data_markers.forEach(function (index) {
		if (filter == "all" || index.kind_food.split(",").includes(filter)) {
			marker = L.marker([index.lat, index.lng]).bindPopup(
				"<b>" + index.name + "</b> " + index.kind_food);
			markers.addLayer(marker);

		}
	});
	map.addLayer(markers);
}