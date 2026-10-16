import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatVND } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedCheckout,
}) => {
  const {
    cart,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getCartTotal,
    showToast,
  } = useApp();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const { subtotal, discount, total } = getCartTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    const res = applyCoupon(couponCodeInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      showToast(res.message, 'success');
      setCouponCodeInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0B0F19] border-l border-white/10 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-[#111827]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Giỏ Hàng Của Bạn</h2>
              <p className="text-[11px] text-gray-400">{cart.length} sản phẩm đã chọn</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-gray-400 hover:text-rose-400 transition-colors"
              >
                Xóa tất cả
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-300 mb-1">Giỏ hàng đang trống</p>
              <p className="text-xs text-gray-500 max-w-xs mb-4">
                Khám phá các bộ Tool AI và Prompt VIP để nâng cao hiệu suất làm việc của bạn.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
              >
                Tiếp tục xem Tool
              </button>
            </div>
          ) : (
            cart.map((tool) => (
              <div
                key={tool.id}
                className="p-3 rounded-2xl bg-[#111827] border border-white/5 flex gap-3 items-center group"
              >
                {/* 9:16 mini aspect ratio */}
                <div className="w-14 aspect-[9/16] rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                  <img
                    src={tool.thumbnail}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate leading-snug">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">{tool.version}</p>
                  <div className="mt-1">
                    {tool.isFree ? (
                      <span className="text-emerald-400 text-xs font-bold">Miễn Phí</span>
                    ) : (
                      <span className="text-purple-300 text-xs font-bold">
                        {formatVND(tool.priceSale)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(tool.id)}
                  className="p-2 text-gray-500 hover:text-rose-400 transition-colors"
                  title="Xóa khỏi giỏ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/5 bg-[#111827] space-y-3.5">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" />
                    <div>
                      <span className="font-bold text-purple-200 uppercase">{appliedCoupon.code}</span>
                      <span className="text-purple-300 ml-1.5 text-[11px]">
                        (-{appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}%` : formatVND(appliedCoupon.value)})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-purple-400 hover:text-white"
                  >
                    Gỡ bỏ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Nhập mã ưu đãi (ví dụ: AI2026)"
                    className="flex-1 bg-[#0B0F19] text-xs text-gray-200 px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 uppercase placeholder:normal-case"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold transition-colors"
                  >
                    Áp dụng
                  </button>
                </form>
              )}

              {couponMessage && (
                <p
                  className={`text-[11px] mt-1 ${
                    couponMessage.isError ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-400 border-t border-white/5 pt-2">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="text-gray-200 font-medium">{formatVND(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Giảm giá khuyến mãi:</span>
                  <span>-{formatVND(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/5">
                <span>Tổng thanh toán:</span>
                <span className="text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text text-base">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Tiến Hành Thanh Toán (VietQR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Giao dịch bảo mật 100% • Kích hoạt qua mã đơn hàng</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
