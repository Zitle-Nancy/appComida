// function initMap() {
//     map = new google.maps.Map(document.getElementById('mapa'), {
//       center: {lat:19.4211655, lng:-99.165415},
//       zoom: 
// });
// }
var cargarPagina = function () {
	// $("#get-location").click(obtenerUbicacion);
	mostrarPosicion();

};

// var obtenerUbicacion = function (e) {
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(mostrarPosicion);
// 	} else {
// 		alert("Actualice su navegador");
// 	}
// };

var mostrarPosicion = function (posicion) {
	console.log(posicion);
	// alert("Latitud: " + posicion.coords.latitude);
	// alert("Longitud: " + posicion.coords.longitude);

	var coordenadas = {
		lat:19.4211655, 
		lng:-99.165415
	};
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var mapa = new google.maps.Map($('#mapa')[0], {
      zoom: 17,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      mapa: mapa
    });
}

$(document).ready(cargarPagina);
