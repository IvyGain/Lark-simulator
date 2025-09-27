export interface Tool {
  id: string;
  name: string;
  category: string;
  pricePerUser: number; // Monthly price per user in JPY
  icon: string; // Icon name from FontAwesome
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
    pricePerUser: 800,
    icon: "slack",
  },
  {
    id: "microsoft_teams",
    name: "Microsoft Teams",
    category: "Communication",
    pricePerUser: 500,
    icon: "windows",
  },
  {
    id: "chatwork",
    name: "Chatwork",
    category: "Communication",
    pricePerUser: 400,
    icon: "comments",
  },
  {
    id: "line_works",
    name: "LINE WORKS",
    category: "Communication",
    pricePerUser: 500,
    icon: "comment",
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    pricePerUser: 1000,
    icon: "headphones",
  },
  
  // Video Conferencing
  {
    id: "zoom",
    name: "Zoom",
    category: "Video Conferencing",
    pricePerUser: 2000,
    icon: "video-camera",
  },
  {
    id: "google_meet",
    name: "Google Meet",
    category: "Video Conferencing",
    pricePerUser: 600,
    icon: "video-camera",
  },
  
  // Productivity
  {
    id: "google_workspace",
    name: "Google Workspace",
    category: "Productivity",
    pricePerUser: 800,
    icon: "google",
  },
  {
    id: "office365",
    name: "Microsoft 365",
    category: "Productivity",
    pricePerUser: 1000,
    icon: "file-word-o",
  },
  {
    id: "gsuite",
    name: "G Suite",
    category: "Productivity",
    pricePerUser: 600,
    icon: "google",
  },
  {
    id: "zoho_workplace",
    name: "Zoho Workplace",
    category: "Productivity",
    pricePerUser: 500,
    icon: "briefcase",
  },
  {
    id: "libreoffice",
    name: "LibreOffice",
    category: "Productivity",
    pricePerUser: 0, // Free
    icon: "file-text-o",
  },
  {
    id: "wps_office",
    name: "WPS Office",
    category: "Productivity",
    pricePerUser: 300,
    icon: "file-o",
  },
  
  // Storage
  {
    id: "dropbox",
    name: "Dropbox",
    category: "Storage",
    pricePerUser: 1200,
    icon: "dropbox",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    category: "Storage",
    pricePerUser: 600,
    icon: "cloud",
  },
  {
    id: "box",
    name: "Box",
    category: "Storage",
    pricePerUser: 1000,
    icon: "archive",
  },
  {
    id: "google_drive",
    name: "Google Drive",
    category: "Storage",
    pricePerUser: 250,
    icon: "hdd-o",
  },
  
  // Project Management
  {
    id: "asana",
    name: "Asana",
    category: "Project Management",
    pricePerUser: 1200,
    icon: "tasks",
  },
  {
    id: "trello",
    name: "Trello",
    category: "Project Management",
    pricePerUser: 1000,
    icon: "trello",
  },
  {
    id: "jira",
    name: "Jira",
    category: "Project Management",
    pricePerUser: 900,
    icon: "bug",
  },
  
  // Knowledge Management
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge Management",
    pricePerUser: 800,
    icon: "file-text-o",
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "Knowledge Management",
    pricePerUser: 600,
    icon: "book",
  },
  {
    id: "evernote",
    name: "Evernote",
    category: "Knowledge Management",
    pricePerUser: 700,
    icon: "sticky-note",
  },
  {
    id: "onenote",
    name: "OneNote",
    category: "Knowledge Management",
    pricePerUser: 500,
    icon: "file-text",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    category: "Knowledge Management",
    pricePerUser: 600,
    icon: "diamond",
  },
  {
    id: "planner",
    name: "Microsoft Planner",
    category: "Knowledge Management",
    pricePerUser: 500,
    icon: "calendar-check-o",
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "Knowledge Management",
    pricePerUser: 1000,
    icon: "table",
  },
  {
    id: "kintone",
    name: "kintone",
    category: "Knowledge Management",
    pricePerUser: 1500,
    icon: "database",
  },
  {
    id: "tldv",
    name: "tl;dv",
    category: "Knowledge Management",
    pricePerUser: 800,
    icon: "video-camera",
  },
  
  // CRM
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    pricePerUser: 1500,
    icon: "line-chart",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    pricePerUser: 2000,
    icon: "cloud",
  },
  {
    id: "zoho_crm",
    name: "Zoho CRM",
    category: "CRM",
    pricePerUser: 1300,
    icon: "users",
  },
  
  // Scheduling
  {
    id: "timelex",
    name: "Timelex",
    category: "Scheduling",
    pricePerUser: 500,
    icon: "calendar",
  },
  {
    id: "chouseisan",
    name: "調整さん",
    category: "Scheduling",
    pricePerUser: 300,
    icon: "calendar-check-o",
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "Scheduling",
    pricePerUser: 1000,
    icon: "calendar-plus-o",
  },
  {
    id: "spacemarket",
    name: "スペースマーケット",
    category: "Scheduling",
    pricePerUser: 600,
    icon: "building",
  },
  {
    id: "googlecalendar",
    name: "Google Calendar",
    category: "Scheduling",
    pricePerUser: 0, // Free with Google Workspace
    icon: "calendar",
  },
  {
    id: "outlook_calendar",
    name: "Outlook Calendar",
    category: "Scheduling",
    pricePerUser: 0, // Free with Microsoft 365
    icon: "calendar-o",
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