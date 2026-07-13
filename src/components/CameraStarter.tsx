import { useState, useRef } from 'react';

interface Props {
  onImageReady: (dataUrl: string) => void;
}

export default function CameraStarter({ onImageReady }: Props) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      alert("Camera access denied or not available.");
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);

    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhotoTaken(true);
    onImageReady(dataUrl);

    if (stream) stream.getTracks().forEach(track => track.stop());
  };

  return (
    <div className="camera-starter">
      <h2>📸 Start Your Art</h2>
      <p>Take a photo to inspire your painting</p>

      {!stream && <button onClick={startCamera}>Open Camera</button>}

      <video ref={videoRef} autoPlay playsInline style={{ display: stream && !photoTaken ? 'block' : 'none' }} />

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {stream && !photoTaken && <button onClick={takePhoto}>📸 Take Photo</button>}

      {photoTaken && <p>✅ Photo taken! Moving to canvas...</p>}
    </div>
  );
}