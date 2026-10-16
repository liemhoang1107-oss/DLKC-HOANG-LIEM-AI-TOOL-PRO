import React from 'react';
import { Sparkles, Zap, ShieldCheck, QrCode, Search, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, categories, selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-white/5">
      {/* Background ambient neon glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/25 to-pink-600/15 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 hover:border-purple-500/30 transition-all">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-medium text-gray-300">
            Hệ thống Chợ Tool AI 2026 • Tỷ lệ ảnh chuẩn 9:16 • Kích hoạt tức thì
          </span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Khám Phá & Sở Hữu{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Tool AI & Prompt VIP
          </span>{' '}
          Độc Quyền
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Tối ưu hóa 90% thời gian sáng tạo nội dung, lập trình và marketing với kho công cụ AI cao cấp.
          Thanh toán tiện lợi qua <strong className="text-white">VietQR</strong> và nhận mã kích hoạt trong 3 phút.
        </p>

        {/* Big Search Input on Mobile/Tablet */}
        <div className="mt-7 max-w-xl mx-auto block md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tool AI theo tên, tag..."
              className="w-full bg-[#0B0F19] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-2xl border border-white/10 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Highlights Features Pills */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ảnh Chuẩn 9:16</p>
              <p className="text-[11px] text-gray-400">Xem trước trực quan</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Quét VietQR 24/7</p>
              <p className="text-[11px] text-gray-400">Tự động điền số tiền</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Duyệt Đơn Nhanh</p>
              <p className="text-[11px] text-gray-400">Cấp quyền tức thời</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Prompt VIP Ẩn</p>
              <p className="text-[11px] text-gray-400">1 chạm sao chép</p>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-5xl mx-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-md shadow-purple-500/20'
                    : 'bg-[#0B0F19] text-gray-400 border-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
