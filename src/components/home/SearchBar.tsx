import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography } from "../../theme";

const { width } = Dimensions.get("window");
const placeholders = ["Biryani", "Pizza", "Ice Cream", "Burger", "Cake", "Momos"];

export default function SearchBar() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.gray500} />
        <TextInput
          placeholder={`Search for "${placeholders[placeholderIndex]}"`}
          placeholderTextColor={colors.gray500}
          style={styles.input}
        />
      </View>
      <View style={styles.micWrapper}>
        <Ionicons name="mic" size={22} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - spacing.screenHorizontal * 2,
    backgroundColor: colors.white,
    marginTop: spacing.md,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    marginLeft: spacing.xs,
    color: colors.gray900,
    flex: 1,
    ...typography.medium,
  },
  micWrapper: {
    marginLeft: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
});
