import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import Button from '@/components/Button';
import { CalculationResult, ToolDetail } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

interface ProposalTemplateGeneratorProps {
  result: CalculationResult;
  employeeCount: number;
  selectedTools: ToolDetail[];
  challenges: string[];
  improvements: string[];
}

export const ProposalTemplateGenerator: React.FC<ProposalTemplateGeneratorProps> = ({
  result,
  employeeCount,
  selectedTools,
  challenges,
  improvements,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateProposal = () => {
    const currentDate = new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const proposalText = `
【Lark導入提案書】

作成日: ${currentDate}
対象企業: [企業名]
従業員数: ${employeeCount}名

■ 導入背景・目的
現在の業務環境において、以下の課題が確認されています：
${challenges.map(challenge => `・${challenge}`).join('\n')}

これらの課題を解決し、以下の効果を実現するためLarkの導入を提案いたします：
${improvements.map(improvement => `・${improvement}`).join('\n')}

■ 現状分析
【現在利用中のツール】
${selectedTools.map(tool => `・ツール: ${tool.toolId} - 月額: ${formatCurrency(tool.monthlyFee)}円/人`).join('\n')}

【現状コスト】
・月額総コスト: ${formatCurrency(result.currentMonthlyCost)}
・年間総コスト: ${formatCurrency(result.currentAnnualCost)}
・1人あたり年間コスト: ${formatCurrency(result.currentAnnualCost / employeeCount)}

■ Lark導入効果
【コスト削減効果】
・Lark年間コスト: ${formatCurrency(result.larkAnnualCost)}
・年間削減額: ${formatCurrency(result.annualSavings)}
・削減率: ${Math.round(result.savingsPercentage)}%

【業務効率化効果】
・年間工数削減: ${Math.round(result.laborHoursSaved)}時間
・人件費換算削減額: ${formatCurrency(result.laborCostSaved)}
・ROI（投資収益率）: ${Math.round(result.roi)}%
・投資回収期間: ${Math.round(result.paybackPeriod)}ヶ月

■ ユースケース提案
${result.useCases.map((useCase, index) => `
${index + 1}. ${useCase.challenge}の解決
解決策: ${useCase.solution}
活用機能: ${useCase.feature}
`).join('')}

■ 導入スケジュール（案）
1ヶ月目: 環境構築・管理者研修
2ヶ月目: 段階的なユーザー移行開始
3ヶ月目: 全社展開・旧システム移行
4ヶ月目: 運用定着・効果測定

■ まとめ
Lark導入により、年間${formatCurrency(result.annualSavings)}のコスト削減と${Math.round(result.laborHoursSaved)}時間の工数削減が期待できます。
投資回収期間は${Math.round(result.paybackPeriod)}ヶ月と短期間での効果実現が可能です。

以上の分析結果から、Lark導入は貴社の業務効率化とコスト最適化に大きく貢献するものと考えられます。

【お問い合わせ】
Lark営業部: [連絡先]
`;

    return proposalText;
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    
    try {
      const proposalText = generateProposal();
      
      // Web環境では新しいウィンドウで表示
      if (typeof window !== 'undefined') {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>Lark導入提案書</title>
                <style>
                  body { 
                    font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif; 
                    line-height: 1.6; 
                    max-width: 800px; 
                    margin: 0 auto; 
                    padding: 20px;
                    color: #333;
                  }
                  h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                  h2 { color: #1f2937; margin-top: 30px; }
                  ul { padding-left: 20px; }
                  .highlight { background-color: #fef3c7; padding: 2px 4px; }
                  .print-button { 
                    position: fixed; 
                    top: 20px; 
                    right: 20px; 
                    background: #2563eb; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 6px; 
                    cursor: pointer;
                  }
                  @media print { .print-button { display: none; } }
                </style>
              </head>
              <body>
                <button class="print-button" onclick="window.print()">印刷 / PDF保存</button>
                <pre style="white-space: pre-wrap; font-family: inherit;">${proposalText}</pre>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      }
      
      // モバイル環境では共有機能を使用
      else if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Lark導入提案書',
          text: proposalText,
        });
      }
      
      // その他の環境ではクリップボードにコピー
      else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(proposalText);
        Alert.alert('成功', '提案書をクリップボードにコピーしました');
      }
      
    } catch (error) {
      console.error('提案書生成エラー:', error);
      Alert.alert('エラー', '提案書の生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewProposal = () => {
    const proposalText = generateProposal();
    Alert.alert(
      '提案書プレビュー',
      proposalText.substring(0, 500) + '...\n\n※実際の生成では完全版が表示されます',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text" size={24} color={Colors.primary} />
        <Text style={styles.title}>稟議書テンプレート生成</Text>
      </View>
      
      <Text style={styles.description}>
        入力された情報を基に、上層部への提出用稟議書を自動生成します。
        計算結果、課題分析、ユースケース提案が含まれた包括的な資料です。
      </Text>
      
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>コスト比較・ROI分析</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>現状課題・解決策提案</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>導入スケジュール案</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.featureText}>PDF出力・印刷対応</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="プレビュー"
          onPress={handlePreviewProposal}
          variant="outline"
          size="medium"
          style={styles.previewButton}
        />
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
          生成された稟議書は、貴社の状況に合わせてカスタマイズしてご利用ください
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
  actions: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 12,
    marginBottom: 16,
  },
  previewButton: {
    flex: isDesktop ? 1 : undefined,
  },
  generateButton: {
    flex: isDesktop ? 2 : undefined,
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