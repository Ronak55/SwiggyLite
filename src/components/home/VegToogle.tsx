import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { colors, typography, spacing } from "../../theme";
import {device} from "../../utils/device";

const width = device.width * 0.4;

export default function VegToggle() {
  const [selected, setSelected] = useState<"veg" | "nonveg">("veg");
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selected === "veg" ? 0 : 1,
      useNativeDriver: false,
      stiffness: 200,
      damping: 20,
    }).start();
  }, [selected]);

  const toggleWidth = width;

  const renderOption = (type: "veg" | "nonveg", color: string, label: string) => {
    const isActive = selected === type;
    return (
      <TouchableOpacity
        style={styles.option}
        onPress={() => setSelected(type)}
        activeOpacity={0.7}
      >
        <View style={[styles.dot, { borderColor: color }]}>
          <View style={[styles.dotInner, { backgroundColor: color }]} />
        </View>
        <Animated.Text
          style={[
            styles.optionText,
            { color: isActive ? colors.white : colors.gray700 },
          ]}
        >
          {label}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.toggleBackground, { width: toggleWidth * 2 }]}>
        <Animated.View
          style={[
            styles.activePill,
            {
              width: toggleWidth,
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, toggleWidth],
                  }),
                },
              ],
            },
          ]}
        />
        {renderOption("veg", "#008000", "Veg Only")}
        {renderOption("nonveg", "#D32F2F", "Non-Veg")}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    alignItems: "center",
  },
  toggleBackground: {
    flexDirection: "row",
    backgroundColor: colors.gray100,
    borderRadius: 50,
    overflow: "hidden",
    height: device.height * 0.05,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  activePill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: colors.secondary,
    borderRadius: 50,
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
