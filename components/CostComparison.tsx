import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

interface CostComparisonProps {
  currentMonthlyCost: number;
  larkMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  selectedTools: Array<{
    id: string;
    name: string;
    pricePerUser: number;
    totalMonthlyCost: number;
  }>;
  userCount: number;
}

export function CostComparison({
  currentMonthlyCost,
  larkMonthlyCost,
  monthlySavings,
  annualSavings,
  selectedTools,
  userCount,
}: CostComparisonProps) {
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("ja-JP");
  };

  // Calculate savings percentage
  const savingsPercentage = currentMonthlyCost > 0 
    ? Math.round((monthlySavings / currentMonthlyCost) * 100) 
    : 0;
  
  // Calculate bar heights for visualization
  const maxHeight = 180;
  const currentCostHeight = maxHeight;
  const larkCostHeight = currentMonthlyCost > 0 
    ? (larkMonthlyCost / currentMonthlyCost) * maxHeight 
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>コスト比較</Text>
      
      <View style={styles.comparisonContainer}>
        {/* Current Tools Cost */}
        <View style={styles.costColumn}>
          <Text style={styles.columnTitle}>現在のツール</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: currentCostHeight }]}>
              <LinearGradient
                colors={[Colors.gray[600], Colors.gray[800]]}
                style={styles.barGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </View>
            <Text style={styles.costLabel}>¥{formatNumber(currentMonthlyCost)}/月</Text>
            <Text style={styles.annualCostLabel}>
              (年間 ¥{formatNumber(currentMonthlyCost * 12)})
            </Text>
          </View>
        </View>

        {/* Lark Cost */}
        <View style={styles.costColumn}>
          <Text style={styles.columnTitle}>Larkに統合</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: larkCostHeight }]}>
              <LinearGradient
                colors={[Colors.primary, "#007F7D"]}
                style={styles.barGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </View>
            <Text style={styles.costLabel}>¥{formatNumber(larkMonthlyCost)}/月</Text>
            <Text style={styles.annualCostLabel}>
              (年間 ¥{formatNumber(larkMonthlyCost * 12)})
            </Text>
          </View>
        </View>
      </View>

      {/* Savings */}
      <View style={styles.savingsContainer}>
        <LinearGradient
          colors={["rgba(40, 167, 69, 0.1)", "rgba(40, 167, 69, 0.2)"]}
          style={styles.savingsCard}
        >
          <View style={styles.savingsContent}>
            <View>
              <Text style={styles.savingsLabel}>年間削減額</Text>
              <Text style={styles.savingsAmount}>
                ¥{formatNumber(annualSavings)}/年
              </Text>
              <Text style={styles.monthlySavingsAmount}>
                月間 ¥{formatNumber(monthlySavings)}/月
              </Text>
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{savingsPercentage}%</Text>
              <Text style={styles.percentageLabel}>削減</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>現在のツール内訳</Text>
          <Text style={styles.userCountText}>利用者数: {userCount}人</Text>
        </View>
        
        <View style={styles.toolsList}>
          {selectedTools.map((tool) => (
            <View key={tool.id} style={styles.toolItem}>
              <Text style={styles.toolName} numberOfLines={1} ellipsizeMode="tail">
                {typeof tool.name === 'string' ? tool.name : JSON.stringify(tool.name)}
              </Text>
              <View style={styles.toolCostContainer}>
                <Text style={styles.toolUnitPrice}>¥{formatNumber(tool.pricePerUser)}/人</Text>
                <Text style={styles.toolCost}>¥{formatNumber(tool.totalMonthlyCost)}/月</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.larkPriceNote}>
          <Text style={styles.larkPriceText}>
            *Larkプロプラン1,420円/人/月で計算
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    alignSelf: 'center',
    width: '95%',
    maxWidth: 500,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  comparisonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  costColumn: {
    flex: 1,
    alignItems: "center",
    maxWidth: 160,
  },
  columnTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14,
    color: Colors.text,
    textAlign: "center",
  },
  barContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: 60,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: "hidden",
  },
  barGradient: {
    width: "100%",
    height: "100%",
  },
  costLabel: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  annualCostLabel: {
    fontSize: 12,
    color: Colors.gray[600],
    marginTop: 3,
  },
  savingsContainer: {
    marginBottom: 24,
    alignSelf: 'center',
    width: '90%',
  },
  savingsCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.success,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  savingsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  savingsLabel: {
    fontSize: 14,
    color: Colors.success,
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.success,
  },
  monthlySavingsAmount: {
    fontSize: 14,
    color: Colors.success,
    marginTop: 4,
  },
  percentageContainer: {
    backgroundColor: Colors.success,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  percentageText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
  },
  percentageLabel: {
    fontSize: 12,
    color: Colors.white,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingTop: 16,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  userCountText: {
    fontSize: 13,
    color: Colors.gray[600],
  },
  toolsList: {
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 8,
    padding: 12,
  },
  toolItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  toolName: {
    fontSize: 13,
    color: Colors.gray[700],
    flex: 1,
    marginRight: 8,
  },
  toolCostContainer: {
    alignItems: "flex-end",
  },
  toolUnitPrice: {
    fontSize: 11,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  toolCost: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text,
  },
  larkPriceNote: {
    marginTop: 12,
    alignItems: "center",
  },
  larkPriceText: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: "center",
  },
});