import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, FileCheck, X, Sparkles, AlertCircle } from 'lucide-react';
import { EventContext } from '../types';

interface MediaIngestionPanelProps {
  eventContext: EventContext;
  onFileSelected: (fileDataUrl: string, fileName: string, fileSize: number, mimeType: string) => void;
  isProcessing: boolean;
  onOpenLiveCamera: () => void;
}

export const MediaIngestionPanel: React.FC<MediaIngestionPanelProps> = ({
  eventContext,
  onFileSelected,
  isProcessing,
  onOpenLiveCamera,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Global clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData || !e.clipboardData.items) return;
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const item = e.clipboardData.items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedFileName(file.name);
      setPreviewUrl(dataUrl);
      onFileSelected(dataUrl, file.name, file.size, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFileName(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper to generate a contextual presentation sample if the user clicks "Ingest Quick Sample"
  const handleGenerateContextSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 675);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 675);

    // Accent line
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(80, 80, 60, 6);

    // Slide Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Distributed Event Stream Ingestion', 80, 150);

    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Keynote Session &bull; ${eventContext}`, 80, 200);

    ctx.font = '20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('• Gemma 4 Visual Reasoning Latency < 180ms', 80, 290);
    ctx.fillText('• Autonomous Extraction: Speakers, OCR Slides, Quotes', 80, 340);
    ctx.fillText('• Continuous Real-time Press Wire Syndication', 80, 390);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"Open architectures guarantee data integrity and community ownership."', 80, 470);

    // Stage tag
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(80, 540, 320, 50);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, 540, 320, 50);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('STAGE A // KEYNOTE BROADCAST', 105, 572);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const fileName = `event_session_frame_${Date.now().toString().slice(-4)}.jpg`;
    setSelectedFileName(fileName);
    setPreviewUrl(dataUrl);
    onFileSelected(dataUrl, fileName, 142800, 'image/jpeg');
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col h-full shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Media Ingestion</span>
          </h2>
          <p className="text-xs text-neutral-400">Photos, whiteboards, slides, or live scans</p>
        </div>

        {/* Live Camera trigger */}
        <button
          type="button"
          onClick={onOpenLiveCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-medium transition-colors cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Live Camera</span>
        </button>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/20'
            : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/50 hover:bg-neutral-950/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-cyan-400 mb-3 shadow-inner">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-xs font-semibold text-neutral-200 mb-1">
          Drag & drop event photo, or <span className="text-cyan-400 underline underline-offset-2">browse files</span>
        </p>
        <p className="text-[11px] text-neutral-400 max-w-xs leading-relaxed">
          Accepts JPG, PNG, document scans, or paste from clipboard (Ctrl+V)
        </p>

        <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
          <span>Target Context:</span>
          <span className="text-neutral-400 font-semibold">{eventContext}</span>
        </div>
      </div>

      {/* Quick Ingest Sample Button for Instant Test */}
      <div className="mt-3">
        <button
          type="button"
          onClick={handleGenerateContextSample}
          disabled={isProcessing}
          className="w-full py-2 px-3 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ingest Generated Stage Slide (Live Test)</span>
        </button>
      </div>

      {/* Active Ingestion Preview */}
      {previewUrl && (
        <div className="mt-4 pt-4 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span className="font-medium text-neutral-300 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ready for Processing</span>
            </span>
            <button
              onClick={handleClear}
              className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
              title="Clear asset"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-neutral-800 aspect-video bg-neutral-950">
            <img
              src={previewUrl}
              alt="Ingested event preview"
              className="w-full h-full object-cover"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-cyan-300 text-xs font-mono gap-2">
                <span className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>Gemma 4 Reasoning...</span>
              </div>
            )}
          </div>
          <p className="text-[11px] font-mono text-neutral-400 truncate mt-1.5">
            {selectedFileName}
          </p>
        </div>
      )}
    </div>
  );
};
