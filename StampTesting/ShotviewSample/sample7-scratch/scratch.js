/**
 * Sample7 scratch
 *
 * Sample of 'Scratch' imprint.
 *
 * Change the imprint to scratch.
 * Flip animation is specified as the image under the scratch card.
 * When covered image are fully scratched, the animation will start.
 *
 */
(function() {
  "use strict";

  // Imprint panel
  var _imprintPanel;

  // Define the panel configuration of Shotview in advance ----------
  Digishot.Shotview.installPanelDefinitions(function (ResourceLoader, ShotviewConstants) {
    // Method to create Panel definition based on pre defined panel set.
    var paneldef = Digishot.Shotview.createPanelDefinitionBasedOn;
    // Method to specify the resource to preload.
    var preload = ResourceLoader.preload;

    return {
      // Defintion of imprint panel
      _ImprintIssuedOutcome: paneldef("_ImprintIssuedOutcome_v1", {

        // impl: Specify the Class of the panel
        //   Change the panel for scratch card.
        impl: "Scratchcard",

        options: {
          // Number of loop. 1 means no loop.
          loop: 1,
          // Animation speed, frames per second.
          framesPerSec: 10,
          // Define animation frames.
          frames: {
            "best": [
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
            "better": [
              {image: preload("assets/img/flip_imprint_2_00.png")},
              {image: preload("assets/img/flip_imprint_2_01.png")},
              {image: preload("assets/img/flip_imprint_2_02.png")},
              {image: preload("assets/img/flip_imprint_2_03.png")},
              {image: preload("assets/img/flip_imprint_2_04.png")},
              {image: preload("assets/img/flip_imprint_2_05.png")},
              {image: preload("assets/img/flip_imprint_2_06.png")},
              {image: preload("assets/img/flip_imprint_2_07.png")},
              {image: preload("assets/img/flip_imprint_2_08.png")},
              {image: preload("assets/img/flip_imprint_2_09.png")},
              {image: preload("assets/img/flip_imprint_2_10.png")},
              {image: preload("assets/img/flip_imprint_2_11.png")},
              {image: preload("assets/img/flip_imprint_2_12.png")},
              {image: preload("assets/img/flip_imprint_2_13.png")},
              {image: preload("assets/img/flip_imprint_2_14.png")},
              {image: preload("assets/img/flip_imprint_2_15.png")},
              {image: preload("assets/img/flip_imprint_2_16.png")},
              {image: preload("assets/img/flip_imprint_2_17.png")},
            ],
            "good": [
              {image: preload("assets/img/flip_imprint_3_00.png")},
              {image: preload("assets/img/flip_imprint_3_01.png")},
              {image: preload("assets/img/flip_imprint_3_02.png")},
              {image: preload("assets/img/flip_imprint_3_03.png")},
              {image: preload("assets/img/flip_imprint_3_04.png")},
              {image: preload("assets/img/flip_imprint_3_05.png")},
              {image: preload("assets/img/flip_imprint_3_06.png")},
              {image: preload("assets/img/flip_imprint_3_07.png")},
              {image: preload("assets/img/flip_imprint_3_08.png")},
              {image: preload("assets/img/flip_imprint_3_09.png")},
              {image: preload("assets/img/flip_imprint_3_10.png")},
              {image: preload("assets/img/flip_imprint_3_11.png")},
              {image: preload("assets/img/flip_imprint_3_12.png")},
              {image: preload("assets/img/flip_imprint_3_13.png")},
              {image: preload("assets/img/flip_imprint_3_14.png")},
              {image: preload("assets/img/flip_imprint_3_15.png")},
              {image: preload("assets/img/flip_imprint_3_16.png")},
              {image: preload("assets/img/flip_imprint_3_17.png")},
            ],
            "bad": [
              {image: preload("assets/img/flip_imprint_4_00.png")},
              {image: preload("assets/img/flip_imprint_4_01.png")},
              {image: preload("assets/img/flip_imprint_4_02.png")},
              {image: preload("assets/img/flip_imprint_4_03.png")},
              {image: preload("assets/img/flip_imprint_4_04.png")},
              {image: preload("assets/img/flip_imprint_4_05.png")},
              {image: preload("assets/img/flip_imprint_4_06.png")},
              {image: preload("assets/img/flip_imprint_4_07.png")},
              {image: preload("assets/img/flip_imprint_4_08.png")},
              {image: preload("assets/img/flip_imprint_4_09.png")},
              {image: preload("assets/img/flip_imprint_4_10.png")},
              {image: preload("assets/img/flip_imprint_4_11.png")},
              {image: preload("assets/img/flip_imprint_4_12.png")},
              {image: preload("assets/img/flip_imprint_4_13.png")},
              {image: preload("assets/img/flip_imprint_4_14.png")},
              {image: preload("assets/img/flip_imprint_4_15.png")},
              {image: preload("assets/img/flip_imprint_4_16.png")},
              {image: preload("assets/img/flip_imprint_4_17.png")},
            ],
          },

          // scratchOffCovering: Covering image for scratch
          scratchOffCovering: {
            // image: image for scratch
            image: preload("assets/img/scratch01.png"),
          },

          // Get the panel instance when the panel is added
          onAdd: function(instance) {
            _imprintPanel = instance;
          },

          on: {
            // sv_exposed: Event which fired at covered image are fully erased.
            "sv_exposed": function(e) {
              _imprintPanel.startAnimation();
            },
          },

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

    // onImprintWillBeIssued: Event call back of recognition success.
    //   This event is fired when recognition success and imprint panel is displaying.
    onImprintWillBeIssued: function(imprintRecord, imprintPanel) {
      // Specify the animation to play on imprint panel randomly.
      var animeNames = ["best", "better", "good", "bad"];
      var ran = Math.floor(Math.random()*animeNames.length);
      imprintPanel.selectAnimation(animeNames[ran]);
    },

  });

})();


