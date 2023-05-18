/**
 * Sample8 movie
 * 
 * Sample of movie play in imprint.
 * 
 * Specify movie file on Imprint Panel.
 * When play button on the imprint is pressed, movie start to play.
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
      // Define imprint panel
      //   Using pre-defined panel set for movie '_ImprintIssuedOutcome_Video_v1',
      //   specify movie file to play.
      _ImprintIssuedOutcome: paneldef("_ImprintIssuedOutcome_Video_v1", {
        options: {
          
          // Use frames when you want to switch between multiple images besides animation.
          // At '_ImprintIssuedOutcome_Video_v1', you cam specify playButton and videoImage in the frames.
          //   playButton: Image of play button
          //   videoImage: Movie file
          // 
          // In the playback standby state, the resource specified by playButton is displayed.
          // When the play button is pressed, the resource specified by videoImage is displayed.
          frames: {
            
            // playButton: Specify the image of play button.
            //   In this sample, we use default image, so this option is omitted.
            
            // videoImage: Specify movie file.
            "videoImage": [{image: preload("assets/img/imprint_movie.mp4")}],
            
          }
          
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
    
  });
  
})();




