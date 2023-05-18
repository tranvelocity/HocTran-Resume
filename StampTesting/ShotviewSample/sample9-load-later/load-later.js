/**
 * Sample9 load-later
 *
 * Sample of loading imprint image after successful recognition without preloading.
 *
 * Prepare data URI scheme of the image at server.
 * At successful recognition, send data URI scheme as userData from the Server.
 * Extract the Image object from the data URI scheme and display it.
 *
 */
(function() {
  "use strict";

  // Define the panel configuration of Shotview in advance ----------
  Digishot.Shotview.installPanelDefinitions(function (ResourceLoader, ShotviewConstants) {
    // Method to create Panel definition based on pre defined panel set.
    var paneldef = Digishot.Shotview.createPanelDefinitionBasedOn;
    // Method to specify the resource to preload.
    var preload = ResourceLoader.preload;

    return {
      // Definition of Imprint Panel
      _ImprintIssuedOutcome: paneldef("_ImprintIssuedOutcome_v1", {
        options: {
          base: {
            // Configure temporary display image
            //   This time, we use the image of common frame as a temporary imprint, 
            //   so that any image can fit for the actual imprint.
            //   It is necessary to prevent to show default imprint image.
            image: preload("assets/img/imprint_frame.png"),
          },
        }
      }),
    };
  });


  // Shotview Configuration ----------
  var shotview = new Digishot.Shotview({
    // URL for recognition
    //   In this server program, data URI scheme is prepared.
    serviceURI: "../api/load-later.php",
    // Shotview container elements
    container: "shotview-container",

    // onImprintWillBeIssued: Event call back of recognition success.
    //   This event is fired when recognition success and imprint panel is displaying.
    //   The temporary image set above is used when this function is called.
    onImprintWillBeIssued: function(imprintRecord, imprintPanel) {
      // Received data URI scheme from the userData.
      var userData = JSON.parse(imprintRecord.userData);
      var imgURI = userData.imgURI;

      // Create Image object
      var image = new Image();
      // Register data URI scheme to the Image object. Display it to the panel.
      image.onload = function() {
        imprintPanel.kvImage.image(image);
      };
      image.src = imgURI;
    },

  });

})();


