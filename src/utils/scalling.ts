import {Dimensions} from 'react-native';

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const {width, height} = Dimensions.get('window');

export const horizontalScale = (size: number) =>
  (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
