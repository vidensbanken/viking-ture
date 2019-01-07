<?php
add_action( 'wp_ajax_find_nummerplade', 'find_nummerplade' );
function find_nummerplade(){
	$reg = $_POST["reg"];
	$userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13';
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_USERAGENT, $userAgent);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl, CURLOPT_CONNECTTIMEOUT ,3);
	curl_setopt($curl, CURLOPT_TIMEOUT, 20);
	curl_setopt ($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/dmr.portal?_nfpb=true&_nfpb=true&_pageLabel=vis_koeretoej_side&_nfls=false');
	curl_setopt($curl, CURLOPT_COOKIESESSION, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HEADER, TRUE);
	$cookie_file = "cookie1.txt";
	curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie_file);
	curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie_file);
	$indhold = curl_exec ($curl);
	$resultStatus = curl_getinfo($curl);

	$indhold = explode('<input type="hidden" value="', $indhold);
	$token = explode('" name="dmrFormToken"', $indhold[1]);
	$token = str_replace('"', '-', $token[0]);

	curl_setopt($curl, CURLOPT_REFERER, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfls=false&_nfpb=true&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/dmr.portal?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FfremsoegKoeretoej%2Fsearch&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_POST, true);


	$formdata = array(
			'kerne_vis_koeretoejwlw-radio_button_group_key:{actionForm.soegekriterie}' => 'REGISTRERINGSNUMMER',
			'kerne_vis_koeretoej{actionForm.soegeord}' => $reg,
			'dmrFormToken'=> $token,
	);

	curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($formdata));

	$data = curl_exec ($curl);

	$art = explode('>Art:', $data);
	$art = explode('<span class="value">', $art[1]);
	$art = explode('</span>', $art[1]);

	$alder = explode('<span class="key">Første registrering', $data);
	$alder = explode('<span class="value">', $alder[1]);
	$alder = explode('</span>', $alder[1]);

	$farve = explode('id="ptr-2278">', $data);
	$farve = explode('<span class="">', $farve[1]);
	$farve = explode('</span>', $farve[1]);

	$model = explode('<span class="key">Mærke, Model, Variant:', $data);
	$model = explode('<span class="value">', $model[1]);
	$model = explode('</span>', $model[1]);

	$stelnr = explode('<span class="key">Stelnummer:</span>', $data);
	$stelnr = explode('<span class="value">', $stelnr[1]);
	$stelnr = explode('</span>', $stelnr[1]);


	curl_setopt($curl, CURLOPT_REFERER, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FfremsoegKoeretoej%2Fsearch&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FvisKoeretoej%2FselectTab&kerne_vis_koeretoejdmr_tabset_tab=1&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_POST, false);

	$data = curl_exec ($curl);

	$total = explode('id="ptr-2413">', $data);
	$total = explode('<span class="">', $total[1]);
	$total = explode('</span>', $total[1]);

	$egen = explode('id="ptr-2415">', $data);
	$egen = explode('<span class="">', $egen[1]);
	$egen = explode('</span>', $egen[1]);

	$minimum = explode('id="ptr-2417">', $data);
	$minimum = explode('<span class="">', $minimum[1]);
	$minimum = explode('</span>', $minimum[1]);


	$drivkraft = explode('id="ptr-2430">', $data);
	$drivkraft = explode('<span class="">', $drivkraft[1]);
	$drivkraft = explode('</span>', $drivkraft[1]);

	$karrosseritype = explode('id="ptr-2438">', $data);
	$karrosseritype = explode('<span class="">', $karrosseritype[1]);
	$karrosseritype = explode('</span>', $karrosseritype[1]);

	$supplerendetype = explode('id="ptr-2439">', $data);
	$supplerendetype = explode('<span class="">', $supplerendetype[1]);
	$supplerendetype = explode('</span>', $supplerendetype[1]);

	$tr_aksel = explode('id="ptr-2456">', $data);
	$tr_aksel = explode('<span class="">', $tr_aksel[1]);
	$tr_aksel = explode('</span>', $tr_aksel[1]);

	curl_setopt($curl, CURLOPT_REFERER, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FfremsoegKoeretoej%2Fsearch&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FvisKoeretoej%2FselectTab&kerne_vis_koeretoejdmr_tabset_tab=3&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_POST, false);

	$data = curl_exec ($curl);

	$selskab = explode('<span class="key">Selskab:</span>', $data);
	$selskab = explode('<span class="value">', $selskab[1]);
	$selskab = explode('</span>', $selskab[1]);


	$oprettet = explode('<span class="key">Oprettet:</span>', $data);
	$oprettet = explode('<span class="value">', $oprettet[1]);
	$oprettet = explode('</span>', $oprettet[1]);


	$status = explode('<span class="key">Status:</span>', $data);
	$status = explode('<span class="value">', $status[1]);
	$status = explode('</span>', $status[1]);

	$koeretoej = [
		"art"		=> trim($art[0]),
		"alder"     => $alder[0],
		"model"     => $model[0],
		"stelnr"     => $stelnr[0],
		"total"		=> $total[0],
		"egen"		=> $egen[0],
		"drivkraft"	=> $drivkraft[0],
		"minimum"	=> $minimum[0],
		"selskab"	=> trim($selskab[0]),
		"status"	=> trim($status[0]),
		"oprettet"	=> trim($oprettet[0]),
		"karrosseritype" => trim($karrosseritype[0]) . ' - ' . trim($supplerendetype[0]),
		"tr_aksel" => $tr_aksel[0],
		"farve" => trim($farve[0]),
		"data"		=> $data,
	];


	if($resultStatus['http_code'] == 200) {
		echo json_encode($koeretoej);
		//echo json_encode($data2);

	 }
	else {
		echo '<div>Opslag fejlede </br> ' . $resultStatus[url]  . '</div></br> ';
		echo '<div>fejl: ' . $resultStatus[http_code]  . '</div>http://www.nummerplade.net/teknisk-info/?regnr=' . $reg . $resultStatus['http_code'];
	}


	die();
}

