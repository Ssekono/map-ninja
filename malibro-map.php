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
			<div id="search-panel">
				<form>
					<div id="search-wrapper">
						<input type="text" id="search" placeholder="Search location">
						<button type="submit" id="search-place"><i class="fa fa-search"></i></button>
					</div>
				</form>
				<div id="search-results">
					<img id="ajax-loader-throbber" src="ajax-loader.gif">
				</div>
			</div>
		</div>
	</div>


	<form>
		<input type="text" id="lat" value="" name="geo_lat">
		<input type="text" id="lon" value="" name="geo_lon">
	</form>





<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
<script type="text/javascript" src="malibro-map.js"></script>

</body>
</html>


