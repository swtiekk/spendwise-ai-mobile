import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export const scale = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((width / width) * size));

export const verticalScale = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((height / height) * size));

export const ms = (size: number, factor = 0.5): number => {
  const newSize = size + (scale(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Scale based on font scale setting (respects user accessibility settings)
 */
export const fs = (size: number): number =>
  Math.round(size / PixelRatio.getFontScale());

export const screenWidth  = width;
export const screenHeight = height;
export const isSmallScreen = width < 360;
export const isLargeScreen = width >= 414;