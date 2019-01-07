
/// Søg på CVR
//

//
// $('.findVsInput').live('keyup', function(event) {
//   var inp = String.fromCharCode(event.keyCode);
//   if(/[a-zA-Z0-9 ]/.test(inp))  {
//     $('.vsListe').html('');
//   }
//   if (event.keyCode == 13) {
//     SoegEfterVaerksted();
//     //search();
//   }
// });
//
// $('#vaerkstedKort').live('keyup', function(event) {
//   // var request = {
//   //   input: $(this).val() + ' ' + $('#vaerkstedPostnummerAWS').val(),
//   // };
//   // soegplacesAutoComplete = new google.maps.places.AutocompleteService(map);
//   // soegplacesAutoComplete.getQueryPredictions(request, visVsfrasoegplacesAutoComplete);
//   if (event.keyCode == 13) {
//     var request = {
//       query: $(this).val() + ' ' + $('#vaerkstedPostnummerAWS').val(),
//     };
//     soegplaces = new google.maps.places.PlacesService(map);
//     soegplaces.textSearch(request, visVsfraSoegplaces);
//   }
// });

// vsXML = "";
// function krydsSoegVaerksted(vaerkstedslisteArray) {
//     jQuery('#listeVaerksteder').html('');
//     if(vaerkstedslisteArray.length === 1 && vaerkstedslisteArray[0].length < 1000 ){
//       jQuery.each(vaerkstedslisteArray[0] , function( filter1Index, filter1Obj ) {
//         var vs = {
//             cvr: filter1Obj.cvr,
//             postnummer: filter1Obj.postnummer,
//             navn: filter1Obj.navn,
//             adresse: filter1Obj.adresse,
//         };
//         if (vs.cvr != '0') {
//           jQuery('#listeVaerksteder').append('<ul><li class="vsNavn kopierAdresse">' + vs.navn + '</li><li><span class="kopierAdresse">' + vs.adresse + '</span><span>,</span> <span>' + vs.postnummer + '</span></li></ul>');
//         }
//       });
//     }
//     if(vaerkstedslisteArray.length === 2 && vaerkstedslisteArray[0].length > 0 && vaerkstedslisteArray[1].length > 0){
//       jQuery.each(vaerkstedslisteArray[0] , function( filter1Index, filter1Obj ) {
//         jQuery.each(vaerkstedslisteArray[1] , function( filter2Index, filter2Obj ) {
//             if (filter1Obj.cvr == filter2Obj.cvr && filter1Obj.postnummer == filter2Obj.postnummer) {
//               var vs = {
//                   cvr: filter1Obj.cvr,
//                   postnummer: filter1Obj.postnummer,
//                   navn: filter1Obj.navn,
//                   adresse: filter1Obj.adresse,
//               };
//               if (vs.cvr != '0') {
//                 jQuery('#listeVaerksteder').append('<ul><li class="vsNavn kopierAdresse">' + vs.navn + '</li><li><span class="kopierAdresse">' + vs.adresse + '</span><span>,</span> <span>' + vs.postnummer + '</span></li></ul>');
//               }            }
//         });
//       });
//     }
//     else if (vaerkstedslisteArray.length === 3 ){
//       jQuery.each(vaerkstedslisteArray[0] , function( filter1Index, filter1Obj ) {
//         jQuery.each(vaerkstedslisteArray[1] , function( filter2Index, filter2Obj ) {
//           jQuery.each(vaerkstedslisteArray[2] , function( filter3Index, filter3Obj ) {
//             if (filter1Obj.cvr == filter2Obj.cvr && filter1Obj.cvr == filter3Obj.cvr && filter1Obj.postnummer == filter2Obj.postnummer && filter1Obj.postnummer == filter3Obj.postnummer) {
//               var vs = {
//                   cvr: filter1Obj.cvr,
//                   postnummer: filter1Obj.postnummer,
//                   navn: filter1Obj.navn,
//                   adresse: filter1Obj.adresse,
//               };
//               if (vs.cvr != '0') {
//                 jQuery('#listeVaerksteder').append('<ul><li class="vsNavn kopierAdresse">' + vs.navn + '</li><li><span class="kopierAdresse">' + vs.adresse + '</span><span>,</span> <span>' + vs.postnummer + '</span></li></ul>');
//               }            }
//           });
//         });
//       });
//     }
// }
//
// function findVaerkstedsnavn(navn) {
//   vaerkstedNavn.length = 0;
//   var obj = {
//       cvr: '0',
//   };
//   vaerkstedNavn.push(obj);
//   jQuery(vsXML).find('navn tekst:containsInsensitive("'+navn+'")').each(function(){
//     vaerksted = jQuery(this).parent().parent();
//     var obj = {
//         cvr: jQuery(vaerksted).find('cvrnr').text(),
//         navn: jQuery(vaerksted).find('navn tekst').text(),
//         adresse: jQuery(vaerksted).find('vejnavn').text() + ' ' + jQuery(vaerksted).find('husnummerFra').text(),
//         postnummer: jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse postdistrikt').text(),
//     };
//     vaerkstedNavn.push(obj);
//   });
//   return vaerkstedNavn;
// }
//
// function findVaerkstedsVej(vej) {
//   vaerkstedVej.length = 0;
//   var obj = {
//       cvr: '0',
//   };
//   vaerkstedVej.push(obj);
//   jQuery(vsXML).find('beliggenhedsadresse vejnavn:containsInsensitive("'+vej+'")').each(function(){
//     vaerksted = jQuery(this).parent().parent();
//     var obj = {
//         cvr: jQuery(vaerksted).find('cvrnr').text(),
//         navn: jQuery(vaerksted).find('navn tekst').text(),
//         adresse: jQuery(vaerksted).find('vejnavn').text() + ' ' + jQuery(vaerksted).find('husnummerFra').text(),
//         postnummer: jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse postdistrikt').text(),
//     };
//     vaerkstedVej.push(obj);
//   });
//   return vaerkstedVej;
// }
//
// function findVaerkstedsPostnummer(postnummer) {
//   vaerkstedPostnummer.length = 0;
//   var obj = {
//       cvr: '0',
//   };
//   vaerkstedPostnummer.push(obj);
//   jQuery(vsXML).find('beliggenhedsadresse postnr:contains("'+postnummer+'")').each(function(){
//     vaerksted = jQuery(this).parent().parent();
//     var obj = {
//         cvr: jQuery(vaerksted).find('cvrnr').text(),
//         navn: jQuery(vaerksted).find('navn tekst').text(),
//         adresse: jQuery(vaerksted).find('vejnavn').text() + ' ' + jQuery(vaerksted).find('husnummerFra').text(),
//         postnummer: jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse postdistrikt').text(),
//     };
//     vaerkstedPostnummer.push(obj);
//     // info = jQuery(vaerksted).find('navn tekst').text()+'#'+jQuery(vaerksted).find('beliggenhedsadresse postnr').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse vejnavn').text() + ' ' + jQuery(vaerksted).find('beliggenhedsadresse husnummerFra').text();
//     // vaerkstedVej.push(info);
//   });
//   return vaerkstedPostnummer;
// }
//
//
//   var apiBase = 'https://dawa.aws.dk/';
//
// function searchPostnr(input) {
//   jQuery.ajax({
//     cache: true,
//     url:apiBase +'postnumre',
//     dataType: "json",
//     error: function (xhr, status, errorThrown) {
//       var text= xhr.status + " " + xhr.statusText + " " + status + " " + errorThrown;
//       alert(text);
//     } ,
//     success: function (postnumre) {
//       var items= [];
//       jQuery.each(postnumre, function (i, postnr) {
//         items.push(postnr.nr + " " + postnr.navn);
//       });
//       jQuery("#vaerkstedPostnummerAWS").autocomplete({
//         source: items,
//         autoFocus: true,
//         minLength: 1
//       });
//     }
//   });
// }
//
// function searchVejnavn(pnr,vej) {
//   var match = ['']
//   var ptext = jQuery('#vaerkstedPostnummerAWS').val();
//   if (ptext.length > 1) {
//     var ptext = jQuery(pnr).val();
//     var reg = /(\d{4})/g;
//     match = reg.exec(ptext);
//     if (match === null) { return; }
//     var parametre= {postnr: match[1]};
//   }
//   vejnavnSøgeord = jQuery('#vaerkstedVejAWS').val();
//   if (vejnavnSøgeord.length > 2) {
//     jQuery.ajax({
//       url: apiBase + 'vejnavne',
//       data: parametre,
//       dataType: "json",
//       error: function (xhr, status, errorThrown) {
//         var text= xhr.status + " " + xhr.statusText + " " + status + " " + errorThrown;
//         alert(text);
//       } ,
//       success: function (vejnavne) {
//         var navne= [];
//         jQuery.each(vejnavne, function (i, vejnavn) {
//           navne.push(vejnavn.navn);
//         });
//         jQuery(vej).autocomplete({
//           source: navne,
//           autoFocus: true,
//           minLength: 1
//         });
//       }
//     });
//   }
// }
//
// function SoegEfterVaerksted() {
//   match = '';
//   postnummerInput = '';
//   var ptext = jQuery('#vaerkstedPostnummerAWS').val();
//   if (ptext.length > 3) {
//     var reg = /(\d{4})/g;
//     var match = reg.exec(ptext);
//     if (match === null) { return; }
//     var parametre= {postnr: match[1]};
//       postnummerInput = match[1];
//   }
//
//   listeVejnavneTæller = 0;
//   jQuery('#listeVejnavne').html('');
//   vaerkstedsnavnInput = jQuery('#vaerkstedNavn').val();
//   vaerkstedsvejInput = jQuery('#vaerkstedVejAWS').val();
//   vaerkstedslisteArray.length = 0;
//   vaerkstedslisteFiltreret.length = 0;
//   vaerkstedPostnummer.length = 0;
//   vaerkstedNavn.length = 0;
//   vaerkstedVej.length = 0;
//
//   if (postnummerInput.length == 4) {
//     findVaerkstedsPostnummer(postnummerInput);
//   }
//   if (vaerkstedsnavnInput.length > 1) {
//     findVaerkstedsnavn(vaerkstedsnavnInput);
//   }
//   if (vaerkstedsvejInput.length > 1) {
//     findVaerkstedsVej(vaerkstedsvejInput);
//   }
//   if (vaerkstedNavn.length > 0) {
//     vaerkstedslisteArray.push(vaerkstedNavn);
//   }
//   if (vaerkstedPostnummer.length > 0) {
//     vaerkstedslisteArray.push(vaerkstedPostnummer);
//   }
//   if (vaerkstedVej.length > 0) {
//     vaerkstedslisteArray.push(vaerkstedVej);
//   }
//   vaerkstedslisteArray.sort(function(a, b){
//     return a.length - b.length;
//   });
//   krydsSoegVaerksted(vaerkstedslisteArray);
// }
//
//
// $.expr[":"].containsInsensitive = $.expr.createPseudo(function(arg) {
//   return function( elem ) {
//       return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
//   };
// });

// $.ajax({
//   type: "GET" ,
//   url: vaerksteder_url + "/vs.xml" ,
//   dataType: "xml" ,
//   success: function(xml) {
//     vsXML = xml
//   }
// });