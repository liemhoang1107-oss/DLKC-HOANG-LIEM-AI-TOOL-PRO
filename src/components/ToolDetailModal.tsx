import React, { useState } from 'react';
import {
  X,
  Star,
  ExternalLink,
  Copy,
  Lock,
  Unlock,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
  Video,
  FileText,
  ShoppingCart,
  Flame,
  Bookmark,
  ChevronDown,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Tool } from '../types';
import { formatDate, formatVND } from '../utils/formatters';

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
  onDirectBuy: (tool: Tool) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  onDirectBuy,
}) => {
  const {
    hasPurchased,
    addToCart,
    copyPrompt,
    categories,
    toggleBookmark,
    isBookmarked,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'vip' | 'video' | 'changelog' | 'faq'>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!tool) return null;

  const isPurchased = hasPurchased(tool.id);
  const bookmarked = isBookmarked(tool.id);
  const category = categories.find((c) => c.id === tool.categoryId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#111827]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              {category?.name || 'Tool AI'}
            </span>
            <span className="text-xs text-gray-400 font-mono">Phiên bản {tool.version}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(tool.id)}
              className={`p-2 rounded-xl border transition-colors ${
                bookmarked
                  ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Lưu yêu thích"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top Showcase: 9:16 Portrait + Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* 9:16 Image Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative group">
                <img
                  src={tool.thumbnail}
                  alt={tool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {tool.isHot && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-lg">
                      <Flame className="w-3 h-3" />
                      HOT
                    </span>
                  )}
                  {tool.isFree && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-lg">
                      MIỄN PHÍ
                    </span>
                  )}
                </div>
                {/* 9:16 Watermark Indicator */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-gray-300 font-mono border border-white/10">
                  9:16 VIP
                </div>
              </div>
              <p className="mt-2 text-[11px] text-gray-500 text-center">Tỷ lệ ảnh dọc 9:16 chuẩn hóa</p>
            </div>

            {/* Main Info Column */}
            <div className="md:col-span-8 flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {tool.name}
                </h1>
                
                {/* Rating & Counts */}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-white">{tool.rating}.0</span>
                    <span>({tool.reviewCount} đánh giá)</span>
                  </div>
                  <span>•</span>
                  <span>{tool.purchaseCount} người đã mua</span>
                  <span>•</span>
                  <span className="text-purple-400 font-medium">{tool.copyCount} lượt copy prompt</span>
                  <span>•</span>
                  <span className="text-gray-500">Cập nhật: {formatDate(tool.lastUpdated)}</span>
                </div>

                {/* Short description */}
                <p className="mt-3 text-sm text-gray-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  {tool.shortDescription}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase Box / Status */}
              <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-gray-400 block mb-0.5">Giá sở hữu vĩnh viễn:</span>
                    {tool.isFree ? (
                      <div className="text-2xl font-extrabold text-emerald-400">0 VNĐ (Miễn Phí)</div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text">
                          {formatVND(tool.priceSale)}
                        </span>
                        {tool.priceOriginal > tool.priceSale && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatVND(tool.priceOriginal)}
                          </span>
                        )}
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                          Tiết kiệm {Math.round(((tool.priceOriginal - tool.priceSale) / tool.priceOriginal) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isPurchased ? (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          Đã Sở Hữu Tool
                        </span>
                        <button
                          onClick={() => setActiveTab('vip')}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <Unlock className="w-4 h-4" />
                          Xem VIP Content
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(tool)}
                          className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Thêm Giỏ
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onDirectBuy(tool);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          Mua Ngay (VietQR)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-white/10 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 pb-3 px-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Tổng Quan & Mô Tả
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`flex items-center gap-1.5 pb-3 px-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'vip'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {isPurchased ? (
                <Unlock className="w-4 h-4 text-emerald-400" />
              ) : (
                <Lock className="w-4 h-4 text-amber-400" />
              )}
              <span>Khu Vực VIP (Secret Data)</span>
              {!isPurchased && (
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  Khóa
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 pb-3 px-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'video'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Video className="w-4 h-4" />
              Video Demo & Hướng Dẫn
            </button>

            <button
              onClick={() => setActiveTab('changelog')}
              className={`flex items-center gap-1.5 pb-3 px-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'changelog'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              Lịch Sử Cập Nhật ({tool.changelog.length})
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-1.5 pb-3 px-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Hỏi Đáp FAQ ({tool.faq.length})
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[220px]">
            
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="prose prose-invert max-w-none text-sm text-gray-300 whitespace-pre-line leading-relaxed font-sans bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                  {tool.longDescription}
                </div>
              </div>
            )}

            {/* Tab: VIP Secret Data (LOCKED vs UNLOCKED) */}
            {activeTab === 'vip' && (
              <div>
                {isPurchased ? (
                  <div className="space-y-4">
                    {/* Unlocked banner */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-purple-950/40 to-indigo-950/40 border border-emerald-500/40 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Unlock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Bạn Đã Được Cấp Quyền VIP</p>
                          <p className="text-xs text-gray-300">
                            Truy cập link công cụ gốc và sao chép cấu trúc prompt không giới hạn.
                          </p>
                        </div>
                      </div>

                      {tool.secretData.targetLink && (
                        <a
                          href={tool.secretData.targetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-lg shadow-emerald-500/20 transition-all"
                        >
                          <span>Mở Link Tool</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* VIP Prompt Box */}
                    <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                          <Copy className="w-4 h-4" />
                          Bộ Prompt Mẫu VIP (Prompt Template)
                        </span>
                        <button
                          onClick={() => copyPrompt(tool.secretData.prompt, tool.id)}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          Sao Chép Prompt
                        </button>
                      </div>
                      <pre className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all">
                        {tool.secretData.prompt}
                      </pre>
                    </div>

                    {/* VIP Instructions */}
                    <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
                      <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Hướng Dẫn Sử Dụng Chuyên Sâu (Step-by-step)
                      </span>
                      <div className="text-xs text-gray-300 whitespace-pre-line leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                        {tool.secretData.instructions}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* LOCKED VIP VIEW */
                  <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 p-8 text-center bg-[#0d1117] flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
                      <Lock className="w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      Khu Vực Dữ Liệu Bảo Mật VIP Đang Bị Khóa
                    </h3>
                    <p className="text-xs text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
                      Link copy tool gốc, bộ cấu trúc Prompt bí mật và hướng dẫn chuyên sâu chỉ hiển thị sau khi đơn hàng của bạn được duyệt thành công.
                    </p>

                    <div className="w-full max-w-md p-3.5 rounded-xl bg-black/60 border border-white/5 blur-[2.5px] select-none text-left font-mono text-[11px] text-gray-500 mb-6">
                      /imagine prompt: [ENCRYPTED_SECRET_PROMPT_DATA_FOR_VIP_MEMBERS_ONLY] --ar 16:9 --v 6.1
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addToCart(tool)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-semibold"
                      >
                        Thêm Vào Giỏ
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onDirectBuy(tool);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-all"
                      >
                        Mua Ngay Để Mở Khóa VIP
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Video Demo */}
            {activeTab === 'video' && (
              <div className="space-y-4">
                {tool.videoDemo ? (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <iframe
                      src={tool.videoDemo}
                      title={tool.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 text-xs">
                    Chưa có video demo cho tool này.
                  </div>
                )}
              </div>
            )}

            {/* Tab: Changelog */}
            {activeTab === 'changelog' && (
              <div className="space-y-3">
                {tool.changelog.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#111827] border border-white/5 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-xs font-mono">{item.version}</span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-2.5">
                {tool.faq.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#111827] border border-white/5 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-semibold text-white hover:text-purple-300 transition-colors"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            isOpen ? 'rotate-180 text-purple-400' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-2">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
