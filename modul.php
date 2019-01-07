<!--
<div class="vb-popud-container">
	<div class="vb-popud" id="vb-popud-test">
		<div class="vb-popud-indhold">
			Her er noget indhold
		</div>
		<div class="vb-popud-handle" data-target="vb-popud-test">
			<span class="vb-popud-handle-tekst">Søgefelter </span><i class="vb-popud-pil fa fa-chevron-right"></i>	
		</div>
	</div>
	<div class="vb-popud" id="vb-popud-test-2">
		<div class="vb-popud-indhold">
			Her er noget indhold
		</div>
		<div class="vb-popud-handle" data-target="vb-popud-test-2">
			<span class="vb-popud-handle-tekst">Søgefelter </span><i class="vb-popud-pil fa fa-chevron-right"></i>	
		</div>
	</div>
</div>
-->

<div class="row" id="ModulerTopViking">
  <div class="col-6" id="kort">
	  <div id="gmap" class="row">

		  <div id="kort_overlay_moduler" class="col-12">
	
		  </div><!-- //kort_overlay_moduler -->
		  <div id="adresser" class="col-7 row bo-modul">
        <div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group" >
  	        <i class="rydInput rydSkadesadresse fa fa-times" data-input="skadesadresse" ></i>
					<input type="text" id="skadesadresse" data-lat="0" data-lng="0" class="" placeholder="Skadesadresse" value="">
				</div>	
				<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group" >
	          <i class="rydInput rydVsAdresse fa fa-times" data-input="vsAdresse" ></i>
	          <input type="text" id="vsAdresse" data-lat="0" data-lng="0" class="" placeholder="Transportadresse" value="">
        </div>	
        <div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group" >
	          <i class="rydInput rydViaAdresse fa fa-times" data-input="viaAdresse" ></i>
	          <input type="text" id="viaAdresse" data-lat="0" data-lng="0" class="" placeholder="Via adresse" value="">
        </div>
 				<div class="col-6 adresse-autocomplete autocomplete-container inner-addon right-addon input-group">
					<i class="rydRuteInput fa fa-times" data-input="valgtstation" ></i>
					<input readonly type="text" id="valgtstation"  class="stationsAlternativInput aktivStation" data-station="0" data-koord="0" data-lat="0" data-lng="0" placeholder="Station">
				</div>
		  </div>	
			<div class="soegeMuligheder kort_overlay_modul col-5 bo-modul" id="rute-oversigt">
				<div class="jumbotron hoverable">
					<h6 class="">Ruteoversigt</h6>
					<hr class="m-y-2">
					<form id="" class="row form-inline">
						<div class="col-sm-12">
							<label for="station-skadesadresse">Station til skadesadresse: </label><input type="text" class="nulmargin " id="station-skadesadresse" autocomplete="off" placeholder="" class="ui-autocomplete-input">
						</div>
						<div class="col-sm-12">
							<label for="skadesadresse-vaerkstedsadresse"> Skadesadresse til værksted:</label><input type="text" class="nulmargin " id="skadesadresse-vaerkstedsadresse" autocomplete="off" placeholder="" class="ui-autocomplete-input"  title="Indtast tidsforbruget i minutter. Som standard 15 men kan ændres ved behov, hvis der eksempelvis skal bruges skøjter eller ventetid på kunden">
						</div>
						<div class="col-sm-12">
							<label for="laengde-samlet-tur">Længde af samlet tur:</label><input type="text" class="nulmargin " id="laengde-samlet-tur" autocomplete="off" placeholder="" class="ui-autocomplete-input"  title="Indtast tidsforbruget i minutter. Som standard 15 men kan ændres ved behov, hvis der eksempelvis skal bruges skøjter eller ventetid på kunden">
						</div>
					</form>
				</div>
			</div>
			<div class="col-12" id="vikingKort">
				
			</div>	

			<!--
			  <div id="test" class="col-4">
				
			    <div id="" class="col-3 kort_overlay_modul kort_adresse_felt">
				    <input id="soeg_blandt_vs_resultater" type="text">
			    	<ul id="listeVaerksteder" class=""></ul>
			    </div>		  	
			    <div id="" class="col-4 kort_adresse_felt">
			    	
			    </div>	
			  </div>	
