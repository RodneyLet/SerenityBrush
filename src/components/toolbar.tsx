export default function Toolbar() {
  return (
    <div className="toolbar">
      <div className="tool-group">
        <h3>Tools</h3>
        <button>↩️ Undo</button>
        <button>Clear Canvas</button>
      </div>
      <div className="tool-group">
        <h3>Export</h3>
        <button>📸 PNG</button>
        <button>💾 3D Model</button>
      </div>
    </div>
  );
}