import { useState, useRef } from 'react';

export default function MusicVenue() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="music-venue">
      <h3>🌊 Island Music Venue</h3>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />
      <button onClick={toggleMusic}>{playing ? '⏸️ Pause' : '▶️ Play Chill Vibes'}</button>
    </div>
  );
}