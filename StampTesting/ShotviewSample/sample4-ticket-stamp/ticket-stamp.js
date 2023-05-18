/**
 * Sample4 ticket-stamp
 *
 * Sample to invalidate the ticket.
 *
 * Specify the image for the background panel.
 * Specify the image and print the date and time received from the server.
 * If ticket is not validate by server, imprint also changed so.
 *
 *
 */
(function() {
  alert('Testing ticket stamp');

  "use strict";

  // Ticket ID
  //   Using this ID to validate the ticket at server.
  //   In this sample, it is fixed value.
  var _ticketID = "12345678";

  // Define the panel configuration of Shotview in advance ----------
  Digishot.Shotview.installPanelDefinitions(function (ResourceLoader, ShotviewConstants) {

    // Define these two frequently used functions into variables to shorten the notation in this source code.
    // Method to create Panel definition based on pre defined panel set.
    var paneldef = Digishot.Shotview.createPanelDefinitionBasedOn;
    // Method to specify the resource to preload.
    var preload = ResourceLoader.preload;

    return {
      // Definition of the background panel
      _SubmittingBackboard: paneldef("_SubmittingBackboard_v1", {
        options: {
          // Initial value of the contents
          base: {
            // image: the image on the panel
            image: preload("assets/img/ticket_base.png"),
          },
        }
      }),

      // Definition of the imprint panel
      _ImprintIssuedOutcome: paneldef("_ImprintIssuedOutcome_v1", {
        options: {
          // Initial value of the contents
          base: {
            // image: the image on the panel
            image: preload("assets/img/ticket_imprint.png"),

            // text: Text to display on the panel
            //   Specify using the attribute object of the Konva.Text.
            //   https://konvajs.org/api/Konva.Text.html
            text: {
              // Text string
              //  Set after receiving from the server
              text: "",
              // Font
              fontFamily: "serif",
              // Font size
              fontSize: 32,
              // Color of the font
              fill: "#44433b",
              // Horizontal alignment
              align: "center",
              // Vertical alignment
              verticalAlign: "middle",
              // Line height
              lineHeight: 1.1,
            },
          },
        }
      }),

      // _ImprintIssuedOutcomeConfirmation: Property to define Imprint Issued Outcome Panel which displayed after stamp is recognized.
      //   This time, in order to hide it, specify '_Hidden_v1' in the panel set for non-display.
      //   Since the options are not changed, the second argument is omitted.
      _ImprintIssuedOutcomeConfirmation: paneldef("_Hidden_v1"),

      // _NoImprintOutcome: Property to define the panel which displayed when recognition failed.
      //   Add the text to show the ticket is invalid.
      _NoImprintOutcome: paneldef("_NoImprintOutcome_v1", {
        options: {
          base: {
            text: {
              text: "This ticket is invalid.",
              fontSize: 38,
              fontStyle: "bold",
              fill: "#cc6970",
              // Center aligned
              align: "center",
              verticalAlign: "middle",

              // sv_offsetY: Specify Y coordinate of text
              //   The origin is the center.
              sv_offsetY: 70,

              // sv_width: Specify the width of the text area.
              //   Default is the display size.
              //   If text is too wide, it should be specified.
              sv_width: 400,

            }
          }
        }
      }),

      // _NoImprintOutcomeConfirmation: Property to define Confirmation of No Imprint Outcome Panel
      //   This panel also specify as hidden, specify '_Hidden_v1'.
      _NoImprintOutcomeConfirmation: paneldef("_Hidden_v1"),

      // _LandscapeLockModalDialog: Property to define Landscape Lock Modal Dialog Panel which warn user not to use in landscape mode.
      //   Using pre-defined panel set '_LandscapeLockModalDialog_v1', change the message.
      //
      _LandscapeLockModalDialog: paneldef("_LandscapeLockModalDialog_v1", {
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
    // URL for recognition
    //   At server side, check the validity of the ticket and specify the date and time to display.
    serviceURI: "../api/ticket-stamp.php",

    // Shotview container elements
    container: "shotview-container",

    // userData: The data to send to the server when stamp is pressed.
    //   In this sample, ticketID is sent.
    userData: {"ticketID": _ticketID},

    // onNoImprintOutcome: Event call back of recognition failure.
    //  This event is fired when recognition is failed at server.
    onNoImprintOutcome: function(nomatchEvent) {
      // If reason of the failure is not due to application, stamping is continued.
      // Check the causeCode if it is failure for application reason or not. If the value is 0x030007, it is failure for application reason.
      if (nomatchEvent.causeCode !== parseInt("0x030007", 16)) {
        shotview.openSubmittingPanel();
      }
      // If application failure (0x030007), 、
      // _NoImprintOutcome Panel is displayed and recognition is end.
    },

    // onImprintWillBeIssued: Event call back of recognition success.
    //   This event is fired when recognition success and imprint panel is displaying.
    onImprintWillBeIssued: function(imprintRecord, imprintPanel) {
      // Get date and time from userData which being sent by server.
      var userData = JSON.parse(imprintRecord.userData);
      var dateStr = userData.date;

      // Adjust the position of the text
      // Size of the Imprint Image(ticket_imprint.png)
      var STAMP_IMG_H = 590;
      // Text Y position from the image center.
      var TEXT_Y_INIMG = 180;
      // Specify Text position from the Imprint image ratio.
      var stampScale = imprintRecord.rectHeight/STAMP_IMG_H;
      var text_y = TEXT_Y_INIMG*stampScale;

      // panel.modifyOptions: Change the defined option of the panel.
      imprintPanel.modifyOptions({
        base: {
          // Change the text position and contents.
          text: {text: dateStr, sv_offsetY: text_y}
        }
      });
    },
  });
})();


