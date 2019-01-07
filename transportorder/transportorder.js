jQuery(document).ready(function($) {


  $('#aktiverViking').live('click', function(){
//    foldUdMenuKnap = '<a id="opretWolves" title="Wolves sag" class="foldUdMenuKnap btn-floating btn-large red" data-toggle="modal" data-target="#opret_transport_orderModal"><i class="fa fa-car"></i></a>';
  transportorder_url = viking_url + "transportorder/transportorder_template.php";

		jQuery('#animatedOptionsLeft').append('<a href="'+transportorder_url+'" onclick="window.open(\''+transportorder_url+'\', \'newwindow\', \'width=800,height=750\');return false;" class="foldUdMenuKnap btn-floating btn-large red"><i class="fa fa-car"></i></a>');
  });

  var wolvesModal="";
  jQuery.ajax({
		type : "post",
		url : ajaxurl,
		data : {
			action: "hent_modul_transport_order",
		},
		beforeSend: function(wolvesModal) {
		},
		success: function(wolvesModal) {

		},
		error: function(svar) {

		},
	});

});
