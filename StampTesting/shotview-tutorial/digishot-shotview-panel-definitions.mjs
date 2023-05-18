/*
 * Digishot Shotview panel definitions
 */
export default function(ResourceLoader, ShotviewConstants) {

  // for shorthand
  const buildin = ResourceLoader.buildin;
  const bundled = ResourceLoader.bundled;
  const preload = ResourceLoader.preload;
  const ondemand = ResourceLoader.ondemand;

  const navigateBaseURL = new URL('digishot/shotview/r/default/koto/', document.currentScript.src);

  /*
   * Keys beginning with underscore means system defined name.
   */
  const panelsLib = {};
  const panelDefs = {};


  ////////////////////////////////////////////////////////////
  //

  panelsLib['_Hidden_v1'] = {
    impl: 'NoOperation'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_NON_VISUAL
    }
  };

  ////////////////////////////////////////////////////////////
  // Internal

  panelDefs['_DebugBackground'] = {
    impl: 'DebugBackground'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SYS_DEBUG
    }
  };

  panelDefs['_OneShotTimer'] = {
    impl: 'Timer'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_NON_VISUAL
      // Shotview overwrites followings at runtime.
      , delay: 1000
      , callback: function() {}
    }
  };

  panelDefs['_PreparingIndication'] = {
    impl: 'RotatingImage'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SYS_OVERLAY
      , image: buildin('default/koto/load.png')
      , scale:{x:0.5, y:0.5}
      , angularVelocity:'360deg/s'
    }
  };



  ////////////////////////////////////////////////////////////
  // Submitting view

  panelsLib['_SubmittingBackboard_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_BACKGROUND
      , size: 'fullSized'
      , backgroundColor: '#ffffff'
      , base: {
        image: bundled('default/koto/base01.png')
        , scale: 0.5
      }
    }
  };
  panelDefs['_SubmittingBackboard'] = panelsLib['_SubmittingBackboard_v1'];

  panelsLib['_StampDownPrompt_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_INDICATIONS

      , loop: true
      , framesPerSec: 12
      //, backgroundColor: '#6666ee'
      //, size: {width:100, height:130}
      //, position: {x: 100, y: -120}

      , base: {
        scale: 0.5
        , size: 'auto'
      }
      , frames: [
        {image: bundled('default/koto/base_ani01/base_ani01_01.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_02.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_03.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_04.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_05.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_06.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_07.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_08.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_09.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_10.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_11.png')},
        {image: bundled('default/koto/base_ani01/base_ani01_12.png')},
      ]
      , startOnAdd: true
    }
  };
  panelDefs['_StampDownPrompt'] = panelsLib['_StampDownPrompt_v1'];

  panelsLib['_SubmittingIndication_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_INDICATIONS

      , loop: true
      , framesPerSec: 12

      , base: {
        scale: 0.5
        , size: 'auto'
      }
      , frames: [
        {image: bundled('default/koto/base_ani02/base_ani02_01.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_02.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_03.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_04.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_05.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_06.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_07.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_08.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_09.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_10.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_11.png')},
        {image: bundled('default/koto/base_ani02/base_ani02_12.png')},
      ]
      , startOnAdd: true
    }
  };
  panelDefs['_SubmittingIndication'] = panelsLib['_SubmittingIndication_v1'];

  panelsLib['_PendingIndication_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_INDICATIONS

      , base: {
        scale: 0.5
        , size: 'auto'
        , image: bundled('default/koto/base_ani03.png')
      }
    }
  };
  panelDefs['_PendingIndication'] = panelsLib['_PendingIndication_v1'];


  ////////////////////////////////////////////////////////////
  // Outcome and confirmation

  panelsLib['_NoImprintOutcome_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OUTCOME_BASE

      , base: {
        scale: 0.5
        , size: 'auto'
        , image: bundled('default/koto/base_ani04.png')
      }
    }
  };
  panelDefs['_NoImprintOutcome'] = panelsLib['_NoImprintOutcome_v1'];

  panelsLib['_NoImprintOutcomeConfirmation_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OVERLAY
      , framesPerSec: 0
      , position: {x: 0, y: 87}

      , base: {
        scale: 0.5
        , image: bundled('default/koto/passcode.png')
        , text : {
          text : 'これ以上スタンプは押せません。'
          , fontSize: 34
          , fontStyle: 'bold'
          , fill: '#cc6970'
          , align: 'center'
          , verticalAlign: 'middle'

          , sv_offsetY: 87 - 129
          //, sv_width: 350 * 2 // scaled 0.5
        }
      }
      , on : {
        'tap' : function(evt) {
          window.location.href = new URL('no-imprint.html', navigateBaseURL);
        }
      }
    }
  };
  panelDefs['_NoImprintOutcomeConfirmation'] = panelsLib['_NoImprintOutcomeConfirmation_v1'];


  panelsLib['_ImprintIssuedOutcome_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OUTCOME_BASE

      , scale: {x: 1.4, y: 1.4}
      // , backgroundColor: '#6666ee'
      , base: {
        image: bundled('default/koto/imprint01.png')
        , size: 'contain'
      }

      // Shotview overwrites following values at runtime for each imprint
      , position: {x: 10, y: 20} // center position
      , size: {width:100, height:100}
      , rotation: 90 // degree
    }
  };
  panelDefs['_ImprintIssuedOutcome'] = panelsLib['_ImprintIssuedOutcome_v1'];


  panelsLib['_ImprintIssuedOutcomeConfirmation_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OVERLAY
      , framesPerSec: 0
      , position: {x: 0, y: 380/2}

      , base: {
        scale: 0.5
        , image: bundled('default/koto/next.png')
      }
      , on : {
        'tap' : function(evt) {
          window.location.href = new URL('imprint-issued.html', navigateBaseURL);
        }
      }
    }
  };
  panelDefs['_ImprintIssuedOutcomeConfirmation'] = panelsLib['_ImprintIssuedOutcomeConfirmation_v1'];


  panelsLib['_ImprintIssuedOutcome_Video_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OUTCOME_BASE

      , framesPerSec: 10 // （ビデオの FPS によらず、実際の画面更新はこの頻度で行われる）
      , loop: true // アニメーションはループし続ける（表示更新し続けることで video 再生が描画に反映される）
      , videoLoop: false // video のループはしない。ビデオの最後で（loop は true であるが）アニメーションは自動停止する
      , backgroundColor: '#302e2e'
      , scale: 1.4

      , base: {
        size: 'contain'
      }
      // 再生ボタン表示と、ビデオ表示をアニメーションの系列で切り替える
      , frames: {
        'playButton': [{
          image: bundled('default/koto/play.png')
        }],
        'videoImage': [{
          image: bundled('default/koto/imprint01.mp4')
        }],
      }
      , initialFrames: 'playButton'
      , startOnAdd: false
      , showImageAfterStop: true

      , on: {
        'tap': function(evt) {
          switch (this.activeAnimationName) {
          case 'playButton':
            this.selectAnimation('videoImage');
            this.playVideo(undefined, function(evt) {
              this.selectAnimation('playButton');
            });
            this.startAnimation(); // 描画更新を開始する（video の時間進行が実際に表示に反映されるようになる）
            break;

          case 'videoImage':
            this.pauseVideo();
            this.selectAnimation('playButton');
            this.stopAnimation();
            break;
          }
        }
      }
    }
  };


  ////////////////////////////////////////////////////////////
  // Response (reaction, visual effect, sound)

  panelsLib['_StampDownEffect_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OPERATION_EFFECT
      , listening: false

      , loop: 1
      , framesPerSec: 30

      , base: {
        image:bundled('default/koto/ef_on01.png')
      }
      , frames: [
        {scale: 0.35, opacity:1.00},
        {scale: 0.50383, opacity: 1.00},
        {scale: 0.568375, opacity:1.00},
        {scale: 0.612445, opacity:1.00},
        {scale: 0.64542, opacity:1.00},
        {scale: 0.671065, opacity:1.00},
        {scale: 0.69136, opacity:1.00},
        {scale: 0.7075, opacity:1.00},
        {scale: 0.720285, opacity:0.8571428571428571},
        {scale: 0.730275, opacity:0.7142857142857143},
        {scale: 0.73789, opacity:0.57142857142857146},
        {scale: 0.74344, opacity:0.42857142857142854},
        {scale: 0.747185, opacity:0.2857142857142857},
        {scale: 0.749315, opacity:0.14285714285714292},
        {scale: 0.75, opacity:0},
      ]
      , startOnAdd: true

      // TODO Should be removed sometime in the future.
      , onAnimationStoped: function(instance) {
        // TODO runtime.removePanel(instance.id())
      }

      , onAnimationStopped: function(instance) {
        // TODO runtime.removePanel(instance.id())
      }

      // Shotview overwrites followings at runtime
      , position: {x: 0, y: 0}
      , size: {width: 100, height: 100}
      , rotation: 20
    }
  };
  panelDefs['_StampDownEffect'] = panelsLib['_StampDownEffect_v1'];


  panelsLib['_StampDownSound_v1'] = {
    impl: 'AudioOneShotPlayer'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_NON_VISUAL

      , src: bundled('default/koto/stampdown.mp3')
    }
  };
  panelDefs['_StampDownSound'] = panelsLib['_StampDownSound_v1'];


  panelsLib['_StampUpSound_v1'] = {
    impl: 'AudioOneShotPlayer'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_NON_VISUAL

      , src: bundled('default/koto/stampup.mp3')
    }
  };
  panelDefs['_StampUpSound'] = panelsLib['_StampUpSound_v1'];


  panelsLib['_StampUpPrompt_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OPERATION_EFFECT
      , listening: false

      , loop: true
      , framesPerSec: 30
      // ,scale: 1/0.75*1.4*2
      , base: {
        image:bundled('default/koto/ef_rel01.png')
        // , size: 'contain'
      }
      , frames: [
        {scale: 0.35, opacity:1.00},
        {scale: 0.50383, opacity: 1.00},
        {scale: 0.568375, opacity:1.00},
        {scale: 0.612445, opacity:1.00},
        {scale: 0.64542, opacity:1.00},
        {scale: 0.671065, opacity:1.00},
        {scale: 0.69136, opacity:1.00},
        {scale: 0.7075, opacity:1.00},
        {scale: 0.720285, opacity:0.8571428571428571},
        {scale: 0.730275, opacity:0.7142857142857143},
        {scale: 0.73789, opacity:0.57142857142857146},
        {scale: 0.74344, opacity:0.42857142857142854},
        {scale: 0.747185, opacity:0.2857142857142857},
        {scale: 0.749315, opacity:0.14285714285714292},
        {scale: 0.75, opacity:0},
      ]
      , startOnAdd: true

      // Shotview overwrites followings at runtime
      , position: {x: 0, y: 0}
      , size: {x: 100, y: 100}
      , rotation: 20
    }
  };
  panelDefs['_StampUpPrompt'] = panelsLib['_StampUpPrompt_v1'];


  ////////////////////////////////////////////////////////////
  // Controls

  panelsLib['_AudioMuteToggleButton_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_OVERLAY_OPERATION

      , framesPerSec: 0 // doesn't use time base animation

      , backgroundColor: 'skyblue'
      , size: {width:0, height:0}
      , position: {x: 128, y: -190}

      , base: {
        scale: 0.5, size: 'auto'
      }

      , frames: {
        off : [{ image: bundled('default/koto/sound_off.png') }],
        on : [{ image: bundled('default/koto/sound_on.png') }],
      }
      , startOnAdd: 'off' // REFINE reconsider startOnAdd default.
      // FIXME initial value should refer current runtime.audioMuted value

      , on : {
        // We use 'touchend' to release audible autoplay blocking of Web browser.
        'touchend' : function(evt) {
          // console.log('Konva event! type=' + evt.type);
          // console.log(' this.constructor=' + this.constructor); // this is Panel
          // console.log(' target.constructor=' + evt.target.constructor); // target is Konva.Image (captured in Group by bubling)
          // REFINE need to hide Panel JavaScript class internal structure ???
          // (How to pass options and runtime?)

          const muted = !this._runtime.audioMuted;
          this._runtime.audioMuted = muted;
          this.selectAnimation(muted? 'off': 'on');
        }
      }
    }
  };
  panelDefs['_AudioMuteToggleButton'] = panelsLib['_AudioMuteToggleButton_v1'];


  panelsLib['_ApplicationButton_HistoryBack_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_OVERLAY_OPERATION

      , framesPerSec: 0
      , backgroundColor: 'skyblue' // for debug. change size to be visible
      , size: {width: 0, height: 0}
      , position: {x: -141, y: -190}

      , base: {
        scale: 0.5, size: 'auto'
        , image: bundled('default/koto/back.png')
      }

      , on : {
        'tap' : function(evt) {
          window.history.back();
        }
      }
    }
  };
  panelDefs['_ApplicationButton'] = panelsLib['_Hidden_v1'];


  panelsLib['_LandscapeLockModalDialog_v1'] = {
    impl: 'Standard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SYS_OVERLAY

      , framesPerSec: 0
      , backgroundColor: 'rgba(0,0,0,0.7)'
      , size: 'fullSized'

      , base: {
        scale: 0.5, size: 'auto'
        , image: bundled('default/koto/board.png')
        , text : {
          text : 'このままではご利用できません。\n縦持ちに戻してください。'
          , fontSize: 44
          , lineHeight: 1.2
          , fill: '#ffffff'
          , align: 'center'
          , verticalAlign: 'middle'
        }
      }
    }
  };
  panelDefs['_LandscapeLockModalDialog'] = panelsLib['_LandscapeLockModalDialog_v1'];



  ////////////////////////////////////////////////////////////
  // Applied

  panelsLib['_Scratchcard_win_lose_lottery_base_v1'] = {

    impl: 'Scratchcard'
    , options: {
      zLevel: ShotviewConstants.ZLEVEL_SUBMIT_OUTCOME_BASE

      , scale: 1.4
      , base: {
        size: 'contain'
      }

      , framesPerSec: 0
      , frames: {
        win  : [{ image: bundled('default/koto/imprint_win.png') }],
        lose : [{ image: bundled('default/koto/imprint_lose.png') }],
      }
      , initialFrames: 'win'
      , startOnAdd: false

      , onAdd: function(instance) {
        var selection = Math.random() < 0.5;
        instance.selectAnimation(selection? 'win': 'lose');
      }
    }
  };

  return {panelsLib, panelDefs};
}
