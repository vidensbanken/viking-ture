<?php
add_action( 'wp_ajax_find_postnord_data', 'find_postnord_data' );
function find_postnord_data(){ 
	$reg = $_POST['reg'];
	$koeretoej = [];
	global $wpdb;
	$result = $wpdb->get_results('SELECT * FROM postnord WHERE Reg_nummer = "' . $reg.'"');
  foreach ( $result as $koeretoej )   {
		$koeretoej = [
			"nummer"		=> $koeretoej->nummer,
			"postnord_vs"		=> $koeretoej->vs_navn . ", " . $koeretoej->vs_adresse . ", " . $koeretoej->vs_Postnummer . " " . $koeretoej->By,
			"total"		=> $koeretoej->vaegt,
			"model"		=> $koeretoej->Model,
			"fabrikat"		=> $koeretoej->Fabrikat,
			"betegnelse"		=> $koeretoej->Biltype,
		];
  }
	$koeretoej = json_encode($koeretoej);
	wp_die($koeretoej);
};

add_action( 'wp_ajax_loebenummeropslag', 'loebenummeropslag' );
function loebenummeropslag(){ 
	$loebenummer = $_POST['loebenummer'];
	$koeretoej = [];
	global $wpdb;
	$result = $wpdb->get_results('SELECT * FROM postnord WHERE nummer = "' . $loebenummer.'"');
  foreach ( $result as $koeretoej )   {
		$koeretoej = [
			"regnummer"		=> $koeretoej->Reg_nummer,
			"postnord_vs"		=> $koeretoej->vs_navn . ", " . $koeretoej->vs_adresse . ", " . $koeretoej->vs_Postnummer . " " . $koeretoej->By,
			"total"		=> $koeretoej->vaegt,
			"model"		=> $koeretoej->Model,
			"fabrikat"		=> $koeretoej->Fabrikat,
			"betegnelse"		=> $koeretoej->Biltype,
		];
  }
	$koeretoej = json_encode($koeretoej);
	wp_die($koeretoej);
};
?>