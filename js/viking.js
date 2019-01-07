var stationer = {};
var stationerMarker = [];
var directionsServiceSkadesAdresseTilVaerksted = new google.maps.DirectionsService({});
var directionsServiceFraStationTilSkadesadresse = new google.maps.DirectionsService({});
var directionsServiceRundtur = new google.maps.DirectionsService({});
var directionsServiceRundturRenderer = new google.maps.DirectionsRenderer({});

var directionsServiceStationTilSkade = new google.maps.DirectionsService({});
var directionsServiceSkadeTilVS = new google.maps.DirectionsService({});
var directionsServiceVSTilStation = new google.maps.DirectionsService({});

var directionsServiceStationTilSkadeRenderer = new google.maps.DirectionsRenderer({
		suppressMarkers: true,
		polylineOptions: {
			strokeColor: 'green',
			strokeWeight: 2,
			strokeOpacity: 0.9,
			editable: false,
			draggable: false
		}
});
var directionsServiceSkadeTilVSRenderer = new google.maps.DirectionsRenderer({
		suppressMarkers: true,
		polylineOptions: {
			strokeColor: 'red',
			strokeWeight: 2,
			strokeOpacity: 0.8,
			editable: false,
			draggable: false
		}
	});
var directionsServiceVSTilStationRenderer = new google.maps.DirectionsRenderer({
		suppressMarkers: true,
		polylineOptions: {
			strokeColor: 'black',
			strokeWeight: 2,
			strokeOpacity: 0.9,
			editable: false,
			draggable: false
		}
});


var directionsDisplay = new google.maps.DirectionsRenderer();
var skadesadresse = '';
var vaerkstedsadresse = '';
var distancer = [];
var stationer_bounds = [];
var koord = new google.maps.LatLng({
	lat: 56.209742,
	lng: 10.553872
});
skadesadresseKoord = new google.maps.LatLng();
vsAdresseKoord = new google.maps.LatLng();
listeVejnavneTæller = 0;
vaerkstedNavn = [];
vaerkstedPostnummer = [];
vaerkstedVej = [];
vaerkstedsliste = [];
vaerkstedslisteArray = [];
vaerkstedsinfo = [];
vaerkstedslisteFiltreret = [];
radius = '10000';
zoom = 13;
var bounds = '';
var popup_vs_foreslag = [];
var popup_station = [];
var ruteFraStationTilSkadesadresseLine = [];
var valgtStation = '';
var geocoder = new google.maps.Geocoder();
var directionsRendererIndstillinger;
var vikingKort, places, infoWindow;
var markers = [];
var autocompleteSted;
var sted;
var waypts = [];
var soegeord;
var countryRestrict = {
	'country': 'dk'
};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var infoEfterKlik = new google.maps.InfoWindow();
directionsRendererIndstillingerSkadeTilVs = {
	polylineOptions: {
		strokeColor: "#8b0013"
	},
	suppressMarkers: false,
};
var directionsRendererSkadeTilVs = new google.maps.DirectionsRenderer(directionsRendererIndstillingerSkadeTilVs);
var kortesteRute_station_til_skadesadresse;
var kortesteDistance_station_til_skadesadresse;
var station_til_skadesadresse_rute_oversigt = [];
var kortesteRute_station_til_skadesadresse_stationer;
var stationTilSkadesadresseDirectionsRenderer = [];
var stationTilSkadesadresseDirectionsService = [];
var NaermesteStaionOversigt = [];
var linieFarver = ['#5cb85c', '#2249a3', '#8b0013'];
var line_korteste = [];
var station_til_skadesadresse_rute_oversigt_directionService = [];
var request = [];
var taeller = 0;
var kontrol = 0;
var stations_cirkel = [];
var sv = new google.maps.StreetViewService();
var popup_vsadresse = '';
var samletLaengde;
var skadesadresse_vaerkstedsadresse = 0;

var event_rute_beregnet = new CustomEvent("rute_beregnet"); 

var	popup_skadesadresse_marker = new google.maps.Marker();


