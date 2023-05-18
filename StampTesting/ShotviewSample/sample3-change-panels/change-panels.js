/**
 * Sample3 change-panels
 *
 * Sample of changing various panel.
 *
 * Specify the image for imprint panel.
 * Specify the image and changing definition of the size for background panel.
 * Specify the location of the sound button panel.
 * Specify the sound file of the sound effect panel.
 * Specify the link(URL) for imprint issued panel.
 * Change the warning message of the Landscape Lock.
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

      // _SubmittingBackboard: Property to define Background Panel.
      //   Using pre-defined panel set '_SubmittingBackboard_v1', change the image 
      //   and specify the size to cover the screen.
      _SubmittingBackboard: Digishot.Shotview.createPanelDefinitionBasedOn("_SubmittingBackboard_v1", {
        options: {

          // size: The size of the rectangular area containing the image
          //   When "fullSized" is specified, it covers to cover the screen.
          size: "fullSized",

          base: {

            // image: the image on the panel
            image: ResourceLoader.preload("assets/img/user_base.png"),

            // size: The size of the contents
            //   When "cover" is specified, the size is to cover the rectangle area.
            size: "cover",

            // scale: The zoom ration of the contents
            //   Since the size is "cover", specify 1.0 to cover the full screen.
            scale: 1.0,

          },
        }
      }),

      // _AudioMuteToggleButton: Property to define Sound button Panel
      //   Using pre-defined panel set '_AudioMuteToggleButton_v1', change the location.
      //   
      _AudioMuteToggleButton: Digishot.Shotview.createPanelDefinitionBasedOn("_AudioMuteToggleButton_v1", {
        options: {

          // position: Location of the rectangle area.
          //   Specify the center coordinates of the rectangle with the origin at the center of the container area.
          //   The unit of this value is px.
          position: {x: window.innerWidth/2-40, y: -window.innerHeight/2+30},

          // Changing of the sound button is realized as set two objects at the frames.
          // So if you change the image, using following way.
          frames: {
            off: [{ image: ResourceLoader.preload("assets/img/user_sound_off.png") }],
            on: [{ image: ResourceLoader.preload("assets/img/user_sound_on.png") }],
          },

        }
      }),

      // _StampDownSound: Property to define the 'Stamp down' sound.
      //   Using pre-defined panel set '_StampDownSound_v1', change the sound file.
      //   
      _StampDownSound: Digishot.Shotview.createPanelDefinitionBasedOn("_StampDownSound_v1", {
        options: {

          // src: Sound file to play
          //   Specify using the ResourceLoader function like the image option.
          src: ResourceLoader.preload("assets/audio/user_stampdown.mp3"),

        }
      }),

      // _StampUpSound: Property to define the 'Stamp up' sound.
      //   Using pre-defined panel set '_StampUpSound_v1', change the sound file.
      //   
      _StampUpSound: Digishot.Shotview.createPanelDefinitionBasedOn("_StampUpSound_v1", {
        options: {
          // src: Sound file to play
          src: ResourceLoader.preload("assets/audio/user_stampup.mp3"),
        }
      }),

      // _ImprintIssuedOutcomeConfirmation: Property to define Confirmation of Imprint Issued Outcome Panel which displayed after stamp is recognized.
      //   Using pre-defined panel set '_ImprintIssuedOutcomeConfirmation_v1', change the on.tap event.
      //   
      _ImprintIssuedOutcomeConfirmation: Digishot.Shotview.createPanelDefinitionBasedOn("_ImprintIssuedOutcomeConfirmation_v1", {
        options: {

          // on: event
          on: {

            // tap: Event call back for panel tap.
            "tap": function(e) {
              // The link is changed to 'KOTO home page'.
              window.location.href = new URL('https://koto.co.jp/english/index.html');
            },

          },
        }
      }),
      
      // _LandscapeLockModalDialog: Property to define Landscape Lock Modal Dialog Panel which warn user not to use in landscape mode.
      //   Using pre-defined panel set '_LandscapeLockModalDialog_v1', change the message.
      //   
      _LandscapeLockModalDialog: Digishot.Shotview.createPanelDefinitionBasedOn("_LandscapeLockModalDialog_v1", {
        options: {
            base: {
                text: {
                    text : 'You can\'t use in landscape mode.\nPlease change to portrait mode.',
                },
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




