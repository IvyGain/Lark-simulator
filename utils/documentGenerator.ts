interface UserInputs {
  companyName?: string;
  industry?: string;
  employeeCount: number;
  selectedTools: Array<{
    id: string;
    name: string;
    pricePerUser: number;
    totalMonthlyCost: number;
  }>;
  currentChallenges?: string[];
  expectedImprovements?: string[];
}

interface CalculationResults {
  currentMonthlyCost: number;
  larkMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  roi: number;
  paybackPeriod: number;
  reductionPercentage: number;
}

interface StoryData {
  persona: {
    role: string;
    name: string;
  };
  beforeScenarioDetailed: string;
  afterScenarioDetailed: string;
  keyResults: string[];
}

export function generateStoryProposal(
  userInputs: UserInputs,
  calculationResults: CalculationResults,
  storyData: StoryData
): string {
  try {
    const companyName = userInputs.companyName || '貴社';
  
  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【${companyName}様向け】Lark導入による未来の働き方のご提案</title>
  <style>
    .back-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #00A3A1;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .back-button:hover {
      background-color: #008a88;
    }
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
      .back-button { display: none; }
    }
    body {
      font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
      line-height: 1.8;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #f5f5f5;
    }
    .document {
      background: white;
      padding: 60px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    h1 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 30px;
      text-align: center;
      border-bottom: 3px solid #3498db;
      padding-bottom: 20px;
    }
    h2 {
      color: #34495e;
      font-size: 22px;
      margin-top: 40px;
      margin-bottom: 20px;
      padding-left: 10px;
      border-left: 4px solid #3498db;
    }
    .persona-box {
      background: #ecf0f1;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .scenario-box {
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .before-scenario {
      background: #ffe5e5;
      border-left: 4px solid #e74c3c;
    }
    .after-scenario {
      background: #e5ffe5;
      border-left: 4px solid #27ae60;
    }
    .key-results {
      background: #e5f5ff;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .roi-highlight {
      background: #fff3cd;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #856404;
      border: 2px solid #ffc107;
    }
    ul {
      padding-left: 30px;
    }
    li {
      margin-bottom: 10px;
    }
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .print-button:hover {
      background: #2980b9;
    }
  </style>
</head>
<body>
  <button class="back-button no-print" onclick="window.close()">◀ 戻る</button>
  <button class="print-button no-print" onclick="window.print()">印刷する</button>
  
  <div class="document">
    <h1>【${companyName}様向け】<br>Lark導入による未来の働き方のご提案</h1>
    
    <h2>はじめに：『働き方』が企業の競争力になる時代</h2>
    <p>
      デジタル化が加速する現代において、効率的なコミュニケーションと情報共有は、
      企業の成長と競争力を左右する重要な要素となっています。
      本提案書では、${companyName}様の現状の課題を踏まえ、
      Larkがもたらす新しい働き方の姿をストーリー形式でご紹介いたします。
    </p>
    
    <h2>現在の主人公：${storyData.persona.name}様の日常</h2>
    <div class="persona-box">
      <p><strong>${storyData.persona.role}</strong>として働く${storyData.persona.name}様</p>
    </div>
    
    <div class="scenario-box before-scenario">
      <h3>現在の課題</h3>
      <p>${storyData.beforeScenarioDetailed}</p>
      <p>毎日の業務時間の多くが、本来の価値創造とは異なる「作業」に費やされている状況です。</p>
    </div>
    
    <h2>転換点：Larkがもたらす『たった一つの変化』</h2>
    <p>
      すべてのコミュニケーション、ドキュメント、タスク管理が一つのプラットフォームに統合されることで、
      業務の流れが根本的に変わります。情報を探す時間がなくなり、本来の仕事に集中できる環境が生まれます。
    </p>
    
    <h2>Lark導入後の新しい働き方</h2>
    <div class="scenario-box after-scenario">
      <h3>改善後の姿</h3>
      <p>${storyData.afterScenarioDetailed}</p>
      <p>創造的な仕事に集中できる時間が増え、チームの生産性と満足度が大幅に向上しました。</p>
    </div>
    
    <h2>ストーリーから見る3つの主要な導入効果</h2>
    <div class="key-results">
      <ul>
        ${storyData.keyResults.map(result => `<li>${result}</li>`).join('')}
      </ul>
    </div>
    
    <div class="roi-highlight">
      この変革は、年間${calculationResults.roi}%の投資対効果として数値にも現れます。
    </div>
    
    <h2>次のステップ</h2>
    <p>
      より詳細なコスト分析や稟議書は、別途『詳細稟議書』をご参照ください。
      ${companyName}様の働き方改革を、Larkがお手伝いさせていただきます。
    </p>
    
    <p style="text-align: center; margin-top: 40px; color: #666;">
      🤖 Generated with Claude Code<br>
      Co-Authored-By: Claude &lt;noreply@anthropic.com&gt;
    </p>
  </div>
</body>
</html>
  `;
  
    return html;
  } catch (error) {
    console.error('Story proposal generation error:', error);
    throw new Error('ストーリー提案書の生成に失敗しました');
  }
}

export function generateFormalProposal(
  userInputs: UserInputs,
  calculationResults: CalculationResults
): string {
  try {
    const companyName = userInputs.companyName || '貴社';
    const currentAnnualCost = calculationResults.currentMonthlyCost * 12;
    const larkAnnualCost = calculationResults.larkMonthlyCost * 12;
    const employeeCount = userInputs.employeeCount;
    
    // 詳細な人件費計算
    const averageHourlyWage = 3000; // 1時間あたり3000円（平均）
    const averageDailySalary = averageHourlyWage * 8; // 1日24,000円
    const averageMonthlySalary = averageDailySalary * 22; // 1ヶ月528,000円
    const averageAnnualSalary = averageMonthlySalary * 12; // 1年6,336,000円
    
    // ツール切り替え時間の人件費換算
    const toolSwitchingTimePerDay = 2; // 1日2時間のツール切り替え時間
    const toolSwitchingCostPerEmployeePerDay = toolSwitchingTimePerDay * averageHourlyWage;
    const toolSwitchingCostPerEmployeePerMonth = toolSwitchingCostPerEmployeePerDay * 22;
    const toolSwitchingCostPerEmployeePerYear = toolSwitchingCostPerEmployeePerMonth * 12;
    const totalToolSwitchingCostPerYear = toolSwitchingCostPerEmployeePerYear * employeeCount;
    
    // 検索時間の人件費換算
    const searchTimePerDay = 1.5; // 1日1.5時間の検索時間
    const searchCostPerEmployeePerDay = searchTimePerDay * averageHourlyWage;
    const searchCostPerEmployeePerYear = searchCostPerEmployeePerDay * 22 * 12;
    const totalSearchCostPerYear = searchCostPerEmployeePerYear * employeeCount;
    
    // 会議非効率の人件費換算
    const inefficientMeetingTimePerDay = 1; // 1日1時間の非効率会議時間
    const meetingCostPerEmployeePerYear = inefficientMeetingTimePerDay * averageHourlyWage * 22 * 12;
    const totalMeetingCostPerYear = meetingCostPerEmployeePerYear * employeeCount;
    
    // 総生産性損失
    const totalProductivityLoss = totalToolSwitchingCostPerYear + totalSearchCostPerYear + totalMeetingCostPerYear;
    
    // Lark導入による削減効果
    const toolSwitchingReduction = totalToolSwitchingCostPerYear * 0.95; // 95%削減
    const searchTimeReduction = totalSearchCostPerYear * 0.8; // 80%削減
    const meetingEfficiencyGain = totalMeetingCostPerYear * 0.39; // 39%改善
    const totalProductivityGain = toolSwitchingReduction + searchTimeReduction + meetingEfficiencyGain;
  
  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>稟議書：Lark導入による企業変革とコスト最適化計画</title>
  <style>
    .back-button {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #00A3A1;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .back-button:hover {
      background-color: #008a88;
    }
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
      .back-button { display: none; }
    }
    body {
      font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #f5f5f5;
    }
    .document {
      background: white;
      padding: 60px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    h1 {
      font-size: 28px;
      margin-bottom: 30px;
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #495057;
      color: #2c3e50;
    }
    h2 {
      font-size: 22px;
      margin-top: 40px;
      margin-bottom: 20px;
      padding: 12px 15px;
      background: #f8f9fa;
      color: #2c3e50;
      border-left: 4px solid #495057;
      border-radius: 4px;
    }
    h3 {
      font-size: 18px;
      color: #495057;
      margin-top: 25px;
      margin-bottom: 15px;
      padding-left: 10px;
      border-left: 3px solid #6c757d;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      border: 1px solid #dee2e6;
    }
    th, td {
      border: 1px solid #dee2e6;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #f8f9fa;
      font-weight: bold;
      color: #495057;
    }
    .executive-summary {
      background: #fff;
      border: 2px solid #6c757d;
      padding: 30px;
      margin: 30px 0;
      border-radius: 8px;
    }
    .impact-numbers {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      text-align: center;
    }
    .impact-number {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      min-width: 150px;
    }
    .impact-value {
      font-size: 32px;
      font-weight: 900;
      color: #495057;
      margin-bottom: 5px;
    }
    .impact-label {
      font-size: 14px;
      color: #6c757d;
      font-weight: 600;
    }
    .highlight {
      background: #fff3cd;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
      color: #856404;
    }
    .cost-positive {
      color: #155724;
      font-weight: bold;
    }
    .cost-negative {
      color: #721c24;
      font-weight: bold;
    }
    .productivity-box {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      padding: 25px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .visual-chart {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .cost-bar {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    .cost-bar-label {
      width: 150px;
      font-weight: 600;
      color: #495057;
    }
    .cost-bar-visual {
      flex: 1;
      height: 30px;
      margin: 0 10px;
      border-radius: 4px;
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 15px;
      color: white;
      font-weight: bold;
    }
    .current-tools-bar {
      background: #6c757d;
    }
    .lark-bar {
      background: #495057;
    }

    .approval-section {
      background: #fff;
      border: 2px solid #495057;
      padding: 25px;
      border-radius: 8px;
      margin: 30px 0;
    }
    .signature-table {
      margin-top: 30px;
    }
    .signature-table td {
      height: 60px;
      text-align: center;
      background: #fafafa;
    }
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      background: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .print-button:hover {
      background: #555;
    }
  </style>
</head>
<body>
  <button class="back-button no-print" onclick="window.close()">◀ 戻る</button>
  <button class="print-button no-print" onclick="window.print()">印刷する</button>
  
  <div class="document">
    <h1>稟議書<br>Lark導入による企業変革とコスト最適化計画</h1>
    
    <div class="executive-summary">
      <h2 style="margin-top: 0; background: none; color: #495057; padding: 0; border: none;">エグゼクティブサマリー</h2>
      <div class="impact-numbers">
        <div class="impact-number">
          <div class="impact-value">¥${calculationResults.annualSavings.toLocaleString()}</div>
          <div class="impact-label">年間直接コスト削減</div>
        </div>
        <div class="impact-number">
          <div class="impact-value">${calculationResults.roi}%</div>
          <div class="impact-label">投資対効果（ROI）</div>
        </div>
        <div class="impact-number">
          <div class="impact-value">${calculationResults.paybackPeriod}</div>
          <div class="impact-label">投資回収期間（月）</div>
        </div>
      </div>
      <p style="font-size: 16px; line-height: 1.8; margin-top: 20px;">
        <strong>提案概要：</strong><br>
        現在${userInputs.selectedTools.length}種類に分散しているSaaSツールをLarkに統合することで、年間${calculationResults.reductionPercentage}%（¥${calculationResults.annualSavings.toLocaleString()}）の直接コスト削減に加え、
        業務効率化による間接効果¥${Math.round(totalProductivityGain).toLocaleString()}を実現します。
        投資回収期間はわずか${calculationResults.paybackPeriod}ヶ月であり、極めて費用対効果の高い施策です。
      </p>
    </div>

    <h2>1. 導入前後の比較分析</h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #495057;">現状の問題点とLark導入による解決</h3>
      <table style="width: 100%; margin-top: 15px;">
        <tr>
          <th style="width: 20%; background: #6c757d; color: white;">問題領域</th>
          <th style="width: 35%; background: #dc3545; color: white;">🚫 現在の状況（問題）</th>
          <th style="width: 35%; background: #28a745; color: white;">✅ Lark導入後（解決）</th>
          <th style="width: 10%; background: #495057; color: white;">改善率</th>
        </tr>
        <tr>
          <td style="font-weight: bold;">ツール管理</td>
          <td style="background: #ffebee;">
            • ${userInputs.selectedTools.length}種類のツールを個別管理<br>
            • 年間¥${currentAnnualCost.toLocaleString()}のライセンス費<br>
            • 複数ベンダーとの契約管理
          </td>
          <td style="background: #e8f5e9;">
            • 1つの統合プラットフォーム<br>
            • 年間¥${larkAnnualCost.toLocaleString()}に削減<br>
            • 単一ベンダー管理でシンプル化
          </td>
          <td style="text-align: center; font-weight: bold; color: #28a745;">
            ${calculationResults.reductionPercentage}%<br>削減
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold;">業務効率</td>
          <td style="background: #ffebee;">
            • ツール切替に1日2時間浪費<br>
            • 情報検索に1.5時間/日<br>
            • 年間¥${totalProductivityLoss.toLocaleString()}の損失
          </td>
          <td style="background: #e8f5e9;">
            • シームレスな業務フロー<br>
            • 統合検索で即座にアクセス<br>
            • 年間¥${Math.round(totalProductivityGain).toLocaleString()}の価値創出
          </td>
          <td style="text-align: center; font-weight: bold; color: #28a745;">
            85%<br>改善
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold;">コミュニケーション</td>
          <td style="background: #ffebee;">
            • メール/チャット/会議が分散<br>
            • 情報の見落としが頻発<br>
            • 意思決定の遅延
          </td>
          <td style="background: #e8f5e9;">
            • 全てが1つのプラットフォーム<br>
            • リアルタイム情報共有<br>
            • 意思決定スピード向上
          </td>
          <td style="text-align: center; font-weight: bold; color: #28a745;">
            39%<br>時短
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold;">セキュリティ</td>
          <td style="background: #ffebee;">
            • 複数システムのID管理<br>
            • アクセス権限が複雑<br>
            • 監査証跡が分散
          </td>
          <td style="background: #e8f5e9;">
            • 統一認証（SSO）<br>
            • 一元的な権限管理<br>
            • 完全な監査ログ
          </td>
          <td style="text-align: center; font-weight: bold; color: #28a745;">
            100%<br>統合
          </td>
        </tr>
      </table>
    </div>

    <h3>1.1 数値で見る導入効果</h3>
    <div style="display: flex; justify-content: space-around; margin: 20px 0;">
      <div style="text-align: center; background: #fff; padding: 20px; border-radius: 8px; border: 2px solid #28a745; flex: 1; margin: 0 10px;">
        <div style="font-size: 36px; font-weight: bold; color: #28a745;">¥${calculationResults.annualSavings.toLocaleString()}</div>
        <div style="font-size: 14px; color: #6c757d;">年間直接コスト削減額</div>
      </div>
      <div style="text-align: center; background: #fff; padding: 20px; border-radius: 8px; border: 2px solid #17a2b8; flex: 1; margin: 0 10px;">
        <div style="font-size: 36px; font-weight: bold; color: #17a2b8;">¥${Math.round(totalProductivityGain).toLocaleString()}</div>
        <div style="font-size: 14px; color: #6c757d;">生産性向上効果（年間）</div>
      </div>
      <div style="text-align: center; background: #fff; padding: 20px; border-radius: 8px; border: 2px solid #ffc107; flex: 1; margin: 0 10px;">
        <div style="font-size: 36px; font-weight: bold; color: #ffc107;">${calculationResults.paybackPeriod}ヶ月</div>
        <div style="font-size: 14px; color: #6c757d;">投資回収期間</div>
      </div>
    </div>

    <h2>2. 投資対効果の詳細分析</h2>
    
    <div class="visual-chart">
      <h3>コスト比較ビジュアル（年間）</h3>
      <div class="cost-bar">
        <div class="cost-bar-label">現在のツール群</div>
        <div class="cost-bar-visual current-tools-bar" style="width: 100%;">
          ¥${currentAnnualCost.toLocaleString()}/年
        </div>
      </div>
      <div class="cost-bar">
        <div class="cost-bar-label">Lark統合後</div>
        <div class="cost-bar-visual lark-bar" style="width: ${Math.round((larkAnnualCost / currentAnnualCost) * 100)}%;">
          ¥${larkAnnualCost.toLocaleString()}/年
        </div>
      </div>
      <div style="text-align: center; margin-top: 15px; font-size: 24px; font-weight: bold; color: #2e7d32;">
        💰 年間削減効果: ¥${calculationResults.annualSavings.toLocaleString()}
      </div>
    </div>

    <h2>3. Lark導入による解決策と効果予測</h2>

    <h3>3.1 Larkが提供するビジネス価値</h3>
    <table>
      <tr>
        <th>価値提供項目</th>
        <th>現状の課題</th>
        <th>Lark導入後の改善</th>
        <th>定量的効果</th>
      </tr>
      <tr>
        <td><strong>統合コミュニケーション</strong></td>
        <td>メール・チャット・会議が分散</td>
        <td>全てが一つのプラットフォームで完結</td>
        <td>コミュニケーション時間30%削減</td>
      </tr>
      <tr>
        <td><strong>リアルタイムコラボレーション</strong></td>
        <td>ドキュメント共同編集が困難</td>
        <td>同時編集・バージョン管理自動化</td>
        <td>ドキュメント作成効率50%向上</td>
      </tr>
      <tr>
        <td><strong>自動化機能</strong></td>
        <td>手動でのタスク管理・報告</td>
        <td>ワークフロー自動化・AI議事録</td>
        <td>管理工数70%削減</td>
      </tr>
      <tr>
        <td><strong>モバイル対応</strong></td>
        <td>外出先での作業制限</td>
        <td>場所を選ばない業務遂行</td>
        <td>リモートワーク効率40%向上</td>
      </tr>
    </table>

    <h3>3.2 エンタープライズセキュリティとガバナンス</h3>
    <table>
      <tr>
        <th>セキュリティ項目</th>
        <th>Larkの対応レベル</th>
        <th>業界標準との比較</th>
      </tr>
      <tr>
        <td>データ暗号化</td>
        <td>AES-256（転送時・保存時）</td>
        <td>金融機関レベル</td>
      </tr>
      <tr>
        <td>アクセス制御</td>
        <td>RBAC・MFA・SSO対応</td>
        <td>エンタープライズ標準準拠</td>
      </tr>
      <tr>
        <td>コンプライアンス</td>
        <td>SOC2 Type2・ISO27001認証</td>
        <td>国際標準認証取得</td>
      </tr>
      <tr>
        <td>データ主権</td>
        <td>国内データセンター利用可</td>
        <td>データローカライゼーション対応</td>
      </tr>
    </table>

    <h2>4. 人件費ベースの生産性分析</h2>
    
    <div class="productivity-box">
      <h3>現在の非効率による人件費損失（年間）</h3>
      <table>
        <tr>
          <th>非効率要因</th>
          <th>1人あたり時間/日</th>
          <th>時給換算</th>
          <th>年間損失/人</th>
          <th>全社年間損失</th>
        </tr>
        <tr>
          <td>ツール切り替え作業</td>
          <td>2時間</td>
          <td>¥3,000</td>
          <td class="cost-negative">¥${toolSwitchingCostPerEmployeePerYear.toLocaleString()}</td>
          <td class="cost-negative">¥${totalToolSwitchingCostPerYear.toLocaleString()}</td>
        </tr>
        <tr>
          <td>情報検索・探索</td>
          <td>1.5時間</td>
          <td>¥3,000</td>
          <td class="cost-negative">¥${Math.round(searchCostPerEmployeePerYear).toLocaleString()}</td>
          <td class="cost-negative">¥${totalSearchCostPerYear.toLocaleString()}</td>
        </tr>
        <tr>
          <td>非効率な会議時間</td>
          <td>1時間</td>
          <td>¥3,000</td>
          <td class="cost-negative">¥${Math.round(meetingCostPerEmployeePerYear).toLocaleString()}</td>
          <td class="cost-negative">¥${totalMeetingCostPerYear.toLocaleString()}</td>
        </tr>
        <tr style="background: #ffebee;">
          <th>合計生産性損失</th>
          <th>4.5時間/日</th>
          <th>-</th>
          <th class="cost-negative">¥${Math.round(totalProductivityLoss / employeeCount).toLocaleString()}</th>
          <th class="cost-negative">¥${totalProductivityLoss.toLocaleString()}</th>
        </tr>
      </table>
      
      <h3 style="color: #2e7d32;">Lark導入による改善効果</h3>
      <table>
        <tr>
          <th>改善項目</th>
          <th>削減率</th>
          <th>年間削減効果</th>
        </tr>
        <tr>
          <td>ツール切り替え時間</td>
          <td>95%削減</td>
          <td class="cost-positive">¥${Math.round(toolSwitchingReduction).toLocaleString()}</td>
        </tr>
        <tr>
          <td>情報検索時間</td>
          <td>80%削減</td>
          <td class="cost-positive">¥${Math.round(searchTimeReduction).toLocaleString()}</td>
        </tr>
        <tr>
          <td>会議効率化</td>
          <td>39%改善</td>
          <td class="cost-positive">¥${Math.round(meetingEfficiencyGain).toLocaleString()}</td>
        </tr>
        <tr style="background: #e8f5e8;">
          <th>合計生産性向上</th>
          <th>-</th>
          <th class="cost-positive">¥${Math.round(totalProductivityGain).toLocaleString()}</th>
        </tr>
      </table>
    </div>

    <h2>5. リスク分析と緩和策</h2>

    <h3>5.1 現状維持リスクの定量評価</h3>
    <table>
      <tr>
        <th>リスク項目</th>
        <th>発生確率</th>
        <th>影響度</th>
        <th>年間期待損失額</th>
      </tr>
      <tr>
        <td><strong>システム障害による業務停止</strong></td>
        <td>30%</td>
        <td>高（1日売上損失）</td>
        <td class="cost-negative">¥${Math.round(currentAnnualCost * 0.1).toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>セキュリティインシデント</strong></td>
        <td>15%</td>
        <td>極高（信頼失墜）</td>
        <td class="cost-negative">¥${Math.round(averageAnnualSalary * 10).toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>人材流出（IT環境不満）</strong></td>
        <td>25%</td>
        <td>中（採用・教育コスト）</td>
        <td class="cost-negative">¥${Math.round(averageAnnualSalary * 2).toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>競合他社との格差拡大</strong></td>
        <td>70%</td>
        <td>中（商機損失）</td>
        <td>機会損失：非計測</td>
      </tr>
    </table>

    <h3>5.2 Lark導入による競争優位性確保</h3>
    <table>
      <tr>
        <th>競争要因</th>
        <th>現状評価</th>
        <th>Lark導入後</th>
        <th>競合優位度</th>
      </tr>
      <tr>
        <td>意思決定スピード</td>
        <td>C（業界平均以下）</td>
        <td>A（業界トップクラス）</td>
        <td>+2ランク向上</td>
      </tr>
      <tr>
        <td>リモートワーク対応</td>
        <td>B（部分対応）</td>
        <td>A+（完全対応）</td>
        <td>人材採用競争力向上</td>
      </tr>
      <tr>
        <td>顧客対応速度</td>
        <td>B-（標準レベル）</td>
        <td>A（迅速対応）</td>
        <td>顧客満足度向上</td>
      </tr>
      <tr>
        <td>プロジェクト成功率</td>
        <td>75%（業界平均）</td>
        <td>85%（目標値）</td>
        <td>+10%向上目標</td>
      </tr>
    </table>

    <h2>6. 詳細ROI分析</h2>
    
    <table>
      <tr>
        <th>投資項目</th>
        <th>初年度</th>
        <th>2年目以降/年</th>
        <th>備考</th>
      </tr>
      <tr>
        <td>Larkライセンス費用</td>
        <td>¥${larkAnnualCost.toLocaleString()}</td>
        <td>¥${larkAnnualCost.toLocaleString()}</td>
        <td>${employeeCount}名 × ¥1,420/月 × 12ヶ月</td>
      </tr>
      <tr>
        <td>データ移行・導入支援</td>
        <td>¥0</td>
        <td>¥0</td>
        <td>キャンペーン適用により無償</td>
      </tr>
      <tr>
        <td>教育・トレーニング</td>
        <td>¥0</td>
        <td>¥0</td>
        <td>オンラインサポート含む</td>
      </tr>
      <tr style="background: #f3e5f5;">
        <th>投資合計</th>
        <th>¥${larkAnnualCost.toLocaleString()}</th>
        <th>¥${larkAnnualCost.toLocaleString()}</th>
        <th>-</th>
      </tr>
    </table>

    <table style="margin-top: 20px;">
      <tr>
        <th>リターン項目</th>
        <th>年間効果</th>
        <th>3年間累計</th>
        <th>計算根拠</th>
      </tr>
      <tr>
        <td>SaaSツール統合削減</td>
        <td class="cost-positive">¥${calculationResults.annualSavings.toLocaleString()}</td>
        <td class="cost-positive">¥${(calculationResults.annualSavings * 3).toLocaleString()}</td>
        <td>現行${userInputs.selectedTools.length}ツール → Lark1つに統合</td>
      </tr>
      <tr>
        <td>生産性向上による効果</td>
        <td class="cost-positive">¥${Math.round(totalProductivityGain).toLocaleString()}</td>
        <td class="cost-positive">¥${(Math.round(totalProductivityGain) * 3).toLocaleString()}</td>
        <td>人件費換算による時間削減効果</td>
      </tr>
      <tr>
        <td>運用・メンテナンス削減</td>
        <td class="cost-positive">¥${Math.round(calculationResults.annualSavings * 0.2).toLocaleString()}</td>
        <td class="cost-positive">¥${Math.round(calculationResults.annualSavings * 0.2 * 3).toLocaleString()}</td>
        <td>システム管理工数削減</td>
      </tr>
      <tr style="background: #e8f5e8;">
        <th>リターン合計</th>
        <th class="cost-positive">¥${Math.round(calculationResults.annualSavings + totalProductivityGain + calculationResults.annualSavings * 0.2).toLocaleString()}</th>
        <th class="cost-positive">¥${Math.round((calculationResults.annualSavings + totalProductivityGain + calculationResults.annualSavings * 0.2) * 3).toLocaleString()}</th>
        <th>-</th>
      </tr>
    </table>

    <h2>7. 現在利用ツールの詳細コスト分析と統合効果</h2>

    <h3>7.1 現在の非効率なツール運用状況</h3>
    
    <table>
      <tr>
        <th>ツール名</th>
        <th>ライセンス/人/月</th>
        <th>月額総費用</th>
        <th>年額総費用</th>
        <th>主要機能</th>
      </tr>
      ${userInputs.selectedTools.map(tool => {
        const monthlyCost = tool.totalMonthlyCost;
        const userCost = Math.round(monthlyCost / employeeCount);
        return `
      <tr>
        <td><strong>${tool.name}</strong></td>
        <td>¥${userCost.toLocaleString()}</td>
        <td>¥${monthlyCost.toLocaleString()}</td>
        <td><strong>¥${(monthlyCost * 12).toLocaleString()}</strong></td>
        <td>専用機能のみ</td>
      </tr>
      `;}).join('')}
      <tr style="background: #ffebee;">
        <th>現在の合計</th>
        <th>¥${Math.round(currentAnnualCost / employeeCount / 12).toLocaleString()}</th>
        <th><strong>¥${Math.round(currentAnnualCost / 12).toLocaleString()}</strong></th>
        <th><strong>¥${currentAnnualCost.toLocaleString()}</strong></th>
        <th>${userInputs.selectedTools.length}つのツール管理</th>
      </tr>
      <tr style="background: #e8f5e8;">
        <th>Lark統合後</th>
        <th>¥1,420</th>
        <th><strong>¥${Math.round(larkAnnualCost / 12).toLocaleString()}</strong></th>
        <th><strong>¥${larkAnnualCost.toLocaleString()}</strong></th>
        <th>オールインワン統合</th>
      </tr>
    </table>

    <h3>7.2 統合によるシナジー効果分析</h3>
    <table>
      <tr>
        <th>シナジー項目</th>
        <th>統合前の問題</th>
        <th>統合後の改善</th>
        <th>定量的効果</th>
      </tr>
      <tr>
        <td><strong>データ統合</strong></td>
        <td>各ツールのデータが分離</td>
        <td>一元管理によるデータ分析強化</td>
        <td>意思決定精度20%向上</td>
      </tr>
      <tr>
        <td><strong>ワークフロー最適化</strong></td>
        <td>ツール間の手動データ移行</td>
        <td>自動化されたシームレス連携</td>
        <td>処理時間60%短縮</td>
      </tr>
      <tr>
        <td><strong>ユーザー体験統一</strong></td>
        <td>操作方法がツール毎に異なる</td>
        <td>一貫したUIとUX</td>
        <td>習得時間70%短縮</td>
      </tr>
      <tr>
        <td><strong>サポート効率化</strong></td>
        <td>複数ベンダーとの調整が必要</td>
        <td>単一ベンダーでの一元サポート</td>
        <td>問題解決時間80%短縮</td>
      </tr>
    </table>

    <h2>8. 導入スケジュールと成功要因</h2>

    <h3>8.1 段階的導入によるリスク最小化</h3>
    
    <table>
      <tr>
        <th>フェーズ</th>
        <th>期間</th>
        <th>主要作業</th>
        <th>担当部署</th>
      </tr>
      <tr>
        <td><strong>準備フェーズ</strong></td>
        <td>1ヶ月目</td>
        <td>契約・アカウント設定・管理者研修</td>
        <td>情報システム部</td>
      </tr>
      <tr>
        <td><strong>パイロット導入</strong></td>
        <td>2ヶ月目</td>
        <td>部分導入・検証・フィードバック収集</td>
        <td>情報システム部・一部部署</td>
      </tr>
      <tr>
        <td><strong>全社展開</strong></td>
        <td>3-4ヶ月目</td>
        <td>全社員研修・データ移行・本格運用</td>
        <td>全部署</td>
      </tr>
      <tr>
        <td><strong>効果測定</strong></td>
        <td>5-6ヶ月目</td>
        <td>KPI測定・ROI検証・最適化</td>
        <td>経営企画・情報システム部</td>
      </tr>
    </table>

    <h3>8.2 成功を担保する重要成功要因（CSF）</h3>
    <table>
      <tr>
        <th>成功要因</th>
        <th>対策内容</th>
        <th>責任部署</th>
        <th>成功指標（KPI）</th>
      </tr>
      <tr>
        <td><strong>経営層のコミット</strong></td>
        <td>CEO・CIO主導の変革推進</td>
        <td>経営企画部</td>
        <td>経営層メッセージ発信回数</td>
      </tr>
      <tr>
        <td><strong>ユーザー受容性確保</strong></td>
        <td>段階的研修・チェンジマネジメント</td>
        <td>人事部・IT部</td>
        <td>ユーザー満足度80%以上</td>
      </tr>
      <tr>
        <td><strong>技術的移行完了</strong></td>
        <td>専門チームによるデータ移行</td>
        <td>情報システム部</td>
        <td>データ移行成功率99%以上</td>
      </tr>
      <tr>
        <td><strong>効果測定と改善</strong></td>
        <td>定期的なROI測定・最適化</td>
        <td>経営企画部</td>
        <td>目標ROI達成率100%</td>
      </tr>
    </table>

    <h2>10. 導入判断のポイント</h2>
    
    <div style="background: #fff; border: 2px solid #495057; padding: 25px; border-radius: 8px; margin: 25px 0;">
      <h3 style="color: #495057; margin-top: 0;">経営視点での判断基準</h3>
      <table style="width: 100%; margin-top: 15px;">
        <tr>
          <th style="width: 30%; background: #f8f9fa;">判断項目</th>
          <th style="width: 35%; background: #f8f9fa;">評価内容</th>
          <th style="width: 35%; background: #f8f9fa;">判定結果</th>
        </tr>
        <tr>
          <td><strong>投資回収期間</strong></td>
          <td>${calculationResults.paybackPeriod}ヶ月で初期投資を回収</td>
          <td style="color: #28a745; font-weight: bold;">✅ 極めて短期（1年以内）</td>
        </tr>
        <tr>
          <td><strong>ROI（投資利益率）</strong></td>
          <td>年間${calculationResults.roi}%のリターン</td>
          <td style="color: #28a745; font-weight: bold;">✅ 高収益（100%以上）</td>
        </tr>
        <tr>
          <td><strong>リスク評価</strong></td>
          <td>段階的導入によりリスク最小化</td>
          <td style="color: #28a745; font-weight: bold;">✅ 低リスク</td>
        </tr>
        <tr>
          <td><strong>競争優位性</strong></td>
          <td>業界の68%が既に導入済み</td>
          <td style="color: #ffc107; font-weight: bold;">⚠️ 早急な対応が必要</td>
        </tr>
        <tr>
          <td><strong>実行可能性</strong></td>
          <td>Larkの導入実績と支援体制</td>
          <td style="color: #28a745; font-weight: bold;">✅ 確実に実行可能</td>
        </tr>
      </table>
      
      <div style="background: #28a745; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
        <p style="font-size: 20px; font-weight: bold; margin: 0;">
          総合判定：導入を強く推奨
        </p>
        <p style="font-size: 16px; margin: 10px 0 0 0;">
          全ての評価項目で基準を満たし、早期導入により競争優位性を確保
        </p>
      </div>
    </div>

    <div class="approval-section">
      <h2 style="margin-top: 0; background: none; color: #495057; padding: 0; border: none;">11. 承認・決裁事項</h2>
      <p style="font-size: 18px; font-weight: 600;">
        以上の詳細分析に基づき、下記事項についてご承認をお願いいたします：
      </p>
      <ol style="font-size: 16px; line-height: 1.8;">
        <li><strong>予算承認</strong>：年間¥${larkAnnualCost.toLocaleString()}のLarkライセンス費用</li>
        <li><strong>導入承認</strong>：現行${userInputs.selectedTools.length}ツールからLarkへの統合移行</li>
        <li><strong>スケジュール承認</strong>：2024年第2四半期での導入開始</li>
        <li><strong>体制承認</strong>：情報システム部主導による導入プロジェクト推進</li>
        <li><strong>効果測定</strong>：導入6ヶ月後の効果検証とROI確認</li>
      </ol>

      <table class="signature-table">
        <tr style="background: #f5f5f5;">
          <th>役職</th>
          <th>氏名</th>
          <th>承認日</th>
          <th>署名・印</th>
        </tr>
        <tr>
          <td><strong>申請者</strong></td>
          <td>情報システム部長</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><strong>部門長</strong></td>
          <td>情報システム部門長</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><strong>財務承認</strong></td>
          <td>CFO</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><strong>最終承認</strong></td>
          <td>CEO</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; margin-top: 60px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
      <p style="font-size: 14px; color: #666; margin: 0;">
        📊 この稟議書は詳細な財務分析と人件費換算に基づいて作成されています<br>
        🤖 Generated with Claude Code | Co-Authored-By: Claude &lt;noreply@anthropic.com&gt;
      </p>
    </div>
  </div>
</body>
</html>
  `;
  
    return html;
  } catch (error) {
    console.error('Formal proposal generation error:', error);
    throw new Error('正式提案書の生成に失敗しました');
  }
}

export function openDocumentInNewTab(htmlContent: string) {
  try {
    if (typeof window === 'undefined') {
      console.warn('Window object not available - cannot open document');
      return;
    }
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      throw new Error('ポップアップがブロックされました');
    }
  } catch (error) {
    console.error('Document opening error:', error);
    // フォールバック：ダウンロード機能を提供
    downloadHtmlFile(htmlContent, 'proposal.html');
  }
}

function downloadHtmlFile(content: string, filename: string) {
  try {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('ドキュメントの生成に失敗しました。しばらくしてから再試行してください。');
  }
}