import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../../theme";

export default function SearchBar() {
  return (
    <View style={styles.searchWrapper}>
      <Ionicons name="search" size={18} color={colors.gray500} />
      <TextInput
        placeholder="Search for restaurants and dishes"
        placeholderTextColor={colors.gray500}
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray100,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginTop: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    ...typography.body,
    color: colors.black,
  },
});
