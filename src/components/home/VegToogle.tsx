import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { colors, typography, spacing } from "../../theme";

export default function VegToggle() {
  const [selected, setSelected] = useState<"veg" | "nonveg">("veg");
  const translateX = new Animated.Value(selected === "veg" ? 0 : 1);

  const handleToggle = (type: "veg" | "nonveg") => {
    setSelected(type);
    Animated.spring(translateX, {
      toValue: type === "veg" ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const renderDot = (color: string) => (
    <View style={[styles.dot, { borderColor: color }]}>
      <View style={[styles.dotInner, { backgroundColor: color }]} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleBackground}>
        <Animated.View
          style={[
            styles.activePill,
            {
              left: translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, "50%"],
              }),
            },
          ]}
        />

        {/* Veg Option */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleToggle("veg")}
          activeOpacity={0.7}
        >
          {renderDot("#008000")}
          <Text
            style={[
              styles.optionText,
              selected === "veg" && styles.activeText,
            ]}
          >
            Veg Only
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleToggle("nonveg")}
          activeOpacity={0.7}
        >
          {renderDot("#D32F2F")}
          <Text
            style={[
              styles.optionText,
              selected === "nonveg" && styles.activeText,
            ]}
          >
            Non-Veg
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    alignItems: "center",
  },
  toggleBackground: {
    flexDirection: "row",
    width: 220,
    backgroundColor: colors.gray100,
    borderRadius: 30,
    overflow: "hidden",
    position: "relative",
  },
  activePill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    backgroundColor: colors.secondary,
    borderRadius: 30,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    ...typography.small,
    fontWeight: "600",
    marginLeft: spacing.xs,
    color: colors.gray700,
  },
  activeText: {
    color: colors.white,
  },
  dot: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