jQuery(document).ready(function($) {
	
	tilfoej_event_ruteBeregnet();	
	visPaamindelseStart();

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.what3words.com/v2/reverse?coords=51.521251%2C-0.203586&key=11SX5SVP&lang=da&format=json&display=full",
	  "method": "GET",
	  "headers": {}
	}
	
	$.ajax(settings).done(function (response) {
	  //console.log(response);
	});
                        
                    
	
	jQuery.expr[":"].icontains = jQuery.expr.createPseudo(function (arg) {                                                                                                                                                                
    return function (elem) {                                                            
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;        
    };                                                                                  
	});

    var modulerHentet = new CustomEvent('modulerHentet', { detail: 'state' });

	$(window).resize(function() {
		google.maps.event.trigger(vikingKort, 'resize');
	});

	jQuery('.sidenav-ikoner ul').append(
		'<li><a class="aktiverModulIndhold" id="aktiverViking"><i class="fa fa-map-signs"></i><br><span>Backoffice</span></a></li>'
	);

	jQuery(".vb-popud-handle").live('click', function(){
		target = jQuery(this).data('target');
		console.log(target);
		jQuery('#'+target).addClass('aktiv');
	});


	$.ajax({
			url: ajaxurl,
			type: "post",
			data: {
				action: 'OpretStationModal'
			}
		})
		.done(function(svar) {
			jQuery('#modulModals').append(svar);
			dawaAutocomplete.dawaAutocomplete(document.getElementById("opretStationsadresse"), {});
		});

	$("#vis_flere_stationer").live('change', function() {
		line_korteste = [];
		if (this.checked) {
			for (var i in ruteFraStationTilSkadesadresseLine) {
				ruteFraStationTilSkadesadresseLine[i].setMap(vikingKort);
			}
			//line_korteste[0].setMap(null);
		} else {
			for (var j in ruteFraStationTilSkadesadresseLine) {
				ruteFraStationTilSkadesadresseLine[j].setMap(null);
			}
			// for(var i in popup_station) {
			//     popup_station[i].setMap(null);
			// }
			line_korteste[0] = new google.maps.Polyline({
				path: station_til_skadesadresse_rute_oversigt[0].overview_path,
				strokeColor: linieFarver[0],
				strokeOpacity: 0.8,
				strokeWeight: 10
			});
			line_korteste[0].setMap(vikingKort);
		}
	});


	jQuery('.popup_naermeste_station').live('click', function(event) {
		stationsnummer = jQuery(this).attr('data-station');
		jQuery('#valgtstation').val(stationsnummer);
		koord = jQuery(this).attr('data-koord');
		document.getElementById('valgtstation').setAttribute('data-koord', koord);
		document.getElementById('valgtstation').setAttribute('data-station', stationsnummer);
		beregnRute();
		$('.popup_naermeste_station').removeClass('aktiv_station');
		$(this).addClass('aktiv_station');
	});

	jQuery('#skadestedVej').live('focus', function(event) {
		adresse = jQuery('#skadestedPostnummer').val();
		console.log(adresse);
		if (adresse !== '') {
			console.log(adresse);
			geocoder.geocode({
				'address': adresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					vikingKort.setZoom(13);
				}
			});
		}
	});
	jQuery('#skadestedForeslag').live('focus', function(event) {
		adresse = jQuery('#skadestedPostnummer').val();
		console.log(adresse);
		if (adresse !== '') {
			console.log(adresse);
			geocoder.geocode({
				'address': adresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					vikingKort.setZoom(13);
				}
			});
		}
	});

	jQuery('#vsVej').live('focus', function(event) {
		adresse = jQuery('#vsPostnummer').val();
		console.log(adresse);
		if (adresse != '') {
			console.log(adresse);
			geocoder.geocode({
				'address': adresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					vikingKort.setZoom(13);
				}
			});
		}
	});

	jQuery('#vsForeslag').live('focus', function(event) {
		adresse = jQuery('#vsPostnummer').val();
		if (adresse != '') {
			geocoder.geocode({
				'address': adresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					vikingKort.setZoom(13);
				}
			});
		}
	});

	jQuery('#skadesadresse').live('focus', function(event) {
		vikingKort.setCenter({
			lat: 56.209742,
			lng: 10.553872
		});
		vikingKort.setZoom(7);
	});

	jQuery('#vsAdresse').live('focus', function(event) {
		vikingKort.setCenter({
			lat: 56.209742,
			lng: 10.553872
		});
		vikingKort.setZoom(7);
	});

	jQuery('.stationsAlternativInput').live('click', function(event) {
		jQuery('.stationsAlternativInput').removeClass('aktivStation');
		jQuery(this).addClass('aktivStation');
		beregnRute();
	});

	jQuery('.rydRuteInput').live('click', function(event) {
		rydInput = jQuery(this).attr('data-input');
		jQuery('#' + rydInput).val('');
		rydRuteInfo();
		rydRuteFrakort();
		rydRuteFraStation();
	});

	jQuery('.rydInput').live('click', function(event) {
		rydInput = jQuery(this).attr('data-input');
		jQuery('#' + rydInput).val('');
		beregnRute();
	});

	jQuery('.rydSkadesadresse').live('click', function(event) {
		infoWindow.close();
	});

	jQuery('.rydRute').live('click', function(event) {
		rydRute();
	});

	jQuery('.fundetVsAdresse').live('click', function() {
		jQuery('#vsAdresse').val(jQuery(this).html());
	})
	
	 jQuery('#soeg_blandt_vs_resultater').live('keyup', function(event) {
		 jQuery('#listeVaerksteder ul').each(function() {
			 jQuery(this).show();
			 console.log(jQuery('#soeg_blandt_vs_resultater').val());
		 });
		 jQuery(".fundetVsNavn:not(:icontains('"+jQuery('#soeg_blandt_vs_resultater').val()+"'))").each(function (){
			 console.log('skjul');
			 jQuery(this).parent().hide();
		 });
	});
	
	jQuery('#bekraeftOpretStation').live('click', function(event) {
		stationsnummer = jQuery('#opretStationsnummer').val();
		stationsnavn = jQuery('#opretStationsnavn').val();
		stationsadresse = jQuery('#opretStationsadresse').val();
		koord = '';
		geocoder.geocode({
			'address': stationsadresse
		}, function(results, status) {
			if (status == 'OK') {
				koord = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
				stationsLat = results[0].geometry.location.lat();
				stationsLng = results[0].geometry.location.lng();
				stationsinfo = {
					'stationsnavn': stationsnavn,
					'stationsadresse': stationsadresse,
					'stationslat': stationsLat,
					'stationslng': stationsLng
				}
				stationer[stationsnummer] = stationsinfo;
				console.log(stationsinfo);
				//stationer = {};
				$.ajax({
						url: ajaxurl,
						type: "post",
						dataType: 'json',
						data: {
							action: 'opdaterStationer',
							stationer: stationer,
						}
					})
					.done(function(svar) {
						console.log(svar);
					});
			}
		});
	});

	$('#aktiverViking').live('click', function() {
		jQuery.ajax({
			type: "post",
			url: ajaxurl,
			data: {
				action: "hentTemplatesViking",
			},
			beforeSend: function() {
				$('#modulIndhold').append('<div class="modulIndhold container-fluid" id="modulIndholdViking" role="tabpanel"></div>');
			},
			success: function(response) {
				jQuery("#modulIndholdViking").html(response);
				searchPostnr('#vaerkstedPostnummerAWS');
				jQuery('.modulIndhold').hide();
				jQuery('#modulIndholdViking').show();
				visVikingKort();
				directionsDisplay.setMap(vikingKort);
		    window.dispatchEvent(modulerHentet);
				//$( "#popup-liste-vs-container" ).draggable({ handle: "#popup-liste-vs-header" });
				$('.mdb-select.vaelg_aftale').material_select();
			},
		});
		opdaterBruger = function() {
			console.log('Opdater bruger fra Viking');
		};
		opdaterAfdeling = function(afdeling, dato) {
			console.log('Opdater afdeling fra Viking');
		};
	});

	$('#iw-address-row').live('click', function(event) {
		valgtVsAdresse = $('#iw-address').html();
		$('#vaerkstedsadresse').val(valgtVsAdresse);
		console.log('VS: ' + valgtVsAdresse);
	});

	$('#vaerkstedsadresse').live('keyup', function(event) {
		var inp = String.fromCharCode(event.keyCode);
		if (/[a-zA-Z0-9 ]/.test(inp)) {}
		if (event.keyCode == 13) {
			//beregnRute();
		}
	});

	$('#vaerkstedNavn').live('keyup', function(event) {
		var inp = String.fromCharCode(event.keyCode);
		if (/[a-zA-Z0-9 ]/.test(inp)) {
			$('#listeVaerksteder').html('');
		}
		if (event.keyCode == 13) {
			soegeord = $(this).val();
			var search = {
				bounds: vikingKort.getBounds(),
				language: 'da',
				region: 'DK',
				query: '(auto OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + by + ' AND ' + soegeord + ') -køreskole',
				componentRestrictions: {
					country: 'dk'
				}
			};
			searchText(search, koord, radius, zoom);
		}
	});

	jQuery('#infoWindowStation-vaelgStation').live('click', function(event) {
		document.getElementById('valgtstation').value = jQuery('#infoWindowStation-station').html();
		document.getElementById('valgtstation').setAttribute('data-koord', jQuery(this).attr('data-koord'));
		document.getElementById('valgtstation').setAttribute('data-station', jQuery(this).attr('data-station'));
		jQuery('.stationsAlternativInput').removeClass('aktivStation');
		jQuery('#valgtstation').addClass('aktivStation');
		infoWindowStation.close();
		beregnRute();
	});

	jQuery('#infoWindowStation-vaelgAlternativStation').live('click', function(event) {
		document.getElementById('valgtstationAlternativ').value = jQuery('#infoWindowStation-station').html();
		document.getElementById('valgtstationAlternativ').setAttribute('data-koord', jQuery(this).attr('data-koord'));
		document.getElementById('valgtstationAlternativ').setAttribute('data-station', jQuery(this).attr('data-station'));
		jQuery('.stationsAlternativInput').removeClass('aktivStation');
		jQuery('#valgtstationAlternativ').addClass('aktivStation');
		infoWindowStation.close();
		beregnRute();
	});

	$('.findStedInput').live('keyup', function(event) {
		var inp = String.fromCharCode(event.keyCode);
		if (/[a-zA-Z0-9 ]/.test(inp)) {
			$('#listeVaerksteder').html('');
		}
		if (event.keyCode == 13) {

		}
	});

	$('#stedPostnummer').live('keyup', function(event) {
		var inp = String.fromCharCode(event.keyCode);
		if (/[a-zA-Z0-9 ]/.test(inp)) {
			$('#listeVaerksteder').html('');
		}
		if (event.keyCode == 13) {
			autocompleteStedPostnummerChanged();
			rydKort();
		}
	});

	$('#vejSted').live('keyup', function(event) {
		if (event.keyCode == 13) {
			autocompleteStedPostnummerChanged();
			rydKort();
		}
	});

	$('#sætSkadesAdresse').live('click', function(event) {
		$('#skadesadresse').val($(this).data('adresse'));
		$('#skadesadresse').attr('data-lat', $(this).data('lat'));
		$('#skadesadresse').attr('data-lng', $(this).data('lng'));
		jQuery('.SaetAdresseMenu').remove();
		geocoder.geocode({
			'address': jQuery('#skadesadresse').val()
		}, function(results, status) {
			if (status == 'OK' && jQuery('#skadesadresse').val() !== '') {
				skadesadresse = results[0];
				beregnRute();
			}
		});
	});

	$('#sætVærkstedsAdresse').live('click', function(event) {
		$('#vaerkstedsadresse').val($(this).data('adresse'));
		$('#vaerkstedsadresse').attr('data-lat', $(this).data('lat'));
		$('#vaerkstedsadresse').attr('data-lng', $(this).data('lng'));
		jQuery('.SaetAdresseMenu').remove();
		geocoder.geocode({
			'address': jQuery('#vaerkstedsadresse').val()
		}, function(results, status) {
			if (status == 'OK' && jQuery('#vaerkstedsadresse').val() !== '') {
				vaerkstedsadresse = results[0];
				beregnRute();
			}
		});
	});

	$('.kopierAdresseInput').live('click', function(event) {
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-top-full-width",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "500",
			"timeOut": "2000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
		toastr["success"]($(this).html(), "Kopieret til udklipsholder")
		var aux = document.createElement("input");
		aux.setAttribute("value", $(this).val());
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
	});

	$('.kopierAdresse').live('click', function(event) {
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-top-full-width",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "500",
			"timeOut": "2000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
		toastr["success"]($(this).html(), "Kopieret til udklipsholder")
		var aux = document.createElement("input");
		aux.setAttribute("value", $(this).html());
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
		
	});

});