add_action( 'wp_ajax_sagsbehandling_regnummer', 'sagsbehandling_regnummer' );
function sagsbehandling_regnummer(){
	$reg = $_POST["reg"];
	$token = $_POST["token"];
	$userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13';
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_USERAGENT, $userAgent);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 0);
	curl_setopt($curl, CURLOPT_REFERER, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfls=false&_nfpb=true&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FfremsoegKoeretoej%2Fsearch&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl,CURLOPT_CONNECTTIMEOUT ,3);
  curl_setopt($curl,CURLOPT_TIMEOUT, 20);
	curl_setopt($curl, CURLOPT_HEADER, TRUE);
	curl_setopt($curl, CURLOPT_COOKIESESSION, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 0);
	$cookie_file = "cookie1.txt";
	curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie_file);
	curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie_file);

	$data = array(
			'kerne_vis_koeretoejwlw-radio_button_group_key:{actionForm.soegekriterie}' => 'REGISTRERINGSNUMMER',
			'kerne_vis_koeretoej{actionForm.soegeord}' => $reg,
			'dmrFormToken'=> $token,
	);

	curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));


	$indhold_reg = curl_exec ($curl);
	$resultStatus_reg = curl_getinfo($curl);
	if($resultStatus_reg['http_code'] == 200) {
		echo json_encode($indhold_reg);
	 }
	else {
		echo '<div>Opslag fejlede </br> ' . $resultStatus[url]  . '</div></br> ';
		echo '<div>fejl: ' . $resultStatus[http_code]  . '</div>http://www.nummerplade.net/teknisk-info/?regnr=' . $reg . $resultStatus['http_code'];
	}
	curl_close ($curl);
	die();
}

add_action( 'wp_ajax_findVaegtArriva_', 'findVaegtArriva_' );
function findVaegtArriva_(){
	$reg = $_POST["reg"];
	$userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13';
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_USERAGENT, $userAgent);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl, CURLOPT_CONNECTTIMEOUT ,3);
	curl_setopt($curl, CURLOPT_TIMEOUT, 20);
	curl_setopt ($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/dmr.portal?_nfpb=true&_nfpb=true&_pageLabel=vis_koeretoej_side&_nfls=false');
	curl_setopt($curl, CURLOPT_COOKIESESSION, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HEADER, TRUE);
	$cookie_file = "cookie1.txt";
	curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie_file);
	curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie_file);
	$indhold = curl_exec ($curl);
	$resultStatus = curl_getinfo($curl);
	$indhold = explode('<input type="hidden" value="', $indhold);
	$token = explode('" name="dmrFormToken"', $indhold[1]);
	$token = str_replace('"', '-', $token[0]);
	curl_setopt($curl, CURLOPT_REFERER, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfls=false&_nfpb=true&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/dmr.portal?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FfremsoegKoeretoej%2Fsearch&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_POST, true);
	$formdata = array(
			'kerne_vis_koeretoejwlw-radio_button_group_key:{actionForm.soegekriterie}' => 'REGISTRERINGSNUMMER',
			'kerne_vis_koeretoej{actionForm.soegeord}' => $reg,
			'dmrFormToken'=> $token,
	);
	curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($formdata));
	$data = curl_exec ($curl);
	curl_setopt($curl, CURLOPT_REFERER, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FfremsoegKoeretoej%2Fsearch&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_URL, 'https://motorregister.skat.dk/dmr-front/appmanager/skat/dmr?_nfpb=true&_windowLabel=kerne_vis_koeretoej&kerne_vis_koeretoej_actionOverride=%2Fdk%2Fskat%2Fdmr%2Ffront%2Fportlets%2Fkoeretoej%2Fnested%2FvisKoeretoej%2FselectTab&kerne_vis_koeretoejdmr_tabset_tab=1&_pageLabel=vis_koeretoej_side');
	curl_setopt($curl, CURLOPT_POST, false);
	$data = curl_exec ($curl);
	$total = explode('id="ptr-2413">', $data);
	$total = explode('<span class="">', $total[1]);
	$total = explode('</span>', $total[1]);
	$egen = explode('id="ptr-2415">', $data);
	$egen = explode('<span class="">', $egen[1]);
	$egen = explode('</span>', $egen[1]);

	$koeretoej = [
		"total"		=> $total[0],
		"egen"		=> $egen[0],
	];

	if($resultStatus['http_code'] == 200) {
		echo json_encode($koeretoej);
	 }
	else {
		echo '<div>Opslag fejlede </br> ' . $resultStatus[url]  . '</div></br> ';
		echo '<div>fejl: ' . $resultStatus[http_code]  . '</div>http://www.nummerplade.net/teknisk-info/?regnr=' . $reg . $resultStatus['http_code'];
	}
	die();
}
?>
