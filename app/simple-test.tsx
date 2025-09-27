import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import Button from '@/components/Button';
import { Stack, useRouter } from 'expo-router';

export default function SimpleTestScreen() {
  const router = useRouter();

  const handleGenerateProposal = () => {
    const proposalText = `
稟議書

件名：Lark（統合コラボレーションプラットフォーム）導入に関する件

提出日：2024年12月21日
提案部署：情報システム部
提案者：システム管理者 田中太郎

【1. 提案要旨】
現在の業務効率化とコスト最適化を目的として、統合コラボレーションプラットフォーム「Lark」の導入を提案いたします。
本導入により、年間¥500,000のコスト削減効果と、業務効率向上による生産性の向上が期待されます。

【2. 現状分析と課題】

■ 現在利用中のシステム・ツール
・Slack：月額¥850円/人
・Zoom：月額¥2,000円/人  
・Google Workspace：月額¥1,360円/人

■ 現状コスト
・月額総コスト：¥421,000
・年間総コスト：¥5,052,000
・従業員1人当たり年間コスト：¥50,520

【3. 導入提案】

■ 提案ソリューション
統合コラボレーションプラットフォーム「Lark」
・メッセンジャー、ビデオ会議、文書管理、タスク管理等の機能を統合
・月額料金：1,420円/人（税込）
・対象従業員数：100名

■ 導入効果・投資対効果分析

・導入後年間コスト：¥1,704,000
・年間コスト削減額：¥3,348,000
・コスト削減率：66.3%
・ROI（投資収益率）：196.5%
・投資回収期間：3ヶ月

【4. まとめ】
本提案により、大幅なコスト削減と業務効率化を実現できます。
短期間での投資回収が可能であり、費用対効果の高い投資と判断いたします。

つきましては、上記提案についてご承認いただきますようお願い申し上げます。

以上

提案者：システム管理者 田中太郎　　　　　印
承認者：部長 佐藤花子 様

承認日：　　　年　　月　　日　　　　　　印

【承認】・【条件付承認】・【却下】・【保留】

条件・コメント：
_________________________________________________
_________________________________________________
`;

    // Web環境では新しいウィンドウで表示
    if (typeof window !== 'undefined') {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Lark導入稟議書 - サンプル</title>
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
                }
                h1 { 
                  text-align: center; 
                  font-size: 20px; 
                  margin-bottom: 30px; 
                  border-bottom: 2px solid #333; 
                  padding-bottom: 10px;
                }
                .header-info {
                  text-align: right;
                  margin-bottom: 30px;
                  line-height: 1.5;
                }
                .print-button { 
                  position: fixed; 
                  top: 20px; 
                  right: 20px; 
                  background: #00A3A1; 
                  color: white; 
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 6px; 
                  cursor: pointer;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  z-index: 1000;
                }
                .print-button:hover {
                  background: #008a88;
                }
                @media print { 
                  .print-button { display: none; }
                  body { font-size: 11px; }
                }
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>稟議書機能テスト</Text>
          <Text style={styles.subtitle}>シンプルな稟議書生成のテスト画面です</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>サンプル計算結果</Text>
          
          <View style={styles.resultGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>年間削減額</Text>
              <Text style={[styles.resultValue, { color: Colors.success }]}>¥3,348,000</Text>
            </View>
            
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>削減率</Text>
              <Text style={[styles.resultValue, { color: Colors.success }]}>66.3%</Text>
            </View>
            
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>ROI</Text>
              <Text style={[styles.resultValue, { color: Colors.primary }]}>196.5%</Text>
            </View>
            
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>投資回収期間</Text>
              <Text style={[styles.resultValue, { color: Colors.primary }]}>3ヶ月</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>稟議書生成</Text>
          <Text style={styles.description}>
            サンプルデータを使用して、正式な稟議書を生成します。
            新しいタブで開き、印刷・PDF保存が可能です。
          </Text>
          
          <Button
            title="稟議書を生成"
            onPress={handleGenerateProposal}
            variant="primary"
            style={styles.generateButton}
          />
        </View>

        <View style={styles.actionButtons}>
          <Button
            title="メインに戻る"
            onPress={() => router.push('/')}
            variant="outline"
          />
        </View>
      </ScrollView>
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
    padding: isDesktop ? 32 : 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.subtext,
    textAlign: 'center',
  },
  card: {
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
  cardTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: isDesktop ? 14 : 13,
    color: Colors.subtext,
    lineHeight: isDesktop ? 20 : 18,
    marginBottom: 20,
  },
  resultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultItem: {
    width: isDesktop ? '23%' : '48%',
    marginBottom: isDesktop ? 0 : 16,
  },
  resultLabel: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.subtext,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
  },
  generateButton: {
    width: '100%',
  },
  actionButtons: {
    marginTop: 16,
  },
});