function visVsfrasoegplacesAutoComplete(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		console.log(results);
		jQuery('#listeVaerksteder').show();
		jQuery.each(results, function(index, vs) {
			jQuery('#listeVaerkstederFraMaps').append('<ul><li class="vsNavn kopierAdresse">' + vs.name + '</li><li><span class="kopierAdresse">' + vs.formatted_address + '</span></li></ul>');
		});
	}
}

function visVsfraSoegplaces(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		console.log(results);
		jQuery.each(results, function(index, vs) {
			jQuery('#listeVaerkstederFraMaps').append('<ul><li class="vsNavn kopierAdresse">' + vs.name + '</li><li><span class="kopierAdresse">' + vs.formatted_address + '</span></li></ul>');
		});
	}
}

function skadesadresseOpdateret(sted) {
	//console.log(sted);
	var vej = 'vej';
	var by = 'by';
	if (sted.address_components.length == 4) {
		vej = sted.address_components[0].long_name;
		by = sted.address_components[3].long_name + ' ' + sted.address_components[1].long_name;
	}
	if (sted.address_components.length == 5) {
		vej = sted.address_components[1].long_name + ' ' + sted.address_components[0].long_name;
		by = sted.address_components[4].long_name + ' ' + sted.address_components[2].long_name;
	}

	if (sted.address_components.length == 6) {
		vej = sted.address_components[1].long_name + ' ' + sted.address_components[0].long_name;
		by = sted.address_components[5].long_name + ' ' + sted.address_components[2].long_name;
	}

	jQuery('#popup_skadesadresse').remove();
	jQuery('body').append('<div id="popup_skadesadresse" class="popup_naermeste_station"></div>');
	jQuery('#popup_skadesadresse').append('<div id="popup_skadesadresse_vej">' + vej + '</div>');
	jQuery('#popup_skadesadresse').append('<div id="popup_skadesadresse_by">' + by + '</div>');
	findNaermesteStation_dele();
	popup_skadesadresse = null;
	popup_skadesadresse = new Popup(
		sted.geometry.location,
		document.getElementById('popup_skadesadresse')
	);
	popup_skadesadresse.setMap(vikingKort);
	popup_skadesadresse_marker.setMap(null);
	popup_skadesadresse_marker = new google.maps.Marker({
		position: sted.geometry.location,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			strokeWeight: 8,
			strokeColor: "#B40404",
			scale: 5
		},
		draggable: true,
		map: vikingKort
	});

	sv.getPanorama({
		location: sted.geometry.location,
		radius: 250
	}, processSVData);
}

function vsadresseOpdateret(sted) {
	var vej = 'vej';
	var by = 'by';
	if (sted.address_components.length == 4) {
		 vej = sted.address_components[0].long_name;
		 by = sted.address_components[3].long_name + ' ' + sted.address_components[1].long_name;
	}
	if (sted.address_components.length == 5) {
		vej = sted.address_components[1].long_name + ' ' + sted.address_components[0].long_name;
		by = sted.address_components[4].long_name + ' ' + sted.address_components[2].long_name;
	}
	popup_vaerkstedsadresse = null;
	jQuery('body').append('<div id="popup_vaerkstedsadresse" class="popup_skadesadresse">' + vej + ' ' + by + '</div>')

	popup_vaerkstedsadresse = new Popup(
		sted.geometry.location,
		document.getElementById('popup_vaerkstedsadresse')
	);
	popup_vaerkstedsadresse.setMap(vikingKort);
	beregnRute();
}

function processSVData(data, status) {
	if (status === 'OK') {
		panorama.setPano(data.location.pano);
		panorama.setPov({
			heading: 270,
			pitch: 0
		});
		//panorama.setVisible(true);
	} else {
		//console.error('Street View data not found for this location.');
		//jQuery('#skadesadresse-panorama').text('Der findes ikke streetview for denne adresse')
	}
}

function findNaermesteStation_dele() {
	station_til_skadesadresse_rute_oversigt_directionService = [];
	var findNaermesteStationKoord = [];
	station_til_skadesadresse_rute_oversigt = [];
	kortesteRute_station_til_skadesadresse_stationer = [];
	jQuery('#naermesteStationer').html('');
	distancer = [];
	stationer_bounds = [];
	ruter = [];
	taeller = 0;
	for (var i in ruteFraStationTilSkadesadresseLine) {
		ruteFraStationTilSkadesadresseLine[i].setMap(null);
	}
	for (var i in popup_station) {
		popup_station[i].setMap(null);
	}
	vikingKort.setZoom(9);
	bounds = vikingKort.getBounds();
	//console.log(stationerMarker);
	for (var station in stationer) {
		var marker = stationerMarker[station.toString()];
		if (bounds.contains(marker.getPosition()) === true) {
			stationer_bounds[station] = stationerMarker[station];
		} else {}
	}
	//console.log(stationer_bounds);
	kontrol = 0;
	i = 0;
	for (i in stationer_bounds) {
		if (stationer_bounds.hasOwnProperty(i)) {
			kontrol++;
		}
	}
	for (var station_in_bound in stationer_bounds) {
		station_til_skadesadresse_rute_oversigt_directionService[station_in_bound] = new google.maps.DirectionsService();
		request[station_in_bound] = {
			origin: stationer_bounds[station_in_bound].position,
			destination: skadesadresseKoord,
			travelMode: 'DRIVING',
			provideRouteAlternatives: true,
			avoidHighways: false,
			region: 'dk',
		};
		naermeste_station = tilfoej_rute_til_station_in_bound(station_in_bound, request[station_in_bound]);
	}
	//findNaermesteStation_rute(station_til_skadesadresse_rute_oversigt_directionService, stationer_bounds);
}

function tilfoej_rute_til_station_in_bound(station_in_bound_var, request) {
	var aktuel_station = station_in_bound_var;
	var naermeste_station = 'ingen';
	station_til_skadesadresse_rute_oversigt_directionService[aktuel_station].route(request, function(result, status) {
		stationer_bounds[aktuel_station].ruter = result;
		if (status == 'OK') {
						//console.log(kontrol + ' ' + taeller);
			if (parseInt(taeller) + 1 == kontrol) {
				for (var y in stationer_bounds) {
					stationer_bounds[y].ruter.routes.sort(function(a, b) {
						return a.legs[0].distance.value - b.legs[0].distance.value;
					});
				}
				stationer_bounds.sort(function(a, b) {
					return a.ruter.routes[0].legs[0].distance.value - b.ruter.routes[0].legs[0].distance.value;
				});
				naermeste_station = tegnFindNaermesteStation(stationer_bounds);
			}
			taeller++;
		}
	});
}

function findNaermesteStation_rute(station_til_skadesadresse_rute_oversigt_directionService, stationer_bounds) {
	// for (var y in station_til_skadesadresse_rute_oversigt_directionService) {
	//   station_til_skadesadresse_rute_oversigt_directionService[y].route(stationer_bounds[y].requests[0], function(result, status) {
	//     if (status == 'OK') {
	//       ruter[y] = result;
	//       if (parseInt(y) + 1 == station_til_skadesadresse_rute_oversigt_directionService.length) {
	//         tegnFindNaermesteStation(ruter)
	//       }
	//     }
	//   });
	// }
}

