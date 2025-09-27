import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface FloatingActionsProps {
  textToCopy?: string;
  onShare?: () => void;
  onPrint?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  textToCopy,
  onShare,
  onPrint,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!textToCopy) return;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        Alert.alert('成功', 'テキストをクリップボードにコピーしました');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('コピーエラー:', error);
      Alert.alert('エラー', 'コピーに失敗しました');
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (typeof navigator !== 'undefined' && navigator.share && textToCopy) {
      navigator.share({
        title: 'Larkシミュレーション結果',
        text: textToCopy,
      }).catch(console.error);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* 展開されたアクションボタン */}
      {isExpanded && (
        <View style={styles.actionButtons}>
          {textToCopy && (
            <TouchableOpacity 
              style={[styles.actionButton, copied && styles.actionButtonSuccess]}
              onPress={handleCopy}
            >
              <Ionicons 
                name={copied ? "checkmark" : "copy"} 
                size={20} 
                color={copied ? Colors.success : Colors.white} 
              />
              <Text style={[styles.actionButtonText, copied && styles.actionButtonTextSuccess]}>
                {copied ? 'コピー済み' : 'コピー'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
            <Ionicons name="print" size={20} color={Colors.white} />
            <Text style={styles.actionButtonText}>印刷</Text>
          </TouchableOpacity>

          {(onShare || (typeof navigator !== 'undefined' && navigator.share)) && (
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Ionicons name="share" size={20} color={Colors.white} />
              <Text style={styles.actionButtonText}>共有</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* メインフローティングボタン */}
      <TouchableOpacity 
        style={[styles.floatingButton, isExpanded && styles.floatingButtonExpanded]}
        onPress={toggleExpanded}
      >
        <Ionicons 
          name={isExpanded ? "close" : "ellipsis-horizontal"} 
          size={24} 
          color={Colors.white} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: isDesktop ? 32 : 24,
    right: isDesktop ? 32 : 24,
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  actionButtons: {
    marginBottom: 12,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[800] as string,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonSuccess: {
    backgroundColor: Colors.success,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionButtonTextSuccess: {
    color: Colors.white,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  floatingButtonExpanded: {
    backgroundColor: Colors.gray[600] as string,
  },
});