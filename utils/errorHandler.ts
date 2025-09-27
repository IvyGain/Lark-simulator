// エラーハンドリングユーティリティ

export interface AppError {
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export class ErrorHandler {
  static createError(code: string, message: string, severity: 'low' | 'medium' | 'high' = 'medium'): AppError {
    return {
      code,
      message,
      severity,
      timestamp: new Date(),
    };
  }

  static handleCalculationError(error: unknown): AppError {
    console.error('Calculation error:', error);
    
    if (error instanceof Error) {
      return this.createError('CALC_ERROR', `計算エラー: ${error.message}`, 'high');
    }
    
    return this.createError('CALC_UNKNOWN', '計算中に不明なエラーが発生しました', 'high');
  }

  static handleDocumentGenerationError(error: unknown): AppError {
    console.error('Document generation error:', error);
    
    if (error instanceof Error) {
      return this.createError('DOC_GEN_ERROR', `ドキュメント生成エラー: ${error.message}`, 'medium');
    }
    
    return this.createError('DOC_GEN_UNKNOWN', 'ドキュメント生成中にエラーが発生しました', 'medium');
  }

  static handleStorageError(error: unknown): AppError {
    console.error('Storage error:', error);
    
    return this.createError('STORAGE_ERROR', 'データの保存に失敗しました', 'low');
  }

  static logError(error: AppError): void {
    const logLevel = error.severity === 'high' ? 'error' : error.severity === 'medium' ? 'warn' : 'info';
    console[logLevel](`[${error.code}] ${error.message}`, {
      timestamp: error.timestamp,
      severity: error.severity,
    });
  }
}

// 安全な数値変換
export function safeParseFloat(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
}

// 安全な整数変換
export function safeParseInt(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return Math.floor(value);
  }
  
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
}

// 安全な除算
export function safeDivision(numerator: number, denominator: number, defaultValue: number = 0): number {
  if (denominator === 0 || !isFinite(numerator) || !isFinite(denominator)) {
    return defaultValue;
  }
  
  const result = numerator / denominator;
  return isFinite(result) ? result : defaultValue;
}