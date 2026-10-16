import { Category, Coupon, Order, SystemSettings, Tool, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-all',
    name: 'Tất Cả',
    slug: 'tat-ca',
    icon: 'Sparkles',
    color: '#8b5cf6',
    order: 0,
  },
  {
    id: 'cat-video',
    name: 'Video & Animation AI',
    slug: 'video-animation',
    icon: 'Video',
    color: '#ec4899',
    order: 1,
  },
  {
    id: 'cat-design',
    name: 'Thiết Kế & Ảnh AI',
    slug: 'thiet-ke-anh',
    icon: 'Palette',
    color: '#a855f7',
    order: 2,
  },
  {
    id: 'cat-coding',
    name: 'Lập Trình & Code AI',
    slug: 'lap-trinh-code',
    icon: 'Code2',
    color: '#3b82f6',
    order: 3,
  },
  {
    id: 'cat-marketing',
    name: 'Marketing & SEO AI',
    slug: 'marketing-seo',
    icon: 'TrendingUp',
    color: '#10b981',
    order: 4,
  },
  {
    id: 'cat-chatbots',
    name: 'Trợ Lý & Automation',
    slug: 'tro-ly-automation',
    icon: 'Bot',
    color: '#f59e0b',
    order: 5,
  },
  {
    id: 'cat-voice',
    name: 'Voice & Âm Thanh',
    slug: 'voice-am-thanh',
    icon: 'Mic',
    color: '#06b6d4',
    order: 6,
  },
];

export const INITIAL_SETTINGS: SystemSettings = {
  siteName: 'AI TOOL STORE',
  logoText: 'TOOLAI VIP',
  hotline: '0987.654.321',
  supportTelegram: 'https://t.me/AIToolStoreSupport',
  socialLinks: {
    facebook: 'https://facebook.com',
    telegram: 'https://t.me',
    youtube: 'https://youtube.com',
    discord: 'https://discord.com',
  },
  bankConfig: {
    bankName: 'TP Bank',
    bankId: 'TPB',
    accountNumber: '67891796789',
    accountHolder: 'HOÀNG NGỌC LIÊM',
  },
  seo: {
    metaTitle: 'AI Tools Marketplace - Kho Tool AI Bản Quyền & Prompt VIP',
    metaDescription: 'Nền tảng mua bán Tool AI, Prompt Masterclass và Workflow tự động hóa chất lượng cao, duyệt đơn tự động và kích hoạt tức thì.',
    googleAnalyticsId: 'G-AITOOLSTORE2026',
  },
};

export const INITIAL_USERS: User[] = [
  {
    uid: 'admin-hoangliem',
    email: 'liemhoang1107@gmail.com',
    displayName: 'Hoàng Ngọc Liêm (Admin)',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-10-15T10:00:00Z',
    bookmarks: ['tool-1', 'tool-3'],
  },
  {
    uid: 'user-demo-1',
    email: 'nguyenvana@gmail.com',
    displayName: 'Nguyễn Văn An',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    createdAt: '2026-02-10T09:30:00Z',
    updatedAt: '2026-10-14T11:20:00Z',
    bookmarks: ['tool-2'],
  },
];