function tegnFindNaermesteStation(stationer_bounds) {
	ryd_naermeste_stationer();
	jQuery('#valgtstation').val(stationer_bounds[0].stationsnummer);
	lat = stationer_bounds[0].position.lat();
	lng = stationer_bounds[0].position.lng();
	document.getElementById('valgtstation').setAttribute('data-koord', '(' + lat + ',' + lng + ')');
	document.getElementById('valgtstation').setAttribute('data-station', stationer_bounds[0].stationsnummer);
	taeller = 0;
	for (var key in stationer_bounds) {
		ruteFraStationTilSkadesadresseLine[key] = new google.maps.Polyline({
			path: stationer_bounds[key].ruter.routes[0].overview_path,
			strokeColor: linieFarver[key],
			strokeOpacity: 0.6,
			strokeWeight: 6
		});
		//ruteFraStationTilSkadesadresseLine[key].setMap(vikingKort);
		taeller === 0 ? farve = '#00b200' : farve = "#B40404";
		taeller === 0 ? fillOpacity = 0.0 : fillOpacity = 0;
		taeller === 0 ? strokeWeight = 4 : strokeWeight = 1;
		taeller === 0 ? aktiv_station_class = 'aktiv_station' : aktiv_station_class = ""
		stations_cirkel[taeller] = new google.maps.Circle({
			center: stationer_bounds[key].position,
			radius: 30000,
			strokeColor: farve,
			strokeOpacity: 0.3,
			strokeWeight: strokeWeight,
			fillColor: farve,
			fillOpacity: fillOpacity
		});

		// 		stations_cirkel[taeller].setMap(vikingKort);

		jQuery('body').append('<div id="popup_naermeste_station_' + key + '" class="popup_naermeste_station ' + aktiv_station_class + '"></div>')
		document.getElementById('popup_naermeste_station_' + key).setAttribute('data-koord', '(' + lat + ',' + lng + ')');
		document.getElementById('popup_naermeste_station_' + key).setAttribute('data-station', stationer_bounds[key].stationsnummer);
		jQuery('#popup_naermeste_station_' + key).append('<div>' + stationer_bounds[key].stationsnummer + ' - ' + stationer_bounds[key].stationsinfo + '</div>')
		jQuery('#popup_naermeste_station_' + key).append('<div id="afstand_station_skadesadresse_' + key + '">til skadesadresse</div>')
		jQuery('#afstand_station_skadesadresse_' + key).html('<b>' + stationer_bounds[key].ruter.routes[0].legs[0].distance.text + '</b> til skadesadresse');
		popup_station[key] = new Popup(
			stationer_bounds[key].position,
			document.getElementById('popup_naermeste_station_' + key)
		);
		popup_station[key].setMap(vikingKort);
		taeller++;
	}
	beregnRute();
}


function beregnRute() {
	jQuery('.SaetAdresseMenu').remove;
	valgtStation = jQuery('#valgtstation').val();
	skadesadresse = jQuery('#skadesadresse').val();
	vaerkstedsadresse = jQuery('#vsAdresse').val();

	directionsServiceRundturRenderer.setOptions({
		suppressMarkers: true,
	});
	
	$('#rute-oversigt').addClass('opdateret');

	setTimeout(function () { 
	    $('#rute-oversigt').removeClass('opdateret');
	}, 2000);
	$('#rute-oversigt').addClass('opdateret');

	setTimeout(function () { 
	    $('#rute-oversigt').removeClass('opdateret');
	}, 2000);
	
	startadresse = stationerMarker[valgtStation].getPosition();
		if (vaerkstedsadresse === '') { 
			vaerkstedsadresse = skadesadresse;
			vsAdresseKoord = skadesadresseKoord;
		}

	skadeskoordinat = {
		lat: skadesadresseKoord.lat(),
		lng: skadesadresseKoord.lng()
	}

	request = {
		origin: startadresse,
		destination: skadeskoordinat,
		travelMode: 'DRIVING',
		provideRouteAlternatives: true,
		avoidHighways: false,
	};

	directionsServiceStationTilSkade.route(request, function(result_directionsServiceStationTilSkade, status) {
		if (status == 'OK') {
		result_directionsServiceStationTilSkade.routes.sort(function(a, b) {
			return a.legs[0].distance.value - b.legs[0].distance.value;
		});	
			directionsServiceStationTilSkadeRenderer.setDirections(result_directionsServiceStationTilSkade);
			directionsServiceStationTilSkadeRenderer.setMap(vikingKort);
			jQuery('#station-skadesadresse').val(result_directionsServiceStationTilSkade.routes[0].legs[0].distance.text);
			st_sa = result_directionsServiceStationTilSkade.routes[0].legs[0].distance.value;
			VSkoordinat = {
				lat: vsAdresseKoord.lat(),
				lng: vsAdresseKoord.lng()
			}	

			request = {
				origin: skadeskoordinat,
				destination: VSkoordinat,
				travelMode: 'DRIVING',
			};		

			directionsServiceSkadeTilVS.route(request, function(result_directionsServiceSkadeTilVS, status) {
				if (status == 'OK') {
					result_directionsServiceSkadeTilVS.routes.sort(function(a, b) {
						return a.legs[0].distance.value - b.legs[0].distance.value;
					});	
					directionsServiceSkadeTilVSRenderer.setDirections(result_directionsServiceSkadeTilVS);
					directionsServiceSkadeTilVSRenderer.setMap(vikingKort);
					skadesadresse_vaerkstedsadresse = result_directionsServiceSkadeTilVS.routes[0].legs[0].distance.value;
					skadesadresse_vaerkstedsadresse_tekst = result_directionsServiceSkadeTilVS.routes[0].legs[0].distance.text;
					jQuery('#skadesadresse-vaerkstedsadresse').val(skadesadresse_vaerkstedsadresse_tekst);
					st_sa_vs = st_sa + skadesadresse_vaerkstedsadresse;
					request = {
						origin: VSkoordinat,
						destination: startadresse,
						travelMode: 'DRIVING',
					};			

					directionsServiceVSTilStation.route(request, function(result_directionsServiceVSTilStation, status) {
						if (status == 'OK') {
							result_directionsServiceVSTilStation.routes.sort(function(a, b) {
								return a.legs[0].distance.value - b.legs[0].distance.value;
							});	
							directionsServiceVSTilStationRenderer.setDirections(result_directionsServiceVSTilStation);
							directionsServiceVSTilStationRenderer.setMap(vikingKort);
							st_sa_vs_st = (st_sa_vs + result_directionsServiceVSTilStation.routes[0].legs[0].distance.value)/1000;
							st_sa_vs_st_km = st_sa_vs_st.toFixed(1);
							st_sa_vs_st_km_tekst = st_sa_vs_st.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ''
							jQuery('#laengde-samlet-tur').val(st_sa_vs_st_km_tekst);
							window.dispatchEvent(new CustomEvent("rute_beregnet", {
								detail: { samlet_km: st_sa_vs_st_km,
													sa_vs: skadesadresse_vaerkstedsadresse,
												}
								})
							);
						}
					});						
				}
			});
		}
	});		
}

function tilfoej_event_ruteBeregnet() {	
// 	window.addEventListener('event_rute_beregnet', function (elem) {
// 			console.log('event')
// 	}, false);	
}


function kopieretTilUdklipsholder(tekst) {
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-full-width",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "5300",
		"hideDuration": "5500",
		"timeOut": "2000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	toastr["success"](tekst, "Kopieret til udklipsholder")
}

function tegnStationer() {
	jQuery.ajax({
			url: ajaxurl,
			type: "post",
			dataType: 'json',
			data: {
				action: 'hent_stationer',
			}
		})
		.done(function(svar) {
			if (svar === false) {
				stationer = {};
			} else {
				stationer = svar;
			}
		console.log(stationer);
			opdaterStationslister(stationer);
			var position = '';
			//console.log(stationer);
			for (var key in stationer) {	
				//console.log(stationer[key.toString()].stationsnummer);
				addresse = stationer[key].stationsadresse;
				stationskoordinat = stationer[key].stationskoordinat;
				stationskoordinat_pos = stationskoordinat.split(",");
				position = {
					lat: parseFloat(stationskoordinat_pos[0]),
					lng: parseFloat(stationskoordinat_pos[1])
				}	
				stationerMarker[key.toString()] = new google.maps.Marker({
						position: position,
						icon: {
							path: google.maps.SymbolPath.CIRCLE,
							scale: 5
						},
						draggable: false,
						map: vikingKort
					});			
						//console.log(key.toString());
						stationerMarker[key.toString()].stationsinfo = stationer[key.toString()].stationsnavn;
						stationerMarker[key.toString()].stationsnummer = stationer[key.toString()].stationsnummer;
						stationerMarker[key.toString()].stationsadresse = stationer[key.toString()].stationsadresse;
						stationerMarker[key.toString()].koord = position;
						google.maps.event.addListener(stationerMarker[key.toString()], 'click', showInfoWindowStation);	
				//console.log(stationerMarker);
// 				geocoder.geocode( { 'address': addresse}, function(results, status) {
// 					stationerMarkerKey = key.toString();
// 					if (status == google.maps.GeocoderStatus.OK) {
// 						position = results[0].geometry.location;
// 						stationerMarker[stationerMarkerKey] = new google.maps.Marker({
// 							position: position,
// 							icon: {
// 								path: google.maps.SymbolPath.CIRCLE,
// 								scale: 5
// 							},
// 							draggable: false,
// 							map: vikingKort
// 						});
// 						console.log(stationerMarkerKey);
// 						stationerMarker[stationerMarkerKey].stationsinfo = stationer[stationerMarkerKey]['stationsnavn'];
// 						stationerMarker[stationerMarkerKey].stationsnummer = stationer[stationerMarkerKey]['stationsnummer'];
// 						stationerMarker[stationerMarkerKey].koord = position;
// 						google.maps.event.addListener(stationerMarker[stationerMarkerKey], 'click', showInfoWindowStation);
// 					} else {
// 						alert("Geocode was not successful for the following reason: " + status);
// 					}
// 				});
				
				/*position = {
					lat: parseFloat(stationer[key].stationslat),
					lng: parseFloat(stationer[key].stationslng)
				}*/
			}
		//console.log(stationerMarker);
		});
}