-->
<!-- 			  <div id="skadesadresse-panorama" class="col-6">
			  </div> -->
			  <div id="trep-container" class="col-6">
					<div id="trep-navn">
						
					</div>
					<div id=trep-adresse>
						
					</div>
					<div id=trep-postnr>
						
					</div>
					<div id=trep-forhandler>
						
					</div>
					<div id=trep-vs>
						
					</div>
					
			  </div>
		</div>	
  </div>
	<div class="col-6">

		<ul class="nav nav-tabs nav-justified unique-color" id="myTab" role="tablist">
		<li class="nav-item">
			<a class="nav-link active" id="skadested-tab" data-toggle="tab" href="#skadested" role="tab" aria-controls="home" aria-selected="true">Find Adresser</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" id="vaerksted-tab" data-toggle="tab" href="#vaerksted" role="tab" aria-controls="profile" aria-selected="false">Find Værksted</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" id="sagsbehandling-tab" data-toggle="tab" href="#sagsbehandling" role="tab" aria-controls="contact" aria-selected="false">Sagsbehandling</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" id="soeg-info-tab" data-toggle="tab" href="#soeg-info" role="tab" aria-controls="contact" aria-selected="false">Søg info</a>
		</li>
	</ul>
	<div class="tab-content" id="myTabContent">
		<div class="tab-pane fade show active row" id="skadested" role="tabpanel" aria-labelledby="skadested-tab">
			<div class="soegeMuligheder kort_overlay_modul col-6 bo-modul" id="skadesadresseContainer">
				<div class="jumbotron hoverable">
					<h6 class="text-truncate">Find Skadesadresse</h6>							    	
					<hr class="m-y-2">
					<div id="" class="row no-gutters">
						<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group" >
							<input type="text" id="skadestedPostnummer" class="findVsInput" placeholder="Søg på by">
						</div>
						<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group" >
							<input type="text" id="skadestedVej" class="findVsInput" placeholder="Søg på vejnavn">
						</div>			        	
					</div>
					<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group">
							<i class="rydInput fa fa-times" data-input="skadestedForeslag"></i>
							<input type="text" id="skadestedForeslag" class="findVsInput" placeholder="Fritekst">
					</div>
				</div>
			</div>
			<div class="soegeMuligheder kort_overlay_modul col-6 bo-modul" id="vaerkstedsadresseContainer">
				<div class="jumbotron hoverable">
					<h6 class="">Søg efter Værksted</h6>
					<hr class="m-y-2">

					<form class="row form-inline">
						<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group">
								<i id="rydVsPostnummer" class="rydInput fa fa-times" data-input="vsAdresse" ></i>
								<input type="text" id="vsPostnummer" class="findVsInput" placeholder="Søg på by">
						</div>
						<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group">
								<input type="text" id="vsVej" class="findVsInput" placeholder="Søg på vejnavn">
						</div>
						<div class="col-12 adresse-autocomplete autocomplete-container inner-addon right-addon input-group">
								<input type="text" id="vsForeslag" class="findVsInput findStedInput" placeholder="Fritekst eller Værkstedsnavn eller mærke">
						</div>
					</form>
				</div>
			</div>
			<div class="soegeMuligheder kort_overlay_modul col-12 bo-modul" id="vaerkstedsadresseContainer">
				<div class="jumbotron hoverable">
					<h6 class="">Værksteder</h6>
					<hr class="m-y-2">
					<div id="" class=" col-lg-8 col-md-12">
						<input id="popup-liste-vs-filter" type="text">									
					</div>
					<div id="popup-liste-vs"></div>	
				</div>
			</div>
		</div>
		<div class="tab-pane fade" id="vaerksted" role="tabpanel" aria-labelledby="vaerksted-tab">

		</div>
		<div class="tab-pane fade" id="sagsbehandling" role="tabpanel" aria-labelledby="sagsbehandling-tab">
			<div id="sagsbehandling" class="col-12 bo-modul">
		    <div class="jumbotron hoverable">
	        <h6 class="">Sagsbehandling</h6>
	        <hr class="m-y-2">
	        <form id="" class="row form-inline">
	          <div class="col-sm-4">
	            <label for="sagsbehandling_samlet_distance">Samlet længde (km):</label><input type="text" class="nulmargin " id="sagsbehandling_samlet_distance" autocomplete="off" placeholder="" class="ui-autocomplete-input">
	          </div>
	          <div class="col-sm-4">
	            <label for="sagsbehandling_tidsforbrug_paa_stedet">Tid på stedet (min):</label><input type="text" class="nulmargin " id="sagsbehandling_tidsforbrug_paa_stedet" autocomplete="off" placeholder="" class="ui-autocomplete-input"  title="Indtast tidsforbruget i minutter. Som standard 15 men kan ændres ved behov, hvis der eksempelvis skal bruges skøjter eller ventetid på kunden">
	          </div>
	          <div class="col-sm-4">
	            <label for="sagsbehandling_ekstra_tidsforbrug">Ekstra tid(min/km):</label><input type="text" class="nulmargin " id="sagsbehandling_ekstra_tidsforbrug" autocomplete="off" placeholder="" class="ui-autocomplete-input"  title="Indtast tidsforbruget i minutter. Som standard 15 men kan ændres ved behov, hvis der eksempelvis skal bruges skøjter eller ventetid på kunden">
	          </div>
						<div id="sagsbehandling-samlet-timer" class="col-12">
							<div id="" class="row">
			          <div class="col-7 text-truncate ">
									<label for="sagsbehandling-resultat-felt-antal">Tidsforbrug inkl. transport og tid på stedet:</label><input type="text" class="nulmargin " id="sagsbehandling_samlet_tidsforbrug" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			          </div>
			          <div class="col-5 text-truncate ">
									<label for="sagsbehandling_produkt" class="text-truncate">Produkt:</label><input type="text" class="nulmargin " id="sagsbehandling_produkt" autocomplete="off" placeholder="" class="ui-autocomplete-input"  title="Indtast pris i kroner for tilkøbsprodukter. for eksempel batteri eller brændstof.">
			          </div>
							</div>
							<div class="row">
								<div id="tekst_til_kreditor" class="col-12 text-truncate">
									<label for="tekst_til_kreditor_input" class="text-truncate">Tekst til kreditor/korrektion</label><input type="text" class="nulmargin " id="tekst_til_kreditor_input" autocomplete="off" placeholder="" class="ui-autocomplete-input"  title="">
								</div>								
							</div>
						</div>
					</form>
	        <h6 id="sagsbehandling-kreditor-container-overskrift" class="sagsbehandling-container-overskrift">Kreditor / købsdel:</h6>
					<form id="sagsbehandling-kreditor-container" class="row">
						<div id="" class="col-12">
							<div class="row">
								<div id="sagsbehandling-kreditor-overskrift" class="col-12">
									<div id="" class="row">
					          <div class="col-5 text-truncate ">
											Produkt
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-kreditor-resultat-felt-antal-overskrift">Antal</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-kreditor-resultat-felt-pris-overskrift">pris</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-kreditor-resultat-felt-samlet-pris-overskrift text-truncate">Samlet pris</span></b>
					          </div>											
									</div>
									<hr class="m-y-2">
								</div>
								<div id="sagsbehandling-kreditor-startpris" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Startpris: 
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-kreditor-resultat-felt-antal">0</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-kreditor-resultat-felt-pris">0</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-kreditor-resultat-felt-samlet-pris">0</span></b>
					          </div>												
									</div>
								</div>
								<div id="sagsbehandling-kreditor-ekstra-min" class="sagsbehandling-resultat col-12">
									<div id="" class="row">
					          <div class="col-5">
					            Ekstra timer: 
					          </div>
					          <div class="col-6">
						          <b><span id="" class="sagsbehandling-kreditor-resultat-felt-antal">1,5</span></b>
					          </div>											
									</div>
								</div>
							</div>
						</div>
					</form>					
		        <hr class="">
		        <h6 class="sagsbehandling-container-overskrift">Debitor / Salgssdel:</h6>
					<form  id="sagsbehandling-info-container" class="row">

						<div class="col-sm-12">
		          <hr class="m-y-2">
							<select id="vaelg-aftale" class="mdb-select vaelg_aftale colorful-select dropdown-ins">
							    <option value="camoni" selected>København/Camoni</option>
							    <option value="basic">Viking Basic</option>
							    <option value="tryg_u_vej">Tryg U/Vejhjælp</option>
							    <option value="eadk">EADK</option>
							</select>
					  </div>						
					</form>
					<form id="" class="row">

						<div id="" class="col-12">
							<div class="row">
								<div id="sagsbehandling-overskrift" class="col-12">
									<div id="" class="row">
					          <div class="col-5 text-truncate ">
											Produkt
					          </div>
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-antal-overskrift">Antal</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-pris-overskrift">pris</span></b>
					          </div>											
					          <div id="" class="col-2">
					          	<b><span id="" class="sagsbehandling-resultat-felt-samlet-pris-overskrift text-truncate">Samlet pris</span></b>
					          </div>											
									</div>
									<hr class="m-y-2">
								</div>
								<div id="debitor_linjer" class="row col-12">
									
								</div>
							</div>
						</div>
					</form>
	        <hr class="m-y-2">

		    </div>
	    </div>
		</div>
		<div class="tab-pane fade" id="soeg-info" role="tabpanel" aria-labelledby="soeg-info-tab">
		  <div class="bo-modul col-12" id="">
		    <div class="jumbotron hoverable">
	<!--
	      	<h6 class=" text-truncate">Opslag</h6>							    	
	        <hr class="m-y-2">
	-->
	      	<h6 class="text-truncate">Søgefelter</h6>							    	
	        <hr class="m-y-2">
	        <div id="opslag-soegefelter" class="">
		        <form class="row form-inline">
		            <div class="col-sm-3">
		              <label for="regnummer">Reg.nummer</label><input type="text" class="nulmargin " id="regnummer" autocomplete="off" placeholder="" class="ui-autocomplete-input">
		            </div>
		        </form>	        	
	        </div>
					<div id="opslag-resultater">
		        <div id="opslag-resultater-dmr">
		        	<h6 class="text-truncate">Resultater - DMR</h6>							    	
			        <hr class="m-y-2">
			        <form class="row form-inline">
			            <div class="col-sm-6">
			                <label for="selskab">Fors.selskab</label><input type="text" class="nulmargin kopierAdresseInput" readonly="true" id="selskab" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-3">
			              <label for="oprettet">Oprettet</label><input type="text" class="nulmargin" readonly="true" id="oprettet" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-3">
			                <label for="alder">Først reg.</label><input type="text" class="nulmargin" readonly="true" id="alder" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-4">
			                <label for="model">Mærke</label><input type="text" class="nulmargin kopierAdresseInput" readonly="true" id="model" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="farve">Farve</label><input type="text" class="nulmargin" readonly="true" id="farve" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-6">
			              <label for="stelnr">Stelnummer</label><input type="text" class="nulmargin" readonly="true" id="stelnr" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="egen">Egenvægt</label><input type="text" class="nulmargin" readonly="true" id="egen" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="total">Totalvægt</label><input type="text" class="nulmargin" readonly="true" id="total" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="art">Type</label><input type="text" class="nulmargin" readonly="true" id="art" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="drivkraft">Drivkraft</label><input type="text" class="nulmargin" readonly="true" id="drivkraft" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="karrosseritype">Karrosseritype</label><input type="text" class="nulmargin" readonly="true" id="karrosseritype" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>
			            <div class="col-sm-2">
			              <label for="tr_aksel">Træk. aksel</label><input type="text" class="nulmargin" readonly="true" id="tr_aksel" autocomplete="off" placeholder="" class="ui-autocomplete-input">
			            </div>            
			        </form>		        	
		        </div>							
					</div>
			  </div>
		  </div>
		</div>
	</div>		
	</div>
	<div id="adresser_soeg" class="col-2">
		<div id="" class="row">
		  <div id="" class="">
	

