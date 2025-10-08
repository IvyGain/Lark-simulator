import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { isDesktop, spacing, getResponsiveDimensions } from '@/constants/responsive';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { CostComparison } from '@/components/CostComparison';
import { FloatingActions } from '@/components/FloatingActions';
import { useAdvancedSimulatorStore } from '@/store/advanced-simulator-store';
import { LARK_PRICE_PER_USER } from '@/constants/tools';
import { Ionicons } from '@expo/vector-icons';

export default function EnhancedResultsScreen() {
  const router = useRouter();
  const { horizontalPadding } = getResponsiveDimensions();
  const { 
    calculationResult, 
    employeeCount, 
    selectedTools, 
    currentChallenges, 
    expectedImprovements,
    resetAll
  } = useAdvancedSimulatorStore();

  if (!calculationResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="計算結果" />
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={48} color={Colors.warning} />
          <Text style={styles.errorTitle}>計算結果がありません</Text>
          <Text style={styles.errorDescription}>
            シミュレーションを実行してから結果を確認してください
          </Text>
          <Button
            title="シミュレーションに戻る"
            onPress={() => router.push('/enhanced-simulator')}
            variant="primary"
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const selectedChallenges = currentChallenges
    .filter(c => c.selected)
    .map(c => c.id === 'other' && c.customText ? c.customText : c.label);

  const selectedImprovements = expectedImprovements
    .filter(i => i.selected)
    .map(i => i.label);

  // クイック版形式のデータに変換
  const quickFormatSelectedTools = selectedTools.map(tool => ({
    id: tool.toolId,
    name: tool.toolId,
    pricePerUser: tool.monthlyFee / employeeCount,
    totalMonthlyCost: tool.monthlyFee
  }));

  const generateRichProposal = () => {
    const currentDate = new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const proposalHTML = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lark導入提案書 - ${employeeCount}名規模</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', sans-serif;
            line-height: 1.8;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .document {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            position: relative;
        }
        
        .header-section {
            background: linear-gradient(135deg, #00A3A1 0%, #6C63FF 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.05) 10px,
                rgba(255,255,255,0.05) 20px
            );
            animation: shimmer 20s linear infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .header-date {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .content-section {
            padding: 40px;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .summary-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .summary-card.savings {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .summary-card.roi {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
        
        .summary-card.payback {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }
        
        .summary-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            animation: cardShine 3s ease-in-out infinite;
        }
        
        @keyframes cardShine {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }
        
        .card-value {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 5px;
            position: relative;
            z-index: 2;
        }
        
        .card-label {
            font-size: 0.9rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #333;
            margin: 40px 0 20px 0;
            padding: 15px 0;
            border-bottom: 3px solid #00A3A1;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 50px;
            height: 3px;
            background: #6C63FF;
            border-radius: 2px;
        }
        
        .chart-container {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            text-align: center;
        }
        
        .chart-bars {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            gap: 40px;
            height: 300px;
            margin: 30px 0;
        }
        
        .chart-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }
        
        .bar {
            width: 80px;
            border-radius: 10px 10px 0 0;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .bar.current {
            background: linear-gradient(to top, #ff6b6b, #ee5a52);
            height: ${Math.min((calculationResult.currentMonthlyCost / Math.max(calculationResult.currentMonthlyCost, calculationResult.larkMonthlyCost)) * 250, 250)}px;
        }
        
        .bar.lark {
            background: linear-gradient(to top, #00A3A1, #6C63FF);
            height: ${Math.min((calculationResult.larkMonthlyCost / Math.max(calculationResult.currentMonthlyCost, calculationResult.larkMonthlyCost)) * 250, 250)}px;
        }
        
        .bar-label {
            font-weight: 600;
            color: #333;
        }
        
        .bar-value {
            font-weight: 800;
            font-size: 1.1rem;
            color: #333;
        }
        
        .bar-period {
            font-size: 0.8rem;
            color: #666;
        }
        
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .tool-item {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }
        
        .tool-item:hover {
            border-color: #00A3A1;
            box-shadow: 0 5px 15px rgba(0,163,161,0.1);
        }
        
        .tool-name {
            font-weight: 600;
            color: #333;
        }
        
        .tool-cost {
            text-align: right;
        }
        
        .tool-price {
            font-weight: 700;
            color: #00A3A1;
        }
        
        .tool-unit {
            font-size: 0.8rem;
            color: #666;
        }
        
        .challenges-list, .improvements-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .list-item {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-weight: 500;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 15px;
        }
        
        .cta-text {
            color: #666;
            margin-bottom: 20px;
        }
        
        .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .action-button {
            background: linear-gradient(135deg, #00A3A1, #6C63FF);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,163,161,0.3);
        }
        
        .floating-actions {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        }
        
        .floating-button {
            background: linear-gradient(135deg, #00A3A1, #6C63FF);
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        
        .floating-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }
        
        @media print {
            body { background: white; padding: 0; }
            .document { box-shadow: none; }
            .floating-actions { display: none; }
        }
        
        @media (max-width: 768px) {
            .header-section { padding: 30px 20px; }
            .content-section { padding: 20px; }
            h1 { font-size: 2rem; }
            .chart-bars { gap: 20px; }
            .bar { width: 60px; }
            .summary-cards { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="document">
        <div class="header-section">
            <div class="header-content">
                <h1>Lark導入提案書</h1>
                <div class="header-subtitle">${employeeCount}名規模での導入効果分析</div>
                <div class="header-date">作成日: ${currentDate}</div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="summary-cards">
                <div class="summary-card savings">
                    <div class="card-value">${formatCurrency(calculationResult.annualSavings)}</div>
                    <div class="card-label">年間削減額</div>
                </div>
                <div class="summary-card roi">
                    <div class="card-value">${calculationResult.roi.toFixed(1)}%</div>
                    <div class="card-label">ROI（投資収益率）</div>
                </div>
                <div class="summary-card payback">
                    <div class="card-value">${Math.round(calculationResult.paybackPeriod)}ヶ月</div>
                    <div class="card-label">投資回収期間</div>
                </div>
                <div class="summary-card">
                    <div class="card-value">${Math.round(calculationResult.savingsPercentage)}%</div>
                    <div class="card-label">コスト削減率</div>
                </div>
            </div>
            
            <h2 class="section-title">📊 コスト比較</h2>
            <div class="chart-container">
                <div class="chart-bars">
                    <div class="chart-bar">
                        <div class="bar current"></div>
                        <div class="bar-label">現在のツール</div>
                        <div class="bar-value">${formatCurrency(calculationResult.currentMonthlyCost)}</div>
                        <div class="bar-period">(年間 ${formatCurrency(calculationResult.currentAnnualCost)})</div>
                    </div>
                    <div class="chart-bar">
                        <div class="bar lark"></div>
                        <div class="bar-label">Larkに統合</div>
                        <div class="bar-value">${formatCurrency(calculationResult.larkMonthlyCost)}</div>
                        <div class="bar-period">(年間 ${formatCurrency(calculationResult.larkAnnualCost)})</div>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title">🛠️ 現在のツール内訳</h2>
            <div class="tools-grid">
                ${selectedTools.map(tool => `
                    <div class="tool-item">
                        <div class="tool-name">${tool.toolId}</div>
                        <div class="tool-cost">
                            <div class="tool-price">${formatCurrency(tool.monthlyFee * employeeCount)}</div>
                            <div class="tool-unit">¥${tool.monthlyFee.toLocaleString()}/人</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <h2 class="section-title">⚠️ 現在の課題</h2>
            <div class="challenges-list">
                ${selectedChallenges.map(challenge => `
                    <div class="list-item">${challenge}</div>
                `).join('')}
            </div>
            
            <h2 class="section-title">⭐ 期待する改善効果</h2>
            <div class="improvements-list">
                ${selectedImprovements.map(improvement => `
                    <div class="list-item">${improvement}</div>
                `).join('')}
            </div>
            
            <h2 class="section-title">💡 ユースケース提案</h2>
            ${calculationResult.useCases.map((useCase, index) => `
                <div class="tool-item" style="margin-bottom: 15px;">
                    <div>
                        <div class="tool-name">${useCase.challenge}</div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                            <strong>解決策:</strong> ${useCase.solution}<br>
                            <strong>活用機能:</strong> ${useCase.feature}
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <div class="cta-section">
                <h3 class="cta-title">🚀 Larkで業務効率を劇的に改善</h3>
                <p class="cta-text">
                    年間${formatCurrency(calculationResult.annualSavings)}の削減効果を今すぐ実現しませんか？
                    専門スタッフが導入から運用まで全面サポートいたします。
                </p>
                <div class="action-buttons">
                    <button class="action-button" onclick="window.open('https://www.customercloud.co/lark-ivygain')">🚀 Larkの無料インストールはこちら</button>
                    <button class="action-button" onclick="window.open('https://ivygain-project.jp.larksuite.com/scheduler/1077edbc8cd5e47a')">💬 導入に関するご質問・無料相談</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="floating-actions">
        <button class="floating-button" onclick="window.print()" title="印刷・PDF保存">🖨️</button>
        <button class="floating-button" onclick="copyToClipboard()" title="テキストをコピー">📋</button>
    </div>
    
    <script>
        function copyToClipboard() {
            const textContent = document.body.innerText;
            navigator.clipboard.writeText(textContent).then(() => {
                alert('📋 クリップボードにコピーしました！');
            }).catch(err => {
                console.error('コピーに失敗しました:', err);
            });
        }
        
        // アニメーションの開始
        window.addEventListener('load', () => {
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'scaleY(0)';
                bar.style.transformOrigin = 'bottom';
                setTimeout(() => {
                    bar.style.transition = 'transform 1s ease-out';
                    bar.style.transform = 'scaleY(1)';
                }, 500);
            });
        });
    </script>
</body>
</html>`;

    return proposalHTML;
  };

  const handleGenerateProposal = () => {
    const proposalHTML = generateRichProposal();
    
    if (typeof window !== 'undefined') {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(proposalHTML);
        newWindow.document.close();
      }
    }
  };

  const proposalText = `Lark導入シミュレーション結果
従業員数: ${employeeCount}名
年間削減額: ${formatCurrency(calculationResult.annualSavings)}
削減率: ${Math.round(calculationResult.savingsPercentage)}%
ROI: ${Math.round(calculationResult.roi)}%
投資回収期間: ${Math.round(calculationResult.paybackPeriod)}ヶ月`;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          <Header 
            title="コスト比較結果" 
            subtitle={`${employeeCount}名の利用者で計算`}
          />

          {/* クイック版スタイルのコスト比較 */}
          <CostComparison
            selectedTools={quickFormatSelectedTools}
            userCount={employeeCount}
          />

          {/* サマリーカード */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>詳細分析結果</Text>
            
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>
                  {formatCurrency(calculationResult.annualSavings)}
                </Text>
                <Text style={styles.metricLabel}>年間削減額</Text>
              </View>
              
              <View style={styles.metricCard}>
                <Text style={[styles.metricValue, { color: Colors.success }]}>
                  {Math.round(calculationResult.savingsPercentage)}%
                </Text>
                <Text style={styles.metricLabel}>削減率</Text>
              </View>
              
              <View style={styles.metricCard}>
                <Text style={[styles.metricValue, { color: Colors.primary }]}>
                  {Math.round(calculationResult.roi)}%
                </Text>
                <Text style={styles.metricLabel}>ROI</Text>
              </View>
              
              <View style={styles.metricCard}>
                <Text style={[styles.metricValue, { color: Colors.warning }]}>
                  {Math.round(calculationResult.paybackPeriod)}ヶ月
                </Text>
                <Text style={styles.metricLabel}>投資回収期間</Text>
              </View>
            </View>
          </View>

          {/* 業務効率化効果 */}
          <View style={styles.efficiencySection}>
            <Text style={styles.sectionTitle}>業務効率化効果</Text>
            <View style={styles.efficiencyGrid}>
              <View style={styles.efficiencyItem}>
                <Ionicons name="time" size={32} color={Colors.primary} />
                <Text style={styles.efficiencyValue}>
                  {Math.round(calculationResult.laborHoursSaved).toLocaleString()}時間
                </Text>
                <Text style={styles.efficiencyLabel}>年間工数削減</Text>
              </View>
              <View style={styles.efficiencyItem}>
                <Ionicons name="cash" size={32} color={Colors.success} />
                <Text style={styles.efficiencyValue}>
                  {formatCurrency(calculationResult.laborCostSaved)}
                </Text>
                <Text style={styles.efficiencyLabel}>人件費換算削減額</Text>
              </View>
            </View>
          </View>

          {/* 稟議書生成ボタン */}
          <View style={styles.proposalSection}>
            <View style={styles.proposalHeader}>
              <Ionicons name="document-text" size={32} color={Colors.primary} />
              <Text style={styles.proposalTitle}>提案書・稟議書の作成</Text>
            </View>
            <Text style={styles.proposalDescription}>
              シミュレーション結果を基に、美しくデザインされた提案書を生成します。
              印刷・PDF保存・テキストコピーに対応しています。
            </Text>
            <Button
              title="リッチHTML稟議書を生成"
              onPress={handleGenerateProposal}
              variant="primary"
              style={styles.proposalButton}
            />
          </View>

          {/* アクションボタン */}
          <View style={styles.actionButtons}>
            <Button
              title="新しいシミュレーション"
              onPress={() => {
                resetAll();
                router.push('/enhanced-simulator');
              }}
              variant="outline"
              style={styles.actionButton}
            />
            <Button
              title="トップに戻る"
              onPress={() => router.push('/')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>

      {/* フローティングアクション */}
      <FloatingActions
        textToCopy={proposalText}
        onPrint={() => typeof window !== 'undefined' && window.print()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // フローティングボタンのスペース
  },
  content: {
    paddingVertical: spacing.md,
    maxWidth: isDesktop ? 1000 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray[900],
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  backButton: {
    minWidth: 200,
  },
  summaryContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: isDesktop ? 32 : 24,
    marginVertical: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  summaryTitle: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '800',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  metricCard: {
    width: isDesktop ? '23%' : '48%',
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  metricValue: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    textAlign: 'center',
    fontWeight: '500',
  },
  efficiencySection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: isDesktop ? 32 : 24,
    marginBottom: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  efficiencyGrid: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: spacing.xl,
  },
  efficiencyItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 16,
  },
  efficiencyValue: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '800',
    color: Colors.gray[900],
    marginVertical: spacing.sm,
  },
  efficiencyLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    textAlign: 'center',
    fontWeight: '500',
  },
  proposalSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: isDesktop ? 32 : 24,
    marginBottom: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  proposalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  proposalTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginLeft: spacing.sm,
  },
  proposalDescription: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    textAlign: 'center',
    lineHeight: isDesktop ? 24 : 20,
    marginBottom: spacing.xl,
  },
  proposalButton: {
    alignSelf: 'stretch',
  },
  actionButtons: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: isDesktop ? 1 : undefined,
  },
});