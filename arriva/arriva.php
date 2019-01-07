<?php

include 'arriva-ajax.php';

add_action( 'wp_enqueue_scripts', 'arriva_scripts' );
function arriva_scripts() {
  wp_register_style( 'arriva_style', plugin_dir_url( __FILE__ ) . 'arriva.css');
	wp_enqueue_style( 'arriva_style');

  wp_register_script( 'arriva', plugin_dir_url( __FILE__ ) . 'arriva.js', array('viking_scripts') );
	wp_enqueue_script( 'arriva');

}
?>
