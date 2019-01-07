jQuery( document ).ready(function() {
	window.addEventListener('modulerHentet', function (e) {
		var form = '<div id="opslag-resultater-dmr"><h6 class="text-truncate">Resultater - PostNord</h6><hr class="m-y-2">';
					form += '<form class="row form-inline" id="postnord_data">';
	        form += '<div class="col-sm-3">';
	          form += '<label for="postnord_betegnelse">postnord betegnelse</label><input type="text" class="nulmargin" readonly="true" id="postnord_betegnelse" autocomplete="off" placeholder="" class="ui-autocomplete-input">';
	        form += '</div>';
	        form += '<div class="col-sm-9">';
	          form += '<label for="postnord_vs">PostNord Værksted</label><input type="text" class="nulmargin kopierAdresseInput" readonly="true" id="postnord_vs" autocomplete="off" placeholder="" class="ui-autocomplete-input">';
	        form += '</div>';
	      form += '</form>';
	      form += '</div>';
		jQuery("#opslag-resultater").append(form);
		var soeg = '<div class="col-sm-3">';
	      	soeg += '<label for="loebenummer">Løbenummer</label><input type="text" class="nulmargin " id="loebenummer" autocomplete="off" placeholder="" class="ui-autocomplete-input">';
	      soeg += '</div>'; 	
		jQuery("#opslag-soegefelter form").append(soeg);
	});
	
	window.addEventListener('nummerpladeopslag', function (e) {
		reg = e.detail.reg;
		jQuery.ajax({
			type: "POST",
			dataType: 'JSON',
			url: ajaxurl,
			data: {
				action: "find_postnord_data",
				reg: reg, //'BF51681',
			},
			error: function(result){ //so, if data is retrieved, store it in html
				console.log(result);				
			},
			success: function(result){ //so, if data is retrieved, store it in html
				jQuery("#loebenummer").val(result.nummer);
				jQuery("#total").val(result.total);
				jQuery("#postnord_vs").val(result.postnord_vs);
				jQuery("#model").val(result.fabrikat + ", " + result.model);
				jQuery("#postnord_betegnelse").val(result.betegnelse);
				
				console.log(result.nummer);
			},
		});
	});
	
	jQuery("#loebenummer").live('blur', function(event) {
		loebenummer = jQuery(this).val();
	  window.dispatchEvent(new CustomEvent("loebenummeropslag", {
	    detail: { loebenummer: loebenummer }
	  })
	  );
	});	
	
	window.addEventListener('loebenummeropslag', function (e) {
		loebenummer = e.detail.loebenummer;
		jQuery.ajax({
			type: "POST",
			dataType: 'JSON',
			url: ajaxurl,
			data: {
				action: "loebenummeropslag",
				loebenummer: loebenummer, //'BF51681',
			},
			error: function(result){ //so, if data is retrieved, store it in html
				console.log(result);				
			},
			success: function(result){ //so, if data is retrieved, store it in html
				jQuery("#regnummer").val(result.regnummer);
				jQuery("#total").val(result.total);
				jQuery("#postnord_vs").val(result.postnord_vs);
				jQuery("#model").val(result.fabrikat + ", " + result.model);
				jQuery("#postnord_betegnelse").val(result.betegnelse);
				jQuery("#regnummer").blur();
				console.log(result.nummer);
			},
		});
	});	

});