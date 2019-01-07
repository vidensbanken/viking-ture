<?php

add_action( 'init', 'vidensbanken_station');
function vidensbanken_station() {
	$labels = array(
		'name'                => _x( 'Stationer', 'Post Type General Name', 'vidensbanken' ),
		'singular_name'       => _x( 'Station', 'Post Type Singular Name', 'vidensbanken' ),
		'menu_name'           => __( 'Stationer', 'vidensbanken' ),
	);

	$args = array(
		'label'               => __( 'Stationer', 'vidensbanken' ),
		'description'         => __( 'Stationer', 'vidensbanken' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor','revisions', 'custom-fields', 'archive'),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 101,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
		'register_meta_box_cb' => 'stationer_metaboxes',
	);
	register_post_type( 'stationer', $args );

}

add_action( 'init', 'station_reg_tax', 0 );
function station_reg_tax() {
  register_taxonomy(
		'opbevaring', array('stationer'),
		array(
				'labels' => array(
						'name' => 'Opbevaring',
				),
				'show_ui' => true,
				'show_tagcloud' => false,
				'hierarchical' => true,
				'show_admin_column' => true,
		)
	);
  register_taxonomy(
		'tung', array('stationer'),
		array(
				'labels' => array(
						'name' => 'Tungbjærger',
				),
				'show_ui' => true,
				'show_tagcloud' => false,
				'hierarchical' => true,
				'show_admin_column' => true,
		)
	);

	wp_insert_term(
		'JA', // the term
		'opbevaring',
		array(
			'slug' => 'opbevaring_ja',
		)
	);	
	
	wp_insert_term(
		'NEJ', // the term
		'opbevaring',
		array(
			'slug' => 'opbevaring_nej',
		)
	);	
	

	wp_insert_term(
		'JA', // the term
		'tung',
		array(
			'slug' => 'tung_ja',
		)
	);	
	
	wp_insert_term(
		'NEJ', // the term
		'tung',
		array(
			'slug' => 'tung_nej',
		)
	);	
	
/**
 * Adds a metabox to the right side of the screen under the â€œPublishâ€ box
 */
	
}

function station_terms()
{
//Hvis jeg vil hæve kategorier under hændelse, kan det tilføjes her.
}

function stationer_metaboxes(){	
	add_meta_box(
		'stationsadresse',
		'Adresse',
		'stationer_adresse_vis_boks',
		'stationer',
		'side',
		'default'
	);
	add_meta_box(
		'stationsnavn',
		'Stationsnavn',
		'stationsnavn_vis_boks',
		'stationer',
		'side',
		'default'
	);
	add_meta_box(
		'stationsnummer',
		'Stationsnummer',
		'stationsnummer_vis_boks',
		'stationer',
		'side',
		'default'
	);	
	add_meta_box(
		'stationskoordinat',
		'Koordinater',
		'stationskoordinat_vis_boks',
		'stationer',
		'side',
		'default'
	);	
}

function stationer_adresse_vis_boks() {
	global $post;
	wp_nonce_field( basename( __FILE__ ), 'stationer_fields' );
	$adresse = get_post_meta( $post->ID, 'stationsadresse', true );
	echo '<input type="text" name="stationsadresse" value="' . esc_textarea( $adresse )  . '" class="widefat">';
}

function stationsnavn_vis_boks() {
	global $post;
	wp_nonce_field( basename( __FILE__ ), 'stationer_fields' );
	$stationsnavn = get_post_meta( $post->ID, 'stationsnavn', true );
	echo '<input type="text" name="stationsnavn" value="' . esc_textarea( $stationsnavn )  . '" class="widefat">';
}

function stationsnummer_vis_boks() {
	global $post;
	wp_nonce_field( basename( __FILE__ ), 'stationer_fields' );
	$stationsnummer = get_post_meta( $post->ID, 'stationsnummer', true );
	echo '<input type="text" name="stationsnummer" value="' . esc_textarea( $stationsnummer )  . '" class="widefat">';
}

function stationskoordinat_vis_boks() {
	global $post;
	wp_nonce_field( basename( __FILE__ ), 'stationer_fields' );
	$stationsnummer = get_post_meta( $post->ID, 'stationskoordinat', true );
	echo '<input type="text" name="stationskoordinat" value="' . esc_textarea( $stationsnummer )  . '" class="widefat">';
}


/**
 * Save the metabox data
 */
function wpt_save_stationer_meta( $post_id, $post ) {
	// Return if the user doesn't have edit permissions.
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return $post_id;
	}
	// Verify this came from the our screen and with proper authorization,
	// because save_post can be triggered at other times.
	if ( ! isset( $_POST['stationsadresse'] ) || ! wp_verify_nonce( $_POST['stationer_fields'], basename(__FILE__) ) ) {
		return $post_id;
	}
	// Now that we're authenticated, time to save the data.
	// This sanitizes the data from the field and saves it into an array $events_meta.
	$events_meta['stationsadresse'] = esc_textarea( $_POST['stationsadresse'] );
	$events_meta['stationsnummer'] = esc_textarea( $_POST['stationsnummer'] );
	$events_meta['stationsnavn'] = esc_textarea( $_POST['stationsnavn'] );
	$events_meta['stationskoordinat'] = esc_textarea( $_POST['stationskoordinat'] );
	// Cycle through the $events_meta array.
	// Note, in this example we just have one item, but this is helpful if you have multiple.
	foreach ( $events_meta as $key => $value ) :
		// Don't store custom data twice
		if ( 'revision' === $post->post_type ) {
			return;
		}
		if ( get_post_meta( $post_id, $key, false ) ) {
			// If the custom field already has a value, update it.
			update_post_meta( $post_id, $key, $value );
		} else {
			// If the custom field doesn't have a value, add it.
			add_post_meta( $post_id, $key, $value);
		}
		if ( ! $value ) {
			// Delete the meta key if there's no value
			delete_post_meta( $post_id, $key );
		}
	endforeach;
}
add_action( 'save_post', 'wpt_save_stationer_meta', 1, 2 );

add_action( 'wp_ajax_hent_stationer', 'hent_stationer' );
function hent_stationer(){
	$stationer = [];
	// WP_Query arguments
	$args = array(
		'post_type' => array( 'stationer' ),
		'posts_per_page' => '-1',
	);

	// The Query
	global $post;
	$query = new WP_Query( $args );

	// The Loop
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			// do something
			$stationer[get_the_title()]['stationsnavn'] = get_post_meta( get_the_ID(), 'stationsnavn', true );;
			$stationer[get_the_title()]['stationsnummer'] = get_post_meta( get_the_ID(), 'stationsnummer', true );
			$stationer[get_the_title()]['stationsadresse'] = get_post_meta( get_the_ID(), 'stationsadresse', true );
			$stationer[get_the_title()]['stationskoordinat'] = get_post_meta( get_the_ID(), 'stationskoordinat', true );
		}
	} else {
		// no posts found
	}

	// Restore original Post Data
	wp_reset_postdata();		
	die(json_encode($stationer));
}

add_action( 'wp_ajax_opdaterStationer', 'opdaterStationer' );
function opdaterStationer(){
  $stationer = $_POST['stationer'];
  update_option( 'stationer', $stationer, true );
    $stationer = get_option( 'stationer');
  die(json_encode($stationer));
}
add_action( 'wp_ajax_hentStationer', 'hentStationer' );
function hentStationer(){
  $stationer = get_option( 'stationer');
  // delete_option('stationer');
  die(json_encode($stationer));
}



?>