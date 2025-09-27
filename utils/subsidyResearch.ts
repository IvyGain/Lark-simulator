import { SubsidyInfo } from '@/store/unified-store';

// 補助金・助成金データベース（実際の実装ではAPIから取得）
const NATIONAL_SUBSIDIES: SubsidyInfo[] = [
  {
    id: 'it-subsidy-2025',
    name: 'IT導入補助金2025',
    type: 'national',
    maxAmount: 4500000,
    subsidyRate: 0.5,
    targetType: ['IT導入', 'DX推進', 'グループウェア', 'クラウドサービス'],
    applicationDeadline: '2025-07-18',
    requirements: [
      '中小企業・小規模事業者',
      'IT導入支援事業者との連携',
      '交付決定後のシステム導入',
      '生産性向上への取り組み'
    ],
    applicableToLark: true,
    estimatedAmount: 0, // 動的計算
    source: 'IT導入補助金2025公式サイト - https://it-shien.smrj.go.jp/'
  },
  {
    id: 'small-business-subsidy-2025',
    name: '小規模事業者持続化補助金（一般型）',
    type: 'national',
    maxAmount: 2500000,
    subsidyRate: 0.67,
    targetType: ['販路開拓', '業務効率化', 'デジタル化', 'ウェブサイト構築'],
    applicationDeadline: '2025-06-30',
    requirements: [
      '小規模事業者（従業員5-20名以下）',
      '商工会議所での経営計画策定',
      '電子申請（GビズID必須）',
      '賃上げ計画の策定'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '全国商工会連合会 - https://s23.jizokukahojokin.info/'
  },
  {
    id: 'monodukuri-subsidy-2025',
    name: 'ものづくり補助金（第19次公募）',
    type: 'national',
    maxAmount: 10000000,
    subsidyRate: 0.5,
    targetType: ['革新的製品開発', 'システム構築', '生産性向上', 'DX推進'],
    applicationDeadline: '2025-04-25',
    requirements: [
      '中小企業・小規模事業者',
      '革新的な取り組み計画',
      '付加価値向上・生産性向上',
      '賃上げへの取り組み'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: 'ものづくり補助事業公式サイト - https://portal.monodukuri-hojo.jp/'
  },
  {
    id: 'business-restructuring-subsidy-2025',
    name: '事業再構築補助金（第12回公募）',
    type: 'national',
    maxAmount: 150000000,
    subsidyRate: 0.5,
    targetType: ['事業再構築', '新分野展開', 'デジタル化', '業態転換'],
    applicationDeadline: '2025-05-31',
    requirements: [
      '中小企業・中堅企業',
      '事業再構築に取り組む',
      '認定支援機関との連携',
      '付加価値額の向上'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '事業再構築補助金事務局 - https://jigyou-saikouchiku.go.jp/'
  }
];

// 厚生労働省助成金データ
const NATIONAL_GRANTS: SubsidyInfo[] = [
  {
    id: 'it-training-grant-2025',
    name: '人材開発支援助成金（人材育成支援コース）',
    type: 'national',
    maxAmount: 1000000,
    subsidyRate: 0.45,
    targetType: ['人材育成', 'IT研修', 'DXスキル向上', '職業能力開発'],
    applicationDeadline: '2025-12-31',
    requirements: [
      '雇用保険適用事業所',
      '従業員への教育訓練実施',
      '訓練計画の提出',
      '賃金・経費の適正な支払い'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '厚生労働省 人材開発統括官 - https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/'
  },
  {
    id: 'work-style-reform-grant-2025',
    name: '働き方改革推進支援助成金（テレワークコース）',
    type: 'national',
    maxAmount: 1000000,
    subsidyRate: 0.3,
    targetType: ['テレワーク', '労働時間短縮', '職場環境改善', 'ICT導入'],
    applicationDeadline: '2025-11-30',
    requirements: [
      '中小企業事業主',
      'テレワーク実施計画の策定',
      '労働者の労働時間短縮',
      'ICT機器・ソフトウェア導入'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '厚生労働省 雇用環境・均等局 - https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/'
  },
  {
    id: 'employment-adjustment-grant-2025',
    name: '雇用調整助成金（通常版）',
    type: 'national',
    maxAmount: 2000000,
    subsidyRate: 0.67,
    targetType: ['雇用維持', '事業継続', '教育訓練', '出向支援'],
    applicationDeadline: '2025-09-30',
    requirements: [
      '雇用保険適用事業所',
      '売上減少等の事業縮小',
      '休業・教育訓練・出向の実施',
      '雇用維持の取り組み'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '厚生労働省 職業安定局 - https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/pageL07.html'
  },
  {
    id: 'career-development-grant-2025',
    name: 'キャリアアップ助成金（正社員化コース）',
    type: 'national',
    maxAmount: 1500000,
    subsidyRate: 1.0,
    targetType: ['正社員化', '人材育成', '処遇改善', '職業能力開発'],
    applicationDeadline: '2025-12-31',
    requirements: [
      '雇用保険適用事業所',
      '有期契約労働者の正規雇用転換',
      '転換制度の規定化',
      '6か月以上の継続雇用'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '厚生労働省 職業安定局 - https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/part_haken/jigyounushi/career.html'
  },
  {
    id: 'digital-transformation-grant-2025',
    name: 'デジタル人材育成助成金',
    type: 'national',
    maxAmount: 3000000,
    subsidyRate: 0.5,
    targetType: ['DX人材育成', 'デジタルスキル', 'IT研修', '生産性向上'],
    applicationDeadline: '2025-10-31',
    requirements: [
      '中小企業事業主',
      'DX推進計画の策定',
      '従業員のデジタル研修実施',
      '生産性向上の取り組み'
    ],
    applicableToLark: true,
    estimatedAmount: 0,
    source: '厚生労働省 職業能力開発局 - https://www.mhlw.go.jp/stf/newpage_digital_jinzai.html'
  }
];

// 地方自治体補助金・助成金テンプレート
const LOCAL_SUBSIDY_TEMPLATES: Record<string, Array<{
  name: string;
  maxAmount: number;
  subsidyRate: number;
  targetType: string[];
  requirements: string[];
  source: string;
}>> = {
  '東京都': [
    {
      name: '東京都中小企業振興公社DX推進補助金',
      maxAmount: 1500000,
      subsidyRate: 0.67,
      targetType: ['デジタル化', 'テレワーク', 'クラウド導入'],
      requirements: ['都内中小企業', '常時使用従業員数300名以下'],
      source: '東京都中小企業振興公社'
    },
    {
      name: '東京都働き方改革助成金（テレワーク環境整備支援）',
      maxAmount: 2500000,
      subsidyRate: 0.5,
      targetType: ['テレワーク', '在宅勤務', 'ICT環境整備'],
      requirements: ['都内中小企業', 'テレワーク制度の導入・拡充'],
      source: '東京都産業労働局'
    }
  ],
  '大阪府': [
    {
      name: '大阪府スマートものづくり応援補助金',
      maxAmount: 1000000,
      subsidyRate: 0.5,
      targetType: ['IoT', 'AI', 'ロボット', 'クラウド'],
      requirements: ['府内中小企業', 'Society 5.0関連技術活用'],
      source: '大阪府商工労働部'
    },
    {
      name: '大阪府雇用創出基金助成金（デジタル人材育成）',
      maxAmount: 1800000,
      subsidyRate: 0.67,
      targetType: ['人材育成', 'デジタルスキル', 'IT研修'],
      requirements: ['府内中小企業', '従業員のスキルアップ計画'],
      source: '大阪府商工労働部'
    }
  ],
  '愛知県': [
    {
      name: '愛知県中小企業デジタル化・DX支援補助金',
      maxAmount: 2000000,
      subsidyRate: 0.5,
      targetType: ['デジタル化', 'DX推進', 'システム導入'],
      requirements: ['県内中小企業', 'デジタル化計画策定'],
      source: '愛知県経済産業局'
    }
  ],
  // 他の都道府県も同様に定義...
};

/**
 * 企業情報に基づいて適用可能な補助金・助成金を検索
 */
export async function searchAvailableSubsidies(
  employeeCount: number,
  prefecture: string,
  city: string,
  industry: string,
  larkAnnualCost: number
): Promise<SubsidyInfo[]> {
  const subsidies: SubsidyInfo[] = [];
  
  // 国の補助金を追加
  for (const nationalSubsidy of NATIONAL_SUBSIDIES) {
    const estimatedAmount = calculateSubsidyAmount(nationalSubsidy, larkAnnualCost, employeeCount);
    
    // 適用可能性を判定
    let applicable = true;
    if (nationalSubsidy.id === 'small-business-subsidy-2025' && employeeCount > 20) {
      applicable = false;
    }
    
    if (applicable && estimatedAmount > 0) {
      subsidies.push({
        ...nationalSubsidy,
        estimatedAmount,
        applicableToLark: true
      });
    }
  }
  
  // 国の助成金を追加
  for (const nationalGrant of NATIONAL_GRANTS) {
    const estimatedAmount = calculateGrantAmount(nationalGrant, larkAnnualCost, employeeCount, industry);
    
    // 適用可能性を判定
    let applicable = checkGrantEligibility(nationalGrant, employeeCount, industry);
    
    if (applicable && estimatedAmount > 0) {
      subsidies.push({
        ...nationalGrant,
        estimatedAmount,
        applicableToLark: true
      });
    }
  }
  
  // 地方自治体の補助金を追加
  if (prefecture && LOCAL_SUBSIDY_TEMPLATES[prefecture]) {
    const localTemplates = LOCAL_SUBSIDY_TEMPLATES[prefecture];
    
    for (const template of localTemplates) {
      const estimatedAmount = Math.min(
        larkAnnualCost * template.subsidyRate,
        template.maxAmount
      );
      
      const localSubsidy: SubsidyInfo = {
        id: `${prefecture.toLowerCase()}-dx-subsidy`,
        name: template.name,
        type: 'local',
        maxAmount: template.maxAmount,
        subsidyRate: template.subsidyRate,
        targetType: template.targetType,
        applicationDeadline: '2025-09-30', // 地方は通年または年度末
        requirements: template.requirements,
        applicableToLark: true,
        estimatedAmount,
        prefecture,
        city,
        source: template.source
      };
      
      subsidies.push(localSubsidy);
    }
  }
  
  // 補助金額でソート（高額順）
  return subsidies.sort((a, b) => b.estimatedAmount - a.estimatedAmount);
}

/**
 * 補助金の推定支給額を計算
 */
function calculateSubsidyAmount(
  subsidy: SubsidyInfo, 
  larkAnnualCost: number, 
  employeeCount: number
): number {
  let estimatedAmount = larkAnnualCost * subsidy.subsidyRate;
  
  // 補助金上限額を適用
  estimatedAmount = Math.min(estimatedAmount, subsidy.maxAmount);
  
  // 小規模事業者持続化補助金の特別計算
  if (subsidy.id === 'small-business-subsidy-2025') {
    // 基本上限50万円、特例で最大250万円
    const basicLimit = 500000;
    const specialLimit = 2500000;
    
    if (employeeCount <= 5) {
      estimatedAmount = Math.min(estimatedAmount, specialLimit);
    } else if (employeeCount <= 20) {
      estimatedAmount = Math.min(estimatedAmount, basicLimit);
    } else {
      return 0; // 対象外
    }
  }
  
  return Math.floor(estimatedAmount);
}

/**
 * 助成金の推定支給額を計算
 */
function calculateGrantAmount(
  grant: SubsidyInfo, 
  larkAnnualCost: number, 
  employeeCount: number,
  industry: string
): number {
  let estimatedAmount = 0;
  
  // 助成金の種類に応じた計算ロジック
  switch (grant.id) {
    case 'it-training-grant-2025':
      // 人材開発支援助成金：研修費用ベース
      const trainingCostPerEmployee = 50000; // 1人あたり5万円の研修と仮定
      estimatedAmount = Math.min(
        trainingCostPerEmployee * employeeCount * grant.subsidyRate,
        grant.maxAmount
      );
      break;
      
    case 'work-style-reform-grant-2025':
      // 働き方改革推進支援助成金：ICT導入費用ベース
      estimatedAmount = Math.min(
        larkAnnualCost * 0.5 * grant.subsidyRate, // Lark導入費用の50%を対象経費と仮定
        grant.maxAmount
      );
      break;
      
    case 'employment-adjustment-grant-2025':
      // 雇用調整助成金：休業手当相当額
      const dailyWagePerEmployee = 8000; // 1人1日8000円と仮定
      const adjustmentDays = 30; // 30日分の調整と仮定
      estimatedAmount = Math.min(
        dailyWagePerEmployee * employeeCount * adjustmentDays * grant.subsidyRate,
        grant.maxAmount
      );
      break;
      
    case 'career-development-grant-2025':
      // キャリアアップ助成金：正社員化1人あたり固定額
      const bonusPerConversion = 570000; // 1人あたり57万円
      const expectedConversions = Math.min(employeeCount * 0.1, 10); // 全従業員の10%、最大10名
      estimatedAmount = Math.min(
        bonusPerConversion * expectedConversions,
        grant.maxAmount
      );
      break;
      
    case 'digital-transformation-grant-2025':
      // デジタル人材育成助成金：DX研修費用ベース
      const dxTrainingCostPerEmployee = 100000; // 1人あたり10万円のDX研修
      estimatedAmount = Math.min(
        dxTrainingCostPerEmployee * employeeCount * grant.subsidyRate,
        grant.maxAmount
      );
      break;
      
    default:
      // デフォルト計算
      estimatedAmount = Math.min(
        larkAnnualCost * grant.subsidyRate,
        grant.maxAmount
      );
  }
  
  return Math.floor(estimatedAmount);
}

/**
 * 助成金の適用可能性をチェック
 */
function checkGrantEligibility(
  grant: SubsidyInfo, 
  employeeCount: number, 
  industry: string
): boolean {
  // 基本的な従業員数チェック
  if (employeeCount <= 0) return false;
  
  // 助成金特有の要件チェック
  switch (grant.id) {
    case 'it-training-grant-2025':
      // 人材開発支援助成金：雇用保険適用が前提
      return employeeCount >= 1;
      
    case 'work-style-reform-grant-2025':
      // 働き方改革推進支援助成金：中小企業が対象
      return employeeCount <= 300;
      
    case 'employment-adjustment-grant-2025':
      // 雇用調整助成金：事業縮小が前提（条件付き適用）
      return employeeCount >= 1; // 基本要件のみチェック
      
    case 'career-development-grant-2025':
      // キャリアアップ助成金：有期契約労働者の存在が前提
      return employeeCount >= 5; // 有期契約労働者がいる可能性が高い規模
      
    case 'digital-transformation-grant-2025':
      // デジタル人材育成助成金：中小企業が対象
      return employeeCount <= 300;
      
    default:
      return true;
  }
}

/**
 * リアルタイム補助金・助成金情報を外部APIから取得（将来実装）
 */
export async function fetchRealTimeSubsidyData(prefecture?: string): Promise<SubsidyInfo[]> {
  // 実際の実装では以下のようなAPIを呼び出し
  // - 中小機構の補助金データベースAPI
  // - 厚生労働省の助成金データベースAPI
  // - 各都道府県の公式サイトのスクレイピング
  // - J-Net21の補助金・助成金情報API
  // - ハローワークの助成金情報API
  
  try {
    // 模擬的なリアルタイムデータ取得
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 実際のAPIレスポンス例：
    // const response = await fetch(`https://api.subsidy-info.jp/search?prefecture=${prefecture}`);
    // const data = await response.json();
    // return data.subsidies;
    
    return [];
  } catch (error) {
    console.error('リアルタイム補助金・助成金データの取得に失敗:', error);
    return [];
  }
}

/**
 * 補助金・助成金申請スケジュールを生成
 */
export function generateApplicationSchedule(subsidies: SubsidyInfo[]): string {
  const scheduleItems = [];
  
  // 申請期限順にソート
  const sortedSubsidies = subsidies.sort((a, b) => 
    new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
  );
  
  for (const subsidy of sortedSubsidies) {
    const deadline = new Date(subsidy.applicationDeadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft > 0) {
      scheduleItems.push(`${subsidy.name}: ${daysLeft}日後 (${deadline.toLocaleDateString('ja-JP')})`);
    }
  }
  
  return scheduleItems.join('\n');
}

/**
 * 補助金・助成金の併用可能性をチェック
 */
export function checkSubsidyCombination(subsidies: SubsidyInfo[]): {
  compatible: SubsidyInfo[];
  conflicts: string[];
} {
  const compatible: SubsidyInfo[] = [];
  const conflicts: string[] = [];
  
  let hasNationalIT = false;
  let hasNationalOther = false;
  
  for (const subsidy of subsidies) {
    if (subsidy.type === 'national') {
      if (subsidy.id.includes('it-subsidy')) {
        if (!hasNationalIT) {
          compatible.push(subsidy);
          hasNationalIT = true;
        } else {
          conflicts.push(`${subsidy.name}は他のIT系補助金と併用不可`);
        }
      } else if (subsidy.targetType.some(type => ['人材育成', 'IT研修', '職業能力開発'].includes(type))) {
        // 厚生労働省助成金は基本的に併用可能（同一目的でなければ）
        compatible.push(subsidy);
      } else {
        if (!hasNationalOther) {
          compatible.push(subsidy);
          hasNationalOther = true;
        } else {
          conflicts.push(`${subsidy.name}は他の国庫補助金と併用不可`);
        }
      }
    } else {
      // 地方補助金・助成金は基本的に併用可能
      compatible.push(subsidy);
    }
  }
  
  return { compatible, conflicts };
}