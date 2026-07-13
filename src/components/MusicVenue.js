"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MusicVenue;
var react_1 = require("react");
function MusicVenue() {
    var _a = (0, react_1.useState)(false), playing = _a[0], setPlaying = _a[1];
    var audioRef = (0, react_1.useRef)(null);
    var toggleMusic = function () {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            }
            else {
                audioRef.current.play();
            }
            setPlaying(!playing);
        }
    };
    return (<div className="music-venue">
      <h3>🌊 Island Music Venue</h3>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop/>
      <button onClick={toggleMusic}>{playing ? '⏸️ Pause' : '▶️ Play Chill Vibes'}</button>
    </div>);
}
