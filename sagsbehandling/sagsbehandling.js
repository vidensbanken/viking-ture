var sagsbehandling_samlet_distance = 0;
var sagsbehandling_tidsforbrug_paa_stedet = 0;
var sagsbehandling_ekstra_tidsforbrug = 0;
var samlet_tid = 0;
var samlet_timer = 0;
var samlet_timer_tekst = '';
var samlet_km = 0;
var samlet_km_tekst = '';
var htmlString = '';
jQuery( document ).ready(function() {
	samlet_timer = 0;
	window.addEventListener('rute_beregnet', function (e) {
		samlet_km = st_sa_vs_st_km;
		sagsbehandling_tidsforbrug_paa_stedet = 15;
		sagsbehandling_ekstra_tidsforbrug = 0;
		samlet_km = Math.round(samlet_km * 10) / 10;
		samlet_timer = samlet_km / 60;
		jQuery("#sagsbehandling_samlet_distance").val(st_sa_vs_st_km_tekst);
		jQuery("#sagsbehandling_tidsforbrug_paa_stedet").val('15');
		jQuery("#sagsbehandling_ekstra_tidsforbrug").val('0');
		samlet_tid = beregn_samlet_tid();
		sa_vs = e.detail.sa_vs;
		beregn_debitor(jQuery('#vaelg-aftale').val(), sa_vs);
	});
	
	jQuery("#sagsbehandling_samlet_tidsforbrug").live('change', function(){
		sagsbehandling_samlet_tidsforbrug = (jQuery(this).val() === '') ? 0 :parseInt(jQuery(this).val());
		//beregn_samlet_tid();
	});
		
	jQuery("#sagsbehandling_tidsforbrug_paa_stedet").live('change', function(){
		sagsbehandling_tidsforbrug_paa_stedet = (jQuery(this).val() === '') ? 0 :parseInt(jQuery(this).val());
		beregn_samlet_tid();
	});
		
	jQuery("#sagsbehandling_ekstra_tidsforbrug").live('change', function(){
		sagsbehandling_ekstra_tidsforbrug = (jQuery(this).val() === '') ? 0 :parseInt(jQuery(this).val());
		beregn_samlet_tid();
	});

});

function opdaterFeltSagsbehandling(){
	console.log('skift af tid')
}

function beregn_priser(aftale) {
	jQuery('.sagsbehandling-resultat .sagsbehandling-resultat-felt-antal').html('0');
	jQuery('.sagsbehandling-resultat').hide();
	beregn_debitor(aftale);
	beregn_kreditor(aftale);
} 

function beregn_debitor(aftale, sa_vs) {
	skadesadresse_vaerkstedsadresse_timer = skadesadresse_vaerkstedsadresse / 1000 / 60;
	skadesadresse_vaerkstedsadresse_timer = (Math.ceil(skadesadresse_vaerkstedsadresse_timer * 10) / 10);	
	switch(aftale) {
    case 'camoni':
			sa_vs = sa_vs/1000;
			if (sa_vs === 0){
				htmlString = `
								<div id="sagsbehandling-camoni-startpris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Startpris (20km): 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">1</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">500,00</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">500,00</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-mb" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Miljøbidrag: 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">9%</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">45,00</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">45,00</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-samlet-pris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Samlet pris: 
					          </div>
					          <div id="" class="col-2">
					          </div>											
					          <div id="" class="col-2">
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">545,00</span></b>
					          </div>												
									</div>
								</div>
`;				
			}
			else if (sa_vs <= 20 && sa_vs > 0){
				htmlString = `
								<div id="sagsbehandling-camoni-startpris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Startpris (20km): 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">1</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">630</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">630</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-mb" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Antal ekstra zoner: 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">1</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">9%</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">56,70</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-samlet-pris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Samlet pris: 
					          </div>
					          <div id="" class="col-2">
					          </div>											
					          <div id="" class="col-2">
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">686,70</span></b>
					          </div>												
									</div>
								</div>
							`;				
			}
			else {
				ekstra_km = sa_vs - 20;
				ekstra_zoner = Math.ceil(ekstra_km / 10);
				ekstra_zoner_pris = ekstra_zoner * 150;
				samlet_zone_pris = 630 + ekstra_zoner_pris;
				mb = 0.09 * samlet_zone_pris;
				mb = (Math.round(mb * 10) / 10).toFixed(2);
				mb = parseFloat(mb);
				samlet_pris = samlet_zone_pris + mb;
				samlet_pris = parseFloat(samlet_pris).toFixed(2);
				
				
				htmlString = `
								<div id="sagsbehandling-camoni-startpris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Startpris (20km): 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">1</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">630</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">630</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-ekstra-zoner" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Ekstra zoner: 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">${ekstra_zoner}</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">150</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">${ekstra_zoner_pris}</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-mb" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Miljøbidrag: 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal">1</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris">5%</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">${mb}</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-camoni-samlet-pris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Samlet pris: 
					          </div>
					          <div id="" class="col-2">
					          </div>											
					          <div id="" class="col-2">
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris">${samlet_pris}</span></b>
					          </div>												
									</div>
								</div>
							`;				
			}
			jQuery("#debitor_linjer").html(htmlString);
			
			break;
    case 'basic':
        jQuery('#sagsbehandling-startpris .sagsbehandling-resultat-felt-antal').html(skadesadresse_vaerkstedsadresse_timer);
        jQuery('#sagsbehandling-startpris').show();
        break;
    case 'tryg_u_vej':
        jQuery('#sagsbehandling-startpris .sagsbehandling-resultat-felt-antal').html(skadesadresse_vaerkstedsadresse_timer);
        jQuery('#sagsbehandling-startpris .sagsbehandling-resultat-felt-pris').html('1047,75');
        jQuery('#sagsbehandling-startpris .sagsbehandling-resultat-felt-samlet-pris').html('1047,75');
        jQuery('#sagsbehandling-startpris').show();
        break;
    default:
        jQuery('#sagsbehandling-startpris .sagsbehandling-resultat-felt-antal').html('0');
        jQuery('#sagsbehandling-startpris').show();
	}		
}

function beregn_kreditor(aftale) {
	jQuery('#sagsbehandling-kreditor-startpris .sagsbehandling-kreditor-resultat-felt-antal').html(samlet_timer);
	jQuery('#sagsbehandling-kreditor-startpris .sagsbehandling-kreditor-resultat-felt-pris').html('450');
	jQuery('#sagsbehandling-kreditor-startpris .sagsbehandling-kreditor-resultat-felt-samlet-pris').html('500');
	jQuery('#tekst_til_kreditor_input').val('Beregnet fra station: ' + jQuery('#valgtstation').val() + ' - Antal samlet km: ' + st_sa_vs_st_km_tekst + ' + 15 minutter af- og pålæsning. I alt: ' + samlet_timer_tekst);
	jQuery('#sagsbehandling-kreditor-startpris').show();
}

function beregn_samlet_tid() {
	samlet_tid = samlet_km + sagsbehandling_tidsforbrug_paa_stedet + sagsbehandling_ekstra_tidsforbrug;
	samlet_timer = samlet_tid / 60;
	samlet_timer = (Math.ceil(samlet_timer * 4) / 4);
	samlet_timer_tekst = samlet_timer.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
	jQuery("#sagsbehandling_samlet_tidsforbrug").val(samlet_timer_tekst + ' timer').change();
	//beregn_priser($('#vaelg-aftale option:selected').val());
	return samlet_timer;
}