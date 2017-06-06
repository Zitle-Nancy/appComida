var listaRestaurantes =[
	{
		"categoria":"Comida Italiana",
		"nombre": "Trattoria Giacovanni",
		"foto": "https://goo.gl/F0elPJ",
		"direccion": "Av. Sonora #180 Local 6, Cuauhtémoc, Condesa, 06100 Ciudad de México, CDMX"

	},
	{
		"categoria":"Comida Italiana",
		"nombre": "Bruno's / FeQ Pizza e cucina d`Italia",
		"foto": "https://goo.gl/u2Apye",
		"direccion": "Cumbres de Maltrata 376, Benito Juárez, Narvarte, 03020 Ciudad de México, CDMX"
	},
	{
		"categoria":"Comida Oriental",
		"nombre": "Rokai",
		"foto": "https://goo.gl/bIqUWZ",
		"direccion": "Río Ebro 87, Cuauhtémoc, 06500 Ciudad de México, CDMX"
	},
	{
		"categoria":"Comida Mexicana",
		"nombre": "La Poblanita de Tacubaya Suc Patriotismo",
		"foto": "https://goo.gl/XJRhRW",
		"direccion": "Avenida Patriotismo #77, Miguel Hidalgo, Escandón I Secc, 11800 Ciudad de México, CDMX"
	}
];
var plantilla = '<div class="col s12 m7">'+
		'<h2 class="header">__categoria__</h2>'+
		'<h3>__nombre__</h3>'+
		'<div class="card horizontal">'+
			'<div class="card-image">'+
				'<img src="__foto__">'+
			'</div>'+
			'<div class="card-stacked">'+
				'<div class="card-content">'+
					'<strong>Direccion:</strong>__direccion__<br>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';

var cargarPagina = function () {
	$("#obtener-localizacion").click(obtenerUbicacion);
	mostrarListas(listaRestaurantes);
};
var obtenerUbicacion = function (e) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion, function (error) {
			console.log(error);
		});
	} else {
		alert("Actualice su navegador");
	}
	// alert('mapa');
};
var mostrarPosicion = function (posicion) {
	console.log(posicion);
	var coordenadas = {
		lat: posicion.coords.latitude, 
		lng: posicion.coords.longitude
	};
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('#mapa')[0], {
      zoom: 8,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}

var mostrarListas = function(listaRestaurantes){
 	console.log(listaRestaurantes);
 	var plantillaMostrar = "";
	//como parametro la unidad en este caso es restaurante es mi this
	listaRestaurantes.forEach(function(restaurante){
		plantillaMostrar += plantilla.replace('__categoria__',restaurante.categoria)
									 .replace('__nombre__',restaurante.nombre)
									 .replace('__foto__',restaurante.foto)
									 .replace('__direccion__',restaurante.direccion);

	});							 
	$('#seccion-comida').html(plantillaMostrar);
 }

$(document).ready(cargarPagina);
