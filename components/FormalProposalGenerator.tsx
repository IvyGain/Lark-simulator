import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import Button from '@/components/Button';
import { CalculationResult, ToolDetail } from '@/store/advanced-simulator-store';
import { tools } from '@/constants/tools';
import { Ionicons } from '@expo/vector-icons';
import { generateFormalProposal as generateFormalProposalFromUtils } from '@/utils/documentGenerator';

const { width: screenWidth } = Dimensions.get('window');

interface FormalProposalGeneratorProps {
  result: CalculationResult;
  employeeCount: number;
  selectedTools: ToolDetail[];
  challenges: string[];
  improvements: string[];
}

interface ProposalSettings {
  companyName: string;
  departmentName: string;
  proposerName: string;
  proposerTitle: string;
  approverName: string;
  approverTitle: string;
  implementationBudget: number;
  implementationPeriod: number; // months
}

export const FormalProposalGenerator: React.FC<FormalProposalGeneratorProps> = ({
  result,
  employeeCount,
  selectedTools,
  challenges,
  improvements,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  const [settings, setSettings] = useState<ProposalSettings>({
    companyName: '[企業名]',
    departmentName: '[部署名]',
    proposerName: '[提案者名]',
    proposerTitle: '[提案者役職]',
    approverName: '[承認者名]',
    approverTitle: '[承認者役職]',
    implementationBudget: result.larkAnnualCost,
    implementationPeriod: 3,
  });

  // Animate component entrance
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };



  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    
    try {
      // selectedToolsをuserInputs形式に変換
      console.log('=== 稟議書生成開始 ===');
      console.log('selectedTools:', selectedTools); // デバッグ用ログ
      console.log('selectedTools.length:', selectedTools.length);
      
      const convertedSelectedTools = selectedTools.map(tool => {
        console.log('Processing tool:', tool); // デバッグ用ログ
        
        // toolsからツール情報を取得
        const toolInfo = tools.find(t => t.id === tool.toolId);
        console.log('Found toolInfo:', toolInfo); // デバッグ用ログ
        
        if (!toolInfo) {
          console.warn(`Tool not found for toolId: ${tool.toolId}`);
          return { toolId: tool.toolId, planIndex: 0 };
        }
        
        // 月額料金から適切なplanIndexを推定
        const planIndex = toolInfo.pricingPlans.findIndex(plan => 
          plan.pricePerUser === tool.monthlyFee
        );
        
        console.log(`Tool ${tool.toolId}: monthlyFee=${tool.monthlyFee}, planIndex=${planIndex}`);
        
        return {
          toolId: tool.toolId,
          planIndex: planIndex >= 0 ? planIndex : 0
        };
      });
      
      console.log('convertedSelectedTools:', convertedSelectedTools); // デバッグ用ログ

      const userInputs = {
        companyName: settings.companyName,
        industry: '一般企業',
        employeeCount: employeeCount,
        selectedTools: convertedSelectedTools,
        currentChallenges: challenges,
        expectedImprovements: improvements
      };
      
      console.log('userInputs:', userInputs);
      console.log('userInputs.selectedTools.length:', userInputs.selectedTools.length);

      const calculationResults = {
        currentMonthlyCost: result.currentMonthlyCost,
        larkMonthlyCost: result.larkMonthlyCost,
        monthlySavings: result.monthlySavings,
        annualSavings: result.annualSavings,
        paybackPeriod: result.paybackPeriod,
        roi: result.roi,
        reductionPercentage: result.savingsPercentage
      };

      const proposalText = generateFormalProposalFromUtils(userInputs, calculationResults);
      
      // Web環境では新しいウィンドウで表示
      if (typeof window !== 'undefined') {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>Lark導入稟議書 - ${settings.companyName}</title>
                <meta charset="UTF-8">
                <style>
                  @page { 
                    size: A4; 
                    margin: 25mm; 
                  }
                  body { 
                    font-family: 'MS PGothic', 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', sans-serif; 
                    line-height: 1.8; 
                    color: #333;
                    font-size: 12px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    margin: 0;
                    padding: 20px;
                  }
                  .document-container {
                    background: white;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                  }
                  h1 { 
                    text-align: center; 
                    font-size: 24px; 
                    color: #2563eb; 
                    border-bottom: 3px solid #2563eb; 
                    padding-bottom: 15px; 
                    margin-bottom: 30px;
                  }
                  h2 { 
                    color: #1f2937; 
                    font-size: 18px; 
                    margin-top: 25px; 
                    margin-bottom: 15px;
                    border-left: 4px solid #00A3A1;
                    padding-left: 10px;
                  }
                  h3 { 
                    color: #374151; 
                    font-size: 16px; 
                    margin-top: 20px; 
                    margin-bottom: 10px;
                  }
                  ul { 
                    padding-left: 20px; 
                    margin: 10px 0;
                  }
                  li { 
                    margin-bottom: 5px; 
                  }
                  .highlight { 
                    background: linear-gradient(45deg, #fef3c7, #fde68a); 
                    padding: 3px 6px; 
                    border-radius: 4px;
                    font-weight: 600;
                  }
                  .cost-section {
                    background: linear-gradient(45deg, #007bff, #6610f2);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                  }
                  .tool-list {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 15px 0;
                  }
                  .signature-section {
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                  }
                  .approval-section {
                    margin-top: 30px;
                    border: 2px solid #00A3A1;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: #f8f9fa;
                  }
                  .print-button { 
                    position: fixed; 
                    top: 20px; 
                    right: 20px; 
                    background: linear-gradient(45deg, #00A3A1, #6C63FF);
                    color: white; 
                    border: none; 
                    padding: 12px 24px; 
                    border-radius: 25px; 
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0,163,161,0.3);
                    z-index: 1000;
                    font-weight: 600;
                    transition: all 0.3s ease;
                  }
                  .print-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0,163,161,0.4);
                  }
                  .copy-button {
                    position: fixed;
                    top: 20px;
                    right: 180px;
                    background: linear-gradient(45deg, #6C63FF, #EC4899);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(108,99,255,0.3);
                    z-index: 1000;
                    font-weight: 600;
                    transition: all 0.3s ease;
                  }
                  .copy-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(108,99,255,0.4);
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                  }
                  th, td {
                    border: 1px solid #e9ecef;
                    padding: 12px;
                    text-align: left;
                  }
                  th {
                    background: linear-gradient(90deg, #00A3A1, #6C63FF);
                    color: white;
                    font-weight: 600;
                  }
                  tr:nth-child(even) {
                    background-color: #f8f9fa;
                  }
                </style>
              </head>
              <body>
                <button class="print-button" onclick="window.print()">印刷 / PDF保存</button>
                <button class="copy-button" onclick="navigator.clipboard.writeText(document.querySelector('pre').textContent); alert('クリップボードにコピーしました')">テキストをコピー</button>
                <div class="document-container">
                  <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${proposalText}</pre>
                </div>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      }
      
      // その他の環境ではクリップボードにコピー
      else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(proposalText);
        Alert.alert('成功', '稟議書をクリップボードにコピーしました');
      }
      
    } catch (error) {
      console.error('稟議書生成エラー:', error);
      Alert.alert('エラー', '稟議書の生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSetting = (key: keyof ProposalSettings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      {/* Professional Header */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="document-text-outline" size={32} color={Colors.white} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>📋 エグゼクティブ稟議書作成</Text>
            <Text style={styles.subtitle}>経営層承認用の正式な投資提案書</Text>
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics Preview */}
        <View style={styles.metricsPreview}>
          <Text style={styles.metricsTitle}>💰 投資効果サマリー</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <LinearGradient
                colors={[Colors.success, '#2E8B57']}
                style={styles.metricGradient}
              >
                <Text style={styles.metricValue}>{formatCurrency(result.annualSavings)}</Text>
                <Text style={styles.metricLabel}>年間削減額</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.metricCard}>
              <LinearGradient
                colors={[Colors.primary, '#7C3AED']}
                style={styles.metricGradient}
              >
                <Text style={styles.metricValue}>
                  {(result.paybackPeriod || (settings.implementationBudget / result.monthlySavings)).toFixed(1)}ヶ月
                </Text>
                <Text style={styles.metricLabel}>投資回収期間</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.metricCard}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.metricGradient}
              >
                <Text style={styles.metricValue}>
                  {(((result.annualSavings * 3 - settings.implementationBudget) / settings.implementationBudget) * 100).toFixed(1)}%
                </Text>
                <Text style={styles.metricLabel}>3年間ROI</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>📊 稟議書に含まれる内容</Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <LinearGradient
                colors={[Colors.success, '#2E8B57']}
                style={styles.featureIcon}
              >
                <Ionicons name="analytics" size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>投資対効果分析（ROI・回収期間）</Text>
                <Text style={styles.featureDescription}>詳細な財務分析と3年間の累積効果</Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <LinearGradient
                colors={[Colors.primary, '#7C3AED']}
                style={styles.featureIcon}
              >
                <Ionicons name="calendar" size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>詳細導入計画・スケジュール</Text>
                <Text style={styles.featureDescription}>段階的導入プランと実施体制</Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.featureIcon}
              >
                <Ionicons name="shield-checkmark" size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>リスク分析・対策案</Text>
                <Text style={styles.featureDescription}>想定リスクと具体的な対策方法</Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#8B5CF6', '#A855F7']}
                style={styles.featureIcon}
              >
                <Ionicons name="checkmark-done" size={20} color={Colors.white} />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>承認欄・印鑑欄付き</Text>
                <Text style={styles.featureDescription}>正式な承認プロセスに対応</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <TouchableOpacity 
            style={styles.settingsToggle}
            onPress={() => setShowSettings(!showSettings)}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsToggleText}>
              ⚙️ 稟議書の詳細設定 {showSettings ? '▼' : '▶'}
            </Text>
            <Ionicons 
              name={showSettings ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={Colors.primary} 
            />
          </TouchableOpacity>
          
          {showSettings && (
            <View style={styles.settingsPanel}>
              <View style={styles.settingsRow}>
                <Text style={styles.settingsLabel}>会社名</Text>
                <TextInput
                  style={styles.settingsInput}
                  value={settings.companyName}
                  onChangeText={(value) => updateSetting('companyName', value)}
                  placeholder="株式会社サンプル"
                />
              </View>

              <View style={styles.settingsRow}>
                <Text style={styles.settingsLabel}>部署名</Text>
                <TextInput
                  style={styles.settingsInput}
                  value={settings.departmentName}
                  onChangeText={(value) => updateSetting('departmentName', value)}
                  placeholder="情報システム部"
                />
              </View>

              <View style={styles.settingsRow}>
                <Text style={styles.settingsLabel}>提案者名</Text>
                <TextInput
                  style={styles.settingsInput}
                  value={settings.proposerName}
                  onChangeText={(value) => updateSetting('proposerName', value)}
                  placeholder="山田 太郎"
                />
              </View>

              <View style={styles.settingsRow}>
                <Text style={styles.settingsLabel}>提案者役職</Text>
                <TextInput
                  style={styles.settingsInput}
                  value={settings.proposerTitle}
                  onChangeText={(value) => updateSetting('proposerTitle', value)}
                  placeholder="課長"
                />
              </View>

              <View style={styles.settingsRow}>
                <Text style={styles.settingsLabel}>承認者名</Text>
                <TextInput
                  style={styles.settingsInput}
                  value={settings.approverName}
                  onChangeText={(value) => updateSetting('approverName', value)}
                  placeholder="佐藤 花子"
                />
              </View>

              <View style={styles.settingsRow}>
                <Text style={styles.settingsLabel}>承認者役職</Text>
                <TextInput
                  style={styles.settingsInput}
                  value={settings.approverTitle}
                  onChangeText={(value) => updateSetting('approverTitle', value)}
                  placeholder="部長"
                />
              </View>
            </View>
          )}
        </View>
        
        {/* CTA Section */}
        <LinearGradient
          colors={['#4F46E5', '#7C3AED', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaSection}
        >
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>🚀 プロフェッショナル稟議書を生成</Text>
            <Text style={styles.ctaSubtitle}>
              印刷・PDF保存・テキストコピーに対応した美しい稟議書
            </Text>
            
            <TouchableOpacity 
              onPress={handleGenerateProposal}
              activeOpacity={0.8}
              disabled={isGenerating}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.generateButton}
              >
                <View style={styles.generateButtonInner}>
                  {isGenerating ? (
                    <Text style={styles.generateButtonText}>📄 生成中...</Text>
                  ) : (
                    <Text style={styles.generateButtonText}>📋 稟議書を生成する</Text>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Note Section */}
        <View style={styles.note}>
          <Ionicons name="information-circle" size={20} color={Colors.info} />
          <Text style={styles.noteText}>
            💡 生成された稟議書は印刷・PDF保存が可能です。承認フローに合わせてカスタマイズしてご利用ください。
            エグゼクティブ向けに最適化された美しいレイアウトで、投資判断に必要な情報を分かりやすく整理しています。
          </Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  metricsPreview: {
    marginBottom: 32,
  },
  metricsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    lineHeight: 18,
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray[100],
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsToggleText: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  settingsPanel: {
    backgroundColor: Colors.gray[50],
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  settingsRow: {
    gap: 8,
  },
  settingsLabel: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '700',
    color: Colors.gray[700],
  },
  settingsInput: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    borderRadius: 12,
    padding: 16,
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[900],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ctaSection: {
    borderRadius: 20,
    padding: 4,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    fontWeight: '600',
  },
  generateButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    width: '100%',
  },
  generateButtonInner: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderRadius: 16,
  },
  generateButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.info + '10',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
  },
  noteText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.info,
    marginLeft: 12,
    flex: 1,
    lineHeight: isDesktop ? 20 : 18,
    fontWeight: '500',
  },
});