function showInfoWindowStation() {
	var station = this;
	vikingKort.panTo(this.getPosition());
	vikingKort.setZoom(9)
	infoWindowStation.open(vikingKort, station);
	document.getElementById('infoWindowStation-station').innerHTML = station.stationsnummer + ' - ' + station.stationsinfo;
	document.getElementById('infoWindowStation-stationsadresse').innerHTML = station.stationsadresse;
	document.getElementById('infoWindowStation-vaelgStation').setAttribute('data-koord', this.getPosition());
	document.getElementById('infoWindowStation-vaelgStation').setAttribute('data-station', station.stationsnummer);
	document.getElementById('infoWindowStation-vaelgAlternativStation').setAttribute('data-koord', this.getPosition());
	document.getElementById('infoWindowStation-vaelgAlternativStation').setAttribute('data-station', station.stationsnummer);
}

function buildIWContent_infoWindowStation(place) {
	document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
		'src="' + place.icon + '"/>';
	document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
		'">' + place.name + '</a></b>';
	document.getElementById('iw-address').textContent = place.vicinity;

	if (place.formatted_phone_number) {
		document.getElementById('iw-phone-row').style.display = '';
		document.getElementById('iw-phone').textContent =
			place.formatted_phone_number;
	} else {
		document.getElementById('iw-phone-row').style.display = 'none';
	}

	// The regexp isolates the first part of the URL (domain plus subdomain)
	// to give a short URL for displaying in the info window.
	if (place.website) {
		var fullUrl = place.website;
		var website = hostnameRegexp.exec(place.website);
		if (website === null) {
			website = 'http://' + place.website + '/';
			fullUrl = website;
		}
		document.getElementById('iw-website-row').style.display = '';
		document.getElementById('iw-website').textContent = website;
	} else {
		document.getElementById('iw-website-row').style.display = 'none';
	}
}

function opdaterStationslister(stationer) {
	jQuery('#stationNavKnap').remove();
	stationNavKnap = '<li class="dropdown" id="stationNavKnap"><a href="#" id="stationNavKnap-overskrift" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-institution"></i><br><span>Stationer</span></a></li>';
	jQuery("#top_nav_bar").prepend(stationNavKnap);
	stationerListe = '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">';
	stationerListe += '<a class="dropdown-item " data-toggle="modal" data-target="#OpretStationModal" href="#">Opret ny station</a>';
	stationerListe += '<div class="dropdown-divider"></div>';
	for (var key in stationer) {
		stationerListe += '<a class="dropdown-item " data-stationskoord="' + stationer[key].stationskoord + '" href="#">' + key + ' - ' + stationer[key].stationsnavn + '</a>';
	}
	stationerListe += '</div>';
	jQuery("#stationNavKnap").append(stationerListe);
}

function visVikingKort() {
	vikingKort = new google.maps.Map(document.getElementById('vikingKort'), {
		zoom: 7,
		center: {
			lat: 56.209742,
			lng: 10.553872
		},
		mapTypeControlOptions: {
		    style: google.maps.MapTypeControlStyle.VERTICAL_BAR,
		    position: google.maps.ControlPosition.RIGHT_TOP,
		},
		panControl: true,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    },
		streetViewControl: true
	});
  var src = 'https://docs.google.com/uc?export=download&id=1RWPPDSvibH5J-Ao8NMJDOVMXPfh_-0bK';
  var trep_layer = new google.maps.KmlLayer(src, {
  	suppressInfoWindows: true,
    preserveViewport: true,
    map: vikingKort
  });
	

		google.maps.event.addListener(trep_layer, 'status_changed', function () {
				//console.log('KML load: ' + trep_layer.getStatus());
				if (trep_layer.getStatus() != 'OK') {
					//console.log(trep_layer.getStatus());
				} else {
						//console.log(trep_layer.getStatus());
				}
		});	
    google.maps.event.addListener(trep_layer, 'click', function (kmlEvent) {
      var text_to_process = kmlEvent.featureData.description;
			var res = text_to_process.split('<br>');
			
			var trep_adresse = res[1].split('Adresse: ');
			trep_adresse = trep_adresse[1].split(/\s+/);
			var trep_postnr	= res[2].split('Post Nr.: ');
			var trep_by	= res[3].split('By: ');
			
			var trep_adresse_behandlet = trep_adresse[1] + ' ' + trep_adresse[0];
			var trep_postnr_behandlet = trep_postnr[1];
			var trep_by_behandlet = trep_by[1];
			var trep_navn_behandlet = 	kmlEvent.featureData.name;
			
			var trep_forhandler = res[5].split(/\s+/);
			var trep_vs = res[6].split(/\s+/);
			

			jQuery("#trep-navn").html(trep_navn_behandlet);
			jQuery("#trep-adresse").html(trep_adresse_behandlet);
			jQuery("#trep-postnr").html(trep_postnr_behandlet + ' ' + trep_by_behandlet);
			
			trep_forhandler_behandlet = trep_forhandler.join(', ')
			trep_forhandler_behandlet = jQuery.grep(trep_forhandler_behandlet, function(n){ return (n); })
			
			trep_vs_behandlet = trep_vs.join(', ')
			trep_vs_behandlet = jQuery.grep(trep_vs_behandlet, function(n){ return (n); });
			
			
			jQuery("#trep-forhandler").html(trep_forhandler_behandlet);
			jQuery("#trep-vs").html(trep_vs_behandlet);



//         placemarkInfo.setContent( real_description );
//         placemarkInfo.setPosition(kmlEvent.latLng);
//         placemarkInfo.open(gmap);

    });	
	
	panorama = new google.maps.StreetViewPanorama(
		document.getElementById('skadesadresse-panorama'), {
			position: {
				lat: 56.209742,
				lng: 10.553872
			},
			visible: false,
		});
	definePopupClass();
	var trafficLayer = new google.maps.TrafficLayer();
	//trafficLayer.setMap(vikingKort);
	var transitLayer = new google.maps.TransitLayer();
	//transitLayer.setMap(vikingKort);
	infoWindow = new google.maps.InfoWindow({
		content: document.getElementById('info-content')
	});
	infoWindowStation = new google.maps.InfoWindow({
		content: document.getElementById('infoWindowStation')
	});
	tegnStationer();
	places = new google.maps.places.PlacesService(vikingKort);

	startFindSkadesAdresse();
	startFindVSAdresse();

	jQuery('body').append('<div id="popup_skadesadresse" class="popup_naermeste_station"></div>')
	popup_skadesadresse = new Popup({
			lat: 56.209742,
			lng: 10.553872
		},
		document.getElementById('popup_skadesadresse')
	);
	jQuery('body').append('<div id="popup_vaerkstedsadresse" class="popup_skadesadresse">Her er teksten på SkadesAdresse</div>')
	popup_vaerkstedsadresse = new Popup({
			lat: 56.209742,
			lng: 10.553872
		},
		document.getElementById('popup_vaerkstedsadresse')
	);

	vikingKort.addListener('rightclick', function(event) {
		geocoder.geocode({
			'location': event.latLng
		}, function(results, status) {
			if (status === 'OK') {
				if (results[0]) {
					position = results[0].geometry.location
					adresse = results[0].formatted_address
					showSaetAdresseMenu(adresse, position)
				} else {
					console.log('No results found');
				}
			} else {
				console.log('Geocoder failed due to: ' + status);
			}
		});
		if (event.placeId) {
			console.log('You clicked on place:' + event.placeId);
		}
	});
	vikingKort.addListener('click', function(event) {
		jQuery('.SaetAdresseMenu').remove();
	});

}

