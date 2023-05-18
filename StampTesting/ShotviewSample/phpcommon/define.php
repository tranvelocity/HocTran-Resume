<?php
  /**
   * 企画ごとに変更が必要な設定を含む定数の定義
   *
   */

  //////////////////////////////////////////////////////////////
  // 企画ごとに変更か必要な値
  //////////////////////////////////////////////////////////////
  const SDK_AUTH_PASSWORD = "SgiKAQp6rpWM"; //TODO  企画の "SDK認証パスワード" を設定して下さい


  //////////////////////////////////////////////////////////////
  // DaaS の設定（基本的に変更する必要はない値）
  //////////////////////////////////////////////////////////////
  const ENDPOINT_DIGISHOT_LIB = "https://api-daas.digishot.jp/analyzer/js/digishot.php";
  const ENDPOINT_DIGISHOT_API = "https://api-daas.digishot.jp/analyzer/api/";
  const ENDPOINT_KEYNAME = "apikey";


  ////////////////////////////////////////////////////////////
  // 企画や DaaS に関係のない定数
  ////////////////////////////////////////////////////////////
  const HTTP_STATUS_CODES = array( // HTTP ステータスコードに従い返却する文字列
    100 => "Continue", 101 => "Switching Protocols",
    200 => "OK", 201 => "Created", 202 => "Accepted", 203 => "Non-Authoritative Information", 204 => "No Content", 205 => "Reset Content", 206 => "Partial Content",
    300 => "Multiple Choices", 301 => "Moved Permanently", 302 => "Found", 303 => "See Other", 304 => "Not Modified", 305 => "Use Proxy", 306 => "(Unused)", 307 => "Temporary Redirect",
    400 => "Bad Request", 401 => "Unauthorized", 402 => "Payment Required", 403 => "Forbidden", 404 => "Not Found", 405 => "Method Not Allowed", 406 => "Not Acceptable", 407 => "Proxy Authentication Required",
    408 => "Request Timeout", 409 => "Conflict", 410 => "Gone", 411 => "Length Required", 412 => "Precondition Failed", 413 => "Request Entity Too Large", 414 => "Request-URI Too Long", 415 => "Unsupported Media Type",
    416 => "Requested Range Not Satisfiable", 417 => "Expectation Failed",
    500 => "Internal Server Error", 501 => "Not Implemented", 502 => "Bad Gateway", 503 => "Service Unavailable", 504 => "Gateway Timeout", 505 => "HTTP Version Not Supported",
  );

?>
