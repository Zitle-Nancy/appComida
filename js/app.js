var listaRestaurantes =[
	{
		"categoria":"Comida Italiana",
		"nombre": "Trattoria Giacovanni",
		"foto": "https://goo.gl/F0elPJ",
		"direccion": "Av. Sonora #180 Local 6, Cuauhtémoc, Condesa, 06100 Ciudad de México, CDMX",
		"latitudes": "19.4132529",
		"longitudes": "-99.169946"

	},
	{
		"categoria":"Comida Italiana",
		"nombre": "Bruno's / FeQ Pizza e cucina d`Italia",
		"foto": "https://goo.gl/u2Apye",
		"direccion": "Cumbres de Maltrata 376, Benito Juárez, Narvarte, 03020 Ciudad de México, CDMX",
		"latitudes": "19.3908123",
		"longitudes": "-99.1525949"
	},
	{
		"categoria":"Comida Oriental",
		"nombre": "Rokai",
		"foto": "https://goo.gl/bIqUWZ",
		"direccion": "Río Ebro 87, Cuauhtémoc, 06500 Ciudad de México, CDMX",
		"latitudes": "19.4287171",
		"longitudes": "-99.1717733"
	},
	{
		"categoria":"Comida Mexicana",
		"nombre": "La Poblanita de Tacubaya Suc Patriotismo",
		"foto": "https://goo.gl/XJRhRW",
		"direccion": "Avenida Patriotismo #77, Miguel Hidalgo, Escandón I Secc, 11800 Ciudad de México, CDMX",
		"latitudes": "19.402274",
		"longitudes": "-99.181394"
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
				'<div class="card-content address" data-latitud="__latitudes__" data-longitud="__longitudes__">'+
					'<strong>Direccion:</strong>__direccion__<br>'+
					'<a href="#mapa">Ubicate</a>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';

var cargarPagina = function () {
	mostrarListas(listaRestaurantes);
	$("#obtener-localizacion").click(obtenerUbicacion);
	$('.address').click(cambiarUbicacion);	
	$('#search-form').submit(filtrar);
};
var obtenerUbicacion = function (e) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion, function (error) {
			// console.log(error);
		});
	} else {
		alert("Actualice su navegador");
	}
	// alert('mapa');
};
var mostrarPosicion = function (posicion) {
	// console.log(posicion);
	var coordenadas = {
		lat: posicion.coords.latitude, 
		lng: posicion.coords.longitude
	};
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('#mapa')[0], {
      zoom: 15,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}

var mostrarListas = function(listaRestaurantes){
 	// console.log(listaRestaurantes);
 	var plantillaMostrar = "";
	//como parametro la unidad en este caso es restaurante es mi this
	listaRestaurantes.forEach(function(restaurante){
		plantillaMostrar += plantilla.replace('__categoria__',restaurante.categoria)
									 .replace('__nombre__',restaurante.nombre)
									 .replace('__foto__',restaurante.foto)
									 .replace('__direccion__',restaurante.direccion)
									 .replace('__latitudes__',restaurante.latitudes)
									 .replace('__longitudes__',restaurante.longitudes);

	});							 
	$('#seccion-comida').html(plantillaMostrar);
 }

var cambiarUbicacion = function(){
	//va el nombre del data, no del objeto
	var latitudRestaurante = $(this).data('latitud');
	// console.log(latitudRestaurante);
	var longitudRestaurante = $(this).data('longitud');
	// console.log(longitudRestaurante);
	var coordenadas = {
		lat: latitudRestaurante,
		lng: longitudRestaurante
	};
	// console.log(coordenadas);
	mostrarMapa(coordenadas);
}

var filtrar = function(e){
	e.preventDefault();
	var formatoBusqueda = $('#buscar').val().toLowerCase();
	var filtroRestaurantes = listaRestaurantes.filter(function(restaurantes){
		return restaurantes.categoria.toLowerCase().indexOf(formatoBusqueda) >= 0;
	});
	//es una parametro y es mi variable
	mostrarListas(filtroRestaurantes);
	
}
$(document).ready(cargarPagina);

