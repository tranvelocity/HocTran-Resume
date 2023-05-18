<?php
  /**
   * 共通に利用する関数
   *
   * 配置例)
   * doc_root/
   *   ├ stamp/
   *   ｜  ├ common/
   *   │  │  ├ define.php : 企画ごとに変更が必要な設定を含む定数の定義
   *   │  │  └ convenienceFunc.php : 共通に利用する関数（本ファイル）
   *   │  ├ api/
   *   │  │  └ daas-api.php : DaaS のスタンプ認識機能との接続をするサーバサイドプログラム
   *   │  ├ js/
   *   │  │  ├ digishot-lib.php: Digishot JavaScript library を取得するサーバサイドプログラム
   *   │  │  ├ stamp.js: スタンプ押印制御スクリプト
   *   │  │  └ stamp.min.js: stamp.js の minify 版（※HTML からはこのファイルを指定している）
   *   │  ├ scss/
   *   │  │  └ stamp.scss
   *   │  ├ css/
   *   │  │  └ stamp.css: stamp.scss から生成された css（※HTML からはこのファイルを指定している）
   *   │  ├ res/
   *   │  │  └ リソース
   *   │  └ index.html : 押印画面
   *   │
   */

  /**
   * アクセス元IPアドレスを取得する
   *
   * @return String|NULL  取得できたときはアクセス元IPアドレスを返す。それ以外は null を返す
   */
  function getRemoteAddr() {

    $addr = (isset($_SERVER["REMOTE_ADDR"])) ? $_SERVER["REMOTE_ADDR"] : null;
    if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]) && (0 < strlen($_SERVER["HTTP_X_FORWARDED_FOR"]))) {

      $delimiter = ",";
      if (strpos($_SERVER["HTTP_X_FORWARDED_FOR"], $delimiter) === false) {

        $addr = $_SERVER["HTTP_X_FORWARDED_FOR"];

      } else {

        $tmp = explode($delimiter, $_SERVER["HTTP_X_FORWARDED_FOR"]);
        $addr = trim($tmp[0]);

      }
    } else if (isset($_SERVER["X-REAL-IP"]) && (0 < strlen($_SERVER["X-REAL-IP"]))) {

      $addr = $_SERVER["X-REAL-IP"];

    }

    return $addr;
  }

?>
