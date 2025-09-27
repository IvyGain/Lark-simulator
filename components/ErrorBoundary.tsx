import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { getResponsiveSize } from '../constants/responsive';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.errorContent}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>エラーが発生しました</Text>
            <Text style={styles.errorMessage}>
              アプリケーションでエラーが発生しました。再試行してください。
            </Text>
            <Button
              title="再試行"
              onPress={this.handleRetry}
              variant="primary"
              size="medium"
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsiveSize(20),
    backgroundColor: Colors.white,
  },
  errorContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  errorIcon: {
    fontSize: getResponsiveSize(48),
    marginBottom: getResponsiveSize(16),
  },
  errorTitle: {
    fontSize: getResponsiveSize(20),
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: getResponsiveSize(12),
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: getResponsiveSize(14),
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: getResponsiveSize(20),
    marginBottom: getResponsiveSize(24),
  },
});