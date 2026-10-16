import React from 'react';
import {
  TrendingUp,
  Clock,
  Users,
  Copy,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  QrCode,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatVND, formatDate } from '../../utils/formatters';

interface AdminOverviewProps {
  onNavigateToOrders: () => void;
  onNavigateToTools: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onNavigateToOrders,
  onNavigateToTools,
}) => {
  const { orders, tools, approveOrder } = useApp();

  // Metrics
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCopyCount = tools.reduce((sum, t) => sum + t.copyCount, 0);
  const totalPurchases = tools.reduce((sum, t) => sum + t.purchaseCount, 0);

  // Weekly dummy chart points based on real revenue
  const chartDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const chartValues = [450000, 780000, 320000, 1150000, 890000, 1650000, totalRevenue || 1200000];
  const maxVal = Math.max(...chartValues, 2000000);

  return (
    <div className="space-y-6">
      
      {/* 4 Realtime Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Doanh thu */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Doanh Thu Tháng</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-purple-300 via-indigo-200 to-pink-300 bg-clip-text">
              {formatVND(totalRevenue)}
            </h3>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+24.8% so với tháng trước</span>
            </p>
          </div>
        </div>

        {/* Đơn hàng chờ duyệt */}
        <div
          onClick={onNavigateToOrders}
          className="p-5 rounded-2xl bg-[#111827] border border-white/5 relative overflow-hidden group hover:border-amber-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Đơn Chờ Duyệt (Pending)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span>{pendingOrders.length}</span>
              {pendingOrders.length > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                  Cần xử lý
                </span>
              )}
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">Bấm để đối soát VietQR ngay</p>
          </div>
        </div>

        {/* Thành viên / Khách hàng */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Khách Hàng & Thành Viên</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white">1,482</h3>
            <p className="text-[11px] text-indigo-400 mt-1">+38 thành viên mới tuần này</p>
          </div>
        </div>

        {/* Tổng lượt copy tool */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/5 relative overflow-hidden group hover:border-pink-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Tổng Lượt Copy Tool</span>
            <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
              <Copy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white">{totalCopyCount.toLocaleString()}</h3>
            <p className="text-[11px] text-pink-400 mt-1">{totalPurchases} lượt mua thành công</p>
          </div>
        </div>

      </div>

      {/* Analytics Chart & Pending Orders Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Line / Bar Chart for Revenue */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111827] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Biểu Đồ Doanh Thu Theo Tuần</h3>
              <p className="text-xs text-gray-400">Thống kê chuyển khoản thực tế qua VietQR</p>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
              VND / Ngày
            </span>
          </div>

          {/* SVG Chart visualization */}
          <div className="h-56 w-full flex items-end gap-3 pt-6 pb-2 border-b border-white/5">
            {chartDays.map((day, idx) => {
              const heightPct = Math.max(15, Math.round((chartValues[idx] / maxVal) * 100));
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {Math.round(chartValues[idx] / 1000)}k
                  </span>
                  <div className="w-full bg-white/5 rounded-t-lg relative overflow-hidden h-full flex items-end">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-indigo-600 via-purple-600 to-pink-500 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400">{day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Trung bình: 950.000 đ/ngày</span>
            <span className="text-emerald-400 font-semibold">Tỷ lệ duyệt đơn thành công: 98%</span>
          </div>
        </div>

        {/* Quick Pending Orders Table */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111827] border border-white/5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Đơn Chờ Duyệt Gần Nhất</h3>
              </div>
              <button
                onClick={onNavigateToOrders}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Xem tất cả ({orders.length})
              </button>
            </div>

            {pendingOrders.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-500/40 mx-auto mb-2" />
                Không có đơn hàng nào đang chờ duyệt!
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-mono font-bold text-white">
                        <span>{order.id}</span>
                        <span className="text-[10px] text-purple-400 font-normal">
                          ({order.userEmail})
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-300 font-mono mt-0.5">
                        CK: {order.transferContent}
                      </p>
                      <p className="text-xs font-bold text-gray-200 mt-1">
                        {formatVND(order.totalAmount)}
                      </p>
                    </div>

                    <button
                      onClick={() => approveOrder(order.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shrink-0 transition-colors shadow-md shadow-emerald-600/20"
                    >
                      Duyệt Ngay
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span>Cập nhật trạng thái tức thì</span>
            <button
              onClick={onNavigateToTools}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Quản lý Tool AI →
            </button>
          </div>
        </div>

      </div>

      {/* Top Selling Tools Table */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/5 space-y-4">
        <h3 className="font-bold text-sm text-white">Top Tool AI Bán Chạy Nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px]">
                <th className="pb-3 font-semibold">Ảnh 9:16</th>
                <th className="pb-3 font-semibold">Tên Tool</th>
                <th className="pb-3 font-semibold">Phiên Bản</th>
                <th className="pb-3 font-semibold">Giá Bán</th>
                <th className="pb-3 font-semibold">Đã Bán</th>
                <th className="pb-3 font-semibold">Lượt Copy</th>
                <th className="pb-3 font-semibold">Đánh Giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {tools.slice(0, 4).map((tool) => (
                <tr key={tool.id} className="hover:bg-white/[0.02]">
                  <td className="py-2.5">
                    <div className="w-9 aspect-[9/16] rounded overflow-hidden bg-black border border-white/10">
                      <img
                        src={tool.thumbnail}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-2.5 font-semibold text-white max-w-xs truncate">
                    {tool.name}
                  </td>
                  <td className="py-2.5 font-mono text-purple-400">{tool.version}</td>
                  <td className="py-2.5 font-bold text-gray-100">
                    {tool.isFree ? 'Miễn Phí' : formatVND(tool.priceSale)}
                  </td>
                  <td className="py-2.5 text-emerald-400 font-bold">{tool.purchaseCount}</td>
                  <td className="py-2.5 text-pink-400">{tool.copyCount}</td>
                  <td className="py-2.5 text-amber-400 font-bold">★ {tool.rating}.0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
