import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MinimalScreen() {
  const router = useRouter();

  const handleGenerateProposal = () => {
    const proposalText = `稟議書

件名：Lark導入に関する件
提出日：2024年12月21日

年間削減額：¥3,348,000
削減率：66.3%
ROI：196.5%

承認者：部長 __________ 印`;

    if (typeof window !== 'undefined') {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Lark導入稟議書</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  padding: 20px; 
                  line-height: 1.6;
                }
              </style>
            </head>
            <body>
              <pre>${proposalText}</pre>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>最小限テスト画面</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGenerateProposal}>
        <Text style={styles.buttonText}>稟議書を生成</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>戻る</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#00A3A1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});