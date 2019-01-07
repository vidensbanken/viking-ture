<?php
add_action( 'wp_ajax_find_vs_liste', 'find_vs_liste' );
function find_vs_liste(){ 
 	$postnr = $_POST['postnr'];
	$vs_liste = [];
	global $wpdb;
 	$result = $wpdb->get_results('SELECT * FROM vs WHERE beliggenhedsadresse_postnr = "' . $postnr.'"');
//  	$result = $wpdb->get_results('SELECT * FROM vs WHERE beliggenhedsadresse_postnr = 7260');

  foreach ( $result as $vs )   {
		//array_push($vs_liste, $vs->navn_tekst);
		$object = new Vaerksted();
		$object->navn = $vs->navn_tekst;
		$object->adresse_vej = $vs->beliggenhedsadresse_vejnavn;
		$object->adresse_nummer = $vs->beliggenhedsadresse_husnummerFra;
		$object->adresse_postnummer = $vs->beliggenhedsadresse_postnr;
		$object->adresse_by = $vs->beliggenhedsadresse_bynavn;
		$object->adresse_postdistrikt = $vs->beliggenhedsadresse_postdistrikt;
		$object->co = $vs->beliggenhedsadresse_coNavn;
		$object->email = $vs->email_kontaktoplysning;
		$object->pnr = $vs->pnr;
		$vs_liste[$vs->pnr] = $object;
  }
 	$vs_liste = json_encode($vs_liste);
	wp_die($vs_liste);
};


class Vaerksted
{
  private $_navn;
  private $_adresse_vej;
  private $_adresse_nummer;
  private $_adresse_by;
  private $_adresse_postdistrikt;
  private $_adresse_postnummer;
  private $_email;
 
  public function __construct($navn, $adresse_vej, $adresse_nummer, $adresse_postdistrikt, $adresse_postnummer, $co, $email, $pnr)
  {
      $this->_navn = $navn;
      $this->_adresse_vej = $adresse_vej;
      $this->_adresse_nummer = $adresse_nummer;
      $this->_adresse_by = $adresse_by;
      $this->_adresse_postdistrikt = $adresse_postdistrikt;
      $this->_adresse_postnummer = $adresse_postnummer;
      $this->_co = $co;
      $this->_email = $email;
      $this->_pnr = $pnr;
  }
 
  public function hent_navn()
  {
      return $this->_navn;
  }

}
 

?>