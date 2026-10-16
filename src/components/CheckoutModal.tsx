import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  QrCode,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { formatVND, getVietQRUrl } from '../utils/formatters';

interface CheckoutModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onViewOrderHistory: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewOrderHistory,
}) => {
  const { settings, orders, copyPrompt, approveOrder, currentUser } = useApp();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Poll / check status of this order in real time from context
  const currentLiveOrder = orders.find((o) => o.id === order?.id) || order;
  const isPaid = currentLiveOrder?.status === 'paid';

  useEffect(() => {
    if (isOpen) {
      setIsVerifying(true);
    }
  }, [isOpen]);

  if (!isOpen || !currentLiveOrder) return null;

  const { bankConfig } = settings;
  const qrUrl = getVietQRUrl(
    bankConfig.bankId || 'TPB',
    bankConfig.accountNumber,
    bankConfig.accountHolder,
    currentLiveOrder.totalAmount,
    currentLiveOrder.transferContent
  );

  const handleCopy = (text: string, fieldName: string) => {
    copyPrompt(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-[#111827] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>Thanh Toán Đơn Hàng</span>
                <span className="font-mono text-purple-300 text-xs px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                  {currentLiveOrder.id}
                </span>
              </h2>
              <p className="text-[11px] text-gray-400">
                Quét mã VietQR hoặc chuyển khoản theo hướng dẫn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Status Alert */}
          {isPaid ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-sm text-emerald-100">
                  Giao dịch thành công! Đơn hàng đã được duyệt
                </p>
                <p className="text-xs text-emerald-300/80">
                  Tool AI và Secret Data VIP đã được kích hoạt vĩnh viễn cho tài khoản của bạn.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onViewOrderHistory();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shrink-0 transition-colors"
              >
                Xem Tool Đã Mua
              </button>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-400 shrink-0 animate-spin" />
              <div className="text-xs text-purple-200 flex-1">
                <p className="font-semibold">Hệ thống đang chờ nhận chuyển khoản</p>
                <p className="text-[11px] text-purple-300/80">
                  Vui lòng giữ nguyên trang hoặc kiểm tra Lịch sử đơn hàng sau 3-5 phút sau khi chuyển khoản thành công.
                </p>
              </div>
            </div>
          )}

          {/* Main 2-Column layout: VietQR Code & Bank Info Table */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* QR Code Column */}
            <div className="sm:col-span-5 flex flex-col items-center text-center">
              <div className="relative p-3 rounded-2xl bg-white border border-white/20 shadow-2xl max-w-[220px]">
                <img
                  src={qrUrl}
                  alt="VietQR Code"
                  className="w-full h-auto rounded-lg object-contain"
                  onError={(e) => {
                    // Fallback visual if offline
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-center gap-1 text-[11px] font-bold text-gray-700">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>VietQR Tự Động Điền Tiền</span>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Mở App ngân hàng bất kỳ để quét mã
              </p>
            </div>

            {/* Transfer Information Table */}
            <div className="sm:col-span-7 space-y-2.5">
              
              {/* Ngân hàng */}
              <div className="p-2.5 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Ngân hàng thụ hưởng</span>
                  <span className="text-xs font-bold text-white">{bankConfig.bankName}</span>
                </div>
                <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded">
                  {bankConfig.bankId}
                </span>
              </div>

              {/* Chủ tài khoản */}
              <div className="p-2.5 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Chủ tài khoản</span>
                  <span className="text-xs font-bold text-white">{bankConfig.accountHolder}</span>
                </div>
              </div>

              {/* Số tài khoản */}
              <div className="p-2.5 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-between group">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Số tài khoản</span>
                  <span className="text-sm font-mono font-bold text-purple-300">
                    {bankConfig.accountNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(bankConfig.accountNumber, 'acc')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedField === 'acc' ? 'Đã copy' : 'Sao chép'}</span>
                </button>
              </div>

              {/* Số tiền */}
              <div className="p-2.5 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Số tiền cần chuyển</span>
                  <span className="text-base font-extrabold text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text">
                    {formatVND(currentLiveOrder.totalAmount)}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(currentLiveOrder.totalAmount.toString(), 'amount')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedField === 'amount' ? 'Đã copy' : 'Sao chép'}</span>
                </button>
              </div>

              {/* Nội dung chuyển khoản */}
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-300 block uppercase font-bold">
                    Nội dung chuyển khoản (Bắt buộc)
                  </span>
                  <span className="text-sm font-mono font-extrabold text-purple-200">
                    {currentLiveOrder.transferContent}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(currentLiveOrder.transferContent, 'content')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-md shadow-purple-600/30"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedField === 'content' ? 'Đã copy' : 'Sao chép'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Items Preview */}
          <div className="p-3.5 rounded-2xl bg-[#111827] border border-white/5 space-y-2">
            <span className="text-xs font-semibold text-gray-400 block">
              Sản phẩm trong đơn ({currentLiveOrder.items.length}):
            </span>
            <div className="space-y-1.5">
              {currentLiveOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 truncate max-w-sm">{it.name}</span>
                  <span className="text-gray-400 font-mono">{formatVND(it.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer / Testing Assistant Helper */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Chế độ duyệt đơn thủ công bảo mật</span>
            </div>

            {/* Quick action for Preview/Admin */}
            {!isPaid && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    approveOrder(currentLiveOrder.id);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Giả lập Admin bấm Duyệt Đơn ngay"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>[Test] Duyệt Đơn Nhanh</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
