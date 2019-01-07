<?php
add_action( 'wp_ajax_OpretStationModal', 'OpretStationModal' );
function OpretStationModal(){
?>
<div class="modal fade" id="OpretStationModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="OpretStationModalLabel">Opret station</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="md-form">
                  <input type="text" id="opretStationsnummer" class="form-control">
                  <label for="opretStationsnummer" class="">nummer</label>
              </div>
              <div class="md-form">
                  <input type="text" id="opretStationsnavn" class="form-control">
                  <label for="opretStationsnavn" class="">Navn</label>
              </div>
              <div class="md-form">
                  <input type="text" id="opretStationsadresse" class="form-control">
                  <label for="opretStationsadresse" class="">Adresse</label>
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuller</button>
                <button type="button" id="bekraeftOpretStation" data-dismiss="modal" class="btn btn-primary">Opret</button>
            </div>
        </div>
    </div>
</div>
<?php
}
