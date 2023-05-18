<?php
  /**
   * Sample to invalidate e-ticket by stamp
   * For sample 4
   *
   * Deployment)
   *   root
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
   */

  require_once('../phpcommon/define.php');
  require_once('../phpcommon/convenienceFunc.php');


  //////////////////////////////////////////////////////////
  //
  // Web API to communicate DaaS stamp recognition server.
  //
  // POST
  // https://api-daas.digishot.jp/analyzer/api/
  //
  // You should POST following to DaaS server
  // - JSON data from Digishot JavaScript library
  // - "apikey":"<SDK auth. password>"
  //
  // Do not modify JSON data from Digishot JavaScript library.
  // Do not open SDK auth. password to client. It should be treated inside the application server.
  // IP address, User Agent and referer are saved in the access log of DaaS.
  // So it is strongly recommended to send them to DaaS
  //
  //////////////////////////////////////////////////////////

  //
  // Prepare necessary information for DaaS Web API
  //
  $apiUrl = ENDPOINT_DIGISHOT_API; // Web API Endpoint of DaaS

  $param = ENDPOINT_KEYNAME;    // Web API Endpoint of DaaS
  $apiKey = SDK_AUTH_PASSWORD;  // Your "SDK auth. password" (see phpcommon/define.php)

  // Receive JSON from Digishot JavaScript library
  $jsonStr = file_get_contents("php://input");

  $postData = json_decode($jsonStr, true);
  if ($postData === null) {

    $code = 500;  // 500 Internal Server Error
    header("HTTP/1.1 {$code} {$statusCodes[$code]}");
    exit;

  }
  if (is_array($postData)) {

    $postData[$param] = $apiKey;  // Add "SDK auth. password" on POST data

  }


  //
  // Get userData if exist
  //
  $userData = (isset($postData["userData"])) ? $postData["userData"] : null;


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
  $opt = array("Cache-Control: no-cache", "Content-Type: application/json", "Accept: application/json");
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
  curl_setopt($ch, CURLOPT_HTTPHEADER, $opt);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
  curl_setopt($ch, CURLOPT_TIMEOUT, 6);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL, $apiUrl);

  //
  // Communicate to DaaS and receive the result
  //
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

  // Set result into associative array
  $daasResponse = json_decode($result, true);

  // Receive properties.
  // You can overwrite or remove following properties.
  // $daasResponse["stampcode"]

  // You can add following properties.
  // $daasResponse["userData"]
  $response = (isset($daasResponse["response"])) ? $daasResponse["response"] : null;
  $resultCode = (isset($daasResponse["resultCode"])) ? $daasResponse["resultCode"] : null;
  $messageForDebug = (isset($daasResponse["messageForDebug"])) ? $daasResponse["messageForDebug"] : null;

  //
  //
  // Perform processing based on recognition results
  // Use this part to implement the application behavior depending on the stamp recognition result.
  //
  //
  if($response === "recognize") { // Only when this value is set valid values for the application

    if($resultCode === '1') { // Stamp is recognized successfully.($stampcode is valid)

      //
      //
      // Use this part to implement the processing of the application when the stamp successfully recognized
      // Ex. Update data base, Set userData to control client, remove stampcode etc.
      //
      //

      //
      // Get valid properties when recognition succeeds
       //
      $stampcode = (isset($daasResponse["stampcode"])) ? $daasResponse["stampcode"] : null;

      error_log("recognized:");
      error_log(" stampcode = {$stampcode}");
      error_log(" userData = " . print_r($userData, true));   // Not displayed unless set on client side


      // Validate ticket based on ticket ID
      // If ticket is not valid, send 'failure for application reason'.
      // Receive ticket ID from userData
      $ticketID = (isset($userData["ticketID"])) ? $userData["ticketID"] : "";

      // Check if ticket is valid or not.
      if (!isValidTicket($ticketID, $stampcode)) {
      	  // If ticket is not valid, it is failure for application reason
      	  // Set "7" to resultCode which means failure for application reason.
      	  $daasResponse["resultCode"] = "7";
      } else {
      	  // if recognition success and ticket is valid, return current time and date as string to client
      	  // Get current date and format
      	  $dateStr = date("Y/m/d\nH:i:s");
      	  // Put it into userData
      	  $userData["date"] = $dateStr;
      	  // Add userData to the result
      	  $daasResponse["userData"] = json_encode($userData);
      }


    } else { // Other resultCode is not explained to the application
      // Usually, the application need to return JSON as is.
    }

  }

  // Get back to json in order to send client
  // It is assumed that data is added / deleted / updated based on the recognition result.
  // If you do nothing, just return the result received from DaaS.
  $result = json_encode($daasResponse);

  /**********************************************************
  *
  * Send the result from DaaS to the client.
  * Some configurations are required to prevent cache on client
  *
  **********************************************************/
  header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
  header("Last-Modified: ".gmdate( "D, d M Y H:i:s")." GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  header("Content-Type: application/json; charset=utf-8");
  print $result;

// Check if ticket is valid or not.
function isValidTicket($ticketID, $stampCode) {
  // If it is real application you should evaluate by ticketID and stampcode using database.
  // This is a sample, so we return true always.
  // Try what happen if return false.
  return true;
}
