jQuery(document).ready(function($) {
  jQuery('#ArrivaInput').live('blur', function(event) {
    var bus = [];
    var prioritet = [];
    var smsVedAnkomst = [];
    var kontakt = [];
    var reg = [];
    var abonnementstype = [];
    var assistancetype = [];

    jQuery('#ArrivaFormidlingHenterData').removeClass('skjul');
    jQuery('#ArrivaFormidling').addClass('skjul');
    arrivaInput = jQuery(this).text();
    //console.log(arrivaInput);
    arrivaInput = arrivaInput.replace(/\s/g, "__");
    console.log(arrivaInput);
    bus = arrivaInput.split("Bus__nr.:__");
    console.log(bus);
    if (bus.length > 1) {
      bus = bus[1].split("Fabrikat/Mærke");
      bus = "Bus nr.: " + bus[0];
    }
    else {
      bus = '';
    }
    console.log(bus);

    var prioritet = arrivaInput.split("Prioritet:");
    if (prioritet.length > 1) {
      prioritet = prioritet[1].split("Køretøjets__type__er");
      prioritet = " - Prioritet: " + prioritet[0];
    }
    else {
      prioritet = '';
    }
    console.log(prioritet);

    var abonnementstype = arrivaInput.split("Abonnements__type:");
    if (abonnementstype.length > 1) {
      abonnementstype = abonnementstype[1].split("Rekvisistions__nummer:");
      abonnementstype = " - Abonnementstype: " + abonnementstype[0];
    }
    else {
      abonnementstype = '';
    }
    console.log(abonnementstype);

    var assistancetype = arrivaInput.split("Assistance__type:");
    if (assistancetype.length > 1) {
      assistancetype = assistancetype[1].split("Årsag__til__Assistance:");
      assistancetype = " - Assistancetype: " + assistancetype[0];
    }
    else {
      assistancetype = '';
    }
    console.log(assistancetype);

    var smsVedAnkomst = arrivaInput.split("ankomst:");
    if (smsVedAnkomst.length > 1) {
      smsVedAnkomst = smsVedAnkomst[1].split("Oplyst__kontakt__telefon__nummer:");
      smsVedAnkomst = " - Der ønskes SMS ved ankomst:" + smsVedAnkomst[0];
    }
    else {
      smsVedAnkomst = '';
    }
    console.log(smsVedAnkomst);

    var kontakt = arrivaInput.split("Oplyst__kontakt__telefon__nummer:");
    if (kontakt.length > 1) {
      kontakt = kontakt[1].split("Øvrige__bemærkninger");
      if (kontakt[0].length > 4) {
        kontakt = " - Kontakt Tlf: " + kontakt[0];
      }
      else {
        kontakt = '';
      }
    }
    else {
      kontakt = '';
    }
    console.log(kontakt);

    var reg = arrivaInput.split("registreringsnummer:");
    if (reg.length > 1) {
      reg = reg[1].split("Aksler");
      console.log(reg[0]);
      reg = reg[0].replace(/[^a-zA-Z0-9]/g,'');
    }
    else {
      reg = '';
    }
    console.log(reg);

    var aksler = arrivaInput.split("Aksler:");
    if (aksler.length > 1) {
      aksler = aksler[1].split("Der");
      aksler = " - Aksler: " + aksler[0];
    }
    else {
      aksler = '';
    }
    console.log(aksler);

    jQuery.ajax({
      type: "POST",
      dataType: 'json',
      url: ajaxurl,
      data: {
          action: "findVaegtArriva",
          reg: reg, //'BF51681',
      },
      error: function(result){ //so, if data is retrieved, store it in html
      },
      before: function(result){ //so, if data is retrieved, store it in html

      },
      success: function(result){ //so, if data is retrieved, store it in html
        total = result.total;
        egen = result.egen;
        vaegt = " (Egenvægt/Totalvægt: " + egen + "kg /" + total + "kg)";
        formidling = bus + vaegt + aksler + abonnementstype + assistancetype + prioritet + smsVedAnkomst + kontakt;
        formidling = formidling.replace(/__/g, " ")
        jQuery('#ArrivaFormidlingHenterData').addClass('skjul');
        jQuery('#ArrivaFormidling').removeClass('skjul');
        jQuery('#ArrivaFormidling').html(formidling);
      },
    });
  });

  jQuery('#kopierFormidlingtilUdklipsholder').live('click', function(event) {
    var copyTextarea = document.querySelector('#ArrivaFormidling');
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    kopieretTilUdklipsholder(jQuery('#ArrivaFormidling').text());
  });

  $('#aktiverViking').live('click', function(){
    //jQuery('#animatedOptions').hide();
    foldUdMenuKnap = '<a id="opretArriva" title="ARRIVA sag" class="foldUdMenuKnap btn-floating btn-large red" data-toggle="modal" data-target="#opretArrivaModal"><i class="fa fa-bus"></i></a>';
		jQuery('#animatedOptionsLeft').append(foldUdMenuKnap);
  });

  var arrivaModal="";
  arrivaModal += "  <div class=\"modal\" id=\"opretArrivaModal\" tabindex=\"-1\" role=\"dialog\">";
  arrivaModal += "    <div class=\"modal-fluid\" role=\"document\">";
  arrivaModal += "        <div class=\"modal-content\">";
  arrivaModal += "            <div class=\"modal-header\">";
  arrivaModal += "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Luk\">";
  arrivaModal += "                    <span aria-hidden=\"true\">&times;<\/span>";
  arrivaModal += "                <\/button>";
  arrivaModal += "                <h4 class=\"modal-title\" id=\"opretArrivaModalTitel\">Opret Arriva<\/h4>";
  arrivaModal += "            <\/div>";
  arrivaModal += "            <div class=\"modal-body\">";
  arrivaModal += "              <h4>Indsæt tekst fra Arrivas mail her:<\/h4>";
  arrivaModal += "                <div id=\"ArrivaInput\" class=\"inputMedRamme\" contenteditable=\"true\" style=\"height:400px;\">";
  arrivaModal += "                <\/div>";
  arrivaModal += "                <hr class=\"m-y-2\">";
  arrivaModal += "                <h4>Tekst til formidling <\/h4>";
  arrivaModal += "                <div type=\"text\" id=\"ArrivaFormidlingHenterData\" class=\"skjul inputMedRamme\"  contenteditable=\"true\" style=\"height:100px;\"><span class=\"blinkende_tekst\">Henter data</span><\/div>";
  arrivaModal += "                <textarea type=\"text\" id=\"ArrivaFormidling\" class=\"inputMedRamme\" contenteditable=\"true\" style=\"height:100px;\"><\/textarea>";
  arrivaModal += "            <\/div>";
  arrivaModal += "            <div class=\"modal-footer\">";
  arrivaModal += "                <button type=\"button\" id=\"kopierFormidlingtilUdklipsholder\" class=\"kopierTilUdklipsholder btn btn-secondary\" data-kopifraid=\"ArrivaFormidling\">Kopier<\/button>";
  arrivaModal += "                <button type=\"button\" id=\"\" class=\"btn btn-primary\" data-dismiss=\"modal\">Luk<\/button>";
  arrivaModal += "            <\/div>";
  arrivaModal += "        <\/div>";
  arrivaModal += "    <\/div>";
  arrivaModal += "  <\/div>";

  jQuery('#modulModals').append(arrivaModal);

  jQuery('')

});
