/**
 * Sample2 change-imprint
 *
 * Changing the image of imprint
 *
 * Define Shotview panel definition before create the Shotview instance.
 * In that definition, specify the image. 
 *
 */
(function() {
  "use strict";

  // Define the panel configuration of Shotview in advance ----------
  //   It is required to define before creating Shotview instance.
  Digishot.Shotview.installPanelDefinitions(function (ResourceLoader, ShotviewConstants) {

    return {
      // createPanelDefinitionBasedOn: Method to create Panel definition based on pre defined panel set.
      //   Specify only the options you want to change from the defined panel set.
      // _ImprintIssuedOutcome: Property to define Imprint Panel.
      //   Using pre-defined panel set '_ImprintIssuedOutcome_v1' and changing the
      //   image only.
      //   See 'digishot-shotview-panel-definitions.mjs'
      _ImprintIssuedOutcome: Digishot.Shotview.createPanelDefinitionBasedOn("_ImprintIssuedOutcome_v1", {

        // options: Option of the panel.
        options: {

          // base: Initial value of the panel.
          base: {

            // image: the image on the panel
            //   Specify this option to change the image of the imprint.
            // ResourceLoader.preload: Method to specify resource to pre-load.
            //   image option should be specified using function ResourceLoader.
            image: ResourceLoader.preload("assets/img/user_imprint.png"),

          },
        }
      }),
    };
  });


  // Shotview Configuration ----------
  var shotview = new Digishot.Shotview({
    // serviceURI: URL for recognition
    serviceURI: "../api/digishot-api.php",

    // container: Shotview container elements
    //   Specify the container id in the HTML.
    container: "shotview-container",

  });

})();


