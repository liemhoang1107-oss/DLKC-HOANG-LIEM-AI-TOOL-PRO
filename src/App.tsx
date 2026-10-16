import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MyOrdersModal } from './components/MyOrdersModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Tool, Order } from './types';
import { Sparkles, SlidersHorizontal, ArrowUpDown, HelpCircle, Shield, QrCode } from 'lucide-react';

const MainMarketplace: React.FC = () => {
  const {
    tools,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    selectedTool,
    setSelectedTool,
    activeView,
    addToCart,
    checkout,
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCheckoutOrder, setActiveCheckoutOrder] = useState<Order | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'price-asc' | 'price-desc'>('featured');

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'cat-all' || tool.categoryId === selectedCategory;

    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'popular') return b.purchaseCount - a.purchaseCount;
    if (sortBy === 'price-asc') return a.priceSale - b.priceSale;
    if (sortBy === 'price-desc') return b.priceSale - a.priceSale;
    // Featured default (Hot first, then new)
    if (a.isHot && !b.isHot) return -1;
    if (!a.isHot && b.isHot) return 1;
    return 0;
  });

  // Handle direct buy action from Tool Detail Modal
  const handleDirectBuy = (tool: Tool) => {
    addToCart(tool);
    const order = checkout();
    setActiveCheckoutOrder(order);
    setIsCheckoutOpen(true);
  };

  // Handle Proceed to checkout from Cart Drawer
  const handleProceedCheckout = () => {
    const order = checkout();
    setActiveCheckoutOrder(order);
    setIsCheckoutOpen(true);
  };

  if (activeView === 'admin') {
    return (
      <>
        <AdminLayout />
        <Toast />
      </>
    );
  }

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Gallery Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedCategory === 'cat-all'
                  ? 'Kho Tool AI Nổi Bật (Tỷ lệ 9:16)'
                  : activeCategoryObj?.name}
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Hiển thị {sortedTools.length} sản phẩm AI chất lượng cao • Luôn giữ đúng tỷ lệ dọc 9:16
            </p>
          </div>

          {/* Sorter Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 bg-[#111827] px-3 py-2 rounded-xl border border-white/5 text-xs text-gray-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#111827]">Nổi bật nhất (Hot)</option>
                <option value="popular" className="bg-[#111827]">Bán chạy nhất</option>
                <option value="price-asc" className="bg-[#111827]">Giá tăng dần</option>
                <option value="price-desc" className="bg-[#111827]">Giá giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        {/* 9:16 Portrait Cards Grid */}
        {sortedTools.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-[#111827]/40 border border-white/5 p-8 max-w-lg mx-auto">
            <Sparkles className="w-12 h-12 mx-auto text-purple-400/40 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Không tìm thấy Tool phù hợp</h3>
            <p className="text-xs text-gray-400 mb-6">
              Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('cat-all');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
            >
              Xem Tất Cả Tool
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onOpenDetail={(selected) => setSelectedTool(selected)}
              />
            ))}
          </div>
        )}

        {/* Value Proposition Banner */}
        <div className="mt-16 rounded-3xl p-8 bg-gradient-to-r from-purple-950/40 via-[#111827] to-indigo-950/40 border border-purple-500/20 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto md:mx-0">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Thanh Toán VietQR Tiện Lợi</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Quét mã ngân hàng bất kỳ, tự động điền tiền và nội dung đơn. Không cần nhập tay mất thời gian.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto md:mx-0">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Duyệt Đơn & Kích Hoạt Tức Thời</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Ngay khi đơn chuyển khoản thành công, hệ thống mở khóa vĩnh viễn quyền truy cập Secret Data VIP.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto md:mx-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Cập Nhật Trọn Đời Miễn Phí</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Khi các mô hình Midjourney, Sora, Claude hay n8n có bản mới, bạn đều nhận cập nhật hoàn toàn miễn phí.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        onDirectBuy={handleDirectBuy}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedCheckout={handleProceedCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        order={activeCheckoutOrder}
        onClose={() => setIsCheckoutOpen(false)}
        onViewOrderHistory={() => {
          setIsOrdersOpen(true);
        }}
      />

      <MyOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        onOpenCheckout={(order) => {
          setActiveCheckoutOrder(order);
          setIsCheckoutOpen(true);
        }}
        onSelectTool={(tool) => setSelectedTool(tool)}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        onSelectTool={(tool) => setSelectedTool(tool)}
      />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainMarketplace />
    </AppProvider>
  );
}
