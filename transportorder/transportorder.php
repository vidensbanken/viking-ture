<?php
include 'transportorder-ajax.php';
add_action( 'wp_enqueue_scripts', 'transportorder_scripts' );
function transportorder_scripts() {
  wp_register_style( 'transportorder_style', plugin_dir_url( __FILE__ ) . 'transportorder.css');
	wp_enqueue_style( 'transportorder_style');

  wp_register_script( 'transportorder', plugin_dir_url( __FILE__ ) . 'transportorder.js', array('viking_scripts') );
	wp_enqueue_script( 'transportorder');
}
?>
