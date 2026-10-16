import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Tool } from '../types';
import { formatVND } from '../utils/formatters';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: Tool) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const { currentUser, tools, toggleBookmark, addToCart } = useApp();

  if (!isOpen) return null;

  const bookmarkedTools = tools.filter((t) => currentUser.bookmarks.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-[#111827] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-white">Sản Phẩm Đã Lưu</h2>
              <p className="text-[11px] text-gray-400">{bookmarkedTools.length} tool trong danh sách yêu thích</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {bookmarkedTools.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold text-gray-400">Chưa có sản phẩm nào được lưu</p>
              <p className="text-xs text-gray-600 mt-1">
                Bấm vào biểu tượng bookmark trên thẻ sản phẩm để lưu lại xem sau.
              </p>
            </div>
          ) : (
            bookmarkedTools.map((tool) => (
              <div
                key={tool.id}
                className="p-3 rounded-2xl bg-[#111827] border border-white/5 flex items-center justify-between gap-3 hover:border-purple-500/30 transition-all"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectTool(tool);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-12 aspect-[9/16] rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                    <img
                      src={tool.thumbnail}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate hover:text-purple-300">
                      {tool.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{tool.shortDescription}</p>
                    <span className="text-xs font-bold text-purple-300 font-mono mt-1 block">
                      {tool.isFree ? 'Miễn Phí' : formatVND(tool.priceSale)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => addToCart(tool)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Thêm giỏ
                  </button>
                  <button
                    onClick={() => toggleBookmark(tool.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Bỏ lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
