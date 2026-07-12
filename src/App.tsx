import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('#4a90e2')

  return (
    <div className="app">
      <h1>🌟 SerenityBrush</h1>
      <p>A peaceful place to create.</p>
      
      <div className="canvas-placeholder">
        <p>3D Canvas Coming Soon...</p>
        <p>Start painting your dreams.</p>
      </div>

      <div className="tools">
        <button onClick={() => setColor('#ff6b6b')}>Red</button>
        <button onClick={() => setColor('#4ecdc4')}>Teal</button>
        <button onClick={() => setColor('#45b7d1')}>Blue</button>
      </div>
    </div>
  )
}

export default App