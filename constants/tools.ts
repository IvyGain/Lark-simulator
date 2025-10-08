export interface PricingPlan {
  name: string;
  pricePerUser: number; // Monthly price per user in JPY
  description?: string;
  features?: string[];
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  pricingPlans: PricingPlan[]; // Support multiple pricing plans
  icon: string; // Icon name from FontAwesome
  defaultPlanIndex?: number; // Index of the default plan to use
}

// Category translations
export const categoryTranslations: Record<string, string> = {
  "Communication": "コミュニケーション",
  "Video Conferencing": "ビデオ会議",
  "Productivity": "生産性ツール",
  "Storage": "ストレージ",
  "Project Management": "プロジェクト管理",
  "Knowledge Management": "ナレッジ管理",
  "CRM": "顧客管理",
  "Scheduling": "日程調整"
};

export const tools: Tool[] = [
  // Communication
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "90日間のメッセージ履歴、1対1通話" },
      { name: "Pro", pricePerUser: 1310, description: "無制限メッセージ履歴、グループ通話" }, // $8.75 * 150 JPY
      { name: "Business+", pricePerUser: 2700, description: "SAML SSO、99.99%稼働保証" }, // $18 * 150 JPY
    ],
    icon: "slack",
    defaultPlanIndex: 1,
  },
  {
    id: "microsoft_teams",
    name: "Microsoft Teams",
    category: "Communication",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "60分制限、100人まで" },
      { name: "Microsoft 365 Business Basic", pricePerUser: 1260, description: "Teams + メール + 1TB" }, // $8.40 * 150 JPY
      { name: "Microsoft 365 Business Standard", pricePerUser: 2520, description: "Teams + Office アプリ + 1TB" }, // $16.80 * 150 JPY
      { name: "Teams Enterprise", pricePerUser: 788, description: "Teams単体ライセンス" }, // $5.25 * 150 JPY
    ],
    icon: "windows",
    defaultPlanIndex: 1,
  },
  {
    id: "chatwork",
    name: "Chatwork",
    category: "Communication",
    pricingPlans: [
      { name: "フリー", pricePerUser: 0, description: "累計14グループチャット" },
      { name: "ビジネス", pricePerUser: 600, description: "無制限グループチャット、ユーザー管理" },
      { name: "エンタープライズ", pricePerUser: 960, description: "外部SNS制限、IP制限" },
    ],
    icon: "comments",
    defaultPlanIndex: 1,
  },
  {
    id: "line_works",
    name: "LINE WORKS",
    category: "Communication",
    pricingPlans: [
      { name: "フリー", pricePerUser: 0, description: "100人まで、1GB" },
      { name: "ライト", pricePerUser: 360, description: "無制限ユーザー、100GB" },
      { name: "ベーシック", pricePerUser: 540, description: "ライト + 管理機能、1TB" },
      { name: "プレミアム", pricePerUser: 960, description: "ベーシック + 高度セキュリティ" },
    ],
    icon: "comment",
    defaultPlanIndex: 2,
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "基本機能" },
      { name: "Nitro", pricePerUser: 1500, description: "高品質画面共有、大容量ファイル" },
    ],
    icon: "headphones",
    defaultPlanIndex: 0,
  },
  
  // Video Conferencing
  {
    id: "zoom",
    name: "Zoom",
    category: "Video Conferencing",
    pricingPlans: [
      { name: "Basic", pricePerUser: 0, description: "40分制限、100人まで" },
      { name: "Pro", pricePerUser: 2000, description: "30時間、100人、クラウド録画" }, // $13.33 * 150 JPY
      { name: "Business", pricePerUser: 2750, description: "300人、管理機能" }, // $18.32 * 150 JPY
    ],
    icon: "video-camera",
    defaultPlanIndex: 1,
  },
  {
    id: "google_meet",
    name: "Google Meet",
    category: "Video Conferencing",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "60分制限、100人まで" },
      { name: "Business Starter", pricePerUser: 1200, description: "Meet + Gmail + 30GB" }, // $8 * 150 JPY
      { name: "Business Standard", pricePerUser: 2400, description: "Meet + Office + 2TB" }, // $16 * 150 JPY
    ],
    icon: "video-camera",
    defaultPlanIndex: 1,
  },
  
  // Productivity
  {
    id: "google_workspace",
    name: "Google Workspace",
    category: "Productivity",
    pricingPlans: [
      { name: "Business Starter", pricePerUser: 1200, description: "Gmail + Meet + 30GB" }, // ¥800 from research
      { name: "Business Standard", pricePerUser: 2400, description: "Office アプリ + 2TB" }, // ¥1,600 from research
      { name: "Business Plus", pricePerUser: 3750, description: "高度セキュリティ + 5TB" }, // ¥2,500 from research
    ],
    icon: "google",
    defaultPlanIndex: 1,
  },
  {
    id: "office365",
    name: "Microsoft 365",
    category: "Productivity",
    pricingPlans: [
      { name: "Business Basic", pricePerUser: 1260, description: "Web版Office + 1TB" },
      { name: "Business Standard", pricePerUser: 2520, description: "デスクトップOffice + Teams" },
      { name: "Business Premium", pricePerUser: 3360, description: "高度セキュリティ + デバイス管理" },
    ],
    icon: "file-word-o",
    defaultPlanIndex: 1,
  },
  {
    id: "zoho_workplace",
    name: "Zoho Workplace",
    category: "Productivity",
    pricingPlans: [
      { name: "Standard", pricePerUser: 450, description: "メール + Office + 30GB" },
      { name: "Professional", pricePerUser: 750, description: "Standard + 100GB + 高度機能" },
      { name: "Enterprise", pricePerUser: 1200, description: "Professional + 1TB + 管理機能" },
    ],
    icon: "briefcase",
    defaultPlanIndex: 1,
  },
  {
    id: "libreoffice",
    name: "LibreOffice",
    category: "Productivity",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "オープンソースOfficeスイート" },
    ],
    icon: "file-text-o",
    defaultPlanIndex: 0,
  },
  {
    id: "wps_office",
    name: "WPS Office",
    category: "Productivity",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "基本機能、広告あり" },
      { name: "Premium", pricePerUser: 450, description: "広告なし、PDF編集、1GB" },
    ],
    icon: "file-o",
    defaultPlanIndex: 1,
  },
  
  // Storage
  {
    id: "dropbox",
    name: "Dropbox",
    category: "Storage",
    pricingPlans: [
      { name: "Basic", pricePerUser: 0, description: "2GB" },
      { name: "Plus", pricePerUser: 1500, description: "2TB + 高度共有" },
      { name: "Professional", pricePerUser: 3000, description: "3TB + 高度機能" },
      { name: "Business Standard", pricePerUser: 1800, description: "5TB + チーム機能" },
    ],
    icon: "dropbox",
    defaultPlanIndex: 3,
  },
  {
    id: "onedrive",
    name: "OneDrive",
    category: "Storage",
    pricingPlans: [
      { name: "Basic", pricePerUser: 0, description: "5GB" },
      { name: "Microsoft 365 Personal", pricePerUser: 1050, description: "1TB + Office" },
      { name: "Microsoft 365 Business Basic", pricePerUser: 1260, description: "1TB + Teams" },
    ],
    icon: "cloud",
    defaultPlanIndex: 2,
  },
  {
    id: "box",
    name: "Box",
    category: "Storage",
    pricingPlans: [
      { name: "Individual", pricePerUser: 0, description: "10GB" },
      { name: "Personal Pro", pricePerUser: 1500, description: "100GB" },
      { name: "Business Starter", pricePerUser: 750, description: "100GB + コラボ機能" },
      { name: "Business", pricePerUser: 2250, description: "無制限 + 高度機能" },
    ],
    icon: "archive",
    defaultPlanIndex: 3,
  },
  {
    id: "google_drive",
    name: "Google Drive",
    category: "Storage",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "15GB" },
      { name: "Google One 100GB", pricePerUser: 250, description: "100GB" },
      { name: "Google One 2TB", pricePerUser: 1300, description: "2TB + 家族共有" },
      { name: "Workspace Business", pricePerUser: 1200, description: "30GB + ビジネス機能" },
    ],
    icon: "hdd-o",
    defaultPlanIndex: 3,
  },
  
  // Project Management
  {
    id: "asana",
    name: "Asana",
    category: "Project Management",
    pricingPlans: [
      { name: "Basic", pricePerUser: 0, description: "15人まで、基本機能" },
      { name: "Premium", pricePerUser: 1650, description: "タイムライン、カスタムフィールド" },
      { name: "Business", pricePerUser: 3750, description: "ポートフォリオ、高度検索" },
    ],
    icon: "tasks",
    defaultPlanIndex: 1,
  },
  {
    id: "trello",
    name: "Trello",
    category: "Project Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "10チームボード" },
      { name: "Standard", pricePerUser: 750, description: "無制限ボード、カレンダー" },
      { name: "Premium", pricePerUser: 1500, description: "タイムライン、ダッシュボード" },
      { name: "Enterprise", pricePerUser: 2550, description: "高度セキュリティ、管理機能" },
    ],
    icon: "trello",
    defaultPlanIndex: 1,
  },
  {
    id: "jira",
    name: "Jira",
    category: "Project Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "10ユーザーまで" },
      { name: "Standard", pricePerUser: 1050, description: "ロードマップ、レポート" },
      { name: "Premium", pricePerUser: 3000, description: "高度計画、無制限ストレージ" },
    ],
    icon: "bug",
    defaultPlanIndex: 1,
  },
  
  // Knowledge Management
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "個人利用、1000ブロック" },
      { name: "Plus", pricePerUser: 1200, description: "無制限ブロック、ゲスト" },
      { name: "Business", pricePerUser: 2250, description: "高度権限、SAML SSO" },
    ],
    icon: "file-text-o",
    defaultPlanIndex: 1,
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "10ユーザーまで" },
      { name: "Standard", pricePerUser: 900, description: "無制限ユーザー、2GB" },
      { name: "Premium", pricePerUser: 2700, description: "無制限ストレージ、高度機能" },
    ],
    icon: "book",
    defaultPlanIndex: 1,
  },
  {
    id: "evernote",
    name: "Evernote",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "60MB/月、2デバイス" },
      { name: "Personal", pricePerUser: 1050, description: "10GB/月、無制限デバイス" },
      { name: "Professional", pricePerUser: 1650, description: "20GB/月、高度機能" },
    ],
    icon: "sticky-note",
    defaultPlanIndex: 1,
  },
  {
    id: "onenote",
    name: "OneNote",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "5GB OneDrive" },
      { name: "Microsoft 365", pricePerUser: 1260, description: "1TB + Office アプリ" },
    ],
    icon: "file-text",
    defaultPlanIndex: 0,
  },
  {
    id: "obsidian",
    name: "Obsidian",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Personal", pricePerUser: 0, description: "個人利用無料" },
      { name: "Commercial", pricePerUser: 7500, description: "商用利用ライセンス" },
      { name: "Catalyst", pricePerUser: 3750, description: "早期アクセス + サポート" },
    ],
    icon: "diamond",
    defaultPlanIndex: 0,
  },
  {
    id: "planner",
    name: "Microsoft Planner",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Microsoft 365 Basic", pricePerUser: 1260, description: "Planner + Teams + メール" },
      { name: "Microsoft 365 Standard", pricePerUser: 2520, description: "Planner + Office アプリ" },
    ],
    icon: "calendar-check-o",
    defaultPlanIndex: 0,
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "1200レコード/ベース" },
      { name: "Plus", pricePerUser: 1500, description: "5000レコード、カレンダー" },
      { name: "Pro", pricePerUser: 3000, description: "50000レコード、高度機能" },
    ],
    icon: "table",
    defaultPlanIndex: 1,
  },
  {
    id: "kintone",
    name: "kintone",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "ライト", pricePerUser: 1170, description: "5アプリ、1GB" },
      { name: "スタンダード", pricePerUser: 2340, description: "1000アプリ、5GB" },
    ],
    icon: "database",
    defaultPlanIndex: 1,
  },
  {
    id: "tldv",
    name: "tl;dv",
    category: "Knowledge Management",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "20録画/月" },
      { name: "Pro", pricePerUser: 1200, description: "無制限録画、AI要約" },
      { name: "Business", pricePerUser: 2400, description: "チーム機能、CRM連携" },
    ],
    icon: "video-camera",
    defaultPlanIndex: 1,
  },
  
  // CRM
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "基本CRM、1000連絡先" },
      { name: "Starter", pricePerUser: 2700, description: "メール、フォーム、レポート" },
      { name: "Professional", pricePerUser: 12000, description: "自動化、高度レポート" },
    ],
    icon: "line-chart",
    defaultPlanIndex: 1,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    pricingPlans: [
      { name: "Essentials", pricePerUser: 3750, description: "小規模チーム向け" },
      { name: "Professional", pricePerUser: 11250, description: "完全CRM機能" },
      { name: "Enterprise", pricePerUser: 22500, description: "高度カスタマイズ" },
    ],
    icon: "cloud",
    defaultPlanIndex: 1,
  },
  {
    id: "zoho_crm",
    name: "Zoho CRM",
    category: "CRM",
    pricingPlans: [
      { name: "Standard", pricePerUser: 1800, description: "基本CRM機能" },
      { name: "Professional", pricePerUser: 2850, description: "自動化、レポート" },
      { name: "Enterprise", pricePerUser: 6000, description: "高度機能、カスタマイズ" },
    ],
    icon: "users",
    defaultPlanIndex: 1,
  },
  
  // Scheduling
  {
    id: "timelex",
    name: "Timelex",
    category: "Scheduling",
    pricingPlans: [
      { name: "ベーシック", pricePerUser: 600, description: "基本スケジュール調整" },
      { name: "プロ", pricePerUser: 1200, description: "高度機能、カスタマイズ" },
    ],
    icon: "calendar",
    defaultPlanIndex: 0,
  },
  {
    id: "chouseisan",
    name: "調整さん",
    category: "Scheduling",
    pricingPlans: [
      { name: "無料", pricePerUser: 0, description: "基本的な日程調整" },
    ],
    icon: "calendar-check-o",
    defaultPlanIndex: 0,
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "Scheduling",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "1イベントタイプ" },
      { name: "Essentials", pricePerUser: 1200, description: "無制限イベント" },
      { name: "Professional", pricePerUser: 1800, description: "チーム機能、分析" },
    ],
    icon: "calendar-plus-o",
    defaultPlanIndex: 1,
  },
  {
    id: "spacemarket",
    name: "スペースマーケット",
    category: "Scheduling",
    pricingPlans: [
      { name: "利用料", pricePerUser: 0, description: "予約時手数料のみ" },
    ],
    icon: "building",
    defaultPlanIndex: 0,
  },
  {
    id: "googlecalendar",
    name: "Google Calendar",
    category: "Scheduling",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "個人利用" },
      { name: "Google Workspace", pricePerUser: 1200, description: "ビジネス機能" },
    ],
    icon: "calendar",
    defaultPlanIndex: 0,
  },
  {
    id: "outlook_calendar",
    name: "Outlook Calendar",
    category: "Scheduling",
    pricingPlans: [
      { name: "Free", pricePerUser: 0, description: "個人利用" },
      { name: "Microsoft 365", pricePerUser: 1260, description: "ビジネス機能" },
    ],
    icon: "calendar-o",
    defaultPlanIndex: 0,
  },
];

// Group tools by category
export const toolsByCategory = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, Tool[]>);

// Lark pricing
export const LARK_PRICE_PER_USER = 1420; // 1420 JPY/month