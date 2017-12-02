// @flow

import { Dimensions, Platform } from 'react-native';

export const windowDims: { height: number, width: number } = Dimensions.get('window');
export const imageSize = { width: 1219, height: 1582, };

export const imageInputPosition = { x: 432, y: 278, };

export const scaledImageSize = {
  width: windowDims.width,
  height: (windowDims.width * imageSize.height) / imageSize.width
};