function startFindSkadesAdresse() {
	skadestedPostnummerAutocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('skadestedPostnummer')), {
			bounds: vikingKort.getBounds(),
			types: ['(regions)'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	skadestedPostnummerAutocomplete.addListener('place_changed', function() {
		jQuery('#skadestedVej').val('');
		sted = document.getElementById('skadestedPostnummer').value;
		geocoder.geocode({
			'address': sted
		}, function(results, status) {
			if (status == 'OK') {
				vikingKort.setCenter(results[0].geometry.location);
				skadesadresseKoord = results[0].geometry.location;
				jQuery('#skadesadresse').val(results[0].formatted_address);
				skadesadresseOpdateret(results[0]);
				vikingKort.setZoom(10);
			}
		});
	});

	skadestedVejAutocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('skadestedVej')), {
			bounds: vikingKort.getBounds(),
			strictBounds: true,
			types: ['address'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	skadestedVejAutocomplete.bindTo('bounds', vikingKort);
	skadestedVejAutocomplete.addListener('place_changed', function() {
		postnummer = document.getElementById('skadestedPostnummer').value;
		vej = document.getElementById('skadestedVej').value;
		geocoder.geocode({
			'address': postnummer + ', ' + vej
		}, function(results, status) {
			if (status == 'OK') {
				console.log(results[0]);
				document.getElementById('skadestedVej').value = results[0].address_components[0].long_name;
				vikingKort.setCenter(results[0].geometry.location);
				skadesadresseKoord = results[0].geometry.location;
				jQuery('#skadesadresse').val(results[0].formatted_address);
				skadesadresseOpdateret(results[0]);
				vikingKort.setZoom(15);
			}
		});
	});

	skadestedForeslagAutocomplete = new google.maps.places.SearchBox(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('skadestedForeslag')), {
			bounds: vikingKort.getBounds(),
			strictBounds: true,
			types: ['establishment'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	vikingKort.addListener('bounds_changed', function() {
		skadestedForeslagAutocomplete.setBounds(vikingKort.getBounds());
	});
	skadestedForeslagAutocomplete.addListener('places_changed', function() {
		var places = skadestedForeslagAutocomplete.getPlaces();
		if (places.length === 0) {
			return;
		}
		if (places.length == 1) {
			jQuery('#skadesadresse').val(places[0].formatted_address);
			skadesadresse = document.getElementById('skadesadresse').value;
			geocoder.geocode({
				'address': skadesadresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					vikingKort.setZoom(16);
					skadesadresseKoord = results[0].geometry.location;
				}
			});
			console.log(skadesadresseKoord);
			if (vsAdresseKoord !=='' && skadesadresseKoord !== '') {
				beregnRute();
			}
		}
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};
			markers.push(new google.maps.Marker({
				map: vikingKort,
				icon: icon,
				title: place.name,
				position: place.geometry.location
			}));
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
	});

	skadesadresseAutocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('skadesadresse')), {
			bounds: vikingKort.getBounds(),
			strictBounds: true,
			types: ['address'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	skadesadresseAutocomplete.bindTo('bounds', vikingKort);
	skadesadresseAutocomplete.addListener('place_changed', function() {
		sted = skadesadresseAutocomplete.getPlace();
		if (sted.geometry) {
						//console.log('geometry');
			if (sted.geometry.viewport) {
				vikingKort.fitBounds(sted.geometry.viewport);
			} else {
				vikingKort.panTo(sted.geometry.location);
			}
			skadesadresseKoord = sted.geometry.location;
		} else {
			console.log('ikke geometry');
			adresse = document.getElementById('skadesadresse').value;
			geocoder.geocode({
				'address': adresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					skadesadresseKoord = results[0].geometry.location;
				}
			});
		}
		skadesadresseOpdateret(sted);
		vikingKort.setZoom(9);
	});
}

function startFindVSAdresse() {
	vsPostnummerAutocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('vsPostnummer')), {
			bounds: vikingKort.getBounds(),
			types: ['(regions)'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	vsPostnummerAutocomplete.addListener('place_changed', function() {
		jQuery('#vsVej').val('');
		sted = document.getElementById('vsPostnummer').value;
		geocoder.geocode({
			'address': sted
		}, function(results, status) {
			if (status == 'OK') {
				vikingKort.setCenter(results[0].geometry.location);
				vikingKort.setZoom(15);
				vsAdresseKoord = results[0].geometry.location;
				jQuery('#vsAdresse').val(results[0].formatted_address);
				vsadresseOpdateret(results[0]);
			}
			by = results[0].formatted_address;
			by = by.replace(/\d+/g, '');
			by = by.split(',');
// 			postnummer = sted.match(/(\d{4})/g, '');
// 			postnummer = results[0].address_components[2].long_name;
			postnummer = results[0].formatted_address.split(' ');
			
			console.log(postnummer[0]);

			jQuery.ajax({
				type: "POST",
				dataType: 'JSON',
				url: ajaxurl,
				data: {
					action: "find_vs_liste",
					postnr: postnummer[0], //'BF51681',
				},
				error: function(result){ //so, if data is retrieved, store it in html
					console.log(result);				
				},
				success: function(result){ //so, if data is retrieved, store it in html
						liste = $('#popup-liste-vs');
						liste.html('');
					for (var vs in result) {
						navn = result[vs].navn;
						navn_data = navn.toLowerCase().replace(/[\. ,:-]+/g, "");
						adresse = result[vs].adresse_vej+' '+result[vs].adresse_nummer+', '+result[vs].adresse_postnummer+' '+result[vs].adresse_postdistrikt;
						adresse_data = adresse.toLowerCase().replace(/[\. ,:-]+/g, "");
						liste.append('<div class="popup-liste-el" id="'+vs+'"><div class="popup-liste-el-vs-navn popup-liste-el-punkt popup-liste-el-punkt-1" data-indhold="'+navn_data+'">'+navn+'</div><div class="popup-liste-el-vs-adresse popup-liste-el-punkt popup-liste-el-punkt-2" data-indhold="'+adresse_data+'">'+adresse+'</div></div>');
					}				
				},
			});

			var search = {
				bounds: vikingKort.getBounds(),
				strictBounds: true,
				location: koord,
				language: 'da',
				radius: '10000',
				region: 'DK',
				query: '(auto OR automobiler OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + by[0] + ') -køreskole -marine',
				componentRestrictions: {
					country: 'dk'
				}
			};
			searchText(search, koord, radius, zoom);
		});
	});

	vsVejAutocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('vsVej')), {
			bounds: vikingKort.getBounds(),
			strictBounds: true,
			types: ['address'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	vsVejAutocomplete.bindTo('bounds', vikingKort);
	vsVejAutocomplete.addListener('place_changed', function() {
		postnummer = document.getElementById('vsPostnummer').value;
		vej = document.getElementById('vsVej').value;
		geocoder.geocode({
			'address': postnummer + ', ' + vej
		}, function(results, status) {
			if (status == 'OK') {
				vikingKort.setCenter(results[0].geometry.location);
				vikingKort.setZoom(15);
				vsAdresseKoord = results[0].geometry.location;
				jQuery('#vsAdresse').val(results[0].formatted_address);
				vsadresseOpdateret(results[0]);
			}
		});
	});

	vsForeslagAutocomplete = new google.maps.places.SearchBox(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('vsForeslag')), {
			//bounds: vikingKort.getBounds(),
			strictBounds: true,
			types: ['establishment'],
			componentRestrictions: {
				country: 'dk'
			}
		});

	vikingKort.addListener('bounds_changed', function() {
		vsForeslagAutocomplete.setBounds(vikingKort.getBounds());
	});
	vsForeslagAutocomplete.addListener('places_changed', function() {
		var places = vsForeslagAutocomplete.getPlaces();
		if (places.length === 0) {
			return;
		}
		if (places.length == 1) {
			jQuery('#vsAdresse').val(places[0].formatted_address);
			vsAdresse = document.getElementById('vsAdresse').value;
			geocoder.geocode({
				'address': skadesadresse
			}, function(results, status) {
				if (status == 'OK') {
					vikingKort.setCenter(results[0].geometry.location);
					vikingKort.setZoom(16);
					vsAdresseKoord = results[0].geometry.location;
				}
			});
			beregnRute();
		}
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (var place in places) {
			if (!places[place].geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			// var icon = {
			//   url: place.icon,
			//   size: new google.maps.Size(71, 71),
			//   origin: new google.maps.Point(0, 0),
			//   anchor: new google.maps.Point(17, 34),
			//   scaledSize: new google.maps.Size(25, 25)
			// };
			// markers.push(new google.maps.Marker({
			//   map: vikingKort,
			//   icon: icon,
			//   title: place.name,
			//   position: place.geometry.location
			// }));

			jQuery('body').append('<div id="popup_vs_foreslag' + place + '" class="popup_naermeste_station"></div>')
			// document.getElementById('popup_vs_foreslag'+place).setAttribute('data-koord', '(' + lat + ',' + lng + ')');
			// document.getElementById('popup_vs_foreslag'+place).setAttribute('data-station', 'stationer_bounds[key].stationsnummer');
			jQuery('#popup_vs_foreslag' + place).append('<div>' + places[place].name + '</div>')
			jQuery('#popup_vs_foreslag' + place).append('<div id="vs_foreslag_adresse_' + place + '">' + places[place].formatted_address + '</div>')
			popup_vs_foreslag[place] = new Popup(
				places[place].geometry.location,
				document.getElementById('popup_vs_foreslag' + place)
			);
			popup_vs_foreslag[place].setMap(vikingKort);

			// if (places[place].geometry.viewport) {
			//   bounds.union(places[place].geometry.viewport);
			// } else {
			//   bounds.extend(places[place].geometry.location);
			// }
		}
	});

	vsAdresseAutocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(
			document.getElementById('vsAdresse')), {
			bounds: vikingKort.getBounds(),
			strictBounds: true,
			types: ['address'],
			componentRestrictions: {
				country: 'dk'
			}
		});
	vsAdresseAutocomplete.bindTo('bounds', vikingKort);
	vsAdresseAutocomplete.addListener('place_changed', function() {
		vaerkstedsadresse = vsAdresseAutocomplete.getPlace();
		vsAdresseKoord = '';
		if (vaerkstedsadresse.geometry) {
			vsAdresseKoord = vaerkstedsadresse.geometry.location;
			if (vaerkstedsadresse.geometry.viewport) {
				vikingKort.fitBounds(vaerkstedsadresse.geometry.viewport);
			} else {
				console.log('ingen viewport');
			}
		} else {

		}
		//console.log(vaerkstedsadresse);
		vsadresseOpdateret(vaerkstedsadresse);
	});
}



function tegnRute(request, directionsRendererIndstillinger) {
	directionsServiceFraStationTilSkadesadresse.route(request, function(result, status) {
		if (status == 'OK') {
			leg_1 = result.routes[0]['legs'][0];
			jQuery('#skadesadresse-vaerkstedsadresse').val(leg_1['distance'].text);

			directionsRendererSkadeTilVs.setMap(vikingKort);
			directionsRendererSkadeTilVs.setDirections(result);
		} else {
			console.log('ikke ok');
		}
	});
}

function findAdresse() {
	sted = document.getElementById('stedPostnummer').value;
	soegeord = jQuery('#vaerkstedNavn').val();
	by = '';
	by = sted.replace(/\d+/g, '');
	search = '';
	koord = '';
	radius = '5000';
	zoom = 13
	console.log(sted);
	if (by != '') {
		geocoder.geocode({
			'address': sted
		}, function(results, status) {
			if (status == 'OK') {
				vikingKort.setCenter(results[0].geometry.location);
				vikingKort.setZoom(13);
				koord = results[0].geometry.location;
			} else {

			}
		});
	}
	var search = {
		bounds: vikingKort.getBounds(),
		location: koord,
		language: 'da',
		radius: '1000',
		region: 'DK',
		query: '(auto OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + by + ' AND ' + soegeord + ') -køreskole',
		componentRestrictions: {
			country: 'dk'
		}
	};
	searchText(search, koord, radius, zoom);
}

infoWindow = new google.maps.InfoWindow({
	content: document.getElementById('info-content')
});

function autocompleteVejStedChanged() {
	sted = document.getElementById('stedPostnummer').value;
	soegeord = jQuery('#vaerkstedNavn').val();
	by = '';
	by = sted.replace(/\d+/g, '');
	postnummer = sted.match(/(\d{4})/g, '');
	vej = document.getElementById('vejSted').value;;
	soegeord = jQuery('#vaerkstedNavn').val();
	search = '';
	koord = '';
	radius = '5000';
	geocoder.geocode({
		'address': by + ' ' + vej
	}, function(results, status) {
		if (status == 'OK') {
			vikingKort.setCenter(results[0].geometry.location);
			vikingKort.setZoom(14);
			koord = results[0].geometry.location;
		}
	});
	var search = {
		bounds: vikingKort.getBounds(),
		strictBounds: true,
		location: koord,
		language: 'da',
		radius: '1000',
		region: 'DK',
		query: '(auto OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + vej + ' AND ' + by + ' AND ' + soegeord + ') -køreskole',
		componentRestrictions: {
			country: 'dk'
		}
	};
	searchText(search, koord, radius, zoom);
}

