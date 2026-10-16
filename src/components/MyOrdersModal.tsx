import React, { useState } from 'react';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, Tool } from '../types';
import { formatDate, formatVND } from '../utils/formatters';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: (order: Order) => void;
  onSelectTool: (tool: Tool) => void;
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
  onSelectTool,
}) => {
  const { orders, currentUser, tools } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'cancelled'>('all');

  if (!isOpen) return null;

  // Filter orders for current user (or all if admin viewing)
  const userOrders = orders.filter((o) =>
    currentUser.role === 'admin' ? true : o.userId === currentUser.uid
  );

  const filteredOrders = userOrders.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-[#111827] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-white">Lịch Sử Đơn Hàng Của Tôi</h2>
              <p className="text-[11px] text-gray-400">Theo dõi trạng thái thanh toán và kích hoạt VIP</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 bg-[#111827]/60 border-b border-white/5 flex gap-2">
          {(['all', 'pending', 'paid', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === tab
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white/5 text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab === 'all'
                ? `Tất cả (${userOrders.length})`
                : tab === 'pending'
                ? `Chờ duyệt (${userOrders.filter((o) => o.status === 'pending').length})`
                : tab === 'paid'
                ? `Đã thanh toán (${userOrders.filter((o) => o.status === 'paid').length})`
                : `Đã hủy (${userOrders.filter((o) => o.status === 'cancelled').length})`}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold text-gray-400">Không có đơn hàng nào</p>
              <p className="text-xs text-gray-600 mt-1">
                Các đơn hàng bạn đã mua sẽ hiển thị ở đây kèm link tải và mã kích hoạt.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isPaid = order.status === 'paid';
              const isPending = order.status === 'pending';
              const isCancelled = order.status === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#111827] border border-white/5 hover:border-white/10 transition-all space-y-3"
                >
                  {/* Top Bar: Code, Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {order.id}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPaid && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã thanh toán (Active)
                        </span>
                      )}
                      {isPending && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse">
                          <Clock className="w-3.5 h-3.5" />
                          Chờ duyệt chuyển khoản
                        </span>
                      )}
                      {isCancelled && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3.5 h-3.5" />
                          Đã hủy
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => {
                      const matchedTool = tools.find((t) => t.id === item.toolId);
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 text-xs bg-white/[0.02] p-2.5 rounded-xl border border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            {item.thumbnail && (
                              <div className="w-9 aspect-[9/16] rounded overflow-hidden bg-black shrink-0 border border-white/10">
                                <img
                                  src={item.thumbnail}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-white">{item.name}</p>
                              <span className="text-[11px] text-gray-400 font-mono">
                                {formatVND(item.price)}
                              </span>
                            </div>
                          </div>

                          {/* Quick access if paid */}
                          {isPaid && matchedTool && (
                            <button
                              onClick={() => {
                                onClose();
                                onSelectTool(matchedTool);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3 text-purple-300" />
                              <span>Mở VIP</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary & Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div>
                      <span className="text-gray-400">Tổng thanh toán: </span>
                      <span className="font-bold text-white text-sm">
                        {formatVND(order.totalAmount)}
                      </span>
                      {order.couponUsed && (
                        <span className="ml-2 text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                          Mã: {order.couponUsed}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isPending && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenCheckout(order);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Xem Mã VietQR Thanh Toán</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
