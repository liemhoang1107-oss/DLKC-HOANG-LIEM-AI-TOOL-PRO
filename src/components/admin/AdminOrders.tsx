import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Copy,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { formatDate, formatVND } from '../../utils/formatters';

export const AdminOrders: React.FC = () => {
  const { orders, approveOrder, cancelOrder, copyPrompt } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      order.transferContent.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const paidCount = orders.filter((o) => o.status === 'paid').length;
  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

  return (
    <div className="space-y-6">
      
      {/* Header and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Quản Lý & Duyệt Đơn Hàng (VietQR)</h2>
          <p className="text-xs text-gray-400">
            Đối soát nội dung chuyển khoản ngân hàng và duyệt kích hoạt tài khoản
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn, email, nội dung CK..."
            className="w-full bg-[#111827] text-xs text-gray-200 pl-9 pr-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStatus === 'all'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-[#111827] text-gray-400 hover:text-white'
          }`}
        >
          Tất cả ({orders.length})
        </button>

        <button
          onClick={() => setFilterStatus('pending')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStatus === 'pending'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'bg-[#111827] text-amber-400 hover:text-amber-300'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Chờ Duyệt ({pendingCount})</span>
          {pendingCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => setFilterStatus('paid')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStatus === 'paid'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-[#111827] text-emerald-400 hover:text-emerald-300'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Đã Thanh Toán ({paidCount})</span>
        </button>

        <button
          onClick={() => setFilterStatus('cancelled')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStatus === 'cancelled'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              : 'bg-[#111827] text-rose-400 hover:text-rose-300'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Đã Hủy ({cancelledCount})</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B0F19] text-gray-400 uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3 px-4 font-semibold">Mã Đơn Hàng</th>
                <th className="py-3 px-4 font-semibold">Khách Hàng (Email)</th>
                <th className="py-3 px-4 font-semibold">Sản Phẩm</th>
                <th className="py-3 px-4 font-semibold">Tổng Số Tiền</th>
                <th className="py-3 px-4 font-semibold">Nội Dung Đối Soát CK</th>
                <th className="py-3 px-4 font-semibold">Thời Gian</th>
                <th className="py-3 px-4 font-semibold">Trạng Thái</th>
                <th className="py-3 px-4 font-semibold text-right">Hành Động Duyệt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    Không tìm thấy đơn hàng nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isPending = order.status === 'pending';
                  const isPaid = order.status === 'paid';
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Mã đơn */}
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
                          {order.id}
                        </span>
                      </td>

                      {/* Khách hàng */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-gray-200 block truncate max-w-[160px]">
                          {order.userEmail}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">UID: {order.userId.slice(0, 10)}...</span>
                      </td>

                      {/* Sản phẩm */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                              <span className="text-gray-200 font-medium truncate">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Số tiền */}
                      <td className="py-3.5 px-4 font-bold text-base text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text whitespace-nowrap">
                        {formatVND(order.totalAmount)}
                        {order.couponUsed && (
                          <span className="block text-[10px] text-purple-400 font-normal">
                            Code: {order.couponUsed}
                          </span>
                        )}
                      </td>

                      {/* Nội dung CK */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => copyPrompt(order.transferContent)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/80 border border-purple-500/30 text-purple-200 font-mono text-[11px] transition-colors"
                          title="Click để sao chép nội dung CK"
                        >
                          <span className="font-bold">{order.transferContent}</span>
                          <Copy className="w-3 h-3 text-purple-400" />
                        </button>
                      </td>

                      {/* Thời gian */}
                      <td className="py-3.5 px-4 text-gray-400 text-[11px] whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isPaid && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã thanh toán
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse">
                            <Clock className="w-3 h-3" />
                            Chờ duyệt
                          </span>
                        )}
                        {isCancelled && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                            <XCircle className="w-3 h-3" />
                            Đã hủy
                          </span>
                        )}
                      </td>

                      {/* Hành động */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => approveOrder(order.id)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Duyệt Đơn</span>
                            </button>
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-white/10 text-xs transition-colors"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : isPaid ? (
                          <span className="text-[11px] text-gray-500">
                            Đã duyệt lúc: {order.approvedAt ? formatDate(order.approvedAt) : 'N/A'}
                          </span>
                        ) : (
                          <button
                            onClick={() => approveOrder(order.id)}
                            className="text-[11px] text-purple-400 hover:underline"
                          >
                            Kích hoạt lại
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
