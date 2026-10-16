import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Flame,
  Sparkles,
  Search,
  Upload,
  Layers,
  HelpCircle,
  Copy,
  Lock,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChangelogItem, FAQItem, Tool } from '../../types';
import { generateSlug, formatVND, formatDate } from '../../utils/formatters';
import { ImageResizeUploadModal } from './ImageResizeUploadModal';

export const AdminTools: React.FC = () => {
  const { tools, categories, saveTool, deleteTool } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageResizeModalOpen, setIsImageResizeModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Tool>>({});
  const [dynamicChangelog, setDynamicChangelog] = useState<ChangelogItem[]>([]);
  const [dynamicFaq, setDynamicFaq] = useState<FAQItem[]>([]);

  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || t.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateNew = () => {
    const newTool: Tool = {
      id: `tool-${Date.now()}`,
      name: '',
      slug: '',
      thumbnail:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80',
      banner: '',
      videoDemo: '',
      shortDescription: '',
      longDescription: '',
      priceOriginal: 299000,
      priceSale: 99000,
      rating: 5,
      reviewCount: 0,
      purchaseCount: 0,
      copyCount: 0,
      categoryId: categories[1]?.id || 'cat-design',
      tags: ['AI', 'Prompt VIP'],
      isHot: true,
      isNew: true,
      isFree: false,
      version: 'v1.0',
      lastUpdated: new Date().toISOString(),
      changelog: [
        {
          version: 'v1.0',
          date: new Date().toISOString(),
          content: 'Phát hành phiên bản đầu tiên.',
        },
      ],
      secretData: {
        targetLink: '',
        prompt: '',
        instructions: '',
      },
      faq: [
        {
          question: 'Làm thế nào để sử dụng tool này?',
          answer: 'Sau khi thanh toán xong, bạn truy cập link gốc và dùng prompt mẫu được cung cấp.',
        },
      ],
      seo: {
        title: '',
        description: '',
        keywords: '',
      },
    };

    setFormData(newTool);
    setDynamicChangelog(newTool.changelog);
    setDynamicFaq(newTool.faq);
    setEditingTool(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tool: Tool) => {
    setFormData({ ...tool });
    setDynamicChangelog([...tool.changelog]);
    setDynamicFaq([...tool.faq]);
    setEditingTool(tool);
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev?.slug && editingTool ? prev.slug : slug,
      seo: {
        title: prev?.seo?.title || name,
        description: prev?.seo?.description || prev?.shortDescription || '',
        keywords: prev?.seo?.keywords || name,
      },
    }));
  };

  // Add / Remove Changelog dynamic rows
  const handleAddChangelogRow = () => {
    setDynamicChangelog([
      ...dynamicChangelog,
      {
        version: `v${(dynamicChangelog.length + 1).toFixed(1)}`,
        date: new Date().toISOString(),
        content: '',
      },
    ]);
  };

  const handleRemoveChangelogRow = (index: number) => {
    setDynamicChangelog(dynamicChangelog.filter((_, i) => i !== index));
  };

  const handleChangelogChange = (index: number, field: keyof ChangelogItem, value: string) => {
    const updated = [...dynamicChangelog];
    updated[index] = { ...updated[index], [field]: value };
    setDynamicChangelog(updated);
  };

  // Add / Remove FAQ dynamic rows
  const handleAddFaqRow = () => {
    setDynamicFaq([
      ...dynamicFaq,
      { question: '', answer: '' },
    ]);
  };

  const handleRemoveFaqRow = (index: number) => {
    setDynamicFaq(dynamicFaq.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index: number, field: keyof FAQItem, value: string) => {
    const updated = [...dynamicFaq];
    updated[index] = { ...updated[index], [field]: value };
    setDynamicFaq(updated);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const toolToSave: Tool = {
      id: formData.id || `tool-${Date.now()}`,
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80',
      banner: formData.banner || '',
      videoDemo: formData.videoDemo || '',
      shortDescription: formData.shortDescription || '',
      longDescription: formData.longDescription || '',
      priceOriginal: Number(formData.priceOriginal) || 0,
      priceSale: formData.isFree ? 0 : Number(formData.priceSale) || 0,
      rating: formData.rating || 5,
      reviewCount: formData.reviewCount || 0,
      purchaseCount: formData.purchaseCount || 0,
      copyCount: formData.copyCount || 0,
      categoryId: formData.categoryId || categories[0].id,
      tags: typeof formData.tags === 'string' ? (formData.tags as string).split(',').map((s) => s.trim()) : (formData.tags || []),
      isHot: Boolean(formData.isHot),
      isNew: Boolean(formData.isNew),
      isFree: Boolean(formData.isFree),
      version: formData.version || 'v1.0',
      lastUpdated: new Date().toISOString(),
      changelog: dynamicChangelog,
      secretData: {
        targetLink: formData.secretData?.targetLink || '',
        prompt: formData.secretData?.prompt || '',
        instructions: formData.secretData?.instructions || '',
      },
      faq: dynamicFaq,
      seo: {
        title: formData.seo?.title || formData.name,
        description: formData.seo?.description || formData.shortDescription || '',
        keywords: formData.seo?.keywords || '',
      },
    };

    saveTool(toolToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Quản Lý Tool & Tài Nguyên VIP</h2>
          <p className="text-xs text-gray-400">
            Thêm mới, chỉnh sửa thông tin, cấu hình Secret Data và ảnh dọc 9:16
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-500/25 hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Tool Mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên tool, tags..."
            className="w-full bg-[#111827] text-xs text-gray-200 pl-9 pr-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#111827] text-xs text-gray-200 px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
        >
          <option value="all">Tất cả danh mục ({tools.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tools Table with 9:16 Preview */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B0F19] text-gray-400 uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3 px-4 font-semibold">Ảnh 9:16</th>
                <th className="py-3 px-4 font-semibold">Tên Tool & Phiên Bản</th>
                <th className="py-3 px-4 font-semibold">Danh Mục</th>
                <th className="py-3 px-4 font-semibold">Giá Bán</th>
                <th className="py-3 px-4 font-semibold">Huy Hiệu</th>
                <th className="py-3 px-4 font-semibold">Đã Bán</th>
                <th className="py-3 px-4 font-semibold">Secret VIP Data</th>
                <th className="py-3 px-4 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredTools.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    Chưa có tool nào hoặc không tìm thấy kết quả phù hợp.
                  </td>
                </tr>
              ) : (
                filteredTools.map((tool) => {
                  const cat = categories.find((c) => c.id === tool.categoryId);
                  return (
                    <tr key={tool.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Thumbnail 9:16 */}
                      <td className="py-3 px-4">
                        <div className="w-10 aspect-[9/16] rounded-lg overflow-hidden bg-black border border-white/10 shadow-sm relative group">
                          <img
                            src={tool.thumbnail}
                            alt={tool.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Tên & Phiên bản */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-bold text-white truncate">{tool.name}</p>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                          <span className="font-mono text-purple-400">{tool.version}</span>
                          <span>•</span>
                          <span className="truncate">slug: /{tool.slug}</span>
                        </div>
                      </td>

                      {/* Danh mục */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-gray-300">
                          {cat?.name || 'Chung'}
                        </span>
                      </td>

                      {/* Giá */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {tool.isFree ? (
                          <span className="text-emerald-400 font-bold">Miễn Phí</span>
                        ) : (
                          <div>
                            <span className="font-bold text-white">{formatVND(tool.priceSale)}</span>
                            {tool.priceOriginal > tool.priceSale && (
                              <span className="text-[10px] text-gray-500 line-through block">
                                {formatVND(tool.priceOriginal)}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Huy hiệu */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex gap-1">
                          {tool.isHot && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              HOT
                            </span>
                          )}
                          {tool.isNew && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              MỚI
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Đã bán */}
                      <td className="py-3 px-4 whitespace-nowrap font-semibold text-emerald-400">
                        {tool.purchaseCount} lượt
                      </td>

                      {/* Secret data indicator */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-[11px] text-purple-300">
                          <Lock className="w-3.5 h-3.5 text-purple-400" />
                          <span>{tool.secretData.prompt ? 'Đã có Prompt VIP' : 'Chưa có'}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEdit(tool)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Bạn có chắc muốn xóa tool "${tool.name}"?`)) {
                                deleteTool(tool.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT FULL TOOL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-[#111827] flex items-center justify-between sticky top-0 z-10">
              <h3 className="font-bold text-base text-white">
                {editingTool ? `Chỉnh Sửa Tool: ${editingTool.name}` : 'Thêm Tool AI Mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Section 1: Thông tin cơ bản */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  1. Thông Tin Cơ Bản
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Tên Tool AI *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Ví dụ: Midjourney v6.1 Ultra Master Prompter"
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Slug URL (Tự động sinh)
                    </label>
                    <input
                      type="text"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="midjourney-v6-master-prompter"
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Danh Mục</label>
                    <select
                      value={formData.categoryId || categories[0]?.id}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Phiên Bản
                    </label>
                    <input
                      type="text"
                      value={formData.version || 'v1.0'}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      placeholder="v1.3"
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Tags (cách nhau bởi dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(formData.tags)
                          ? formData.tags.join(', ')
                          : formData.tags || ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                      placeholder="Midjourney, Prompt, AI Art"
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Mô Tả Ngắn (Hiển thị ngoài card)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription || ''}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Mô tả súc tích trong 1-2 câu..."
                    className="w-full bg-[#111827] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Mô Tả Chi Tiết (Rich text / Markdown)
                  </label>
                  <textarea
                    rows={5}
                    value={formData.longDescription || ''}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    placeholder="Hỗ trợ Markdown: ### Tiêu đề, danh sách gạch đầu dòng, bold..."
                    className="w-full bg-[#111827] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              {/* Section 2: Cấu hình Giá & Checkboxes */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  2. Cấu Hình Giá & Nhãn Nổi Bật
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Giá Gốc (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={formData.priceOriginal || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, priceOriginal: Number(e.target.value) })
                      }
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Giá Khuyến Mãi (VNĐ)
                    </label>
                    <input
                      type="number"
                      disabled={formData.isFree}
                      value={formData.isFree ? 0 : formData.priceSale || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, priceSale: Number(e.target.value) })
                      }
                      className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isHot)}
                      onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                      className="rounded bg-[#111827] border-white/20 text-purple-600 focus:ring-0"
                    />
                    <span>Sản phẩm HOT 🔥</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isNew)}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="rounded bg-[#111827] border-white/20 text-purple-600 focus:ring-0"
                    />
                    <span>Sản phẩm MỚI ✨</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isFree)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFree: e.target.checked,
                          priceSale: e.target.checked ? 0 : formData.priceSale,
                        })
                      }
                      className="rounded bg-[#111827] border-white/20 text-purple-600 focus:ring-0"
                    />
                    <span>Sản phẩm Miễn Phí (Free Tool)</span>
                  </label>
                </div>
              </div>

              {/* Section 3: Media Setup (Bắt buộc tỷ lệ 9:16) */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    3. Media Setup (Bắt Buộc Ảnh Dọc Tỷ Lệ 9:16 - 450px × 800px)
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsImageResizeModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload & Tự Resize 9:16</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-3 flex justify-center">
                    <div className="w-24 aspect-[9/16] rounded-xl overflow-hidden bg-black border border-purple-500/40 shadow-lg">
                      <img
                        src={
                          formData.thumbnail ||
                          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80'
                        }
                        alt="Thumbnail 9:16"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-9 space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        URL Ảnh Thumbnail 9:16 (Dọc)
                      </label>
                      <input
                        type="url"
                        value={formData.thumbnail || ''}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        Link Video Demo (YouTube Embed / MP4)
                      </label>
                      <input
                        type="url"
                        value={formData.videoDemo || ''}
                        onChange={(e) => setFormData({ ...formData, videoDemo: e.target.value })}
                        placeholder="https://www.youtube.com/embed/..."
                        className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Dữ Liệu Bảo Mật VIP (SecretData) */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>4. Dữ Liệu Bảo Mật VIP (Chỉ mở sau khi đơn hàng được duyệt)</span>
                </h4>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Link Gốc Copy Tool (Target URL)
                  </label>
                  <input
                    type="url"
                    value={formData.secretData?.targetLink || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secretData: {
                          targetLink: e.target.value,
                          prompt: formData.secretData?.prompt || '',
                          instructions: formData.secretData?.instructions || '',
                        },
                      })
                    }
                    placeholder="https://notion.so/... hoặc https://flowise.ai/..."
                    className="w-full bg-[#111827] text-xs text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Khung Nhập Bộ Prompt Mẫu VIP (Prompt Template)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.secretData?.prompt || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secretData: {
                          targetLink: formData.secretData?.targetLink || '',
                          prompt: e.target.value,
                          instructions: formData.secretData?.instructions || '',
                        },
                      })
                    }
                    placeholder="/imagine prompt: ..."
                    className="w-full bg-[#111827] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Hướng Dẫn Sử Dụng VIP
                  </label>
                  <textarea
                    rows={3}
                    value={formData.secretData?.instructions || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secretData: {
                          targetLink: formData.secretData?.targetLink || '',
                          prompt: formData.secretData?.prompt || '',
                          instructions: e.target.value,
                        },
                      })
                    }
                    placeholder="Các bước thực hiện..."
                    className="w-full bg-[#111827] text-xs text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Section 5: Dynamic Changelog Manager */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>5. Quản Lý Nhật Ký Phiên Bản (Changelog)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddChangelogRow}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10"
                  >
                    + Thêm Dòng Phiên Bản
                  </button>
                </div>

                <div className="space-y-2.5">
                  {dynamicChangelog.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={item.version}
                        onChange={(e) => handleChangelogChange(idx, 'version', e.target.value)}
                        placeholder="v1.2"
                        className="w-24 bg-[#111827] text-xs text-white px-2.5 py-2 rounded-xl border border-white/10 font-mono"
                      />
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => handleChangelogChange(idx, 'content', e.target.value)}
                        placeholder="Nội dung cập nhật..."
                        className="flex-1 bg-[#111827] text-xs text-white px-3 py-2 rounded-xl border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChangelogRow(idx)}
                        className="p-2 text-gray-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6: Dynamic FAQ Manager */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>6. Quản Lý Câu Hỏi Thường Gặp (FAQ)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddFaqRow}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10"
                  >
                    + Thêm Dòng FAQ
                  </button>
                </div>

                <div className="space-y-3">
                  {dynamicFaq.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#111827] rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                          placeholder="Câu hỏi: ..."
                          className="flex-1 bg-[#0B0F19] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFaqRow(idx)}
                          className="p-1.5 text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={item.answer}
                        onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                        placeholder="Câu trả lời giải đáp..."
                        className="w-full bg-[#0B0F19] text-xs text-gray-300 p-2.5 rounded-lg border border-white/10"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0B0F19] py-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingTool ? 'Lưu Thay Đổi' : 'Thêm Tool Vào Chợ'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Image Upload & 9:16 Canvas Resizer Modal */}
      <ImageResizeUploadModal
        isOpen={isImageResizeModalOpen}
        onClose={() => setIsImageResizeModalOpen(false)}
        currentImage={formData.thumbnail}
        onImageReady={(resizedDataUrl) => {
          setFormData((prev) => ({ ...prev, thumbnail: resizedDataUrl }));
        }}
      />
    </div>
  );
};
