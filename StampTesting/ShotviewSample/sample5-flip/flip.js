/**
 * Sample5 flip
 *
 * Sample of flip animation imprints.
 *
 * Specify flip animation on imprint panel.
 * Start flip animation when recognition finished and remove stamp.
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
          // loop: Number of loop. 1 means no loop.
          loop: 1,

          // framesPerSec: Animation speed.
          //   Specify frames per second.
          framesPerSec: 10,

          // frames: Define animation frames.
          //   Specify changing value of each frames as an array of objects.
          frames: [
            {image: preload("assets/img/flip_imprint_1_00.png")},
            {image: preload("assets/img/flip_imprint_1_01.png")},
            {image: preload("assets/img/flip_imprint_1_02.png")},
            {image: preload("assets/img/flip_imprint_1_03.png")},
            {image: preload("assets/img/flip_imprint_1_04.png")},
            {image: preload("assets/img/flip_imprint_1_05.png")},
            {image: preload("assets/img/flip_imprint_1_06.png")},
            {image: preload("assets/img/flip_imprint_1_07.png")},
            {image: preload("assets/img/flip_imprint_1_08.png")},
            {image: preload("assets/img/flip_imprint_1_09.png")},
            {image: preload("assets/img/flip_imprint_1_10.png")},
            {image: preload("assets/img/flip_imprint_1_11.png")},
            {image: preload("assets/img/flip_imprint_1_12.png")},
            {image: preload("assets/img/flip_imprint_1_13.png")},
            {image: preload("assets/img/flip_imprint_1_14.png")},
            {image: preload("assets/img/flip_imprint_1_15.png")},
            {image: preload("assets/img/flip_imprint_1_16.png")},
            {image: preload("assets/img/flip_imprint_1_17.png")},
          ],
        }
      }),

    };
  });


  // Shotview Configuration ----------
  var shotview = new Digishot.Shotview({
    // URL for recognition
    serviceURI: "../api/digishot-api.php",
    // Shotview container elements
    container: "shotview-container",

    // onImprintIssuedOutcome: Event call back of Imprint Issued.
    //   This event is fired when recognition success and stamp released.
    onImprintIssuedOutcome: function(imprintRecord, imprintPanel) {
      // Start animation in the imprint.
      // Before starting, 1st image is displayed.
      // You can change detail in the option.
      imprintPanel.startAnimation();
    },

  });

})();




