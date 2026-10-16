import React, { useState } from 'react';
import {
  ShoppingBag,
  Bookmark,
  Shield,
  Search,
  User as UserIcon,
  Sparkles,
  ChevronDown,
  RotateCcw,
  PackageCheck,
  LayoutDashboard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenOrders,
  onOpenBookmarks,
}) => {
  const {
    currentUser,
    switchRole,
    settings,
    cart,
    orders,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    resetAllData,
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Pending orders count
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const userOrdersCount = orders.filter((o) => o.userId === currentUser.uid).length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#030712]/75 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent flex items-center gap-1.5">
              <span>{settings.siteName}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">Chợ Tool & Prompt VIP 9:16</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tool AI, Midjourney prompt, SEO workflow..."
              className="w-full bg-[#0B0F19] text-sm text-gray-200 pl-10 pr-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Admin Switch / Access */}
          {currentUser.role === 'admin' ? (
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeView === 'admin'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-purple-950/40 text-purple-300 border-purple-500/30 hover:bg-purple-900/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Panel</span>
              {pendingOrdersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => switchRole('admin')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40 transition-colors"
              title="Chuyển sang tài khoản Quản trị để duyệt đơn"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Vào Chế Độ Admin</span>
            </button>
          )}

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Sản phẩm đã lưu"
          >
            <Bookmark className="w-5 h-5" />
            {currentUser.bookmarks.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500"></span>
            )}
          </button>

          {/* Orders History */}
          <button
            onClick={onOpenOrders}
            className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Lịch sử đơn hàng của tôi"
          >
            <PackageCheck className="w-5 h-5" />
            {userOrdersCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                {userOrdersCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
            title="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[11px] font-bold text-white flex items-center justify-center shadow-md shadow-pink-500/30">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Profile & Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-[#0B0F19] border border-white/10 hover:border-purple-500/40 transition-all text-xs"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/40"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-300">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <div className="text-left hidden sm:block max-w-[110px] truncate">
                <p className="font-semibold text-gray-200 text-xs truncate">
                  {currentUser.displayName}
                </p>
                <p className="text-[10px] text-purple-400 uppercase font-mono font-bold tracking-wider">
                  {currentUser.role}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {userDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-[#111827] border border-white/10 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="p-2 border-b border-white/5 mb-2">
                    <p className="font-semibold text-sm text-white">{currentUser.displayName}</p>
                    <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          currentUser.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        Quyền: {currentUser.role.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Switch Role Options */}
                  <div className="space-y-1 mb-2">
                    <p className="text-[11px] font-semibold text-gray-400 px-2 uppercase tracking-wider">
                      Chuyển đổi góc nhìn
                    </p>
                    <button
                      onClick={() => {
                        switchRole('admin');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                        currentUser.role === 'admin'
                          ? 'bg-purple-950/60 text-purple-300 font-semibold'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span>Chế độ Quản Trị Viên (Admin)</span>
                      </div>
                      {currentUser.role === 'admin' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        switchRole('user');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                        currentUser.role === 'user'
                          ? 'bg-purple-950/60 text-purple-300 font-semibold'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span>Chế độ Khách hàng (User)</span>
                      </div>
                      {currentUser.role === 'user' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      )}
                    </button>
                  </div>

                  <div className="border-t border-white/5 pt-2 space-y-1">
                    <button
                      onClick={() => {
                        resetAllData();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Khôi phục dữ liệu mẫu (Reset Data)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
