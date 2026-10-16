import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  INITIAL_TOOLS,
  INITIAL_USERS,
} from '../data/seedData';
import { Category, Coupon, Order, SystemSettings, Tool, User, UserRole } from '../types';
import { generateOrderId } from '../utils/formatters';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  tools: Tool[];
  categories: Category[];
  orders: Order[];
  coupons: Coupon[];
  settings: SystemSettings;
  cart: Tool[];
  appliedCoupon: Coupon | null;
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
  activeView: 'home' | 'admin' | 'orders' | 'bookmarks';
  setActiveView: (view: 'home' | 'admin' | 'orders' | 'bookmarks') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Cart Actions
  addToCart: (tool: Tool) => void;
  removeFromCart: (toolId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getCartTotal: () => { subtotal: number; discount: number; total: number };
  
  // Checkout & Orders
  checkout: () => Order;
  approveOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  
  // User Permissions & Interactions
  hasPurchased: (toolId: string) => boolean;
  toggleBookmark: (toolId: string) => void;
  isBookmarked: (toolId: string) => boolean;
  copyPrompt: (text: string, toolId?: string) => Promise<boolean>;
  
  // Admin Management (CRUD)
  saveTool: (tool: Tool) => void;
  deleteTool: (toolId: string) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  saveCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence Helpers
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`aitool_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStored = (key: string, data: unknown) => {
    try {
      localStorage.setItem(`aitool_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  // State
  const [currentUser, setCurrentUserState] = useState<User>(() =>
    loadStored('currentUser', INITIAL_USERS[0])
  );
  const [tools, setToolsState] = useState<Tool[]>(() =>
    loadStored('tools', INITIAL_TOOLS)
  );
  const [categories, setCategoriesState] = useState<Category[]>(() =>
    loadStored('categories', INITIAL_CATEGORIES)
  );
  const [orders, setOrdersState] = useState<Order[]>(() =>
    loadStored('orders', INITIAL_ORDERS)
  );
  const [coupons, setCouponsState] = useState<Coupon[]>(() =>
    loadStored('coupons', INITIAL_COUPONS)
  );
  const [settings, setSettingsState] = useState<SystemSettings>(() =>
    loadStored('settings', INITIAL_SETTINGS)
  );

  const [cart, setCart] = useState<Tool[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'admin' | 'orders' | 'bookmarks'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('cat-all');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveStored('currentUser', currentUser);
  }, [currentUser]);

  useEffect(() => {
    saveStored('tools', tools);
  }, [tools]);

  useEffect(() => {
    saveStored('categories', categories);
  }, [categories]);

  useEffect(() => {
    saveStored('orders', orders);
  }, [orders]);

  useEffect(() => {
    saveStored('coupons', coupons);
  }, [coupons]);

  useEffect(() => {
    saveStored('settings', settings);
  }, [settings]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((cur) => (cur?.id === id ? null : cur));
    }, 3500);
  };

  // Switch role helper
  const switchRole = (role: UserRole) => {
    setCurrentUserState((prev) => ({
      ...prev,
      role,
      displayName: role === 'admin' ? 'Hoàng Ngọc Liêm (Admin)' : 'Nguyễn Văn An (Khách)',
      email: role === 'admin' ? 'liemhoang1107@gmail.com' : 'nguyenvana@gmail.com',
    }));
    showToast(`Đã chuyển sang chế độ: ${role === 'admin' ? 'Quản Trị Viên (Admin)' : 'Khách Hàng (User)'}`, 'info');
  };

  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
  };

  // Cart operations
  const addToCart = (tool: Tool) => {
    if (cart.some((item) => item.id === tool.id)) {
      showToast('Sản phẩm đã có trong giỏ hàng!', 'info');
      return;
    }
    setCart((prev) => [...prev, tool]);
    showToast(`Đã thêm "${tool.name}" vào giỏ hàng`, 'success');
  };

  const removeFromCart = (toolId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== toolId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: 'Mã giảm giá không tồn tại hoặc đã hết hạn!' };
    }

    if (found.usedCount >= found.maxUses) {
      return { success: false, message: 'Mã giảm giá đã đạt giới hạn lượt sử dụng!' };
    }

    setAppliedCoupon(found);
    return {
      success: true,
      message: `Áp dụng thành công mã ${found.code} (-${
        found.type === 'percentage' ? `${found.value}%` : `${found.value.toLocaleString()} đ`
      })`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.isFree ? 0 : item.priceSale), 0);
    let discount = 0;

    if (appliedCoupon && subtotal > 0) {
      if (appliedCoupon.type === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = Math.min(appliedCoupon.value, subtotal);
      }
    }

    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  };

  // Checkout process
  const checkout = (): Order => {
    const orderId = generateOrderId();
    const { total } = getCartTotal();
    const transferContent = `NAP TOOLAI ${orderId}`;

    const newOrder: Order = {
      id: orderId,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      items: cart.map((item) => ({
        toolId: item.id,
        name: item.name,
        price: item.isFree ? 0 : item.priceSale,
        thumbnail: item.thumbnail,
      })),
      totalAmount: total,
      couponUsed: appliedCoupon?.code,
      status: 'pending',
      paymentMethod: 'transfer',
      transferContent,
      createdAt: new Date().toISOString(),
      approvedAt: null,
      approvedBy: null,
    };

    // Update coupon usage if used
    if (appliedCoupon) {
      setCouponsState((prev) =>
        prev.map((c) =>
          c.code === appliedCoupon.code ? { ...c, usedCount: c.usedCount + 1 } : c
        )
      );
    }

    // Add to orders
    setOrdersState((prev) => [newOrder, ...prev]);

    // Clear cart
    clearCart();

    return newOrder;
  };

  // Order Approval (Admin action)
  const approveOrder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    // Update order status to paid
    setOrdersState((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'paid' as const,
              approvedAt: new Date().toISOString(),
              approvedBy: currentUser.uid,
            }
          : order
      )
    );

    // Increment purchase count on each tool in the order
    const purchasedToolIds = targetOrder.items.map((it) => it.toolId);
    setToolsState((prev) =>
      prev.map((tool) =>
        purchasedToolIds.includes(tool.id)
          ? { ...tool, purchaseCount: tool.purchaseCount + 1 }
          : tool
      )
    );

    showToast(`Đã duyệt đơn hàng ${orderId} thành công! Khách hàng đã được kích hoạt VIP.`, 'success');
  };

  const cancelOrder = (orderId: string) => {
    setOrdersState((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'cancelled' as const,
              approvedAt: null,
            }
          : order
      )
    );
    showToast(`Đã hủy đơn hàng ${orderId}`, 'info');
  };

  // Check if current user has purchased tool
  const hasPurchased = (toolId: string): boolean => {
    const tool = tools.find((t) => t.id === toolId);
    if (tool?.isFree) return true; // Free tool always unlocked
    if (currentUser.role === 'admin') return true; // Admin has full access

    // Check if user has paid order with this tool
    return orders.some(
      (order) =>
        order.userId === currentUser.uid &&
        order.status === 'paid' &&
        order.items.some((item) => item.toolId === toolId)
    );
  };

  // Bookmarks
  const toggleBookmark = (toolId: string) => {
    setCurrentUserState((prev) => {
      const exists = prev.bookmarks.includes(toolId);
      const updatedBookmarks = exists
        ? prev.bookmarks.filter((id) => id !== toolId)
        : [...prev.bookmarks, toolId];
      return { ...prev, bookmarks: updatedBookmarks };
    });
    showToast('Đã cập nhật danh sách yêu thích', 'info');
  };

  const isBookmarked = (toolId: string) => {
    return currentUser.bookmarks.includes(toolId);
  };

  // Copy prompt with toast & increment copyCount
  const copyPrompt = async (text: string, toolId?: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      if (toolId) {
        setToolsState((prev) =>
          prev.map((tool) =>
            tool.id === toolId ? { ...tool, copyCount: tool.copyCount + 1 } : tool
          )
        );
      }
      showToast('✨ Đã sao chép vào bộ nhớ tạm!', 'success');
      return true;
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('✨ Đã sao chép vào bộ nhớ tạm!', 'success');
      return true;
    }
  };

  // CRUD Tools
  const saveTool = (toolData: Tool) => {
    setToolsState((prev) => {
      const exists = prev.some((t) => t.id === toolData.id);
      if (exists) {
        return prev.map((t) => (t.id === toolData.id ? toolData : t));
      } else {
        return [toolData, ...prev];
      }
    });
    showToast(`Đã lưu tool "${toolData.name}" thành công!`, 'success');
  };

  const deleteTool = (toolId: string) => {
    setToolsState((prev) => prev.filter((t) => t.id !== toolId));
    showToast('Đã xóa tool thành công!', 'info');
  };

  // CRUD Categories
  const saveCategory = (cat: Category) => {
    setCategoriesState((prev) => {
      const exists = prev.some((c) => c.id === cat.id);
      if (exists) {
        return prev.map((c) => (c.id === cat.id ? cat : c));
      } else {
        return [...prev, cat];
      }
    });
    showToast(`Đã lưu danh mục "${cat.name}"!`, 'success');
  };

  const deleteCategory = (catId: string) => {
    setCategoriesState((prev) => prev.filter((c) => c.id !== catId));
    showToast('Đã xóa danh mục!', 'info');
  };

  // CRUD Coupons
  const saveCoupon = (coupon: Coupon) => {
    setCouponsState((prev) => {
      const exists = prev.some((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
      if (exists) {
        return prev.map((c) => (c.code.toUpperCase() === coupon.code.toUpperCase() ? coupon : c));
      } else {
        return [coupon, ...prev];
      }
    });
    showToast(`Đã lưu mã giảm giá ${coupon.code}!`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCouponsState((prev) => prev.filter((c) => c.code !== code));
    showToast('Đã xóa coupon!', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
    showToast('Đã cập nhật cấu hình hệ thống!', 'success');
  };

  const resetAllData = () => {
    localStorage.clear();
    setToolsState(INITIAL_TOOLS);
    setCategoriesState(INITIAL_CATEGORIES);
    setOrdersState(INITIAL_ORDERS);
    setCouponsState(INITIAL_COUPONS);
    setSettingsState(INITIAL_SETTINGS);
    setCurrentUserState(INITIAL_USERS[0]);
    setCart([]);
    setAppliedCoupon(null);
    showToast('Đã khôi phục dữ liệu gốc thành công!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        tools,
        categories,
        orders,
        coupons,
        settings,
        cart,
        appliedCoupon,
        selectedTool,
        setSelectedTool,
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        getCartTotal,
        checkout,
        approveOrder,
        cancelOrder,
        hasPurchased,
        toggleBookmark,
        isBookmarked,
        copyPrompt,
        saveTool,
        deleteTool,
        saveCategory,
        deleteCategory,
        saveCoupon,
        deleteCoupon,
        updateSettings,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
