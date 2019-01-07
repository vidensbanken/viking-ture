jQuery(document).ready(function($){

  $(window).resize(function() {
      google.maps.event.trigger(vikingKort, 'resize');
  });

  jQuery('.sidenav-ikoner ul').append(
		'<li><a class="aktiverModulIndhold" id="aktiverViking" href="#aktiverViking"><i class="fa fa-check"></i><br><span>Viking</span></a></li>'
	);

  $.ajax({
    url: ajaxurl,
    type : "post",
    dataType: 'json',
    data: {
      action: 'hentStationer',
    }
  })
  .done(function(svar) {
    if (svar == false) {
      stationer = [];
    }
    else stationer = svar
    opdaterStationslister(stationer)
  });

  $.ajax({
    url: ajaxurl,
  		type : "post",
    data: {
      action: 'OpretStationModal'
    }
  })
  .done(function(svar) {
    jQuery('#modulModals').append(svar);
    dawaAutocomplete.dawaAutocomplete( document.getElementById("opretStationsadresse"), {
    });
  });

jQuery('#bekraeftOpretStation').live('click', function(event) {
  var stationsnummer = jQuery('#opretStationsnummer').val();
  var stationsnavn = jQuery('#opretStationsnavn').val();
  var stationsadresse = jQuery('#opretStationsadresse').val();
    //stationer = [];
    station = {'stationsnummer': stationsnummer, 'stationsnavn': stationsnavn, 'stationsadresse': stationsadresse }
    stationer.push(station);
    console.log(stationer);
    $.ajax({
      url: ajaxurl,
      type : "post",
      dataType: 'json',
      data: {
        action: 'opdaterStationer',
        stationer: stationer,
      }
    })
    .done(function(svar) {
    console.log(svar);
    });


});


  $('#aktiverViking').live('click', function(){
    console.log('Viking aktiveret');
    jQuery('#animatedOptions').hide();
    jQuery.ajax({
  		type : "post",
  		url : ajaxurl,
  		data : {
  			action: "hentTemplatesViking",
  		},
  		beforeSend: function() {
  			$('#modulIndhold').append('<div class="modulIndhold container-fluid" id="modulIndholdViking" role="tabpanel"></div>');
  		},
  		success: function(response) {
  			jQuery("#modulIndholdViking").html(response);
        searchPostnr('#vaerkstedPostnummerAWS');
        // jQuery('#vaerkstedVejAWS').keyup(function () {
        //   searchVejnavn('#vaerkstedPostnummerAWS','#vaerkstedVejAWS');
        // });
        jQuery('.modulIndhold').hide();
    		jQuery('#modulIndholdViking').show();
        visVikingKort();
        directionsDisplay.setMap(vikingKort);
        dawaAutocomplete.dawaAutocomplete( document.getElementById("skadesadresse"), {
          select: function(selected) {
          var adresse = document.getElementById('skadesadresse').value;
          geocoder.geocode( { 'address': adresse}, function(results, status) {
            if (status == 'OK' && jQuery('#vaerkstedsadresse').val() != '') {
              position = results[0].geometry.location;
              jQuery('#skadesadresse').attr('data-lat', position.lat());
              jQuery('#skadesadresse').attr('data-lng', position.lng());
              beregnRute();
            }
          });
          }
        });
        dawaAutocomplete.dawaAutocomplete( document.getElementById("vaerkstedsadresse"), {
          select: function(selected) {
            var adresse = document.getElementById('vaerkstedsadresse').value;
            geocoder.geocode( { 'address': adresse}, function(results, status) {
            if (status == 'OK' && jQuery('#skadesadresse').val() != '') {
                position = results[0].geometry.location;
                jQuery('#vaerkstedsadresse').attr('data-lat', position.lat());
                jQuery('#vaerkstedsadresse').attr('data-lng', position.lng());
                beregnRute();
              }
            });
          }
        });
  		},
  	});
		opdaterBruger = function (){console.log('Opdater bruger fra Viking');};
		opdaterAfdeling = function (afdeling, dato){
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
    if(/[a-zA-Z0-9 ]/.test(inp))  {
    }
    if (event.keyCode == 13) {
      //beregnRute();
    }
  });

  $('#vaerkstedNavn').live('keyup', function(event) {
    var inp = String.fromCharCode(event.keyCode);
    if(/[a-zA-Z0-9 ]/.test(inp))  {
      $('#listeVaerksteder').html('');
    }
    if (event.keyCode == 13) {
      soegeord = $(this).val();
      var search = {
        bounds: vikingKort.getBounds(),
        language: 'da',
        region: 'DK',
        query: '(auto OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + by + ' AND ' + soegeord + ') -køreskole',
        componentRestrictions: {country: 'dk'}
      };
      searchText(search, koord, radius, zoom);
    }
  });

  $('.findStedInput').live('keyup', function(event) {
    var inp = String.fromCharCode(event.keyCode);
    if(/[a-zA-Z0-9 ]/.test(inp))  {
      $('#listeVaerksteder').html('');
    }
    if (event.keyCode == 13) {

    }
  });

  $('#stedPostnummer').live('keyup', function(event) {
    var inp = String.fromCharCode(event.keyCode);
    if(/[a-zA-Z0-9 ]/.test(inp))  {
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
    beregnRute();
  });

  $('#sætVærkstedsAdresse').live('click', function(event) {
    $('#vaerkstedsadresse').val($(this).data('adresse'));
    $('#vaerkstedsadresse').attr('data-lat', $(this).data('lat'));
    $('#vaerkstedsadresse').attr('data-lng', $(this).data('lng'));
    jQuery('.SaetAdresseMenu').remove();
    beregnRute();
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

//  jQuery('#aktiverViking').trigger('click');

});

function visVsfrasoegplacesAutoComplete(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    jQuery('#listeVaerksteder').show();
    jQuery.each(results, function( index, vs) {
      jQuery('#listeVaerkstederFraMaps').append('<ul><li class="vsNavn kopierAdresse">' + vs.name + '</li><li><span class="kopierAdresse">' + vs.formatted_address + '</span></li></ul>');
    });
  }
}

function visVsfraSoegplaces(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    jQuery.each(results, function( index, vs) {
      jQuery('#listeVaerkstederFraMaps').append('<ul><li class="vsNavn kopierAdresse">' + vs.name + '</li><li><span class="kopierAdresse">' + vs.formatted_address + '</span></li></ul>');
    });
  }
}

var stationer = [];
var directionsServiceSkadesAdresseTilVaerksted = new google.maps.DirectionsService;
var directionsServiceFraStationTilSkadesadresse = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
koord = new google.maps.LatLng({lat: 56.209742, lng: 10.553872});
listeVejnavneTæller = 0;
vaerkstedNavn = new Array();
vaerkstedPostnummer = new Array();
vaerkstedVej = new Array();
vaerkstedsliste = new Array();
vaerkstedslisteArray = new Array();
vaerkstedsinfo = new Array();
vaerkstedslisteFiltreret = new Array();
radius = '10000';
zoom = 13;

var geocoder = new google.maps.Geocoder;
var directionsRendererIndstillinger;
var vikingKort, places, infoWindow;
var markers = [];
var autocompleteSted;
var sted;
var soegeord;
var countryRestrict = {'country': 'dk'};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var infoEfterKlik = new google.maps.InfoWindow;
directionsRendererIndstillingerSkadeTilVs = {
  polylineOptions: {
    strokeColor: "#8b0013"
  },
  suppressMarkers: false,
};
var directionsRendererSkadeTilVs = new google.maps.DirectionsRenderer(directionsRendererIndstillingerSkadeTilVs);

function opdaterStationslister(stationer) {
  console.log(stationer);
  jQuery('#stationNavKnap').remove();
  stationNavKnap = '<li class="dropdown" id="stationNavKnap"><a href="#" id="stationNavKnap-overskrift" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-institution"></i><br><span>Stationer</span></a></li>';
	jQuery("#top_nav_bar").prepend(stationNavKnap);
  stationerListe = '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">';
  stationerListe += '<a class="dropdown-item " data-toggle="modal" data-target="#OpretStationModal" href="#">Opret ny station</a>';
  stationerListe += '<div class="dropdown-divider"></div>';
  for(var key in stationer) {
    console.log(stationer[key].stationsadresse);
    stationerListe += '<a class="dropdown-item " href="#">' + stationer[key].stationsnummer + ' - '+stationer[key].stationsnavn+'</a>';
  }
  stationerListe += '</div>';
	jQuery("#stationNavKnap").append(stationerListe);
}


function visVikingKort() {
  vikingKort = new google.maps.Map(document.getElementById('vikingKort'), {
    zoom: 7,
    center: {lat: 56.209742, lng: 10.553872},
    mapTypeControl: true,
    panControl: true,
    zoomControl: true,
    streetViewControl: false
  });
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });

  autocompleteStedOrd = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */ (
    document.getElementById('stedOrd')), {
      bounds: vikingKort.getBounds(),
      strictBounds: true,
      types: ['establishment'],
      componentRestrictions: {country: 'dk'}
    });
    autocompleteStedOrd.bindTo('bounds', vikingKort);
    autocompleteStedOrd.addListener('place_changed', autocompleteStedOrdChanged);

    autocompleteFuldAdresse = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
      document.getElementById('fuldAdresse')), {
        bounds: vikingKort.getBounds(),
        strictBounds: true,
        types: ['geocode'],
        componentRestrictions: {country: 'dk'}
      });
      autocompleteStedOrd.bindTo('bounds', vikingKort);
      autocompleteStedOrd.addListener('place_changed', autocompleteStedOrdChanged);

    autocompleteVejSted = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
      document.getElementById('vejSted')), {
        bounds: vikingKort.getBounds(),
        strictBounds: true,
        types: ['address'],
        componentRestrictions: {country: 'dk'}
      });
    autocompleteVejSted.bindTo('bounds', vikingKort);
    autocompleteVejSted.addListener('place_changed', autocompleteVejStedChanged);

    autocompleteStedPostnummer = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
      document.getElementById('stedPostnummer')), {
        bounds: vikingKort.getBounds(),
        types: ['(regions)'],
        componentRestrictions: {country: 'dk'}
      });
    autocompleteStedPostnummer.addListener('place_changed', autocompleteStedPostnummerChanged);

    places = new google.maps.places.PlacesService(vikingKort);


  vikingKort.addListener('center_changed', function(event) {
    //HVIS DET ER PGA bruger skal dette sættes i gang ellers ikke.
    // jQuery('#stedPostnummer').val('');
    // soegeord = jQuery('#vaerkstedNavn').val();
    // var search = {
    //   bounds: vikingKort.getBounds(),
    //   language: 'da',
    //   region: 'DK',
    //   query: '(auto OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + soegeord + ') -køreskole',
    //   componentRestrictions: {country: 'dk'}
    // };
    // searchText(search, koord, radius, zoom);
  });
  vikingKort.addListener('zoom_changed', function() {
    // center = vikingKort.getCenter();
    // koord = new google.maps.LatLng(center.lat(),center.lng());
//    searchText(koord, radius, zoom);
  });

  vikingKort.addListener('rightclick', function(event) {
    geocoder.geocode({'location': event.latLng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          position = results[0].geometry.location
          adresse = results[0].formatted_address
          console.log(position.lat());
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

function beregnRute() {
  // start = document.getElementById('skadesadresse').value;
  // end = document.getElementById('vaerkstedsadresse').value;
  jQuery('.SaetAdresseMenu').remove();
  start = {lat: parseFloat(jQuery('#skadesadresse').attr('data-lat')), lng: parseFloat(jQuery('#skadesadresse').attr('data-lng'))};
  console.log(start);
  end = {lat: parseFloat(jQuery('#vaerkstedsadresse').attr('data-lat')), lng: parseFloat(jQuery('#vaerkstedsadresse').attr('data-lng'))};
  request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  tegnRute(request, directionsRendererIndstillinger);
}

function tegnRute(request, directionsRendererIndstillinger) {
  directionsRendererSkadeTilVs.setMap(vikingKort);
  directionsServiceFraStationTilSkadesadresse.route(request, function(result, status) {
    if (status == 'OK') {
      leg_1 = result.routes[0]['legs'][0];
      jQuery('#skadesadresse-vaerkstedsadresse').html(leg_1['distance'].text);

      directionsRendererSkadeTilVs.setMap(vikingKort);
      directionsRendererSkadeTilVs.setDirections(result);
    }
    else {
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
  if ( by != '' ) {
    geocoder.geocode( { 'address': sted}, function(results, status) {
      if (status == 'OK') {
        vikingKort.setCenter(results[0].geometry.location);
        vikingKort.setZoom(13);
        koord = results[0].geometry.location;
      }
      else {

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
    componentRestrictions: {country: 'dk'}
  };
  searchText(search, koord, radius, zoom);
}

infoWindow = new google.maps.InfoWindow({
  content: document.getElementById('info-content')
});

function autocompleteStedPostnummerChanged() {
  jQuery('#vejSted').val('');
  sted = document.getElementById('stedPostnummer').value;
  soegeord = jQuery('#vaerkstedNavn').val();
  by = '';
  by = sted.replace(/\d+/g, '');
  postnummer = sted.match(/(\d{4})/g, '');
  search = '';
  koord = '';
  radius = '5000';
  zoom = 13
  console.log(sted);
  if ( by != '' ) {
    geocoder.geocode( { 'address': by}, function(results, status) {
      if (status == 'OK') {
        vikingKort.setCenter(results[0].geometry.location);
        vikingKort.setZoom(13);
        koord = results[0].geometry.location;
      }
    });
  }
  var search = {
    bounds: vikingKort.getBounds(),
    strictBounds: true,
    location: koord,
    language: 'da',
    radius: '1000',
    region: 'DK',
    query: '(auto OR værksted OR autoværksted OR automekaniker OR bilforhandler OR "leverandør af reservedele til biler") (' + by + ' AND ' + soegeord + ') -køreskole',
    componentRestrictions: {country: 'dk'}
  };
  searchText(search, koord, radius, zoom);
}

function autocompleteVejStedChanged() {
  sted = document.getElementById('stedPostnummer').value;
  soegeord = jQuery('#vaerkstedNavn').val();
  by = '';
  by = sted.replace(/\d+/g, '');
  postnummer = sted.match(/(\d{4})/g, '');
  vej = document.getElementById('vejSted').value; ;
  soegeord = jQuery('#vaerkstedNavn').val();
  search = '';
  koord = '';
  radius = '5000';
  geocoder.geocode( { 'address': by + ' ' + vej}, function(results, status) {
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
    componentRestrictions: {country: 'dk'}
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
    }
    else {
      console.log('ingen viewport');
    }
  }
  else {
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
  clearResults();
  clearMarkers();
  directionsRendererSkadeTilVs.setMap(null);
  jQuery('#skadesadresse-vaerkstedsadresse').html('');
  jQuery('.SaetAdresseMenu').remove();
}

function searchText(search, koord, radius, zoom) {
  console.log(search);
  // console.log('auto ' + jQuery('#vaerkstedPostnummerAWS').val() + ' ' + jQuery('#vaerkstedNavn').val());
  places.textSearch(search, function(results, status) {
    // console.log(results);
     //if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearResults();
      clearMarkers();
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
     //}
  });
}

function search() {
  var search = {
    bounds: vikingKort.getBounds(),
    types: ['car_dealer', 'car_repair'],
    componentRestrictions: {country: 'dk'}
  };
  places.nearbySearch(search, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearResults();
      clearMarkers();
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
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
    google.maps.event.addListener(markers[i],  'click',  function(event) {
      console.log(markers[i]);
      console.log(markers[i].placeResult.formatted_address);
      showSaetAdresseMenu(markers[i].placeResult.formatted_address, markers[i].position);

    });
  };
}

function addResult(result, i) {
  var results = document.getElementById('listeVaerksteder');
  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
  var markerIcon = MARKER_PATH + markerLetter + '.png';
//<ul><li class="vsNavn kopierAdresse">' + vs.name + '</li><li><span class="kopierAdresse">' + vs.formatted_address + '</span></li></ul>'
  var ul = document.createElement('ul');
  //ul.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  ul.onclick = function() {
    google.maps.event.trigger(markers[i], 'click');
  };
  var liNavn = document.createElement('li');
  var liAdresse = document.createElement('li');
  var spanAdresse = document.createElement('span');
  var navn = document.createTextNode(markerLetter + '. ' + result.name);
  var adresse = document.createTextNode('- ' + result.formatted_address);
  liNavn.setAttribute('class', 'vsNavn');
  liNavn.setAttribute('class', 'kopierAdresse');
  liNavn.appendChild(navn);
  spanAdresse.setAttribute('class', 'kopierAdresse');
  spanAdresse.appendChild(adresse);
  liAdresse.appendChild(spanAdresse);
  ul.appendChild(liNavn);
  ul.appendChild(liAdresse);
  // var iconTd = document.createElement('td');
  // var nameTd = document.createElement('td');
  // var icon = document.createElement('img');
  // icon.src = markerIcon;
  // icon.setAttribute('class', 'placeIcon');
  // icon.setAttribute('className', 'placeIcon');
  // var name = document.createTextNode(result.name);
  // iconTd.appendChild(icon);
  // nameTd.appendChild(name);
  // ul.appendChild(iconTd);
  // ul.appendChild(nameTd);
  results.appendChild(ul);
}

function clearResults() {
  var results = document.getElementById('listeVaerksteder');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
  var marker = this;
  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindow.open(vikingKort, marker);
        buildIWContent(place);
      });
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
    url:apiBase +'postnumre',
    dataType: "json",
    error: function (xhr, status, errorThrown) {
      var text= xhr.status + " " + xhr.statusText + " " + status + " " + errorThrown;
      alert(text);
    } ,
    success: function (postnumre) {
      var items= [];
      jQuery.each(postnumre, function (i, postnr) {
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
   projection = vikingKort.getProjection() ;
   jQuery('.SaetAdresseMenu').remove();
    SaetAdresseMenuDir = document.createElement("div");
     SaetAdresseMenuDir.className  = 'SaetAdresseMenu';
     SaetAdresseMenuDir.innerHTML = '<span>'+adresse+'</span><hr class="m-y-2">'
        +'<a id="sætSkadesAdresse" data-lat="'+position.lat()+'" data-lng="'+position.lng()+'" data-adresse="'+adresse+'"><div class="context">Sæt skadesadresse<\/div><\/a>'
        + '<a id="sætVærkstedsAdresse" data-lat="'+position.lat()+'" data-lng="'+position.lng()+'" data-adresse="'+adresse+'"><div class="context">Sæt værkstedsadresse<\/div><\/a>';
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

function setMenuXY(caurrentLatLng){
   var mapWidth = jQuery('#vikingKort').width();
   var mapHeight = jQuery('#vikingKort').height();
   var menuWidth = jQuery('.SaetAdresseMenu').width();
   var menuHeight = jQuery('.SaetAdresseMenu').height();
   var clickedPosition = getCanvasXY(caurrentLatLng);
   var x = clickedPosition.x ;
   var y = clickedPosition.y ;

    if((mapWidth - x ) < menuWidth)//if to close to the map border, decrease x position
        x = x - menuWidth;
   if((mapHeight - y ) < menuHeight)//if to close to the map border, decrease y position
       y = y - menuHeight;

   jQuery('.SaetAdresseMenu').css('left',x  );
   jQuery('.SaetAdresseMenu').css('top',y );
};

function getCanvasXY(caurrentLatLng){
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

/// Søg på CVR
//

  //
  // $('.findVsInput').live('keyup', function(event) {
  //   var inp = String.fromCharCode(event.keyCode);
  //   if(/[a-zA-Z0-9 ]/.test(inp))  {
  //     $('.vsListe').html('');
  //   }
  //   if (event.keyCode == 13) {
  //     SoegEfterVaerksted();
  //     //search();
  //   }
  // });
  //
  // $('#vaerkstedKort').live('keyup', function(event) {
  //   // var request = {
  //   //   input: $(this).val() + ' ' + $('#vaerkstedPostnummerAWS').val(),
  //   // };
  //   // soegplacesAutoComplete = new google.maps.places.AutocompleteService(map);
  //   // soegplacesAutoComplete.getQueryPredictions(request, visVsfrasoegplacesAutoComplete);
  //   if (event.keyCode == 13) {
  //     var request = {
  //       query: $(this).val() + ' ' + $('#vaerkstedPostnummerAWS').val(),
  //     };
  //     soegplaces = new google.maps.places.PlacesService(map);
  //     soegplaces.textSearch(request, visVsfraSoegplaces);
  //   }
  // });

// vsXML = "";
// function krydsSoegVaerksted(vaerkstedslisteArray) {
//     jQuery('#listeVaerksteder').html('');
//     if(vaerkstedslisteArray.length === 1 && vaerkstedslisteArray[0].length < 1000 ){
//       jQuery.each(vaerkstedslisteArray[0] , function( filter1Index, filter1Obj ) {
//         var vs = {
//             cvr: filter1Obj.cvr,
//             postnummer: filter1Obj.postnummer,
//             navn: filter1Obj.navn,
//             adresse: filter1Obj.adresse,
//         };
//         if (vs.cvr != '0') {
//           jQuery('#listeVaerksteder').append('<ul><li class="vsNavn kopierAdresse">' + vs.navn + '</li><li><span class="kopierAdresse">' + vs.adresse + '</span><span>,</span> <span>' + vs.postnummer + '</span></li></ul>');
//         }
//       });
//     }
//     if(vaerkstedslisteArray.length === 2 && vaerkstedslisteArray[0].length > 0 && vaerkstedslisteArray[1].length > 0){
//       jQuery.each(vaerkstedslisteArray[0] , function( filter1Index, filter1Obj ) {
//         jQuery.each(vaerkstedslisteArray[1] , function( filter2Index, filter2Obj ) {
//             if (filter1Obj.cvr == filter2Obj.cvr && filter1Obj.postnummer == filter2Obj.postnummer) {
//               var vs = {
//                   cvr: filter1Obj.cvr,
//                   postnummer: filter1Obj.postnummer,
//                   navn: filter1Obj.navn,
//                   adresse: filter1Obj.adresse,
//               };
//               if (vs.cvr != '0') {
//                 jQuery('#listeVaerksteder').append('<ul><li class="vsNavn kopierAdresse">' + vs.navn + '</li><li><span class="kopierAdresse">' + vs.adresse + '</span><span>,</span> <span>' + vs.postnummer + '</span></li></ul>');
//               }            }
//         });
//       });
//     }
//     else if (vaerkstedslisteArray.length === 3 ){
//       jQuery.each(vaerkstedslisteArray[0] , function( filter1Index, filter1Obj ) {
//         jQuery.each(vaerkstedslisteArray[1] , function( filter2Index, filter2Obj ) {
//           jQuery.each(vaerkstedslisteArray[2] , function( filter3Index, filter3Obj ) {
//             if (filter1Obj.cvr == filter2Obj.cvr && filter1Obj.cvr == filter3Obj.cvr && filter1Obj.postnummer == filter2Obj.postnummer && filter1Obj.postnummer == filter3Obj.postnummer) {
//               var vs = {
//                   cvr: filter1Obj.cvr,
//                   postnummer: filter1Obj.postnummer,
//                   navn: filter1Obj.navn,
//                   adresse: filter1Obj.adresse,
//               };
//               if (vs.cvr != '0') {
//                 jQuery('#listeVaerksteder').append('<ul><li class="vsNavn kopierAdresse">' + vs.navn + '</li><li><span class="kopierAdresse">' + vs.adresse + '</span><span>,</span> <span>' + vs.postnummer + '</span></li></ul>');
//               }            }
//           });
//         });
//       });
//     }
// }
//
// function findVaerkstedsnavn(navn) {
//   vaerkstedNavn.length = 0;
//   var obj = {
//       cvr: '0',
//   };
//   vaerkstedNavn.push(obj);
//   jQuery(vsXML).find('navn tekst:containsInsensitive("'+navn+'")').each(function(){
//     vaerksted = jQuery(this).parent().parent();
//     var obj = {
//         cvr: jQuery(vaerksted).find('cvrnr').text(),
//         navn: jQuery(vaerksted).find('navn tekst').text(),
//         adresse: jQuery(vaerksted).find('vejnavn').text() + ' ' + jQuery(vaerksted).find('husnummerFra').text(),
//         postnummer: jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse postdistrikt').text(),
//     };
//     vaerkstedNavn.push(obj);
//   });
//   return vaerkstedNavn;
// }
//
// function findVaerkstedsVej(vej) {
//   vaerkstedVej.length = 0;
//   var obj = {
//       cvr: '0',
//   };
//   vaerkstedVej.push(obj);
//   jQuery(vsXML).find('beliggenhedsadresse vejnavn:containsInsensitive("'+vej+'")').each(function(){
//     vaerksted = jQuery(this).parent().parent();
//     var obj = {
//         cvr: jQuery(vaerksted).find('cvrnr').text(),
//         navn: jQuery(vaerksted).find('navn tekst').text(),
//         adresse: jQuery(vaerksted).find('vejnavn').text() + ' ' + jQuery(vaerksted).find('husnummerFra').text(),
//         postnummer: jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse postdistrikt').text(),
//     };
//     vaerkstedVej.push(obj);
//   });
//   return vaerkstedVej;
// }
//
// function findVaerkstedsPostnummer(postnummer) {
//   vaerkstedPostnummer.length = 0;
//   var obj = {
//       cvr: '0',
//   };
//   vaerkstedPostnummer.push(obj);
//   jQuery(vsXML).find('beliggenhedsadresse postnr:contains("'+postnummer+'")').each(function(){
//     vaerksted = jQuery(this).parent().parent();
//     var obj = {
//         cvr: jQuery(vaerksted).find('cvrnr').text(),
//         navn: jQuery(vaerksted).find('navn tekst').text(),
//         adresse: jQuery(vaerksted).find('vejnavn').text() + ' ' + jQuery(vaerksted).find('husnummerFra').text(),
//         postnummer: jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse postdistrikt').text(),
//     };
//     vaerkstedPostnummer.push(obj);
//     // info = jQuery(vaerksted).find('navn tekst').text()+'#'+jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse vejnavn').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse husnummerFra').text();
//     // vaerkstedVej.push(info);
//   });
//   return vaerkstedPostnummer;
// }
//
//
//   var apiBase = 'https://dawa.aws.dk/';
//
// function searchPostnr(input) {
//   jQuery.ajax({
//     cache: true,
//     url:apiBase +'postnumre',
//     dataType: "json",
//     error: function (xhr, status, errorThrown) {
//       var text= xhr.status + " " + xhr.statusText + " " + status + " " + errorThrown;
//       alert(text);
//     } ,
//     success: function (postnumre) {
//       var items= [];
//       jQuery.each(postnumre, function (i, postnr) {
//         items.push(postnr.nr + " " + postnr.navn);
//       });
//       jQuery("#vaerkstedPostnummerAWS").autocomplete({
//         source: items,
//         autoFocus: true,
//         minLength: 1
//       });
//     }
//   });
// }
//
// function searchVejnavn(pnr,vej) {
//   var match = ['']
//   var ptext = jQuery('#vaerkstedPostnummerAWS').val();
//   if (ptext.length > 1) {
//     var ptext = jQuery(pnr).val();
//     var reg = /(\d{4})/g;
//     match = reg.exec(ptext);
//     if (match === null) { return; }
//     var parametre= {postnr: match[1]};
//   }
//   vejnavnSøgeord = jQuery('#vaerkstedVejAWS').val();
//   if (vejnavnSøgeord.length > 2) {
//     jQuery.ajax({
//       url: apiBase + 'vejnavne',
//       data: parametre,
//       dataType: "json",
//       error: function (xhr, status, errorThrown) {
//         var text= xhr.status + " " + xhr.statusText + " " + status + " " + errorThrown;
//         alert(text);
//       } ,
//       success: function (vejnavne) {
//         var navne= [];
//         jQuery.each(vejnavne, function (i, vejnavn) {
//           navne.push(vejnavn.navn);
//         });
//         jQuery(vej).autocomplete({
//           source: navne,
//           autoFocus: true,
//           minLength: 1
//         });
//       }
//     });
//   }
// }
//
// function SoegEfterVaerksted() {
//   match = '';
//   postnummerInput = '';
//   var ptext = jQuery('#vaerkstedPostnummerAWS').val();
//   if (ptext.length > 3) {
//     var reg = /(\d{4})/g;
//     var match = reg.exec(ptext);
//     if (match === null) { return; }
//     var parametre= {postnr: match[1]};
//       postnummerInput = match[1];
//   }
//
//   listeVejnavneTæller = 0;
//   jQuery('#listeVejnavne').html('');
//   vaerkstedsnavnInput = jQuery('#vaerkstedNavn').val();
//   vaerkstedsvejInput = jQuery('#vaerkstedVejAWS').val();
//   vaerkstedslisteArray.length = 0;
//   vaerkstedslisteFiltreret.length = 0;
//   vaerkstedPostnummer.length = 0;
//   vaerkstedNavn.length = 0;
//   vaerkstedVej.length = 0;
//
//   if (postnummerInput.length == 4) {
//     findVaerkstedsPostnummer(postnummerInput);
//   }
//   if (vaerkstedsnavnInput.length > 1) {
//     findVaerkstedsnavn(vaerkstedsnavnInput);
//   }
//   if (vaerkstedsvejInput.length > 1) {
//     findVaerkstedsVej(vaerkstedsvejInput);
//   }
//   if (vaerkstedNavn.length > 0) {
//     vaerkstedslisteArray.push(vaerkstedNavn);
//   }
//   if (vaerkstedPostnummer.length > 0) {
//     vaerkstedslisteArray.push(vaerkstedPostnummer);
//   }
//   if (vaerkstedVej.length > 0) {
//     vaerkstedslisteArray.push(vaerkstedVej);
//   }
//   vaerkstedslisteArray.sort(function(a, b){
//     return a.length - b.length;
//   });
//   krydsSoegVaerksted(vaerkstedslisteArray);
// }
//
//
// $.expr[":"].containsInsensitive = $.expr.createPseudo(function(arg) {
//   return function( elem ) {
//       return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
//   };
// });

// $.ajax({
//   type: "GET" ,
//   url: vaerksteder_url + "/vs.xml" ,
//   dataType: "xml" ,
//   success: function(xml) {
//     vsXML = xml
//   }
// });
