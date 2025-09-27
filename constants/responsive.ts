import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Breakpoints
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1200,
} as const;

// Check if current screen is mobile, tablet, or desktop
export const isWeb = Platform.OS === 'web';
export const isMobile = screenWidth < BREAKPOINTS.tablet;
export const isTablet = screenWidth >= BREAKPOINTS.tablet && screenWidth < BREAKPOINTS.desktop;
export const isDesktop = screenWidth >= BREAKPOINTS.desktop;
export const isLargeDesktop = screenWidth >= BREAKPOINTS.large;

// Responsive dimensions
export const getResponsiveDimensions = () => {
  const isSmallMobile = screenWidth < 360;
  const isMediumMobile = screenWidth >= 360 && screenWidth < 414;
  const isLargeMobile = screenWidth >= 414 && screenWidth < BREAKPOINTS.tablet;
  
  return {
    screenWidth,
    screenHeight,
    isSmallMobile,
    isMediumMobile,
    isLargeMobile,
    isMobile: screenWidth < BREAKPOINTS.tablet,
    isTablet: screenWidth >= BREAKPOINTS.tablet && screenWidth < BREAKPOINTS.desktop,
    isDesktop: screenWidth >= BREAKPOINTS.desktop,
    isLargeDesktop: screenWidth >= BREAKPOINTS.large,
    
    // Container widths
    containerWidth: isDesktop ? Math.min(screenWidth * 0.8, 1200) : screenWidth * 0.95,
    maxContentWidth: isDesktop ? 800 : 500,
    sidebarWidth: isDesktop ? 300 : 0,
    
    // Padding and margins
    horizontalPadding: isDesktop ? 40 : isMobile ? 16 : 24,
    verticalPadding: isDesktop ? 32 : isMobile ? 16 : 24,
    cardPadding: isDesktop ? 24 : isMobile ? 16 : 20,
    
    // Font sizes
    titleSize: isDesktop ? 32 : isMobile ? 24 : 28,
    subtitleSize: isDesktop ? 18 : isMobile ? 16 : 17,
    bodySize: isDesktop ? 16 : isMobile ? 14 : 15,
    buttonSize: isDesktop ? 16 : isMobile ? 14 : 15,
    
    // Grid and layout
    gridColumns: isDesktop ? 3 : isTablet ? 2 : 1,
    cardMinHeight: isDesktop ? 200 : isMobile ? 150 : 175,
  };
};

// Responsive value helper
export const responsive = <T>(mobile: T, tablet?: T, desktop?: T): T => {
  if (isDesktop && desktop !== undefined) return desktop;
  if (isTablet && tablet !== undefined) return tablet;
  return mobile;
};

// Scale for different screen sizes (with max limit)
export const scale = (size: number): number => {
  const { screenWidth } = getResponsiveDimensions();
  const baseWidth = 375; // iPhone X width as base
  const scaleFactor = Math.min((screenWidth / baseWidth), 1.5); // 最大1.5倍に制限
  return scaleFactor * size;
};

// Better responsive size function
export const getResponsiveSize = (size: number): number => {
  if (isDesktop) {
    return size; // デスクトップでは元のサイズを使用
  } else if (isTablet) {
    return size * 0.95; // タブレットでは少し小さく
  } else {
    return size * 0.9; // モバイルでは更に小さく
  }
};

// Responsive spacing
export const spacing = {
  xs: responsive(4, 6, 8),
  sm: responsive(8, 12, 16),
  md: responsive(16, 20, 24),
  lg: responsive(24, 28, 32),
  xl: responsive(32, 40, 48),
  xxl: responsive(48, 56, 64),
};

export default {
  BREAKPOINTS,
  isWeb,
  isMobile,
  isTablet,
  isDesktop,
  isLargeDesktop,
  getResponsiveDimensions,
  responsive,
  scale,
  spacing,
};