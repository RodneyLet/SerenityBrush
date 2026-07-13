"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_1 = require("react");
var Canvas3D_1 = require("./components/Canvas3D");
var Toolbar_1 = require("./components/Toolbar");
var SafetyProvider_1 = require("./components/SafetyProvider");
var MerchStore_1 = require("./components/MerchStore");
var MusicVenue_1 = require("./components/MusicVenue");
var CameraStarter_1 = require("./components/CameraStarter");
require("./App.css");
function App() {
    var _a = (0, react_1.useState)(false), showMerch = _a[0], setShowMerch = _a[1];
    var _b = (0, react_1.useState)(false), showMusic = _b[0], setShowMusic = _b[1];
    var _c = (0, react_1.useState)(true), showCamera = _c[0], setShowCamera = _c[1];
    var _d = (0, react_1.useState)(0), archives = _d[0], setArchives = _d[1];
    var handleImageReady = function (dataUrl) {
        console.log("Image ready:", dataUrl);
        setShowCamera(false);
    };
    var saveArchive = function () {
        localStorage.setItem("serenity_archive_".concat(Date.now()), JSON.stringify({ timestamp: new Date().toISOString() }));
        setArchives(function (prev) { return prev + 1; });
        alert("📦 Archive Saved!");
    };
    (0, react_1.useEffect)(function () {
        var count = Object.keys(localStorage).filter(function (k) { return k.startsWith('serenity_archive_'); }).length;
        setArchives(count);
    }, []);
    return (<SafetyProvider_1.default>
      <div className="app island-mode">
        <header className="header">
          <h1>🌴 SerenityBrush</h1>
          <p>Archives: {archives}</p>
          <button onClick={saveArchive}>💾 Archive</button>
          <a href="https://github.com/RodneyLet/PetWars" target="_blank" rel="noopener noreferrer" className="petwars-big-link">
            🐾 Pet Wars
          </a>
          <div>
            <button onClick={function () { return setShowMusic(!showMusic); }}>🎵 Music</button>
            <button onClick={function () { return setShowMerch(!showMerch); }}>
              {showMerch ? 'Studio' : 'Merch'}
            </button>
          </div>
        </header>

        {showCamera ? <CameraStarter_1.default onImageReady={handleImageReady}/> : (showMerch ? <MerchStore_1.default /> : <Canvas3D_1.default />)}

        {showMusic && <MusicVenue_1.default />}
        {!showMerch && !showCamera && <Toolbar_1.default />}
      </div>
    </SafetyProvider_1.default>);
}
