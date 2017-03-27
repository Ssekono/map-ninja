<html>
<head>
	<title></title>
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
	<link rel="stylesheet" href="malibro-map.css" />

	<style type="text/css">

	body {
		background-color: #999999;
		font-family: sans-serif;
		font-size: 0.8em;
	}

	.content-wrapper {
		width: 80%;
		height: 400px;
		margin: 50px auto;
		background-color: #FFFFFF;
	}
	</style>
</head>
<body>

	<div class="content-wrapper">
		<div id="map-wrapper">
			<div id="mapid"></div>
		</div>
	</div>


<?php $latitude =  0.3191812218795007; ?>;
<?php $longitude =  32.58124136911647; ?>;
<?php $address =  '<b>Our New Location</b><br>Street Address'; ?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
<script type="text/javascript">
$(document).ready(function() {

	var zoom = 15;
	var latitude = <?php echo $latitude; ?>;
	var longitude = <?php echo $longitude; ?>;

	var location = new L.LayerGroup();

	//BASELAYER
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">openstreetmap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">cc-by-sa</a>, ' +
			'imagery © <a href="http://mapbox.com">mapbox</a>',
		//mbUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
		mbUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Nla29ubyIsImEiOiJjaXI0Zmk4Y2QwMDNvaHptYzNtdWplNXI3In0.E4QcGdi1qdwQVa5yYd3bRw';

    var grayscale   = L.tileLayer(mbUrl);

    //MAP PROPERTIES
	var mymap = L.map('mapid', {
	    center: [latitude, longitude],
	    zoom: zoom,
	    layers: [grayscale, location],
	    zoomControl: false
	});

	L.control.zoom({'position': 'topright'}).addTo(mymap);
	L.marker([latitude, longitude]).bindPopup('<?php echo $address; ?>').addTo(location);

});
</script>

</body>
</html>


