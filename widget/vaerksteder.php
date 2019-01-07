<?php
class vb_vaerksteder_widget extends WP_Widget {

	// constructor
	function __construct() {
		parent::WP_Widget(false, $name = __('Værksteder', 'wp_vaerksteder_plugin') );
	}

	// widget form creation
	function form($instance) {
	/* ... */
	}

	// widget update
	function update($new_instance, $old_instance) {
		/* ... */
	}

	// widget display
	function widget($args, $instance) {

		?>
		<!-- <div class="col-sm-12 widgetBeholder" id="vaerksteder">
			<div class="jumbotron hoverable">
			    <h2 class="h2-responsive widgetTitel">VÆRKSTEDER</h2>
			    <hr class="m-y-2">
					<form class="row form-inline">
						<div class="col-6 autocomplete-container">
								<input type="text" id="vaerkstedPostnummerAWS" class="findVsInput" placeholder="By/postnummer">
						</div>

						<div class="col-6 autocomplete-container">
								<input type="text" id="vaerkstedVejAWS" class="findVsInput" placeholder="Vejnavn">
						</div>
						<div class="col-6 autocomplete-container">
								<input type="text" id="vaerkstedNavn" class="findVsInput" placeholder="Værkstedsnavn">
						</div>
						<div class="col-6">
								<input type="text" id="vaerkstedMaerke" class="findVsInput" placeholder="Mærke">
						</div>
					</form>
			    <hr class="m-y-2">
					<ul id="listeVejnavne">
					</ul>
							<ul id="listeVaerksteder">

							</ul>
			</div>
		</div> -->
		<?php
	}
}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("vb_vaerksteder_widget");'));
