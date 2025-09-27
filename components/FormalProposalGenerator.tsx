import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import Button from '@/components/Button';
import { CalculationResult, ToolDetail } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateFormalProposal = () => {
    const currentDate = new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const proposalText = `
稟議書

件名：Lark（統合コラボレーションプラットフォーム）導入に関する件

提出日：${currentDate}
提案部署：${settings.departmentName}
提案者：${settings.proposerTitle} ${settings.proposerName}

【1. 提案要旨】
現在の業務効率化とコスト最適化を目的として、統合コラボレーションプラットフォーム「Lark」の導入を提案いたします。
本導入により、年間${formatCurrency(result.annualSavings)}のコスト削減効果と、業務効率向上による生産性の向上が期待されます。

【2. 現状分析と課題】

■ 現在利用中のシステム・ツール
${selectedTools.map(tool => `・${tool.toolId}：月額${formatCurrency(tool.monthlyFee)}円/人`).join('\n')}

■ 現状コスト
・月額総コスト：${formatCurrency(result.currentMonthlyCost)}
・年間総コスト：${formatCurrency(result.currentAnnualCost)}
・従業員1人当たり年間コスト：${formatCurrency(result.currentAnnualCost / employeeCount)}

■ 現状の課題
${challenges.map(challenge => `・${challenge}`).join('\n')}

【3. 導入提案】

■ 提案ソリューション
統合コラボレーションプラットフォーム「Lark」
・メッセンジャー、ビデオ会議、文書管理、タスク管理等の機能を統合
・月額料金：1,420円/人（税込）
・対象従業員数：${employeeCount}名

■ 期待される改善効果
${improvements.map(improvement => `・${improvement}`).join('\n')}

【4. 導入効果・投資対効果分析】

■ コスト削減効果
・導入後年間コスト：${formatCurrency(result.larkAnnualCost)}
・年間コスト削減額：${formatCurrency(result.annualSavings)}
・コスト削減率：${result.savingsPercentage.toFixed(1)}%

■ 業務効率化効果
・年間工数削減：${Math.round(result.laborHoursSaved).toLocaleString()}時間
・人件費換算削減額：${formatCurrency(result.laborCostSaved)}

■ 投資収益性
・ROI（投資収益率）：${result.roi.toFixed(1)}%
・投資回収期間：${Math.round(result.paybackPeriod)}ヶ月

【5. 導入計画】

■ 導入予算
・年間利用料：${formatCurrency(settings.implementationBudget)}
・初期導入費用（研修・移行作業等）：${formatCurrency(settings.implementationBudget * 0.1)}（推定）
・合計初年度投資額：${formatCurrency(settings.implementationBudget * 1.1)}

■ 導入スケジュール（${settings.implementationPeriod}ヶ月計画）
1ヶ月目：
・契約手続き、アカウント設定
・管理者研修の実施
・セキュリティ設定、基本環境構築

2ヶ月目：
・パイロット運用開始（各部署代表者）
・フィードバック収集と設定調整
・一般ユーザー向け研修資料作成

3ヶ月目：
・全社展開開始
・既存ツールからの段階的移行
・運用定着支援

4ヶ月目以降：
・運用状況モニタリング
・効果測定と改善提案
・旧システム廃止手続き

【6. リスク分析と対策】

■ 主要リスク
・ユーザーの新システム習得に時間を要する可能性
・既存データの移行作業で一時的な業務停止の可能性
・セキュリティ要件への適合性確認

■ 対策
・段階的導入により運用リスクを最小化
・十分な研修期間を確保し、サポート体制を整備
・事前にセキュリティ監査を実施

【7. 承認後のアクション】

■ 直ちに実施する事項
・Lark営業担当との詳細仕様確認
・契約条件の最終調整
・導入プロジェクトチームの編成

■ 承認依頼事項
・Lark導入の承認
・予算${formatCurrency(settings.implementationBudget * 1.1)}の承認
・導入プロジェクトの実行権限

【8. 添付資料】
・Larkサービス詳細資料
・コスト比較詳細資料
・セキュリティ仕様書
・導入事例集

【9. 結論】
本提案により、年間${formatCurrency(result.annualSavings)}のコスト削減と${Math.round(result.laborHoursSaved).toLocaleString()}時間の業務効率化を実現できます。
投資回収期間も${Math.round(result.paybackPeriod)}ヶ月と短期間であり、費用対効果の高い投資と判断いたします。

つきましては、上記提案についてご承認いただきますようお願い申し上げます。

以上

提案者：${settings.proposerTitle} ${settings.proposerName}　　　　　印

承認者：${settings.approverTitle} ${settings.approverName} 様

承認日：　　　年　　月　　日　　　　　　　　　　　　　　　　印

【承認】・【条件付承認】・【却下】・【保留】

条件・コメント：
_________________________________________________
_________________________________________________
_________________________________________________
`;

    return proposalText;
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    
    try {
      const proposalText = generateFormalProposal();
      
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
                    margin-bottom: 30px; 
                    border-bottom: 3px solid #00A3A1; 
                    padding-bottom: 15px;
                    color: #00A3A1;
                    font-weight: 800;
                  }
                  .section-title { 
                    color: #333; 
                    font-size: 16px; 
                    margin-top: 30px; 
                    margin-bottom: 15px;
                    background: linear-gradient(90deg, #00A3A1, #6C63FF);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 5px;
                    font-weight: 600;
                  }
                  .header-info {
                    text-align: right;
                    margin-bottom: 30px;
                    line-height: 1.5;
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #00A3A1;
                  }
                  .cost-highlight {
                    background: linear-gradient(45deg, #28a745, #20c997);
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    margin: 20px 0;
                    font-size: 18px;
                    font-weight: bold;
                    box-shadow: 0 4px 15px rgba(40,167,69,0.3);
                  }
                  .roi-section {
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
                  .copy-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #28a745, #20c997);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(40,167,69,0.3);
                    z-index: 1000;
                    font-weight: 600;
                  }
                  .print-button:hover, .copy-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0,163,161,0.4);
                  }
                  @media print { 
                    .print-button, .copy-button { display: none; }
                    body { 
                      font-size: 11px; 
                      background: white;
                      padding: 0;
                    }
                    .document-container {
                      box-shadow: none;
                      border-radius: 0;
                    }
                  }
                  .highlight { 
                    background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
                    padding: 4px 8px; 
                    border-radius: 5px;
                    font-weight: 600;
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
        <Text style={styles.title}>正式稟議書作成</Text>
      </View>
      
      <Text style={styles.description}>
        企業の稟議書フォーマットに従った正式な提案書を生成します。
        承認プロセスに必要な要素を網羅した包括的な資料です。
      </Text>
      
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>投資対効果分析（ROI・回収期間）</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>詳細導入計画・スケジュール</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>リスク分析・対策案</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>承認欄・印鑑欄付き</Text>
        </View>
      </View>

      {/* 設定セクション */}
      <TouchableOpacity 
        style={styles.settingsToggle}
        onPress={() => setShowSettings(!showSettings)}
      >
        <Text style={styles.settingsToggleText}>
          {showSettings ? '設定を閉じる' : '詳細設定を編集'}
        </Text>
        <Ionicons 
          name={showSettings ? "chevron-up" : "chevron-down"} 
          size={16} 
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
              placeholder="株式会社○○"
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
      
      <View style={styles.actions}>
        <Button
          title="稟議書を生成"
          onPress={handleGenerateProposal}
          variant="primary"
          size="medium"
          loading={isGenerating}
          style={styles.generateButton}
        />
      </View>
      
      <View style={styles.note}>
        <Ionicons name="information-circle" size={16} color={Colors.info} />
        <Text style={styles.noteText}>
          生成された稟議書は印刷・PDF保存が可能です。承認フローに合わせてカスタマイズしてご利用ください。
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: isDesktop ? 24 : 20,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '700',
    color: Colors.gray[900],
    marginLeft: 8,
  },
  description: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    lineHeight: isDesktop ? 24 : 20,
    marginBottom: 24,
  },
  features: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[700],
    marginLeft: 8,
  },
  settingsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  settingsToggleText: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  settingsPanel: {
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  settingsRow: {
    marginBottom: 16,
  },
  settingsLabel: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: 6,
  },
  settingsInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    padding: 12,
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[900],
  },
  actions: {
    marginBottom: 16,
  },
  generateButton: {
    width: '100%',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.info + '10',
    borderRadius: 8,
    padding: 12,
  },
  noteText: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.info,
    marginLeft: 8,
    flex: 1,
    lineHeight: isDesktop ? 18 : 16,
  },
});