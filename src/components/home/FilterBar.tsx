// src/components/FiltersBar.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Icons } from "../../utils/icons";
import { mockData } from "../../data/mockData";
import { colors, typography, spacing } from "../../theme";

export default function FiltersBar() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const animatedValues = useRef<Record<string, Animated.Value>>({}).current;

  mockData.filters.forEach(f => {
    if (!animatedValues[f.id]) animatedValues[f.id] = new Animated.Value(0);
  });

  const toggleFilter = (id: string) => {
    const isSelected = selectedFilters.includes(id);
    Animated.timing(animatedValues[id], {
      toValue: isSelected ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setSelectedFilters(prev =>
      isSelected ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: typeof mockData.filters[0] }) => {
    const isSelected = selectedFilters.includes(item.id);

    const backgroundColor = animatedValues[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [colors.gray100, colors.secondary],
    });
    const textColor = animatedValues[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [colors.gray900, colors.white],
    });

    return (
      <Animated.View style={{ marginRight: spacing.sm }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleFilter(item.id)}
        >
          <Animated.View
            style={[
              styles.pill,
              { backgroundColor },
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Animated.Text style={[styles.label, { color: textColor }]}>
              {item.label}
            </Animated.Text>
            {isSelected && (
              <Icons.Ionicons
                name="close"
                size={16}
                color={colors.white}
                style={{ marginLeft: 4 }}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData.filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    backgroundColor: colors.gray100,
  },
  listContent: {
    paddingHorizontal: 0,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  label: {
    ...typography.small,
    fontWeight: "600",
  },
});
