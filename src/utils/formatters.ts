export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `KH${randomNum}`;
}

export function getVietQRUrl(
  bankId: string,
  accountNo: string,
  accountHolder: string,
  amount: number,
  content: string
): string {
  // Clean bank code and account
  const cleanBank = bankId.trim().toUpperCase();
  const cleanAccount = accountNo.trim();
  const cleanAmount = Math.round(amount);
  const encodedContent = encodeURIComponent(content.trim());
  const encodedHolder = encodeURIComponent(accountHolder.trim().toUpperCase());

  // Using standard VietQR public API
  return `https://img.vietqr.io/image/${cleanBank}-${cleanAccount}-compact2.jpg?amount=${cleanAmount}&addInfo=${encodedContent}&accountName=${encodedHolder}`;
}
