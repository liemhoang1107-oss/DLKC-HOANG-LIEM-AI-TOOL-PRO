import React, { useState } from 'react';
import { Plus, Tag, Trash2, Check, X, Calendar, Percent, Coins } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Coupon } from '../../types';
import { formatDate, formatVND } from '../../utils/formatters';

export const AdminCoupons: React.FC = () => {
  const { coupons, saveCoupon, deleteCoupon } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    type: 'percentage',
    value: 15,
    maxUses: 100,
    usedCount: 0,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
  });

  const handleCreate = () => {
    setFormData({
      code: '',
      type: 'percentage',
      value: 15,
      maxUses: 100,
      usedCount: 0,
      expiresAt: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) return;

    const couponToSave: Coupon = {
      code: formData.code.trim().toUpperCase(),
      type: formData.type || 'percentage',
      value: Number(formData.value) || 0,
      maxUses: Number(formData.maxUses) || 100,
      usedCount: Number(formData.usedCount) || 0,
      expiresAt: formData.expiresAt || new Date().toISOString(),
      isActive: Boolean(formData.isActive),
    };

    saveCoupon(couponToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Quản Lý Mã Giảm Giá (Coupon System)</h2>
          <p className="text-xs text-gray-400">
            Cấu hình mã khuyến mãi giảm theo % hoặc theo số tiền cố định (VND)
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/25 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Mã Mới</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B0F19] text-gray-400 uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3 px-4 font-semibold">Mã Code</th>
                <th className="py-3 px-4 font-semibold">Loại Giảm</th>
                <th className="py-3 px-4 font-semibold">Mức Giảm</th>
                <th className="py-3 px-4 font-semibold">Lượt Sử Dụng</th>
                <th className="py-3 px-4 font-semibold">Hạn Dùng</th>
                <th className="py-3 px-4 font-semibold">Trạng Thái</th>
                <th className="py-3 px-4 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {coupons.map((coupon) => {
                const isExpired = new Date(coupon.expiresAt) < new Date();
                const isFull = coupon.usedCount >= coupon.maxUses;

                return (
                  <tr key={coupon.code} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                        {coupon.code}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {coupon.type === 'percentage' ? (
                        <span className="inline-flex items-center gap-1 text-indigo-400 font-medium">
                          <Percent className="w-3.5 h-3.5" />
                          Phần trăm (%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                          <Coins className="w-3.5 h-3.5" />
                          Tiền mặt (VND)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      {coupon.type === 'percentage'
                        ? `${coupon.value}%`
                        : formatVND(coupon.value)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {coupon.usedCount} / {coupon.maxUses}
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            style={{
                              width: `${Math.min(100, (coupon.usedCount / coupon.maxUses) * 100)}%`,
                            }}
                            className="h-full bg-purple-500"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-400 font-mono text-[11px]">
                      {formatDate(coupon.expiresAt)}
                    </td>

                    <td className="py-3.5 px-4">
                      {coupon.isActive && !isExpired && !isFull ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          Đang hoạt động
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                          {isExpired ? 'Hết hạn' : isFull ? 'Đầy lượt' : 'Tạm tắt'}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Xóa mã ${coupon.code}?`)) {
                            deleteCoupon(coupon.code);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                        title="Xóa coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h3 className="font-bold text-base text-white">Thêm Mã Giảm Giá Mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Mã Giảm Giá (Code) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="Ví dụ: AI2026 hoặc VIP50K"
                  className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Loại Giảm</label>
                  <select
                    value={formData.type || 'percentage'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as 'percentage' | 'fixed',
                      })
                    }
                    className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  >
                    <option value="percentage">Theo Phần Trăm (%)</option>
                    <option value="fixed">Số Tiền Cố Định (VND)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Giá Trị Giảm {formData.type === 'percentage' ? '(%)' : '(VNĐ)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.value || 0}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    placeholder={formData.type === 'percentage' ? '20' : '50000'}
                    className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Số Lượt Tối Đa
                  </label>
                  <input
                    type="number"
                    value={formData.maxUses || 100}
                    onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
                    className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Ngày Hết Hạn
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt ? formData.expiresAt.split('T')[0] : ''}
                    onChange={(e) =>
                      setFormData({ ...formData, expiresAt: `${e.target.value}T23:59:59Z` })
                    }
                    className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 pt-2">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isActive)}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-[#111827] border-white/20 text-purple-600 focus:ring-0"
                />
                <span>Kích hoạt mã ngay lập tức</span>
              </label>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Mã Giảm Giá</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
