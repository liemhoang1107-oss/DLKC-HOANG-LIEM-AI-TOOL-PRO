import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';
import { generateSlug } from '../../utils/formatters';
import { DynamicIcon } from '../DynamicIcon';

export const AdminCategories: React.FC = () => {
  const { categories, saveCategory, deleteCategory } = useApp();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({});

  const AVAILABLE_ICONS = [
    'Sparkles',
    'Video',
    'Palette',
    'Code2',
    'TrendingUp',
    'Bot',
    'Mic',
    'Cpu',
    'Layers',
    'FileText',
    'Music',
    'Camera',
    'Briefcase',
    'Zap',
    'Globe',
  ];

  const handleCreate = () => {
    setFormData({
      id: `cat-${Date.now()}`,
      name: '',
      slug: '',
      icon: 'Sparkles',
      color: '#8b5cf6',
      order: categories.length + 1,
    });
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cat: Category) => {
    setFormData({ ...cat });
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev?.slug && editingCategory ? prev.slug : slug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const catToSave: Category = {
      id: formData.id || `cat-${Date.now()}`,
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      icon: formData.icon || 'Sparkles',
      color: formData.color || '#8b5cf6',
      order: Number(formData.order) || 1,
    };

    saveCategory(catToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Quản Lý Danh Mục Sản Phẩm (Categories)</h2>
          <p className="text-xs text-gray-400">
            Tạo, sửa, xóa danh mục và phân loại Tool AI theo icon Lucide
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/25 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Danh Mục</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 rounded-2xl bg-[#111827] border border-white/5 hover:border-purple-500/30 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: `${cat.color}20`, borderColor: `${cat.color}40`, color: cat.color }}
                className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
              >
                <DynamicIcon name={cat.icon} className="w-5 h-5" />
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">{cat.name}</h4>
                <p className="text-[11px] text-gray-400 font-mono">
                  slug: /{cat.slug} • Thứ tự: {cat.order}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(cat)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                title="Chỉnh sửa"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              {cat.id !== 'cat-all' && (
                <button
                  onClick={() => {
                    if (window.confirm(`Xóa danh mục "${cat.name}"?`)) {
                      deleteCategory(cat.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h3 className="font-bold text-base text-white">
                {editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Tên Danh Mục *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ví dụ: Video & Animation AI"
                  className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Slug URL</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="video-animation"
                  className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Chọn Icon Đại Diện (Thư viện Lucide)
                </label>
                <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-2 bg-[#111827] rounded-xl border border-white/5">
                  {AVAILABLE_ICONS.map((iconName) => (
                    <button
                      type="button"
                      key={iconName}
                      onClick={() => setFormData({ ...formData, icon: iconName })}
                      className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all ${
                        formData.icon === iconName
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300 scale-105'
                          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <DynamicIcon name={iconName} className="w-4 h-4" />
                      <span className="text-[9px] truncate max-w-full">{iconName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Mã Màu (Hex)</label>
                  <input
                    type="color"
                    value={formData.color || '#8b5cf6'}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-9 bg-[#111827] rounded-xl border border-white/10 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Thứ Tự (Order)</label>
                  <input
                    type="number"
                    value={formData.order || 1}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

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
                  <span>{editingCategory ? 'Lưu Danh Mục' : 'Tạo Danh Mục'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
