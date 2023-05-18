/**
 * Sample1 simple
 *
 * Shotview basic sample
 *
 * All display elements are defaults
 *
 */
(function() {
  "use strict";

  // Shotview Configuration ----------
  var shotview = new Digishot.Shotview({
    // serviceURI: URL for recognition.
    serviceURI: "../api/digishot-api.php",

    // container: Shotview container elements
    //   Specify the container id in the HTML.
    container: "shotview-container",
  });

})();


