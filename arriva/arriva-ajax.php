<?php
add_action( 'wp_ajax_findVaegtArriva', 'findVaegtArriva' );
function findVaegtArriva(){
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