export const INITIAL_TOOLS: Tool[] = [
  {
    id: 'tool-1',
    name: 'Midjourney v6.1 Ultra Master Prompter',
    slug: 'midjourney-v6-master-prompter',
    // 9:16 ratio portrait image (450x800)
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=600&q=80',
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    shortDescription: 'Bộ sinh prompt Midjourney v6.1 chuẩn nhiếp ảnh cinematic 8K, ánh sáng ray-tracing, camera góc rộng và nhân vật siêu thực.',
    longDescription: `### Tổng quan về Midjourney v6.1 Master Prompter
Công cụ tự động hóa viết Prompt Midjourney chuyên sâu dành cho Designers, Marketers và Content Creators. 
Hỗ trợ tạo ảnh với các style:
- **Cinematic Photography**: Giả lập ống kính Leica 50mm f/1.2, Hasselblad, Arri Alexa.
- **Anime & 3D Render**: Tương thích Octane Render, Unreal Engine 5 aesthetic.
- **Product Commercial**: Tối ưu ảnh chụp sản phẩm thương mại điện tử chuyên nghiệp.

### Tính năng độc quyền:
1. Bộ tham số tự động: \`--ar 16:9\`, \`--stylize 250\`, \`--v 6.1\`, \`--chaos\`.
2. Trích xuất style từ ảnh mẫu gốc và tạo biến thể vô tận.
3. Tích hợp sẵn 500+ phong cách ánh sáng volumetric và màu phim Kodak Portra.`,
    priceOriginal: 499000,
    priceSale: 199000,
    rating: 5,
    reviewCount: 142,
    purchaseCount: 389,
    copyCount: 1250,
    categoryId: 'cat-design',
    tags: ['Midjourney', 'Prompt VIP', 'Thiết kế', 'Cinematic', 'AI Art'],
    isHot: true,
    isNew: false,
    isFree: false,
    version: 'v2.4',
    lastUpdated: '2026-10-10T14:00:00Z',
    changelog: [
      {
        version: 'v2.4',
        date: '2026-10-10T14:00:00Z',
        content: 'Tối ưu lại 120 prompt nhiếp ảnh cho bản cập nhật Midjourney v6.1 mới nhất.',
      },
      {
        version: 'v2.0',
        date: '2026-08-15T09:00:00Z',
        content: 'Thêm module render sản phẩm thời trang và nội thất chuẩn studio.',
      },
    ],
    secretData: {
      targetLink: 'https://flowise.ai/canvas/share/mj-v6-master-prompt-pack-2026',
      prompt: `/imagine prompt: hyper-realistic portrait of an Asian cyberpunk hacker in neon-drenched rainy alleyway, cinematic lighting, 8k resolution, shot on Arri Alexa 65mm, anamorphic bokeh, detailed skin texture, vibrant purple and teal reflections --ar 16:9 --v 6.1 --style raw --stylize 350`,
      instructions: `1. Mở link công cụ tại nút 'Mở Tool' ở trên.
2. Sao chép bộ Prompt bằng nút 'Sao chép Prompt'.
3. Paste vào Discord của Midjourney hoặc giao diện Web Midjourney Alpha.
4. Tùy chỉnh tham số [Subject] và [Lighting] theo nhu cầu riêng.`,
    },
    faq: [
      {
        question: 'Tôi có cần tài khoản Midjourney trả phí không?',
        answer: 'Có, bạn cần có gói Midjourney (Basic, Standard hoặc Pro) để chạy prompt này trên Discord hoặc web Midjourney.',
      },
      {
        question: 'Tool có được cập nhật khi Midjourney ra v7 không?',
        answer: 'Chắc chắn rồi! Khi Midjourney ra phiên bản mới, toàn bộ khách hàng đã mua sẽ được update miễn phí trọn đời.',
      },
    ],
    seo: {
      title: 'Mua Prompt Midjourney v6.1 Master - Tự Động Hóa AI Art',
      description: 'Bộ prompt Midjourney đỉnh cao chất lượng 8k cinematic raytracing, mở khóa bí kíp làm chủ Midjourney v6.1.',
      keywords: 'midjourney prompt, prompt midjourney dep, tool ai art, midjourney v6',
    },
  },
  {
    id: 'tool-2',
    name: 'Sora & Runway Gen-3 AI Video Studio Generator',
    slug: 'sora-runway-gen3-video-studio',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=450&h=800&q=80',
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&h=600&q=80',
    videoDemo: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
    shortDescription: 'Workflow tự động hóa tạo kịch bản, prompt camera motion và render video TikTok / Shorts triệu views bằng Runway Gen-3 & Kling AI.',
    longDescription: `### Đột phá sáng tạo Video cùng AI 2026
Công cụ giúp bạn sản xuất hàng loạt video ngắn chuẩn viral:
- Tự động viết kịch bản 3 hồi kịch tính.
- Tạo prompt chuyển động máy quay (Pan, Tilt, Dolly Zoom, Orbit 360).
- Kết hợp lồng tiếng AI cảm xúc và phụ đề auto-sync.
- Đã kiểm chứng mang lại kênh TikTok 500K followers chỉ trong 30 ngày.`,
    priceOriginal: 799000,
    priceSale: 299000,
    rating: 5,
    reviewCount: 98,
    purchaseCount: 245,
    copyCount: 880,
    categoryId: 'cat-video',
    tags: ['Video AI', 'Runway Gen-3', 'Sora', 'TikTok', 'Shorts'],
    isHot: true,
    isNew: true,
    isFree: false,
    version: 'v3.1',
    lastUpdated: '2026-10-12T16:20:00Z',
    changelog: [
      {
        version: 'v3.1',
        date: '2026-10-12T16:20:00Z',
        content: 'Bổ sung prompt kiểm soát góc máy cho Kling AI 1.5 và Luma Dream Machine.',
      },
    ],
    secretData: {
      targetLink: 'https://notion.so/shared-video-gen3-workflow-vip-access',
      prompt: `Act as a world-class cinematographer. Generate a Runway Gen-3 camera control prompt: FPV drone shot flying through a neon futuristic metropolis, sweeping between skyscraper holographic billboards, camera drops suddenly into a crowded night street market, cinematic motion blur, 60fps photorealism.`,
      instructions: `1. Truy cập workspace Notion đã mở quyền qua nút 'Mở Tool'.
2. Chọn template kịch bản phù hợp với niche của bạn.
3. Áp dụng Prompt mẫu vào Runway Gen-3 Alpha hoặc Kling AI.`,
    },
    faq: [
      {
        question: 'Có hướng dẫn cho người mới bắt đầu không?',
        answer: 'Có đầy đủ video hướng dẫn thực hành step-by-step từng bước từ ý tưởng đến video thành phẩm.',
      },
    ],
    seo: {
      title: 'Tool Video AI Runway Gen-3 & Sora - Kịch Bản Triệu Views',
      description: 'Sở hữu bộ công cụ tạo video AI viral trên TikTok, Youtube Shorts và Reels.',
      keywords: 'video ai, runway gen-3, sora ai, tao video ngan ai',
    },
  },
  {
    id: 'tool-3',
    name: 'Claude 3.5 Sonnet Fullstack Architecture Agent',
    slug: 'claude-35-sonnet-fullstack-agent',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=450&h=800&q=80',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=600&q=80',
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    shortDescription: 'System Prompt biến Claude 3.5 thành Senior Tech Lead, tự động sinh code React, TypeScript, Clean Architecture và review bảo mật.',
    longDescription: `### Đưa Claude 3.5 Sonnet lên tầm cao mới
Bạn mệt mỏi vì AI sinh code lỗi, thiếu types, không theo chuẩn Clean Architecture?
Bộ System Prompt và Rules này được tinh chỉnh sau hơn 200 dự án thực tế:
- Bắt buộc kiểm tra TypeScript strict mode.
- Cấu trúc module tách biệt UI, State và API layer.
- Tự động viết test case Vitest và xử lý edge cases.`,
    priceOriginal: 350000,
    priceSale: 149000,
    rating: 5,
    reviewCount: 210,
    purchaseCount: 512,
    copyCount: 1640,
    categoryId: 'cat-coding',
    tags: ['Claude 3.5', 'Coding', 'React', 'TypeScript', 'Clean Code'],
    isHot: true,
    isNew: false,
    isFree: false,
    version: 'v4.0',
    lastUpdated: '2026-10-08T11:00:00Z',
    changelog: [
      {
        version: 'v4.0',
        date: '2026-10-08T11:00:00Z',
        content: 'Hỗ trợ tối ưu token cho dự án lớn với Claude Project và Artifacts.',
      },
    ],
    secretData: {
      targetLink: 'https://github.com/prompt-vault/claude-fullstack-system-prompt',
      prompt: `You are an elite Principal Software Architect. When given any software requirement:
1. Always analyze edge cases and write complete TypeScript type definitions first.
2. Structure all components following Atomic Design and Zero-Pill UI discipline.
3. Provide production-ready, drop-in replacement code without placeholder comments.`,
      instructions: `1. Copy bộ System Prompt vào phần Project Instructions trên Claude.ai.
2. Thiết lập Claude Artifacts để nhận preview code trực tiếp.`,
    },
    faq: [
      {
        question: 'Dùng cho Claude bản Free được không?',
        answer: 'Dùng tốt cho cả Claude Free và Claude Pro, nhưng khuyến nghị Claude Pro để tận dụng tối đa Artifacts.',
      },
    ],
    seo: {
      title: 'System Prompt Claude 3.5 Sonnet Cho Lập Trình Viên',
      description: 'Biến Claude thành Senior Dev với bộ Prompt đặc chế tối ưu code sạch và bảo mật.',
      keywords: 'claude prompt, system prompt lap trinh, code react ai',
    },
  },
  {
    id: 'tool-4',
    name: 'SEO & Auto-Blogging Multi-Agent Workflow n8n',
    slug: 'seo-autoblogging-workflow-n8n',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=450&h=800&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=600&q=80',
    videoDemo: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
    shortDescription: 'Workflow n8n tự động phân tích từ khóa, viết bài chuẩn SEO E-E-A-T 2500 từ và đăng trực tiếp lên WordPress / Webflow.',
    longDescription: `### Hệ thống Content SEO Tự Động Hóa 100%
- Tích hợp Perplexity API để tìm kiếm dữ liệu thời gian thực.
- Sử dụng Gemini 1.5 Pro phân tích đối thủ top 1 Google.
- Viết bài đầy đủ tiêu đề H2, H3, FAQ Schema và ảnh minh họa tạo tự động.
- Xuất bản tự động theo lịch đặt trước.`,
    priceOriginal: 890000,
    priceSale: 399000,
    rating: 5,
    reviewCount: 75,
    purchaseCount: 167,
    copyCount: 420,
    categoryId: 'cat-marketing',
    tags: ['SEO', 'n8n', 'Automation', 'Content AI', 'WordPress'],
    isHot: false,
    isNew: true,
    isFree: false,
    version: 'v1.8',
    lastUpdated: '2026-10-14T08:00:00Z',
    changelog: [
      {
        version: 'v1.8',
        date: '2026-10-14T08:00:00Z',
        content: 'Tích hợp kết nối Webflow CMS API và Google Indexing API.',
      },
    ],
    secretData: {
      targetLink: 'https://drive.google.com/drive/folders/n8n-seo-workflow-package',
      prompt: `Analyze the top 10 search results for query: [KEYWORD]. Extract common entity gaps, semantic LSI keywords, and create an outline complying with Google EEAT guidelines.`,
      instructions: `1. Tải file JSON workflow n8n từ link đính kèm.
2. Import vào n8n instance của bạn (Cloud hoặc Self-hosted).
3. Điền API Key của OpenAI/Gemini và URL WordPress.`,
    },
    faq: [
      {
        question: 'Bài viết có bị Google phạt không?',
        answer: 'Workflow được thiết kế theo chuẩn E-E-A-T với nguồn trích dẫn thật, không trùng lặp và giàu giá trị thông tin.',
      },
    ],
    seo: {
      title: 'Workflow n8n Tự Động Viết Bài SEO Chuẩn Top Google',
      description: 'Hệ thống tự động hóa viết bài SEO và đăng web tự động bằng n8n và AI.',
      keywords: 'n8n seo, viet bai seo bang ai, autoblog ai',
    },
  },
  {
    id: 'tool-5',
    name: 'ElevenLabs Voice Cloning & Podcast Producer Pack',
    slug: 'elevenlabs-voice-cloning-pack',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=450&h=800&q=80',
    banner: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&h=600&q=80',
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    shortDescription: 'Bộ preset giọng đọc tiếng Việt truyền cảm, khử nhiễu studio và workflow tạo Podcast song ngữ tự động.',
    longDescription: `### Đỉnh cao giọng đọc AI Tiếng Việt
Giải quyết triệt để vấn đề giọng AI bị đơ, thiếu cảm xúc:
- 15 profile giọng nam trầm ấm, nữ dịu dàng chuyên kể chuyện, đọc sách, quảng cáo.
- File mẫu làm sạch tạp âm chuẩn phòng thu 48kHz.
- Kỹ thuật chèn nhịp thở, ngữ điệu ngắt nghỉ tự nhiên như người thật.`,
    priceOriginal: 390000,
    priceSale: 0,
    rating: 5,
    reviewCount: 310,
    purchaseCount: 890,
    copyCount: 2400,
    categoryId: 'cat-voice',
    tags: ['ElevenLabs', 'Voice AI', 'Podcast', 'Giọng Đọc', 'Miễn Phí'],
    isHot: false,
    isNew: false,
    isFree: true,
    version: 'v2.1',
    lastUpdated: '2026-09-28T10:00:00Z',
    changelog: [
      {
        version: 'v2.1',
        date: '2026-09-28T10:00:00Z',
        content: 'Bổ sung thêm 5 preset giọng đọc tin tức thời sự tiếng Việt chuẩn.',
      },
    ],
    secretData: {
      targetLink: 'https://elevenlabs.io/voice-library?filter=vietnamese-pro',
      prompt: `<break time="0.5s"/> Xin chào quý thính giả, <prosody rate="95%" pitch="-2st">hôm nay chúng ta sẽ cùng khám phá thế giới trí tuệ nhân tạo.</prosody>`,
      instructions: `1. Sản phẩm hoàn toàn MIỄN PHÍ!
2. Sao chép các thẻ điều khiển ngữ điệu SSML bên trên và paste vào ElevenLabs Speech Synthesis.`,
    },
    faq: [
      {
        question: 'Tool này có thực sự miễn phí không?',
        answer: 'Đúng vậy, đây là quà tặng trải nghiệm dành tặng cộng đồng AI Creator!',
      },
    ],
    seo: {
      title: 'Tải Miễn Phí Bộ Preset Giọng Đọc ElevenLabs Tiếng Việt',
      description: 'Thư viện giọng đọc AI tiếng Việt chuẩn cảm xúc, đọc truyện và podcast cực hay.',
      keywords: 'elevenlabs tieng viet, giong doc ai, voice clone',
    },
  },
  {
    id: 'tool-6',
    name: 'Canva AI Bulk Creator & Social Media Kit',
    slug: 'canva-ai-bulk-social-kit',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=600&q=80',
    videoDemo: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
    shortDescription: 'Tự động tạo 300+ ảnh quote, carousel Facebook và Instagram trong 5 phút kết hợp ChatGPT & Canva Bulk Create.',
    longDescription: `### Tiết kiệm 40 giờ thiết kế mỗi tháng
Giải pháp nhân bản nội dung mạng xã hội cực nhanh:
- File mẫu bảng tính CSV tạo sẵn công thức phân loại quote, tips, khuyến mãi.
- 50 template Canva Pro phong cách Dark Minimalist và Neon Cyberpunk.
- Hướng dẫn kết nối dữ liệu 1 chạm sinh hàng trăm post sẵn sàng đăng tải.`,
    priceOriginal: 299000,
    priceSale: 99000,
    rating: 5,
    reviewCount: 88,
    purchaseCount: 320,
    copyCount: 710,
    categoryId: 'cat-design',
    tags: ['Canva', 'Bulk Create', 'Social Media', 'Design', 'Instagram'],
    isHot: false,
    isNew: true,
    isFree: false,
    version: 'v1.5',
    lastUpdated: '2026-10-05T15:00:00Z',
    changelog: [
      {
        version: 'v1.5',
        date: '2026-10-05T15:00:00Z',
        content: 'Cập nhật thêm 20 mẫu Carousel Instagram tỉ lệ 4:5 thời thượng.',
      },
    ],
    secretData: {
      targetLink: 'https://canva.com/brand/join?token=bulk-social-kit-2026',
      prompt: `Generate 30 inspirational AI quotes in Vietnamese categorized into [Category, Quote, Author, Hashtags] formatted as CSV markdown table.`,
      instructions: `1. Bấm 'Mở Tool' để nhận quyền sở hữu bộ template Canva.
2. Dùng prompt mẫu yêu cầu AI tạo bảng dữ liệu CSV.
3. Trong Canva mở ứng dụng Bulk Create và upload file CSV để render hàng loạt.`,
    },
    faq: [
      {
        question: 'Dùng Canva tài khoản miễn phí có làm được không?',
        answer: 'Tính năng Bulk Create yêu cầu gói Canva Pro hoặc Canva Education/Team.',
      },
    ],
    seo: {
      title: 'Bộ Canva AI Bulk Create - Tự Động Hóa 300 Bài Đăng',
      description: 'Template Canva kết hợp ChatGPT giúp bạn sản xuất nội dung visual social media thần tốc.',
      keywords: 'canva bulk create, canva ai, tao anh hang loat',
    },
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'AI2026',
    type: 'percentage',
    value: 20, // 20%
    maxUses: 500,
    usedCount: 86,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
  },
  {
    code: 'VIP50K',
    type: 'fixed',
    value: 50000, // 50,000 VND
    maxUses: 100,
    usedCount: 24,
    expiresAt: '2026-11-30T23:59:59Z',
    isActive: true,
  },
  {
    code: 'CHAO2026',
    type: 'percentage',
    value: 10,
    maxUses: 1000,
    usedCount: 153,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'KH8921',
    userId: 'admin-hoangliem',
    userEmail: 'liemhoang1107@gmail.com',
    items: [
      {
        toolId: 'tool-1',
        name: 'Midjourney v6.1 Ultra Master Prompter',
        price: 199000,
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=450&h=800&q=80',
      },
    ],
    totalAmount: 199000,
    couponUsed: undefined,
    status: 'paid',
    paymentMethod: 'transfer',
    transferContent: 'NAP TOOLAI KH8921',
    createdAt: '2026-10-14T14:30:00Z',
    approvedAt: '2026-10-14T14:35:00Z',
    approvedBy: 'admin-hoangliem',
  },
  {
    id: 'KH7612',
    userId: 'user-demo-1',
    userEmail: 'nguyenvana@gmail.com',
    items: [
      {
        toolId: 'tool-2',
        name: 'Sora & Runway Gen-3 AI Video Studio Generator',
        price: 299000,
        thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=450&h=800&q=80',
      },
    ],
    totalAmount: 249000,
    couponUsed: 'VIP50K',
    status: 'pending',
    paymentMethod: 'transfer',
    transferContent: 'NAP TOOLAI KH7612',
    createdAt: '2026-10-15T20:15:00Z',
    approvedAt: null,
    approvedBy: null,
  },
];