function autocompleteStedOrdChanged() {
	sted = autocompleteStedPostnummer.getPlace();
	stedOrd = jQuery('#stedOrd').val();
	sted = jQuery('#stedPostnummer').val();
	koord = '';
	if (sted.geometry) {
		koord = sted.geometry.location;
		if (sted.geometry.viewport) {
			vikingKort.fitBounds(place.geometry.viewport);
		} else {
			console.log('ingen viewport');
		}
	} else {
		// vikingKort.panTo(sted.geometry.location);
		// vikingKort.setZoom(17);  // Why 17? Because it looks good.
		var search = {
			bounds: vikingKort.getBounds(),
			location: koord,
			language: 'da',
			radius: '1000',
			region: 'DK',
			query: sted + ' AND ' + stedOrd,
		};
		searchText(search, koord, radius, zoom);
	}
}

function rydKort() {
	ryd_naermeste_stationer()
	clearResults();
	clearMarkers();
	rydrute();
	jQuery('.SaetAdresseMenu').remove();
}

function ryd_naermeste_stationer() {
	if (stations_cirkel.length != 0) {
		for (var i = 0; i < stations_cirkel.length; i++) {
			stations_cirkel[i].setMap(null);
		}
	}
}

function rydRute() {
	vikingKort.setZoom(8);
	vikingKort.setCenter({
		lat: 56.209742,
		lng: 10.553872
	});
	rydRuteFrakort();
	rydSkadesadresseInput();
	rydVaerkstedsAdresseInput();
	rydRuteInfo();
	rydRuteFraStation();
	rydSkadesadresseInput();
	rydVaerkstedsAdresseInput();
	ryd_naermeste_stationer();
}

function rydSkadesadresseInput() {
	ryd_naermeste_stationer();
	jQuery('#skadesadresseContainer input').each(function(index, el) {
		jQuery(this).val('');
	});
	popup_skadesadresse.setMap(null);
	popup_skadesadresse_marker.setMap(null);
}

function rydVaerkstedsAdresseInput() {
	jQuery('#vaerkstedsadresseContainer input').each(function(index, el) {
		jQuery(this).val('');
	});
	popup_vaerkstedsadresse.setMap(null);
}

function rydRuteFrakort() {
	directionsServiceRundturRenderer.setMap(null);
	rydRuteInfo();
}

function rydRuteInfo() {
	jQuery('#ruteInfoContainer span').each(function(index, el) {
		jQuery(this).html('');
	});
	jQuery('#adresser input').each(function(index, el) {
		jQuery(this).val('');
	});
	jQuery('#naermesteStationer').html('');

}

function rydRuteFraStation() {
	jQuery('.popup_naermeste_station').remove();
	for (var line in ruteFraStationTilSkadesadresseLine) {
		ruteFraStationTilSkadesadresseLine[line].setMap(null);
	}
}

