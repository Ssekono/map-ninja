$(document).ready(function() {

	var zoom = 7;
	var latitude = 1.53;
	var longitude = 32.21;

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

	var newMarker;
	mymap.on('click', function(e) {

		//DRAW MARKER IF IT DOES NOT EXIST
		if(typeof(newMarker)==='undefined')
		{
		    document.getElementById('lat').value = e.latlng.lat;
		    document.getElementById('lon').value = e.latlng.lng;

	        newMarker = new L.marker(e.latlng, {draggable:true});
	        mymap.addLayer(newMarker);
	        newMarker.bindPopup("<b>Location:</b><br />"+e.latlng.lat+", "+e.latlng.lng);    
		}
		//UPDATE LATLONG IF MARKER EXISTS
		else 
		{
		    document.getElementById('lat').value = e.latlng.lat;
		    document.getElementById('lon').value = e.latlng.lng;
			newMarker.setLatLng(e.latlng);
		}

        //LATLONG AFTER DRAGGING
		newMarker.on('dragend', function(e){
			var position = e.target.getLatLng();
		    document.getElementById('lat').value = position.lat;
		    document.getElementById('lon').value = position.lng;
		    newMarker.bindPopup("<b>Location:</b><br />"+position.lat+", "+position.lng);
		});
	});

	$(document).on('click', '.search-location', function() {
		// var zoom = 16;
		// var lat_value = $(this).attr('geo-lat');
		// var lon_value = $(this).attr('geo-lon');
		//mymap.setView([lat_value, lon_value], zoom);

		var bounding = $(this).attr('boundingbox');
		var boundVals = bounding.split(',');	    
	    //FIT MAP IN BOUNDING BOX
		mymap.fitBounds([
		    [boundVals[0], boundVals[2]], //south west corner of box
		    [boundVals[1], boundVals[3]]  //north east corner of box
		]);
	});

	$(document).on('click', '#search-place', function(e){
		e.preventDefault();
		var searched = $('#search').val();
		var searched_formatted = searched.split(' ').join('%20');
		var url = 'http://nominatim.openstreetmap.org/search/'+searched_formatted+'?format=json&addressdetails=1&polygon_svg=1';

		//REMOVE UL IF IT EXISTS
		if ($('#search-results').find('ul').length > 0) {
			$('#search-results ul').remove();
		}
		//RUN THROBBER
		$('#ajax-loader-throbber').addClass('show-throbber');
		$.getJSON(url, function(data) {
			//HIDE THROBBER			
			$('#ajax-loader-throbber').removeClass('show-throbber');
			$('#search-results').append('<ul />');
			$('#search-results ul').append('<li class=""><span id="search-results-title">Search Results<a id="hide-search-results" href="javascript:;"><i class="fa fa-close"></i></a></span></li>');
			
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					$('#search-results ul').append('<li class=""><a class="search-location" href="javascript:;" boundingbox="'+data[i]['boundingbox']+'" geo-lat="'+data[i]['lat']+'" geo-lon="'+data[i]['lon']+'">'+data[i]['display_name']+'</a></li>');
				}
			} else{
				$('#search-results ul').append('<li class=""><span id="no-search-results">No Results Found</span></li>');
			}
			if (!$('#search-results').is(':visible')) {
				$('#search-results').show();
			}
		});

		//SET SCROLLER
		var mapHeight = $('#mapid').height();
		var formHeight = $('#search-panel form').height();
		var resultHeight = mapHeight - formHeight - 20;
		$('#search-results').css({ 'height': resultHeight, 'overflow': 'auto' });

	});

	//HIDE SEARCHED RESULTS
	$(document).on('click', '#hide-search-results', function(e){
		if ($('#search-results').is(':visible')) {
			$('#search-results').hide();
		}
	});

});