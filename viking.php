<?php
/*
Plugin Name: Viking
Description: Viking
Version: 0.1.0
Author: Henrik Jørgensen
License: GPLv2 or later
*/
setlocale(LC_ALL, 'da_DK');

add_action('wp_head','viking_url');

function viking_url() {
?>
<script type="text/javascript">
var viking_url = '<?php echo plugin_dir_url( __FILE__ ); ?>';
</script>
<?php
}

add_action( 'wp_enqueue_scripts', 'viking_scripts' );
function viking_scripts() {
  wp_register_script( 'viking_scripts_classes', plugin_dir_url( __FILE__ ) . 'js/viking_classes.js', array('jquery') );
	wp_enqueue_script( 'viking_scripts_classes');

  wp_register_script( 'viking_scripts', plugin_dir_url( __FILE__ ) . 'js/viking.js', array('viking_scripts_classes') );
	wp_enqueue_script( 'viking_scripts');

  wp_register_script( 'nummerplade', plugin_dir_url( __FILE__ ) . 'nummerplade/nummerplade.js', array('jquery') );
	wp_enqueue_script( 'nummerplade');

  wp_register_script( 'postnord', plugin_dir_url( __FILE__ ) . 'postnord/postnord.js', array('jquery') );
	wp_enqueue_script( 'postnord');

  wp_register_script( 'vs', plugin_dir_url( __FILE__ ) . 'vs/vs.js', array('jquery') );
	wp_enqueue_script( 'vs');

  wp_register_script( 'sagsbehandling', plugin_dir_url( __FILE__ ) . 'sagsbehandling/sagsbehandling.js', array('jquery') );
	wp_enqueue_script( 'sagsbehandling');


  wp_register_style( 'nummerplade_style', plugin_dir_url( __FILE__ ) . 'nummerplade/nummerplade.css');
	wp_enqueue_style( 'nummerplade_style');

  wp_register_style( 'viking_style', plugin_dir_url( __FILE__ ) . 'viking.css');
	wp_enqueue_style( 'viking_style');
}
//include 'widget/viking.php';

add_action( 'wp_ajax_hentTemplatesViking', 'hentTemplatesViking' );
function hentTemplatesViking() {
	include(plugin_dir_path( __FILE__ ) . 'modul.php');
	wp_die('');
}

add_action( 'wp_ajax_søgEfterVærkstedMaps', 'søgEfterVærkstedMaps' );
function søgEfterVærkstedMaps() {
  echo "søgEfterVærkstedMaps";
	wp_die('');
}
include 'viking_modals.php';
include 'viking_ajax.php';
include 'viking_stationer.php';
include 'nummerplade/ajax.php';
include 'vs/vs_ajax.php';
include 'postnord/postnord_ajax.php';
include 'arriva/arriva.php';
include 'transportorder/transportorder.php';
?>
