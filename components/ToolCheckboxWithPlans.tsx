import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/colors";
import { Tool, PricingPlan } from "@/constants/tools";

interface ToolCheckboxWithPlansProps {
  tool: Tool;
  isSelected: boolean;
  selectedPlanIndex?: number;
  onToggle: (id: string, planIndex?: number) => void;
  onPlanChange?: (toolId: string, planIndex: number) => void;
}

export default function ToolCheckboxWithPlans({
  tool,
  isSelected,
  selectedPlanIndex,
  onToggle,
  onPlanChange,
}: ToolCheckboxWithPlansProps) {
  const [showPlanModal, setShowPlanModal] = useState(false);
  
  const currentPlan = tool.pricingPlans[selectedPlanIndex || tool.defaultPlanIndex || 0];
  const hasMultiplePlans = tool.pricingPlans.length > 1;

  const handleToggle = () => {
    if (!isSelected) {
      // When selecting a tool, use the default plan
      onToggle(tool.id, tool.defaultPlanIndex || 0);
    } else {
      // When deselecting, just toggle off
      onToggle(tool.id);
    }
  };

  const handlePlanSelect = (planIndex: number) => {
    if (onPlanChange) {
      onPlanChange(tool.id, planIndex);
    }
    setShowPlanModal(false);
  };

  const handlePlanModalPress = (e: any) => {
    e.stopPropagation();
    if (isSelected && hasMultiplePlans) {
      setShowPlanModal(true);
    }
  };

  return (
    <>
      <Pressable
        style={[
          styles.container,
          isSelected && styles.containerSelected,
        ]}
        onPress={handleToggle}
      >
        <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
          <FontAwesome
            name={tool.icon as any}
            size={14}
            color={isSelected ? Colors.white : Colors.primary}
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text 
            style={[styles.name, isSelected && styles.nameSelected]} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {tool.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, isSelected && styles.priceSelected]}>
              ¥{currentPlan.pricePerUser.toLocaleString()}/人
            </Text>
            {hasMultiplePlans && isSelected && (
              <TouchableOpacity 
                style={styles.planButton}
                onPress={handlePlanModalPress}
              >
                <Text style={styles.planButtonText}>{currentPlan.name}</Text>
                <FontAwesome name="chevron-down" size={8} color={Colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && (
            <FontAwesome name="check" size={8} color={Colors.white} />
          )}
        </View>
      </Pressable>

      {/* Plan Selection Modal */}
      <Modal
        visible={showPlanModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPlanModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPlanModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{tool.name} プラン選択</Text>
              <TouchableOpacity onPress={() => setShowPlanModal(false)}>
                <FontAwesome name="times" size={20} color={Colors.gray[600]} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.plansList}>
              {tool.pricingPlans.map((plan, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.planItem,
                    index === selectedPlanIndex && styles.planItemSelected
                  ]}
                  onPress={() => handlePlanSelect(index)}
                >
                  <View style={styles.planInfo}>
                    <Text style={[
                      styles.planName,
                      index === selectedPlanIndex && styles.planNameSelected
                    ]}>
                      {plan.name}
                    </Text>
                    <Text style={[
                      styles.planPrice,
                      index === selectedPlanIndex && styles.planPriceSelected
                    ]}>
                      ¥{plan.pricePerUser.toLocaleString()}/人/月
                    </Text>
                    {plan.description && (
                      <Text style={[
                        styles.planDescription,
                        index === selectedPlanIndex && styles.planDescriptionSelected
                      ]}>
                        {plan.description}
                      </Text>
                    )}
                  </View>
                  {index === selectedPlanIndex && (
                    <FontAwesome name="check" size={16} color={Colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginBottom: 2,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    minHeight: 50,
  },
  containerSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray[100] as string,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  iconContainerSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  contentContainer: {
    flex: 1,
    marginRight: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 2,
  },
  nameSelected: {
    color: Colors.white,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 10,
    color: Colors.gray[600],
  },
  priceSelected: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  planButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 4,
  },
  planButtonText: {
    fontSize: 8,
    color: Colors.white,
    marginRight: 2,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: Colors.white,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  plansList: {
    maxHeight: 300,
  },
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  planItemSelected: {
    backgroundColor: Colors.primary,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  planNameSelected: {
    color: Colors.white,
  },
  planPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
    marginBottom: 2,
  },
  planPriceSelected: {
    color: Colors.white,
  },
  planDescription: {
    fontSize: 12,
    color: Colors.gray[600],
  },
  planDescriptionSelected: {
    color: "rgba(255, 255, 255, 0.8)",
  },
});