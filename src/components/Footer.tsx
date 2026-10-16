import React from 'react';
import { Sparkles, Shield, Heart, Send, PhoneCall, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { settings, switchRole, currentUser, setActiveView } = useApp();

  return (
    <footer className="mt-20 border-t border-white/5 bg-[#070b14] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm text-white">{settings.siteName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Chợ Tool AI & Kho Prompt VIP tỷ lệ dọc 9:16 hàng đầu Việt Nam. Tự động hóa sáng tạo, tiết kiệm 90% thời gian sản xuất nội dung.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>Bản quyền vĩnh viễn & Bảo mật 100%</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Khám Phá Nhanh</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-purple-300">
                  Tất cả Tool AI 9:16
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('orders')} className="hover:text-purple-300">
                  Lịch sử đơn hàng
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('bookmarks')} className="hover:text-purple-300">
                  Danh sách yêu thích
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setActiveView('admin');
                  }}
                  className="hover:text-purple-300 text-purple-400 font-semibold"
                >
                  Khu vực Quản trị Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Info */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-purple-400" />
              <span>Thanh Toán VietQR</span>
            </h4>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-[11px]">
              <p>Ngân hàng: <strong className="text-white">{settings.bankConfig.bankName}</strong></p>
              <p>Chủ TK: <strong className="text-white">{settings.bankConfig.accountHolder}</strong></p>
              <p>Số TK: <strong className="text-purple-300 font-mono">{settings.bankConfig.accountNumber}</strong></p>
              <p className="text-[10px] text-gray-500 pt-1">Quét mã QR tự động điền số tiền và duyệt nhanh</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Hỗ Trợ 24/7</h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="flex items-center gap-1.5 text-gray-300">
                <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
                <span>Hotline: {settings.hotline}</span>
              </p>
              {settings.supportTelegram && (
                <p className="flex items-center gap-1.5 text-gray-300">
                  <Send className="w-3.5 h-3.5 text-indigo-400" />
                  <a
                    href={settings.supportTelegram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-purple-400"
                  >
                    Telegram Support
                  </a>
                </p>
              )}
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-gray-500 block">Đang đăng nhập với vai trò:</span>
              <span className="text-[11px] font-mono text-purple-300 font-semibold">
                {currentUser.displayName} ({currentUser.role})
              </span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 {settings.siteName}. Bản quyền thuộc về HOÀNG NGỌC LIÊM. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Điều khoản sử dụng</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Chính sách bảo mật</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Hướng dẫn thanh toán</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