<!-- 				<div id="popup-liste-vs-container" class="popup-liste bo-modul">
					<div class="jumbotron hoverable">
						<div class="row">
							<div id="" class=" col-lg-4 col-md-12">
								<h5 id="popup-liste-vs-header" class="popup-liste-titel">Værksteder</h5>							
							</div>
							<div id="" class=" col-lg-8 col-md-12">
								<input id="popup-liste-vs-filter" type="text">									
							</div>
						</div>
						<hr class="m-y-2">	
						<div id="popup-liste-vs"></div>			
					</div>
				</div> -->
					
		  </div>			
		</div>
	</div>
	<div class="col-4">
		<div id="" class="row">
<!-- 			<div id="popup-liste-vs-container" class="popup-liste bo-modul">
				<div class="jumbotron hoverable">
					<div class="row">
						<div id="" class=" col-lg-4 col-md-12">
			        <h5 id="popup-liste-vs-header" class="popup-liste-titel">Værksteder</h5>							
						</div>
						<div id="" class=" col-lg-8 col-md-12">
			        <input id="popup-liste-vs-filter" type="text">									
						</div>
					</div>
	        <hr class="m-y-2">	
	        <div id="popup-liste-vs"></div>			
				</div>
			</div> -->

	
		  <div class="soegeMuligheder col-12" id="">
			  3
		  </div>
		</div>		
	</div>
