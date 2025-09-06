// theme/typography.ts
import { RFPercentage } from "react-native-responsive-fontsize";

export const typography = {
  h1: {
    fontSize: RFPercentage(3.2),
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: RFPercentage(2.6),
    fontWeight: "600" as const,
  },
  body: {
    fontSize: RFPercentage(2),
    fontWeight: "400" as const,
  },
  medium:{
    fontSize: RFPercentage(1.6),
    fontWeight: "400" as const,
  },
  small: {
    fontSize: RFPercentage(1.4),
    fontWeight: "400" as const,
  },
};
