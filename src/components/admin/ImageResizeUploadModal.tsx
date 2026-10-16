import React, { useState, useRef } from 'react';
import { X, Upload, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageResizeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageReady: (dataUrl: string) => void;
  currentImage?: string;
}

export const ImageResizeUploadModal: React.FC<ImageResizeUploadModalProps> = ({
  isOpen,
  onClose,
  onImageReady,
  currentImage,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>(currentImage || '');
  const [resizedSrc, setResizedSrc] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  // Presets of 9:16 high quality AI wallpapers
  const PRESET_9_16 = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=450&h=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=450&h=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=450&h=800&q=80',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=450&h=800&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=450&h=800&q=80',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setPreviewSrc(src);
      resizeToTarget(src);
    };
    reader.readAsDataURL(file);
  };

  const resizeToTarget = (imageSrc: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      const TARGET_WIDTH = 450;
      const TARGET_HEIGHT = 800; // 9:16 aspect ratio

      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Fill background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

      // Center crop with aspect ratio 9:16 (fill cover)
      const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;
      const sourceRatio = img.width / img.height;

      let drawWidth = TARGET_WIDTH;
      let drawHeight = TARGET_HEIGHT;
      let offsetX = 0;
      let offsetY = 0;

      if (sourceRatio > targetRatio) {
        // Source is wider than 9:16
        drawHeight = TARGET_HEIGHT;
        drawWidth = img.width * (TARGET_HEIGHT / img.height);
        offsetX = (TARGET_WIDTH - drawWidth) / 2;
      } else {
        // Source is taller than 9:16
        drawWidth = TARGET_WIDTH;
        drawHeight = img.height * (TARGET_WIDTH / img.width);
        offsetY = (TARGET_HEIGHT - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const outputDataUrl = canvas.toDataURL('image/jpeg', 0.88);
      setResizedSrc(outputDataUrl);
      setIsProcessing(false);
    };
    img.src = imageSrc;
  };

  const handleApply = () => {
    if (resizedSrc) {
      onImageReady(resizedSrc);
      onClose();
    } else if (previewSrc) {
      onImageReady(previewSrc);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl p-6">
        <canvas ref={canvasRef} className="hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base text-white">Tải Lên & Resize Thumbnail (450px × 800px)</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-200">
            Hệ thống tự động canh giữa và scale chuẩn tỷ lệ <strong>9:16 (450px × 800px)</strong> theo chuẩn PRD.
          </div>

          {/* Upload Input */}
          <label className="border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#111827]">
            <Upload className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-sm font-semibold text-white">Chọn ảnh từ máy tính</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ JPG, PNG, WEBP</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Preset Selector */}
          <div>
            <span className="text-xs font-semibold text-gray-400 block mb-2">
              Hoặc chọn nhanh ảnh mẫu có sẵn tỷ lệ 9:16:
            </span>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_9_16.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setPreviewSrc(preset);
                    resizeToTarget(preset);
                  }}
                  className={`aspect-[9/16] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    previewSrc === preset ? 'border-purple-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={preset} alt="preset" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 9:16 Preview Box */}
          {(resizedSrc || previewSrc) && (
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#111827] border border-white/5">
              <div className="w-20 aspect-[9/16] rounded-lg overflow-hidden bg-black shrink-0 border border-purple-500/40">
                <img
                  src={resizedSrc || previewSrc}
                  alt="Cropped Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-300">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Kích thước chuẩn: 450px × 800px (9:16)
                </p>
                <p className="text-gray-400 text-[11px] mt-1">
                  Ảnh đã sẵn sàng lưu vào hệ thống và hiển thị sắc nét trên các thiết bị di động & desktop.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleApply}
            disabled={!previewSrc && !resizedSrc}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
          >
            <Check className="w-4 h-4" />
            Áp Dụng Ảnh Này
          </button>
        </div>
      </div>
    </div>
  );
};
