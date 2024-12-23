import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const scaleFont = (size) => {
  const standardScreenHeight = 680;
  const standardScreenWidth = 360;
  const heightScale = height / standardScreenHeight;
  const widthScale = width / standardScreenWidth;
  const scale = Math.min(heightScale, widthScale);
  return Math.round(size * scale);
};
