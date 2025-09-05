import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography, spacing } from "../../theme";
import { DEFAULT_CITY } from "../../utils";
import { Icons } from "../../utils/icons";

export default function Header() {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity style={styles.citySelector}>
        <Icons.Ionicons name="location-sharp" size={20} color={colors.primary} />
        <Text style={styles.cityText}>{DEFAULT_CITY}</Text>
        <Icons.Ionicons name="chevron-down" size={16} color={colors.gray700} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icons.Ionicons
          name="person-circle-outline"
          size={28}
          color={colors.gray700}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  citySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityText: {
    ...typography.h2,
    color: colors.black,
    marginHorizontal: spacing.xs,
  },
});
