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
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '90日間のメッセージ履歴、1対1通話' },
      { name: 'Pro', pricePerUser: 1100, description: '無制限メッセージ履歴、グループ通話' },
      { name: 'Business+', pricePerUser: 1900, description: 'SAML SSO、99.99%稼働保証' },
      { name: 'Enterprise Grid', pricePerUser: 2600, description: 'エンタープライズ機能、無制限ワークスペース' }
    ],
    icon: '💬',
    defaultPlanIndex: 1
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    category: 'communication',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '60分グループ通話、100人まで' },
      { name: 'Microsoft 365 Business Basic', pricePerUser: 900, description: '300人会議、録画機能' },
      { name: 'Microsoft 365 Business Standard', pricePerUser: 1900, description: 'Office アプリ、高度な機能' },
      { name: 'Microsoft 365 Business Premium', pricePerUser: 3200, description: '高度なセキュリティ、デバイス管理' }
    ],
    icon: '🎯',
    defaultPlanIndex: 1
  },

  // Video Conferencing
  {
    id: 'zoom',
    name: 'Zoom',
    category: 'video_conferencing',
    pricingPlans: [
      { name: 'Basic', pricePerUser: 0, description: '40分制限、100人まで' },
      { name: 'Pro', pricePerUser: 2200, description: '30時間会議、クラウド録画10GB' },
      { name: 'Business', pricePerUser: 2800, description: '300人会議、管理機能' },
      { name: 'Enterprise', pricePerUser: 2800, description: '500人会議、無制限クラウドストレージ' }
    ],
    icon: '📹',
    defaultPlanIndex: 1
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    category: 'video_conferencing',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '60分制限、100人まで' },
      { name: 'Google Workspace Starter', pricePerUser: 900, description: '100人会議、30GBストレージ' },
      { name: 'Google Workspace Standard', pricePerUser: 1800, description: '150人会議、録画機能、2TB' },
      { name: 'Google Workspace Plus', pricePerUser: 2700, description: '500人会議、5TBストレージ' }
    ],
    icon: '🎥',
    defaultPlanIndex: 1
  },

  // Productivity
  {
    id: 'office365',
    name: 'Microsoft 365',
    category: 'productivity',
    pricingPlans: [
      { name: 'Microsoft 365 Business Basic', pricePerUser: 900, description: 'Web版Office、1TBストレージ' },
      { name: 'Microsoft 365 Business Standard', pricePerUser: 1900, description: 'デスクトップOffice、Teams' },
      { name: 'Microsoft 365 Business Premium', pricePerUser: 3200, description: '高度なセキュリティ、デバイス管理' },
      { name: 'Microsoft 365 E3', pricePerUser: 4500, description: 'エンタープライズ機能、コンプライアンス' }
    ],
    icon: '📊',
    defaultPlanIndex: 1
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'productivity',
    pricingPlans: [
      { name: 'Business Starter', pricePerUser: 900, description: '30GBストレージ、Gmail、Meet' },
      { name: 'Business Standard', pricePerUser: 1800, description: '2TBストレージ、録画機能' },
      { name: 'Business Plus', pricePerUser: 2700, description: '5TBストレージ、高度なセキュリティ' },
      { name: 'Enterprise Plus', pricePerUser: 4200, description: '無制限ストレージ、DLP、監査' }
    ],
    icon: '🌐',
    defaultPlanIndex: 1
  },

  // Storage
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'storage',
    pricingPlans: [
      { name: 'Basic', pricePerUser: 0, description: '2GBストレージ' },
      { name: 'Plus', pricePerUser: 1500, description: '2TBストレージ、高度な共有' },
      { name: 'Family', pricePerUser: 2400, description: '2TB、6ユーザーまで' },
      { name: 'Professional', pricePerUser: 2900, description: '3TB、高度な機能' }
    ],
    icon: '📦',
    defaultPlanIndex: 1
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    category: 'storage',
    pricingPlans: [
      { name: 'Basic', pricePerUser: 0, description: '5GBストレージ' },
      { name: 'Microsoft 365 Personal', pricePerUser: 1300, description: '1TBストレージ、Office' },
      { name: 'Microsoft 365 Family', pricePerUser: 1800, description: '6TB（6ユーザー）、Office' },
      { name: 'OneDrive Standalone 100GB', pricePerUser: 300, description: '100GBストレージのみ' }
    ],
    icon: '☁️',
    defaultPlanIndex: 1
  },

  // Project Management
  {
    id: 'asana',
    name: 'Asana',
    category: 'project_management',
    pricingPlans: [
      { name: 'Basic', pricePerUser: 0, description: '15人まで、基本機能' },
      { name: 'Starter', pricePerUser: 1600, description: 'タイムライン、カスタムフィールド' },
      { name: 'Advanced', pricePerUser: 3200, description: 'ポートフォリオ、高度なレポート' },
      { name: 'Enterprise', pricePerUser: 3600, description: 'SAML、高度なセキュリティ' }
    ],
    icon: '📋',
    defaultPlanIndex: 1
  },
  {
    id: 'trello',
    name: 'Trello',
    category: 'project_management',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '10チームボード、基本機能' },
      { name: 'Standard', pricePerUser: 750, description: '無制限ボード、カレンダー' },
      { name: 'Premium', pricePerUser: 1500, description: 'タイムライン、高度な機能' },
      { name: 'Enterprise', pricePerUser: 2500, description: 'セキュリティ、管理機能' }
    ],
    icon: '📌',
    defaultPlanIndex: 1
  },

  // Knowledge Management
  {
    id: 'notion',
    name: 'Notion',
    category: 'knowledge_management',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '個人利用、基本機能' },
      { name: 'Plus', pricePerUser: 1200, description: '無制限ブロック、ゲスト' },
      { name: 'Business', pricePerUser: 2200, description: 'SAML SSO、高度な権限' },
      { name: 'Enterprise', pricePerUser: 2800, description: '監査ログ、高度なセキュリティ' }
    ],
    icon: '📝',
    defaultPlanIndex: 1
  },
  {
    id: 'confluence',
    name: 'Confluence',
    category: 'knowledge_management',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '10ユーザーまで、2GBストレージ' },
      { name: 'Standard', pricePerUser: 800, description: '無制限ストレージ、アプリ' },
      { name: 'Premium', pricePerUser: 1500, description: '高度な権限、分析' },
      { name: 'Enterprise', pricePerUser: 2800, description: '無制限サイト、エンタープライズ機能' }
    ],
    icon: '📚',
    defaultPlanIndex: 1
  },

  // CRM
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    pricingPlans: [
      { name: 'Essentials', pricePerUser: 3600, description: '基本CRM、10ユーザーまで' },
      { name: 'Professional', pricePerUser: 11000, description: '完全CRM、レポート' },
      { name: 'Enterprise', pricePerUser: 22000, description: 'カスタマイズ、API' },
      { name: 'Unlimited', pricePerUser: 44000, description: '無制限カスタマイズ、サポート' }
    ],
    icon: '🤝',
    defaultPlanIndex: 1
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    pricingPlans: [
      { name: 'Free', pricePerUser: 0, description: '基本CRM、1,000,000コンタクト' },
      { name: 'Starter', pricePerUser: 2700, description: 'メール、シンプル自動化' },
      { name: 'Professional', pricePerUser: 11000, description: '高度な自動化、レポート' },
      { name: 'Enterprise', pricePerUser: 17500, description: 'カスタムオブジェクト、高度な機能' }
    ],
    icon: '🎯',
    defaultPlanIndex: 1
  },

  // Scheduling
  {
    id: 'calendly',
    name: 'Calendly',
    category: 'scheduling',
    pricingPlans: [
      { name: 'Basic', pricePerUser: 0, description: '1イベントタイプ、基本機能' },
      { name: 'Essentials', pricePerUser: 1200, description: '無制限イベント、通知' },
      { name: 'Professional', pricePerUser: 1800, description: 'Zoom統合、リマインダー' },
      { name: 'Teams', pricePerUser: 2400, description: 'チーム機能、高度な統合' }
    ],
    icon: '📅',
    defaultPlanIndex: 1
  }
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