import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string, fileName: string) => void;
  isDarkMode: boolean;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  isDarkMode,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported on this browser or platform.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(err.message || 'Unable to access camera feed.');
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCaptureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    stopCamera();
    onCapture(dataUrl, `camera_capture_${Date.now()}.jpg`);
    onClose();
  };

  // Simulated live event slide capture if webcam hardware is blocked by browser sandbox
  const handleSimulateStageCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clean neutral presentation background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1280, 720);

    // Slide text
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(80, 120, 48, 5);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 42px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Autonomous Multimodal Event Intelligence', 80, 190);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Speaker: Dr. K. Sorenson — Systems Architecture Lead', 80, 245);

    ctx.font = '22px "SFMono-Regular", Menlo, monospace';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('• Gemma 4 Multimodal Tokenization: <|think|> Pipeline', 80, 335);
    ctx.fillText('• Zero-Latency Edge Extraction for Conference Keynotes', 80, 385);
    ctx.fillText('• Instant Automated Press Bulletins & Vault Archiving', 80, 435);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(820, 520, 380, 60);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 18px "SFMono-Regular", Menlo, monospace';
    ctx.fillText('STAGE KEYNOTE // HALL A', 850, 558);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    stopCamera();
    onCapture(dataUrl, `live_stage_frame_${Date.now()}.jpg`);
    onClose();
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-2xl rounded-lg border shadow-2xl overflow-hidden flex flex-col ${
          isDarkMode
            ? 'bg-[#1e1e1e] border-[#303030] text-[#d4d4d4]'
            : 'bg-[#ffffff] border-[#e2e1de] text-[#37352f]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-3 border-b text-xs ${
            isDarkMode ? 'border-[#2c2c2c] bg-[#181818]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            <Camera className="w-4 h-4 text-cyan-500" />
            <span>Camera Ingestion</span>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewport */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {isInitializing && (
            <div className="flex flex-col items-center gap-2 text-white/70 text-xs font-mono">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Connecting to camera stream...</span>
            </div>
          )}

          {cameraError && (
            <div className="p-6 text-center max-w-md text-white">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2.5 text-rose-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold mb-1">Camera Stream Inaccessible</h4>
              <p className="text-[11px] opacity-70 mb-3.5 leading-relaxed">{cameraError}</p>
              <button
                type="button"
                onClick={handleSimulateStageCapture}
                className="px-3.5 py-1.5 rounded bg-white text-black font-medium text-xs flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Stage Slide Capture</span>
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${cameraError ? 'hidden' : 'block'}`}
          />
        </div>

        {/* Footer controls */}
        <div
          className={`p-3.5 border-t flex items-center justify-between text-xs ${
            isDarkMode ? 'border-[#2c2c2c] bg-[#181818]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
          }`}
        >
          <button
            type="button"
            onClick={toggleCameraFacing}
            disabled={!!cameraError}
            className={`px-3 py-1.5 rounded border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 ${
              isDarkMode ? 'border-[#333333] hover:bg-[#252525]' : 'border-[#e0dfdc] hover:bg-[#efefed]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Flip ({facingMode})</span>
          </button>

          <div className="flex items-center gap-2">
            {!cameraError ? (
              <button
                type="button"
                onClick={handleCaptureFrame}
                className="px-4 py-1.5 rounded bg-[#2383e2] text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Frame</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSimulateStageCapture}
                className="px-3.5 py-1.5 rounded bg-[#2383e2] text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Frame</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
