import React from 'react';
import { Star, ShoppingCart, Bookmark, Flame, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Tool } from '../types';
import { formatVND } from '../utils/formatters';

interface ToolCardProps {
  tool: Tool;
  onOpenDetail: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpenDetail }) => {
  const {
    addToCart,
    toggleBookmark,
    isBookmarked,
    hasPurchased,
    categories,
    copyPrompt,
  } = useApp();

  const isPurchased = hasPurchased(tool.id);
  const bookmarked = isBookmarked(tool.id);
  const category = categories.find((c) => c.id === tool.categoryId);

  return (
    <div className="group relative rounded-2xl bg-[#111827] border border-white/5 hover:border-purple-500/40 transition-all duration-300 flex flex-col overflow-hidden glow-card">
      {/* 9:16 Thumbnail Container - STRICT 9:16 RATIO */}
      <div
        onClick={() => onOpenDetail(tool)}
        className="relative w-full aspect-[9/16] overflow-hidden bg-gray-950 cursor-pointer"
      >
        <img
          src={tool.thumbnail}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges (Hot, New, Free, Category) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            {tool.isHot && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/90 text-white shadow-lg backdrop-blur-sm">
                <Flame className="w-3 h-3" />
                HOT
              </span>
            )}
            {tool.isNew && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/90 text-white shadow-lg backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                MỚI
              </span>
            )}
            {tool.isFree && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white shadow-lg backdrop-blur-sm">
                MIỄN PHÍ
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(tool.id);
            }}
            className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-black/50 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title="Lưu yêu thích"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Version & Ownership Tag on Thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 font-mono">
            {tool.version}
          </span>

          {isPurchased ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[11px] font-semibold backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3" />
              Đã sở hữu
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-gray-300">
              {category?.name || 'Tool AI'}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Copy count */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-gray-200">{tool.rating}.0</span>
              <span className="text-gray-500">({tool.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-[11px]">
              <Copy className="w-3 h-3 text-purple-400" />
              <span>{tool.copyCount} lượt copy</span>
            </div>
          </div>

          {/* Tool Title */}
          <h3
            onClick={() => onOpenDetail(tool)}
            className="font-bold text-sm text-gray-100 hover:text-purple-300 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
          >
            {tool.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            {tool.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tool.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            {tool.isFree ? (
              <span className="text-emerald-400 font-extrabold text-base">Miễn Phí</span>
            ) : (
              <div>
                <div className="text-base font-extrabold text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text">
                  {formatVND(tool.priceSale)}
                </div>
                {tool.priceOriginal > tool.priceSale && (
                  <div className="text-[11px] text-gray-500 line-through">
                    {formatVND(tool.priceOriginal)}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isPurchased ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyPrompt(tool.secretData.prompt, tool.id);
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
                title="Sao chép nhanh Prompt VIP"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Prompt</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(tool);
                }}
                className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                title="Thêm vào giỏ hàng"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onOpenDetail(tool)}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/5 transition-colors"
            >
              Xem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
