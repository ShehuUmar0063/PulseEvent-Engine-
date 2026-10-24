import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Sparkles, Image as ImageIcon, X, FileCheck, ArrowUpRight } from 'lucide-react';
import { EventContext } from '../types';

interface MediaIngestionBlockProps {
  eventContext: EventContext;
  onFileSelected: (fileDataUrl: string, fileName: string, fileSize: number, mimeType: string) => void;
  isProcessing: boolean;
  onOpenLiveCamera: () => void;
  isDarkMode: boolean;
}

export const MediaIngestionBlock: React.FC<MediaIngestionBlockProps> = ({
  eventContext,
  onFileSelected,
  isProcessing,
  onOpenLiveCamera,
  isDarkMode,
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
      alert('Please select an image file (JPG, PNG, WebP).');
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

  // Generate a clean presentation slide sample
  const handleGenerateSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clean neutral presentation background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1200, 675);

    // Accent line
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(80, 90, 48, 5);

    // Slide text
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Multimodal Ingestion & Continuous Press Syndication', 80, 160);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText(`Session Track: ${eventContext} Keynote`, 80, 215);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px "SFMono-Regular", Menlo, monospace';
    ctx.fillText('• Gemma 4 Visual Reasoning Latency < 160ms', 80, 310);
    ctx.fillText('• Automated OCR Slide Parsing & Speaker Entity Resolution', 80, 360);
    ctx.fillText('• High-Density Event Archiving in Notion-Grade Vault', 80, 410);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('"Open-weight models ensure organizational sovereignty over live event intelligence."', 80, 500);

    // Slide footer tag
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(80, 560, 300, 44);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px "SFMono-Regular", Menlo, monospace';
    ctx.fillText('STAGE A // KEYNOTE DISPATCH', 105, 588);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const fileName = `stage_capture_${Date.now().toString().slice(-4)}.jpg`;
    setSelectedFileName(fileName);
    setPreviewUrl(dataUrl);
    onFileSelected(dataUrl, fileName, 124000, 'image/jpeg');
  };

  return (
    <div
      className={`p-5 rounded-lg border transition-colors ${
        isDarkMode
          ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
          : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Upload & Media Ingestion</h3>
          <p className="text-xs opacity-60">Event photos, stage whiteboards, or schedule notes</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenLiveCamera}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] text-[#d4d4d4] hover:bg-[#2c2c2c]'
                : 'bg-[#f7f6f3] border-[#e0dfdc] text-[#37352f] hover:bg-[#ecebe7]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 opacity-75" />
            <span>Camera</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateSample}
            disabled={isProcessing}
            title="Generate a sample keynote slide for rapid test"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer disabled:opacity-50 ${
              isDarkMode
                ? 'bg-[#252525] border-[#333333] text-[#d4d4d4] hover:bg-[#2c2c2c]'
                : 'bg-[#f7f6f3] border-[#e0dfdc] text-[#37352f] hover:bg-[#ecebe7]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Sample Slide</span>
          </button>
        </div>
      </div>

      {/* Notion-Style Dashed Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-7 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[170px] ${
          isDragOver
            ? isDarkMode
              ? 'border-[#555555] bg-[#252525]'
              : 'border-[#2383e2] bg-[#f0f7fd]'
            : isDarkMode
            ? 'border-[#303030] hover:border-[#404040] bg-[#1a1a1a]/70 hover:bg-[#1a1a1a]'
            : 'border-[#e4e3e0] hover:border-[#d0cecb] bg-[#fbfbfa] hover:bg-[#f7f6f4]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center mb-2.5 ${
            isDarkMode ? 'bg-[#252525] text-[#999999]' : 'bg-[#efefed] text-[#666666]'
          }`}
        >
          <Upload className="w-4 h-4" />
        </div>

        <p className="text-xs font-medium mb-1">
          Click to upload or drag and drop event captures
        </p>
        <p className="text-[11px] opacity-60">
          JPG, PNG, whiteboard scans, or paste from clipboard (⌘V)
        </p>
      </div>

      {/* Ingestion Preview when file selected */}
      {previewUrl && (
        <div
          className={`mt-4 pt-3.5 border-t ${
            isDarkMode ? 'border-[#2c2c2c]' : 'border-[#e9e9e7]'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1.5 font-medium opacity-90">
              <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Current Ingestion:</span>
              <span className="font-mono text-[11px] opacity-70 truncate max-w-[200px]">
                {selectedFileName}
              </span>
            </span>
            <button
              onClick={handleClear}
              className="opacity-50 hover:opacity-100 p-1 transition-opacity cursor-pointer"
              title="Clear preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            className={`relative rounded-md overflow-hidden aspect-video max-h-48 border ${
              isDarkMode ? 'bg-[#151515] border-[#2c2c2c]' : 'bg-[#f7f6f3] border-[#e9e9e7]'
            }`}
          >
            <img src={previewUrl} alt="Event capture" className="w-full h-full object-cover" />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-xs font-mono text-white gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Gemma 4 Reasoning Trace...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