</div>

<div style="display: none">
  <div id="info-content">
    <table>
      <tr id="iw-url-row" class="iw_table_row">
        <td id="iw-icon" class="iw_table_icon"></td>
        <td id="iw-url"></td>
      </tr>
      <tr id="iw-address-row" class="iw_table_row">
        <td class="iw_attribute_name">Adresse</td>
        <td id="iw-address"></td>
      </tr>
      <tr id="iw-phone-row" class="iw_table_row">
        <td class="iw_attribute_name">Tlf</td>
        <td id="iw-phone"></td>
      </tr>
      <tr id="iw-website-row" class="iw_table_row">
        <td class="iw_attribute_name">Hjemmeside:</td>
        <td id="iw-website"></td>
      </tr>
    </table>
  </div>
</div>

<div style="display: none">
  <div id="infoWindowStation">
    <h6 id="infoWindowStation-station"></h6>
    <h6 id="infoWindowStation-stationsadresse"></h6>
    <a id="infoWindowStation-vaelgStation" data-station="" data-koord="0" href="#">Sæt som valgt station</a>
    <a id="infoWindowStation-vaelgAlternativStation" data-station="" data-koord="0" href="#">Sæt som alternativ station</a>
  </div>
</div>
<div id="popup_vsadresse_foreslag" class="" style="display: none">
  <div class="">
    <b>Værkstedsadresse:</b>
  </div>
  <div id="popup_vsadresse_foreslag_tekst" class="">
  </div>
</div>
