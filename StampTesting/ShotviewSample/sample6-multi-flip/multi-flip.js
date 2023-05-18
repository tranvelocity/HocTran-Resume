/**
 * Sample6 multi-flip
 *
 * Sample to handle 'Multiple kind of flip animation' imprints
 *
 * Specify multiple flip animation on imprint panel.
 * Specify which animation to play after recognition success.
 * Start flip animation when recognition finished and remove stamp.
 * When imprint is touched after animation played, animation will start again.
 *
 */
(function() {
  "use strict";

  // Imprint Panel
  var _imprintPanel;

  // Weather Imprint Panel is touchable or not
  var _touchableImprint = false;

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
          //   Specify changing value of each frames as arrays of objects.
          //   If multiple arrays are exist, add the name to each array.
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

          // onAdd: Call back to add the panel.
          //   Get the panel instance when the panel is added
          onAdd: function(instance) {
            _imprintPanel = instance;
          },

          // onAnimationStoped: Event call back of animation stopped
          onAnimationStopped: function() {
            // Change imprint to touchable.
            _touchableImprint = true;
          },

          // on: event
          on: {
            // tap: Event call back of panel tap
            "tap": function() {
              // If touched when touchable, start animation again.
              if (_touchableImprint === true) {
                _touchableImprint = false;
                _imprintPanel.rewindAnimation();
                _imprintPanel.startAnimation();
              }
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

    // onImprintIssuedOutcome: Event call back of Imprint Issued.
    //   This event is fired when recognition success and stamp released.
    onImprintIssuedOutcome: function(imprintRecord, imprintPanel) {
      // Start animation in the imprint.
      imprintPanel.startAnimation();
    },

  });

})();




