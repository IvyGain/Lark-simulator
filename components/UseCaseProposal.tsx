import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import { UseCase } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

interface UseCaseProposalProps {
  useCases: UseCase[];
}

export const UseCaseProposal: React.FC<UseCaseProposalProps> = ({
  useCases,
}) => {
  if (useCases.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={24} color={Colors.warning} />
        <Text style={styles.title}>ユースケース提案</Text>
      </View>
      <Text style={styles.subtitle}>
        選択された課題に基づく、Lark活用方法のご提案
      </Text>
      
      <ScrollView 
        horizontal={isDesktop}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.useCaseContainer}
      >
        {useCases.map((useCase, index) => (
          <View key={index} style={styles.useCaseCard}>
            <View style={styles.challengeSection}>
              <View style={styles.challengeIcon}>
                <Ionicons name="alert-circle" size={20} color={Colors.error} />
              </View>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeLabel}>現在の課題</Text>
                <Text style={styles.challengeText}>{useCase.challenge}</Text>
              </View>
            </View>
            
            <View style={styles.arrowSection}>
              <Ionicons name="arrow-down" size={24} color={Colors.primary} />
            </View>
            
            <View style={styles.solutionSection}>
              <View style={styles.solutionIcon}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              </View>
              <View style={styles.solutionContent}>
                <Text style={styles.solutionLabel}>Larkでの解決策</Text>
                <Text style={styles.solutionText}>{useCase.solution}</Text>
              </View>
            </View>
            
            <View style={styles.featureSection}>
              <Text style={styles.featureLabel}>活用機能</Text>
              <View style={styles.featureList}>
                {useCase.feature.split('、').map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{feature.trim()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 これらの提案は選択された課題に基づいて自動生成されています
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
  subtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    marginBottom: 24,
    lineHeight: isDesktop ? 24 : 20,
  },
  useCaseContainer: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 16,
  },
  useCaseCard: {
    width: isDesktop ? 320 : '100%',
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  challengeSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  challengeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.error + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  challengeContent: {
    flex: 1,
  },
  challengeLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.error,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  challengeText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[900],
    lineHeight: isDesktop ? 20 : 18,
  },
  arrowSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  solutionSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  solutionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  solutionContent: {
    flex: 1,
  },
  solutionLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.success,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  solutionText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[900],
    lineHeight: isDesktop ? 20 : 18,
    fontWeight: '500',
  },
  featureSection: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
  },
  featureLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  featureList: {
    gap: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  featureText: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[700],
    flex: 1,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  footerText: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
});