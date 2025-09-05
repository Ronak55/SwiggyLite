import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const spacing = {
  xs: wp("1%"),
  sm: wp("2%"),
  md: wp("4%"),
  lg: wp("6%"),
  xl: wp("8%"),
  xxl: wp("10%"),
  screenHorizontal: wp("5%"),
  screenVertical: hp("2%"),
};
