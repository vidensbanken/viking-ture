jQuery( document ).ready(function() {
	//var nummerpladeopslag = new CustomEvent('nummerpladeopslag', { reg: 'redf' });
	jQuery("#regnummer").live('focus', function(event) {
/*
		reg = jQuery(this).val();
    console.log(reg);

			jQuery('#nummerplade .card-content').removeClass('red-text');
			jQuery('#nummerplade .card-content').addClass('blue-text');
				jQuery('#nummerplade .card-content').removeClass('red-text');
				jQuery('#nummerplade .card-content').addClass('blue-text');
				jQuery("#art").val('');
				jQuery("#alder").val('');
				jQuery("#model").val('');
				jQuery("#stelnr").val('');
				jQuery("#tr_aksel").val('');
				jQuery("#drivkraft").val('');
				jQuery("#total").val('');
				jQuery("#egen").val('');
				jQuery("#selskab").val('');
				jQuery("#status").val('');
				jQuery("#oprettet").val('');
				jQuery("#karrosseritype").val('');
				jQuery("#farve").val('');
*/
	});

	jQuery("#regnummer").live('blur', function(event) {
    console.log('opslag');
		reg = jQuery(this).val();
		jQuery('#nummerplade .card-content').removeClass('red-text');
		jQuery('#nummerplade .card-content').addClass('blue-text');
		jQuery('#nummerplade .card-content').removeClass('red-text');
		jQuery('#nummerplade .card-content').addClass('blue-text');
		jQuery("#art").val('');
		jQuery("#alder").val('');
		jQuery("#model").val('');
		jQuery("#stelnr").val('');
		jQuery("#tr_aksel").val('');
		jQuery("#drivkraft").val('');
		jQuery("#total").val('');
		jQuery("#egen").val('');
		jQuery("#selskab").val('');
		jQuery("#status").val('');
		jQuery("#oprettet").val('');
		jQuery("#karrosseritype").val('');
		jQuery("#farve").val('');
	  window.dispatchEvent(new CustomEvent("nummerpladeopslag", {
	    detail: { reg: reg }
	  	})
		);
	  
		jQuery.ajax({
			type: "POST",
			dataType: 'JSON',
			url: ajaxurl,
			data: {
					action: "find_nummerplade",
					reg: reg, //'BF51681',
			},
			error: function(result){ //so, if data is retrieved, store it in html
			},
			success: function(result){ //so, if data is retrieved, store it in html
				console.log(result);
				jQuery("#art").val(result.art);
				jQuery("#alder").val(result.alder);
				jQuery("#model").val(result.model);
				jQuery("#stelnr").val(result.stelnr);
				jQuery("#tr_aksel").val(result.tr_aksel);
				jQuery("#drivkraft").val(result.drivkraft);
				jQuery("#total").val(result.total);
				jQuery("#egen").val(result.egen + ' / ' + result.minimum);
				jQuery("#selskab").val(result.selskab + ' (' + result.status + ')');
				jQuery("#status").val(result.status);
				jQuery("#oprettet").val(result.oprettet);
				jQuery("#karrosseritype").val(result.karrosseritype);
				jQuery("#farve").val(result.farve);
				console.log(result.status);
				//jQuery("body").append(result.data);
				if(result.status == 'Ophørt'){
					jQuery('#findnummerpladewidget .card-content').addClass('red-text');
					jQuery('#findnummerpladewidget .card-content').removeClass('blue-text');
				}
			},
		});		
	});
	

});
