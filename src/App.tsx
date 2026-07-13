import { useState, useEffect } from 'react';
import Canvas3D from './components/Canvas3D';
import Toolbar from './components/Toolbar';
import SafetyProvider from './components/SafetyProvider';
import MerchStore from './components/MerchStore';
import MusicVenue from './components/MusicVenue';
import CameraStarter from './components/CameraStarter';
import './App.css';

export default function App() {
  const [showMerch, setShowMerch] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [archives, setArchives] = useState(0);

  const handleImageReady = (dataUrl: string) => {
    console.log("Image ready:", dataUrl);
    setShowCamera(false);
  };

  const saveArchive = () => {
    localStorage.setItem(`serenity_archive_${Date.now()}`, JSON.stringify({ timestamp: new Date().toISOString() }));
    setArchives(prev => prev + 1);
    alert("📦 Archive Saved!");
  };

  useEffect(() => {
    const count = Object.keys(localStorage).filter(k => k.startsWith('serenity_archive_')).length;
    setArchives(count);
  }, []);

  return (
    <SafetyProvider>
      <div className="app island-mode">
        <header className="header">
          <h1>🌴 SerenityX</h1>
          <p>Archives: {archives}</p>
          <button onClick={saveArchive}>💾 Archive</button>
          <a href="https://github.com/RodneyLet/PetWars" target="_blank" rel="noopener noreferrer" className="petwars-big-link">
            🐾 Pet Wars
          </a>
          <div>
            <button onClick={() => setShowMusic(!showMusic)}>🎵 Music</button>
            <button onClick={() => setShowMerch(!showMerch)}>
              {showMerch ? 'Studio' : 'Merch'}
            </button>
          </div>
        </header>

        {showCamera ? <CameraStarter onImageReady={handleImageReady} /> : (
          showMerch ? <MerchStore /> : <Canvas3D />
        )}

        {showMusic && <MusicVenue />}
        {!showMerch && !showCamera && <Toolbar />}
      </div>
    </SafetyProvider>
  );
}