function searchText(search, koord, radius, zoom) {
		clearResults();
		clearMarkers();
	 console.log(search);
	places.textSearch(search, function(results, status, pagination) {
		 console.log(results.length);
		for (var i = 0; i < results.length; i++) {
			// var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
			// var markerIcon = MARKER_PATH + markerLetter + '.png';
			// markers[i] = new google.maps.Marker({
			//   position: results[i].geometry.location,
			//   animation: google.maps.Animation.DROP,
			//   icon: markerIcon
			// });
			// markers[i].placeResult = results[i];
			// google.maps.event.addListener(markers[i], 'click', showInfoWindow);
			// setTimeout(dropMarker(i), i * 100);
			addResult(results[i], i);
		}
		if (pagination.hasNextPage == true) {
			 console.log('true');
			pagination.nextPage();
		
		}
	});
}

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		if (markers[i]) {
			markers[i].setMap(null);
		}
	}
	markers = [];
}

function dropMarker(i) {
	return function() {
		markers[i].setMap(vikingKort);
		google.maps.event.addListener(markers[i], 'click', function(event) {
			console.log(markers[i]);
			console.log(markers[i].placeResult.formatted_address);
			showSaetAdresseMenu(markers[i].placeResult.formatted_address, markers[i].position);

		});
	};
}

function addResult(result, i) {
	var results = document.getElementById('listeVaerksteder');
	var ul = document.createElement('ul');
	ul.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
	ul.onclick = function() {};
	var liNavn = document.createElement('li');
	var liAdresse = document.createElement('li');
	var spanAdresse = document.createElement('span');
	var navn = document.createTextNode(result.name);
	var adresse = document.createTextNode(result.formatted_address);
	liNavn.setAttribute('class', 'vsNavn');
	liNavn.setAttribute('class', 'fundetVsNavn');
	liNavn.setAttribute('class', 'kopierAdresse fundetVsNavn');
	liNavn.style.fontWeight = 600;
	liNavn.appendChild(navn);
	spanAdresse.setAttribute('class', 'kopierAdresse fundetVsAdresse');
	spanAdresse.appendChild(adresse);
	liAdresse.appendChild(spanAdresse);
	ul.appendChild(liNavn);
	ul.appendChild(liAdresse);
	results.appendChild(ul);
}

function clearResults() {
	var results = document.getElementById('listeVaerksteder');
	while (results.childNodes[0]) {
		results.removeChild(results.childNodes[0]);
	}
}

function showInfoWindow() {
	var marker = this;
	places.getDetails({
			placeId: marker.placeResult.place_id
		},
		function(place, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				return;
			}
			infoWindow.open(vikingKort, marker);
			buildIWContent(place);
		});
}

function visStedInfo(sted) {
	infoWindow.setPosition(sted.geometry.location)
	infoWindow.open(vikingKort);
	buildIWContent(sted);
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
	document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
		'src="' + place.icon + '"/>';
	document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
		'">' + place.name + '</a></b>';
	document.getElementById('iw-address').textContent = place.vicinity;

	if (place.formatted_phone_number) {
		document.getElementById('iw-phone-row').style.display = '';
		document.getElementById('iw-phone').textContent =
			place.formatted_phone_number;
	} else {
		document.getElementById('iw-phone-row').style.display = 'none';
	}

	// The regexp isolates the first part of the URL (domain plus subdomain)
	// to give a short URL for displaying in the info window.
	if (place.website) {
		var fullUrl = place.website;
		var website = hostnameRegexp.exec(place.website);
		if (website === null) {
			website = 'http://' + place.website + '/';
			fullUrl = website;
		}
		document.getElementById('iw-website-row').style.display = '';
		document.getElementById('iw-website').textContent = website;
	} else {
		document.getElementById('iw-website-row').style.display = 'none';
	}
}

var apiBase = 'https://dawa.aws.dk/';

function searchPostnr(input) {
	jQuery.ajax({
		cache: true,
		url: apiBase + 'postnumre',
		dataType: "json",
		error: function(xhr, status, errorThrown) {
			var text = xhr.status + " " + xhr.statusText + " " + status + " " + errorThrown;
			alert(text);
		},
		success: function(postnumre) {
			var items = [];
			jQuery.each(postnumre, function(i, postnr) {
				items.push(postnr.nr + " " + postnr.navn);
			});
			jQuery("#vaerkstedPostnummerAWS").autocomplete({
				source: items,
				autoFocus: true,
				minLength: 1
			});
		}
	});
}


function showSaetAdresseMenu(adresse, position) {
	var projection;
	var SaetAdresseMenuDir;
	projection = vikingKort.getProjection();
	jQuery('.SaetAdresseMenu').remove();
	SaetAdresseMenuDir = document.createElement("div");
	SaetAdresseMenuDir.className = 'SaetAdresseMenu';
	SaetAdresseMenuDir.innerHTML = '<span>' + adresse + '</span><hr class="m-y-2">' +
		'<a id="sætSkadesAdresse" data-lat="' + position.lat() + '" data-lng="' + position.lng() + '" data-adresse="' + adresse + '"><div class="context">Sæt skadesadresse<\/div><\/a>' +
		'<a id="sætVærkstedsAdresse" data-lat="' + position.lat() + '" data-lng="' + position.lng() + '" data-adresse="' + adresse + '"><div class="context">Sæt værkstedsadresse<\/div><\/a>';
	jQuery(vikingKort.getDiv()).append(SaetAdresseMenuDir);
	setMenuXY(position);
	SaetAdresseMenuDir.style.visibility = "visible";
}

//
// function showSaetAdresseMenu(caurrentLatLng  ) {
//    var projection;
//    var SaetAdresseMenuDir;
//    geocoder.geocode({'location': caurrentLatLng}, function(results, status) {
//      if (status === 'OK') {
//        if (results[0]) {
//          projection = vikingKort.getProjection() ;
//          jQuery('.SaetAdresseMenu').remove();
//           SaetAdresseMenuDir = document.createElement("div");
//            SaetAdresseMenuDir.className  = 'SaetAdresseMenu';
//            SaetAdresseMenuDir.innerHTML = '<a id="sætSkadesAdresse" data-adresse="'+results[0].formatted_address+'"><div class="context">Sæt skadesadresse<\/div><\/a>'
//                                    + '<a id="sætVærkstedsAdresse" data-adresse="'+results[0].formatted_address+'"><div class="context">Sæt værkstedsadresse<\/div><\/a>';
//
//          jQuery(vikingKort.getDiv()).append(SaetAdresseMenuDir);
//
//          setMenuXY(caurrentLatLng);
//
//          SaetAdresseMenuDir.style.visibility = "visible";
//        } else {
//          console.log('Intet fundet');
//        }
//      } else {
//        console.log('Geocoder failed due to: ' + status);
//      }
//
//    });
// }

function setMenuXY(caurrentLatLng) {
	var mapWidth = jQuery('#vikingKort').width();
	var mapHeight = jQuery('#vikingKort').height();
	var menuWidth = jQuery('.SaetAdresseMenu').width();
	var menuHeight = jQuery('.SaetAdresseMenu').height();
	var clickedPosition = getCanvasXY(caurrentLatLng);
	var x = clickedPosition.x;
	var y = clickedPosition.y;

	if ((mapWidth - x) < menuWidth) //if to close to the map border, decrease x position
		x = x - menuWidth;
	if ((mapHeight - y) < menuHeight) //if to close to the map border, decrease y position
		y = y - menuHeight;

	jQuery('.SaetAdresseMenu').css('left', x);
	jQuery('.SaetAdresseMenu').css('top', y);
};

function getCanvasXY(caurrentLatLng) {
	var scale = Math.pow(2, vikingKort.getZoom());
	var nw = new google.maps.LatLng(
		vikingKort.getBounds().getNorthEast().lat(),
		vikingKort.getBounds().getSouthWest().lng()
	);
	var worldCoordinateNW = vikingKort.getProjection().fromLatLngToPoint(nw);
	var worldCoordinate = vikingKort.getProjection().fromLatLngToPoint(caurrentLatLng);
	var caurrentLatLngOffset = new google.maps.Point(
		Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
		Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
	);
	return caurrentLatLngOffset;
}

var stationerMarker = {}; 


function visPaamindelseStart() {
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": 300,
  "hideDuration": 1000,
  "timeOut": 15000,
  "extendedTimeOut": 500,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
toastr["warning"]("Det er vigtigt for sagsbehandling og hjælper Backoffice med disponering. Det er også med til at at vi husker at informere kunden med det samme om en potentiel hverdag fra 80-150 km og op til to hverdage over 150 km.", "Husk at notere antal km på alle sager!");
	
}

