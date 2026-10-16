import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  FolderTree,
  Tag,
  Settings,
  ArrowLeft,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './AdminOverview';
import { AdminOrders } from './AdminOrders';
import { AdminTools } from './AdminTools';
import { AdminCategories } from './AdminCategories';
import { AdminCoupons } from './AdminCoupons';
import { AdminSettings } from './AdminSettings';

export const AdminLayout: React.FC = () => {
  const { setActiveView, orders } = useApp();
  const [activeMenu, setActiveMenu] = useState<'overview' | 'orders' | 'tools' | 'categories' | 'coupons' | 'settings'>('overview');

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const MENUS = [
    {
      id: 'overview',
      name: 'Tổng Quan (Dashboard)',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'orders',
      name: 'Quản Lý Đơn Hàng',
      icon: ShoppingCart,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-pink-500 text-white',
    },
    {
      id: 'tools',
      name: 'Quản Lý Tool & Tài Nguyên',
      icon: Wrench,
      badge: null,
    },
    {
      id: 'categories',
      name: 'Quản Lý Danh Mục',
      icon: FolderTree,
      badge: null,
    },
    {
      id: 'coupons',
      name: 'Mã Giảm Giá (Coupon)',
      icon: Tag,
      badge: null,
    },
    {
      id: 'settings',
      name: 'Cấu Hình Hệ Thống',
      icon: Settings,
      badge: null,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar with Glassmorphism */}
      <aside className="w-full md:w-64 bg-[#0B0F19]/90 border-r border-white/5 backdrop-blur-md p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Top Return to Store Button */}
          <div className="pb-4 mb-4 border-b border-white/5 flex items-center justify-between">
            <button
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Trang Chợ</span>
            </button>

            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
              ADMIN PRO
            </span>
          </div>

          {/* Admin Header Title */}
          <div className="px-2 mb-6">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Hệ Thống Quản Trị</span>
            </div>
            <h1 className="text-base font-extrabold text-white">Full Control Panel</h1>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {MENUS.map((menu) => {
              const Icon = menu.icon;
              const isActive = activeMenu === menu.id;

              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenu(menu.id as typeof activeMenu)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white border border-purple-500/40 font-bold shadow-md shadow-purple-500/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                    <span>{menu.name}</span>
                  </div>

                  {menu.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        menu.badgeColor || 'bg-purple-500 text-white'
                      }`}
                    >
                      {menu.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer in Sidebar */}
        <div className="pt-4 border-t border-white/5 mt-6 px-2 text-[11px] text-gray-500">
          <p className="font-semibold text-gray-400">AI Tool Store v2.5</p>
          <p>Duyệt đơn tự động VietQR</p>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeMenu === 'overview' && (
            <AdminOverview
              onNavigateToOrders={() => setActiveMenu('orders')}
              onNavigateToTools={() => setActiveMenu('tools')}
            />
          )}
          {activeMenu === 'orders' && <AdminOrders />}
          {activeMenu === 'tools' && <AdminTools />}
          {activeMenu === 'categories' && <AdminCategories />}
          {activeMenu === 'coupons' && <AdminCoupons />}
          {activeMenu === 'settings' && <AdminSettings />}
        </div>
      </main>

    </div>
  );
};
