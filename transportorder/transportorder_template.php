<html>
<head>
  <title>Transport Order - Viking Danmark</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.3/js/tether.min.js"></script>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.5/css/mdb.css">
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/4.0.2/bootstrap-material-design.iife.js"></script>

  <link rel="stylesheet" type="text/css" href="transportorder.css">
  <script type="text/javascript" src="transportorder_template.js"></script>
</head>
  <body id="print_transport_order">
          <div class="modal-header">
          	<h4 class="modal-title" id="opret_transport_orderModalTitel">Transport Order - Viking Danmark</h4>
          </div>
          <div class="modal-body" id="opret_transport_order_Modal_body">
						<div class="row" id="reference">
							<dt class="col-2">Our reference #:</dt>
							<dd class="col-2"><input type="text" id="transport_order_viking_reference" class=""></dd>
							<dt class="col-1">Date:</dt>
							<dd class="col-2"><input type="text" id="transport_order_date" class="" value="2018-01-25"></dd>
						</div>
            <form>
              <div class="row">
                <div class="col-6">
                  <h5>Relevant information</h5>
                </div>
                <div class="col-6">
                  <h5>Ledig</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-6" id="">
									<h5>Vehicle</h5>
									<dl class="row">
										<dt class="col-4">Reg.nummer:</dt>
										<dd class="col-8"><input type="text" id="transport_order_reg_nummer" class=""></dd>
										<dt class="col-4">Make/model:</dt>
										<dd class="col-4"><input type="text" id="" class="" placeholder=""></dd>
										<dd class="col-4"><input type="text" id="" class="" placeholder=""></dd>
                    <dt class="col-3">Weight:</dt>
										<dd class="col-3"><div class="input-group"><input type="text" id="" class=""><span class="input-group-addon">Kg</span></div></dd>
                    <dt class="col-3">Height:</dt>
                    <dd class="col-3"><div class="input-group"><input type="text" id="" class=""><span class="input-group-addon">CM</span></div></dd>
                    <dt class="col-3">Length:</dt>
                    <dd class="col-3"><div class="input-group"><input type="text" id="" class=""><span class="input-group-addon">CM</span></div></dd>
                    <dt class="col-3">Width:</dt>
                    <dd class="col-3"><div class="input-group"><input type="text" id="" class=""><span class="input-group-addon">CM</span></div></dd>
                    <dt class="col-3">4X4</dt>
                    <dd class="col-3">
                      <select class="form-control" id="4X4">
                        <option>NO</option>
                        <option>YES</option>
                      </select>
                    </dd>
                    <dt class="col-3">MPV/Minivan</dt>
                    <dd class="col-3">
                      <select class="form-control" id="mpv">
                        <option>NO</option>
                        <option>YES</option>
                      </select>
                    </dd>
								   </dl>
                </div>
								<div class="col-6">
									<h5>Benificiary</h5>
									<dl class="row">
										<dt class="col-4">Name:</dt>
										<dd class="col-8"><input type="text" id="transport_order_ejer_navn" class=""></dd>

										<dt class="col-4">Street:</dt>
										<dd class="col-8"><input type="text" id="transport_order_ejer_adresse_vej" class="input-sm"></dd>

										<dt class="col-4">Postal/city:</dt>
										<dd class="col-3"><input type="text" id="transport_order_ejer_adresse_postnr" class=""></dd>
										<dd class="col-5"><input type="text" id="transport_order_ejer_adresse_by" class=""></dd>

										<dt class="col-4 text-truncate">Country:</dt>
										<dd class="col-8"><input type="text" id="transport_order_ejer_adresse_land" class="" value="Denmark"></dd>

										<dt class="col-4 text-truncate">Tel.#:</dt>
										<dd class="col-8"><input type="text" id="transport_order_ejer_contact_tel" class="" value=""></dd>
									</dl>
								</div>
              </div>
              <div class="row">
                <div class="col-6">
                  <h5>Pickup adresse</h5>
									<dl class="row">
										<dt class="col-3">Description: </dt>
										<dd class="col-9"><input type="text" id="transport_order_pickup_navn" class=""></dd>

										<dt class="col-3">Street:</dt>
										<dd class="col-9"><input type="text" id="transport_order_pickup_vej" class="input-sm"></dd>

										<dt class="col-3">Postal/city:</dt>
										<dd class="col-3"><input type="text" id="transport_order_pickup_postnr" class=""></dd>
										<dd class="col-6"><input type="text" id="transport_order_pickup_by" class=""></dd>

										<dt class="col-3 text-truncate">Country:</dt>
										<dd class="col-9"><input type="text" id="transport_order_pickup_land" class="" value="Denmark"></dd>

										<dt class="col-3 text-truncate">Hours:</dt>
										<dd class="col-9"><input type="text" id="transport_order_pickup_hours" class="" value="Mon-fri: , Sat: , Sun: "></dd>

										<dt class="col-3 text-truncate">Tel.#:</dt>
										<dd class="col-9"><input type="text" id="transport_order_pickup_contact_tel" class="" value=""></dd>
									</dl>
                </div>
                  <div class="col-6">
                  	<h5>Delivery Address <span class="switch" id="transport_order_samme_som_ejer"></h5>
										<dl class="row">
											<dt class="col-3">Description: </dt>
											<dd class="col-9"><input type="text" id="transport_order_levering_navn" class=""></dd>

											<dt class="col-3">Street:</dt>
											<dd class="col-9"><input type="text" id="transport_order_levering_vej" class="input-sm"></dd>

											<dt class="col-3">Postal/city:</dt>
											<dd class="col-3"><input type="text" id="transport_order_levering_postnr" class=""></dd>
											<dd class="col-6"><input type="text" id="transport_order_levering_by" class=""></dd>

											<dt class="col-3 text-truncate">Country:</dt>
											<dd class="col-9"><input type="text" id="transport_order_levering_land" class="" value="Denmark"></dd>

											<dt class="col-3 text-truncate">Hours:</dt>
											<dd class="col-9"><input type="text" id="transport_order_levering_hours" class="" value="Mon-fri: , Sat: , Sun: "></dd>

											<dt class="col-3 text-truncate">Tel.#:</dt>
											<dd class="col-9"><input type="text" id="transport_order_levering_contact_tel" class="" value=""></dd>
										</dl>
                  </div>
                </div>
                <div class="row">
	                <div class="col-6">
										<h5>Relevant information</h5>
	                </div>
                  <div class="col-6">
										<h5>Ledig</h5>
                  </div>
                </div>
                <div class="row">
	                <div class="col-6">
										<h5>Relevant information</h5>
	                </div>
                  <div class="col-6">
										<h5>Ledig</h5>
                  </div>
                </div>
            </form>

          </div>
          <div class="modal-footer">
						<button type="button" class="btn btn-primary" onClick="window.print()">Print</button>
            <button type="button" id="" class="btn btn-primary" data-dismiss="modal">Luk</button>
          </div>

</body></html>
