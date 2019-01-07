jQuery( document ).ready(function() {
	$("#popup-liste-vs-filter").live('keyup', function(event) {
		 jQuery('.popup-liste-el').each(function() {
			 jQuery(this).hide();
		 });
		 jQuery(".popup-liste-el-punkt").each(function (){
			 filter = $("#popup-liste-vs-filter").val();
			 indhold = $(this).attr('data-indhold');
			 		if(indhold.indexOf(filter) != -1){
					$(this).parent().show();			 		
		 		}

		 });
	});
	
	$('#rydVsPostnummer').live('click', function() {
		$('#vsPostnummer').val('');
		liste = $('#popup-liste-vs');
		liste.html('');
	});
	
	$('#popup-liste-vs .popup-liste-el').live('click', function() {
		$('#vsPostnummer').val('');
		adresse = $(this).find('.popup-liste-el-vs-adresse').text();
		$('#vsAdresse').val(adresse);
	});
});	