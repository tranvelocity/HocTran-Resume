<?php
  /**
   * Server side program to acquire Digishot JavaScript library from DaaS
   *
   * Deployment)
   * doc_root/
   *   |-- api/                     :PHP programs to call from JavaScript
   *   |                              This file should be put here.
   *   |-- digishot                 :Part of Shotview library
   *   |   `-- shotview
   *   |       |-- konva@3.4.1      :konva library that Shotview is used
   *   |       `-- r                :Resources of Shotview library
   *   |           `-- default
   *   |               `-- koto
   *   |                   |-- base_ani01
   *   |                   `-- base_ani02
   *   |-- phpcommon/
   *   |   |-- convenienceFunc.php  :Utility program that is used by PHP under api.
   *   |   `-- define.php           :Definition of parameters for each licensee.
   *   |
   *   |-- sample1-simple           :Samples
   *   digishot-shotview.php        :This file
   */

  require_once('./phpcommon/define.php');
  require_once('./phpcommon/convenienceFunc.php');


  //////////////////////////////////////////////////////////
  //
  // Web API to acquire Digishot JavaScript library from DaaS
  //
  // GET or POST
  // https://api-daas.digishot.jp/analyzer/js/digishot.php?apikey=<SDK authentication password>
  //
  // To prevent unauthorized use of your company's "SDK authentication password", 
  // handle the "SDK authentication password" of the project only on the server side, 
  // and do not disclose it to the client side. 
  // The IP address, user agent and referrer set in the HTTP header are stored in the DaaS access log. 
  // These are useful values for access analysis. We recommend sending to DaaS.
  //
  //////////////////////////////////////////////////////////

  // Construct Web API for getting Digishot JavaScript library
  $param = ENDPOINT_KEYNAME;    // Parameters. see phpcommon/define.php.
  $apiKey = SDK_AUTH_PASSWORD;  // SDK auth. password. see phpcommon/define.php

  $url = sprintf(ENDPOINT_DIGISHOT_LIB . "?%s=%s", urlencode($param), urlencode($apiKey));


  $statusCodes = HTTP_STATUS_CODES;

  // Check if 'curl' functions are available
  if (!is_callable("curl_init")) {

    $code = 500;  // 500 Internal Server Error
    header("HTTP/1.1 {$code} {$statusCodes[$code]}");
    exit;

  }


  //
  // Set client information needed for DaaS
  //
  $opt = array("Cache-Control: no-cache", "Content-Type: application/x-javascript", "Accept: application/x-javascript");
  $addr = getRemoteAddr();
  $userAgent = (isset($_SERVER["HTTP_USER_AGENT"])) ? trim($_SERVER["HTTP_USER_AGENT"]) : "";
  $referer = (isset($_SERVER["HTTP_REFERER"])) ? trim($_SERVER["HTTP_REFERER"]) : "";
  if (0 < strlen($userAgent)) { $opt[] = "User-Agent: {$userAgent}"; }
  if (0 < strlen($referer)) { $opt[] = "Referer: {$referer}"; }
  if (0 < strlen($addr)) { $opt[] = "X-FORWARDED-FOR: {$addr}"; }

  // Start new session for HTTP/HTTPS communication
  $ch = curl_init();

  //
  // Set parameters for HTTP/HTTPS communication
  //
  // Default of PHP's cURL(curl) is GET. See below comment for changing to POST
  //
  curl_setopt($ch, CURLOPT_HTTPHEADER, $opt);
//  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");  // Remove comment for POST
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
  curl_setopt($ch, CURLOPT_TIMEOUT, 6);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL, $url);

  // Communicate to DaaS and receive the result
  $result = curl_exec($ch);

  //
  // Perform processing based on recognition results
  // If status code is less than 400, $errHeader is null
  //
  $errHeader = null;
  if (curl_errno($ch) === CURLE_OK) {

    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if (400 <= $code) {

      $errHeader = "HTTP/1.1 {$code} {$statusCodes[$code]}";

    }

  } else {

    $code = 500;  // 500 Internal Server Error
    $errHeader = "HTTP/1.1 {$code} {$statusCodes[$code]}";

  }

  // Close the session
  curl_close($ch);


  // If error happen, error header also be returned
  if ($errHeader !== null) {

    header($errHeader);
    exit;

  }


  //
  // Output required header and result so that Digishot JavaScript library will send back to the client
  //
  header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
  header("Last-Modified: ".gmdate( "D, d M Y H:i:s")." GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  header("Content-Type: application/x-javascript; charset=utf-8");
  print $result;
