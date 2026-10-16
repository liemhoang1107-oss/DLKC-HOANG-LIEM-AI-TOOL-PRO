import React, { useState } from 'react';
import {
  Save,
  Globe,
  CreditCard,
  Search,
  Share2,
  CheckCircle2,
  Sparkles,
  QrCode,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SystemSettings } from '../../types';
import { getVietQRUrl } from '../../utils/formatters';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetAllData } = useApp();
  const [formData, setFormData] = useState<SystemSettings>({ ...settings });
  const [activeTab, setActiveTab] = useState<'payment' | 'website' | 'seo'>('payment');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const previewQrUrl = getVietQRUrl(
    formData.bankConfig.bankId || 'TPB',
    formData.bankConfig.accountNumber,
    formData.bankConfig.accountHolder,
    199000,
    'NAP TOOLAI TEST'
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Cấu Hình Toàn Bộ Hệ Thống</h2>
          <p className="text-xs text-gray-400">
            Tự động đồng bộ số tài khoản VietQR, thông tin thương hiệu và SEO
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-500/25 hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Lưu Toàn Bộ Cấu Hình</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-2">
        <button
          onClick={() => setActiveTab('payment')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'payment'
              ? 'border-purple-500 text-purple-300'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Cấu Hình Thanh Toán VietQR</span>
        </button>

        <button
          onClick={() => setActiveTab('website')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'website'
              ? 'border-purple-500 text-purple-300'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Thông Tin Website & Hotline</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'seo'
              ? 'border-purple-500 text-purple-300'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Cấu Hình SEO Global</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Tab 1: Payment VietQR */}
        {activeTab === 'payment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-6 rounded-2xl bg-[#111827] border border-white/5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-sm text-white">
                  Thông Tin Tài Khoản Nhận Tiền (VietQR Sync)
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                Khi thay đổi các trường bên dưới, hệ thống sẽ tự động cập nhật ngay trên trang Checkout và tạo mã VietQR tương ứng cho khách hàng.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Tên Ngân Hàng
                  </label>
                  <input
                    type="text"
                    value={formData.bankConfig.bankName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankConfig: { ...formData.bankConfig, bankName: e.target.value },
                      })
                    }
                    placeholder="TP Bank, Vietcombank, MB Bank..."
                    className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Mã Ngân Hàng VietQR (Bank ID)
                  </label>
                  <input
                    type="text"
                    value={formData.bankConfig.bankId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankConfig: { ...formData.bankConfig, bankId: e.target.value.toUpperCase() },
                      })
                    }
                    placeholder="TPB, VCB, MB, ACB, VPB, TCB..."
                    className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Ví dụ: TPB (TPBank), VCB (Vietcombank), MB (MBBank)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Số Tài Khoản Nhận Tiền *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankConfig.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankConfig: { ...formData.bankConfig, accountNumber: e.target.value },
                      })
                    }
                    placeholder="67891796789"
                    className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Chủ Tài Khoản (In hoa không dấu) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankConfig.accountHolder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankConfig: {
                          ...formData.bankConfig,
                          accountHolder: e.target.value.toUpperCase(),
                        },
                      })
                    }
                    placeholder="HOANG NGOC LIEM"
                    className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono uppercase font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-200">
                Cú pháp chuyển khoản mặc định: <strong>NAP TOOLAI [Mã đơn hàng]</strong>
              </div>
            </div>

            {/* QR Live Test Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#111827] border border-white/5 flex flex-col items-center text-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block mb-1">
                  Xem Trước Mã VietQR Tự Động
                </span>
                <p className="text-[11px] text-gray-400 mb-4">
                  Mã sẽ tự cập nhật theo số tài khoản vừa nhập
                </p>

                <div className="p-3 bg-white rounded-2xl max-w-[200px] mx-auto shadow-2xl">
                  <img src={previewQrUrl} alt="VietQR Preview" className="w-full h-auto rounded" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 w-full text-xs text-gray-400">
                <p className="font-mono text-purple-300 font-bold">{formData.bankConfig.bankName}</p>
                <p className="font-mono">{formData.bankConfig.accountNumber}</p>
                <p className="font-bold text-white">{formData.bankConfig.accountHolder}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Website Info & Social */}
        {activeTab === 'website' && (
          <div className="p-6 rounded-2xl bg-[#111827] border border-white/5 space-y-4">
            <h3 className="font-bold text-sm text-white">Thông Tin Thương Hiệu & Kênh Hỗ Trợ</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Tên Website
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Hotline / Zalo Hỗ Trợ
                </label>
                <input
                  type="text"
                  value={formData.hotline}
                  onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                  className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Telegram Hỗ Trợ Khách Hàng
                </label>
                <input
                  type="url"
                  value={formData.supportTelegram || ''}
                  onChange={(e) => setFormData({ ...formData, supportTelegram: e.target.value })}
                  placeholder="https://t.me/..."
                  className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Facebook Fanpage / Group
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.facebook || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Kênh YouTube Hướng Dẫn
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.youtube || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                    })
                  }
                  placeholder="https://youtube.com/..."
                  className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Máy Chủ Discord
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.discord || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, discord: e.target.value },
                    })
                  }
                  placeholder="https://discord.gg/..."
                  className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SEO Global */}
        {activeTab === 'seo' && (
          <div className="p-6 rounded-2xl bg-[#111827] border border-white/5 space-y-4">
            <h3 className="font-bold text-sm text-white">Cấu Hình Meta SEO & Google Analytics</h3>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Meta Title Mặc Định
              </label>
              <input
                type="text"
                value={formData.seo.metaTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value },
                  })
                }
                className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Meta Description Mặc Định
              </label>
              <textarea
                rows={3}
                value={formData.seo.metaDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value },
                  })
                }
                className="w-full bg-[#0B0F19] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Google Analytics Measurement ID
              </label>
              <input
                type="text"
                value={formData.seo.googleAnalyticsId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, googleAnalyticsId: e.target.value },
                  })
                }
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-[#0B0F19] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>
        )}

        {/* Form Bottom Save */}
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={resetAllData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi Phục Dữ Liệu Gốc</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Toàn Bộ Cấu Hình</span>
          </button>
        </div>

      </form>
    </div>
  );
};
